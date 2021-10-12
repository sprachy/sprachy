import { Collection, Create, Documents, Expr, Get, Index, Login, Match, Ref, Update, Map, Lambda, Paginate, Var, Delete, If, Let, Exists, Now } from 'faunadb'
import type { Pattern, Progress, User } from '../common/api'
import _ from 'lodash'
import { FAUNA_ADMIN_KEY } from './secrets'
import { FaunaDocument, flattenFauna, makeFaunaClient } from './faunaUtil'

export namespace db {
  export const fauna = makeFaunaClient({
    secret: FAUNA_ADMIN_KEY,
    domain: 'localhost',
    port: 8443,
    scheme: 'http'
  })

  export async function querySingle<T>(expr: Expr) {
    return flattenFauna(
      await fauna.query(expr) as FaunaDocument<T>
    )
  }

  export async function query<T extends any[]>(expr: Expr) {
    const res = await fauna.query(expr) as { data: FaunaDocument<T[0]>[] }
    return res.data.map(flattenFauna)
  }

  export namespace users {
    export async function get(userId: string): Promise<User> {
      return await db.querySingle<User>(
        Get(Ref(Collection("users"), userId))
      )
    }

    export async function getByEmail(email: string): Promise<User> {
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
    export async function create(data: Omit<User, 'id'> & { password: string }): Promise<User> {
      return await db.querySingle<User>(
        Create(
          Collection("users"),
          {
            credentials: {
              password: data.password
            },
            data: _.omit(data, 'password')
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

  export namespace patterns {
    export async function RefPattern(patternId: string) {
      return Ref(Collection("patterns"), patternId)
    }

    export async function get(patternId: string): Promise<Pattern> {
      return await db.querySingle<Pattern>(
        Get(Ref(Collection("patterns"), patternId))
      )
    }

    export async function listAll(): Promise<Pattern[]> {
      // TODO handle pagination
      return await db.query<Pattern[]>(
        Map(
          Paginate(Documents(Collection("patterns"))),
          Lambda("ref", Get(Var("ref")))
        )
      )
    }

    export async function create(data: Omit<Pattern, 'id'>): Promise<Pattern> {
      return await db.querySingle<Pattern>(
        Create(
          Collection('patterns'),
          { data: data }
        )
      )
    }

    export async function update(patternId: string, changes: Partial<Omit<Pattern, 'id'>>): Promise<Pattern> {
      return await db.querySingle<Pattern>(
        Update(
          Ref(Collection('patterns'), patternId),
          { data: changes }
        )
      )
    }

    export async function destroy(patternId: string) {
      await db.fauna.query(
        Delete(
          Ref(Collection('patterns'), patternId)
        )
      )
    }
  }

  export namespace progress {
    function MatchByUserAndPattern(userId: string, patternId: string) {
      return Match(Index("progress_by_user_and_pattern"), [
        Ref(Collection("users"), userId),
        Ref(Collection("patterns"), patternId)
      ])
    }

    export async function get(userId: string, patternId: string): Promise<Progress | null> {
      try {
        return await db.querySingle<Progress>(Get(MatchByUserAndPattern(userId, patternId)))
      } catch (err) {
        if ((err as any).code === "document not found") {
          return null
        } else {
          throw err
        }
      }
    }

    /**
     * Mark a pattern as "learned", meaning a user has done the initial exercises for it.
     * Idempotent; no effect if already learned.
     */
    export async function learnPattern(userId: string, patternId: string): Promise<Progress> {
      const query = Let(
        { progress: MatchByUserAndPattern(userId, patternId) },
        If(
          Exists(Var("progress")),
          Get(Var("progress")),
          Create(Collection("progress"), {
            data: {
              userRef: Ref(Collection("users"), userId),
              patternRef: Ref(Collection("patterns"), patternId),
              initiallyLearnedAt: Now(),
              lastReviewedAt: Now(),
              srsLevel: 1
            }
          })
        )
      )

      return await db.querySingle<Progress>(query)
    }
  }
}
