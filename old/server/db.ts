import faunadb, { Collection, Create, Documents, Expr, Get, Index, Login, Match, Ref, Update, Map, Lambda, Paginate, Var, Delete, If, Let, Exists, Now, Difference, Select, Filter, Not, Time } from 'faunadb'
import type { ProgressItem, User } from '../common/api'
import _ from 'lodash'
import { IS_PRODUCTION } from './settings'
import { FAUNA_ADMIN_KEY } from './secrets'
import { FaunaDocument, flattenFauna, FaunaError } from './faunaUtil'
import * as time from '../common/time'

export namespace db {
  // This structure allows the client to be changed e.g. by tests
  export const fauna =
    IS_PRODUCTION
      ? {
        client: new faunadb.Client({
          secret: FAUNA_ADMIN_KEY
        })
      }
      : {
        client: new faunadb.Client({
          secret: FAUNA_ADMIN_KEY,
          domain: 'localhost',
          port: 8443,
          scheme: 'http'
        })
      }

  export function GetIfExists(expr: Expr) {
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
  export async function faunaQuery(expr: Expr): Promise<any> {
    try {
      return await fauna.client.query(expr)
    } catch (err: any) {
      throw new FaunaError(err)
    }
  }

  /**
   * Run a faunadb query, retrieving a single document as a result.
   */
  export async function querySingle<T>(expr: Expr) {
    const res = await faunaQuery(expr)
    if (res === null)
      return res

    return flattenFauna(res as FaunaDocument<T>)
  }

  /**
   * Run a faunadb query, retrieving a list of documents as a result.
   */
  export async function query<T extends any[]>(expr: Expr) {
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

    /**
     * Create a new user. Will fail if email is taken, due to faunadb unique constraint.
     */
    export async function create(props: Omit<User, 'id'> & { password: string }): Promise<User> {
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
    export async function completeLevel(userId: string, patternId: string, completedLevel: number): Promise<ProgressItem | null> {
      const progress = await db.progress.get(userId, patternId)

      if (!progress) {
        // Initial review
        return await db.querySingle<ProgressItem>(
          Create(Collection("progress"), {
            data: {
              userRef: Ref(Collection("users"), userId),
              patternId: patternId,
              initiallyLearnedAt: Now(),
              lastLeveledAt: Now(),
              srsLevel: completedLevel
            }
          })
        )
      }

      const levelableAt = progress.lastLeveledAt + time.toNextSRSLevel(progress.srsLevel)

      let progressChanges: any = {}
      if (completedLevel > progress.srsLevel && time.now() >= levelableAt) {
        progressChanges = {
          lastLeveledAt: Now(),
          srsLevel: completedLevel
        }
      }

      return await db.querySingle<ProgressItem>(
        Update(
          Ref(Collection('progress'), progress.id),
          {
            data: progressChanges
          }
        )
      )
    }
  }
}