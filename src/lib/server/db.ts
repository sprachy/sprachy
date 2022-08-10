import faunadb from 'faunadb'
const { Collection, Create, Documents, Get, Index, Match, Ref, Update, Map, Lambda, Paginate, Var, Delete, If, Let, Exists, Now } = faunadb
import type { ProgressItem, User } from '../api'
import _ from 'lodash'
import { flattenFauna, FaunaError, makeFaunaClient } from './faunaUtil'
import type { FaunaDocument } from "./faunaUtil"

class FaunaConnector {
  _client?: faunadb.Client
  get client() {
    if (!this._client) {
      this._client = makeFaunaClient()
    }
    return this._client
  }
}

export namespace db {
  export const fauna = new FaunaConnector()

  /** 
   * FQL shorthand to return null instead of erroring if
   * the document doesn't exist.
   */
  export function GetIfExists(expr: faunadb.Expr) {
    return Let(
      { obj: expr },
      If(
        Exists(Var("obj")),
        Get(Var("obj")),
        null
      )
    )
  }

  /**
   * Run a faunadb query with error handling and return the
   * raw, unparsed result.
   */
  export async function faunaQuery(expr: faunadb.Expr): Promise<any> {
    try {
      return await fauna.client.query(expr)
    } catch (err: any) {
      throw new FaunaError(err)
    }
  }

  /**
   * Run a faunadb query, retrieving a single document as a result.
   */
  export async function querySingle<T>(expr: faunadb.Expr) {
    const res = await faunaQuery(expr)
    if (res === null)
      return res

    return flattenFauna(res as FaunaDocument<T>)
  }

  /**
   * Run a faunadb query, retrieving a list of documents as a result.
   */
  export async function query<T extends any[]>(expr: faunadb.Expr) {
    const res = await faunaQuery(expr) as { data: FaunaDocument<T[0]>[] }
    return res.data.map(flattenFauna)
  }

  export namespace users {
    export async function get(userId: string): Promise<User | null> {
      return await db.querySingle<User>(
        GetIfExists(Ref(Collection("users"), userId))
      )
    }

    export async function expect(userId: string): Promise<User> {
      return await db.querySingle<User>(
        Get(Ref(Collection("users"), userId))
      )
    }

    export async function getByUsername(username: string): Promise<User | null> {
      return await db.querySingle<User>(
        GetIfExists(Match(Index("users_by_username"), username))
      )
    }

    export async function getByEmail(email: string): Promise<User | null> {
      return await db.querySingle<User>(
        GetIfExists(Match(Index("users_by_email"), email))
      )
    }

    export async function expectByEmail(email: string): Promise<User> {
      return await db.querySingle<User>(
        Get(Match(Index("users_by_email"), email))
      )
    }

    export async function listAll(): Promise<User[]> {
      // TODO handle pagination
      return await db.query<User[]>(
        Map(
          Paginate(Documents(Collection("users"))),
          Lambda("id", Get(Var("id")))
        )
      )
    }

    export async function query(index: string, ...args: any[]): Promise<User[]> {
      return await db.query<User[]>(
        Map(
          Paginate(Match(Index(index), ...args)),
          Lambda("id", Get(Var("id")))
        )
      )
    }


    /**
     * Create a new user. Will fail if email is taken, due to faunadb unique constraint.
     */
    export async function create(props: Pick<User, 'email'> & { password: string }): Promise<User> {
      return await db.querySingle<User>(
        Create(
          Collection("users"),
          {
            credentials: {
              password: props.password
            },
            data: _.omit(props, 'password')
          }
        )
      )
    }

    export async function changePassword(userId: string, newPassword: string): Promise<User> {
      return await db.querySingle<User>(
        Update(
          Ref(Collection("users"), userId),
          {
            credentials: {
              password: newPassword
            }
          }
        )
      )
    }

    export async function update(userId: string, changes: Partial<Omit<User, 'id'>>): Promise<User> {
      return await db.querySingle<User>(
        Update(
          Ref(Collection('users'), userId),
          {
            data: changes
          }
        )
      )
    }
  }

  export namespace progress {
    function MatchByUserAndPattern(userId: string, patternId: string) {
      return Match(Index("progress_by_user_and_pattern"), [
        Ref(Collection("users"), userId),
        patternId
      ])
    }

    export async function get(userId: string, patternId: string): Promise<ProgressItem | null> {
      return await db.querySingle<ProgressItem | null>(
        GetIfExists(MatchByUserAndPattern(userId, patternId))
      )
    }

    export async function update(progressId: string, changes: Partial<Omit<ProgressItem, 'id' | 'userId' | 'patternId'>>): Promise<ProgressItem> {
      return await db.querySingle<ProgressItem>(
        Update(
          Ref(Collection('progress'), progressId),
          {
            data: changes
          }
        )
      )
    }

    export async function listAllFor(userId: string) {
      return await db.query<ProgressItem[]>(
        Map(
          Paginate(Match(Index("progress_by_user"), Ref(Collection("users"), userId))),
          Lambda("ref", Get(Var("ref")))
        )
      )
    }

    /**
     * Reset all SRS progress for a user. Destructive!
     */
    export async function resetFor(userId: string) {
      await db.query(
        Map(
          Paginate(Match(Index("progress_by_user"), Ref(Collection("users"), userId))),
          Lambda("ref", Delete(Var("ref")))
        )
      )
    }

    /**
     * Call when a user has completed the level for a given pattern.
     * Only updates srs level if it is the correct time to do so.
     */
    export async function gainExperience(userId: string, patternId: string, experience: number): Promise<ProgressItem | null> {
      const progress = await db.progress.get(userId, patternId)

      if (!progress) {
        await db.users.update(userId, {
          lastExperienceGainAt: Now() as any
        })

        return await db.querySingle<ProgressItem>(
          Create(Collection("progress"), {
            data: {
              userRef: Ref(Collection("users"), userId),
              patternId: patternId,
              initiallyLearnedAt: Now(),
              lastLeveledAt: Now(),
              experience: experience
            }
          })
        )
      }

      await db.users.update(userId, {
        lastExperienceGainAt: Now() as any
      })

      return await db.querySingle<ProgressItem>(
        Update(
          Ref(Collection('progress'), progress.id),
          {
            data: {
              lastExperienceGainAt: Now(),
              experience: progress.experience + experience
            }
          }
        )
      )
    }
  }
}