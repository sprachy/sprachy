import faunadb, { Collection, Create, Documents, Expr, Get, Index, Login, Match, Ref, Update, Map, Lambda, Paginate, Var, Delete, If, Let, Exists, Now, Difference, Select, Filter, Not, Time } from 'faunadb'
import type { Pattern, Progress, ProgressWithNextReview, Review, User } from '../common/api'
import _ from 'lodash'
import { IS_PRODUCTION } from './settings'
import { FAUNA_ADMIN_KEY } from './secrets'
import { FaunaDocument, flattenFauna, customFetch } from './faunaUtil'
import * as time from '../common/time'

export namespace db {
  // This allows the client to be changed e.g. by tests
  export const fauna = {
    client: new faunadb.Client({
      secret: FAUNA_ADMIN_KEY,
      domain: IS_PRODUCTION ? 'db.fauna.com' : 'localhost',
      port: 8443,
      scheme: IS_PRODUCTION ? 'https' : 'http',
      fetch: typeof fetch === 'undefined' ? undefined : customFetch,
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

  export async function querySingle<T>(expr: Expr) {
    const res = await fauna.client.query(expr)

    if (res === null)
      return res

    return flattenFauna(res as FaunaDocument<T>)
  }

  export async function query<T extends any[]>(expr: Expr) {
    const res = await fauna.client.query(expr) as { data: FaunaDocument<T[0]>[] }
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
        Ref(Collection("patterns"), patternId)
      ])
    }

    export async function get(userId: string, patternId: string): Promise<Progress | null> {
      return await db.querySingle<Progress | null>(
        GetIfExists(MatchByUserAndPattern(userId, patternId))
      )
    }

    export async function update(progressId: string, changes: Partial<Omit<Progress, 'id' | 'userId' | 'patternId'>>): Promise<Progress> {
      return await db.querySingle<Progress>(
        Update(
          Ref(Collection('progress'), progressId),
          {
            data: changes
          }
        )
      )
    }

    export async function listAllFor(userId: string) {
      return await db.query<Progress[]>(
        Map(
          Paginate(Match(Index("progress_by_user"), Ref(Collection("users"), userId))),
          Lambda("ref", Get(Var("ref")))
        )
      )
    }

    export async function withNextReviewTime(userId: string): Promise<ProgressWithNextReview[]> {
      const allProgress = await db.progress.listAllFor(userId)

      return allProgress.map(prog => {
        return Object.assign(prog, {
          nextReviewAt: prog.lastReviewedAt + time.toNextSRSLevel(prog.srsLevel)
        })
      })
    }

    /**
     * This method of retrieval won't scale, but suffices for now
     * The whole calculation can potentially be done using Fauna query/index
     */
    export async function getReviewsFor(userId: string) {
      const allProgress = await db.progress.listAllFor(userId)
      const allPatterns = await db.patterns.listAll()
      const patternsById = _.keyBy(allPatterns, p => p.id)

      const reviews: Review[] = []
      for (const progress of allProgress) {
        const nextReviewAt = progress.lastReviewedAt + time.toNextSRSLevel(progress.srsLevel)
        if (time.now() >= nextReviewAt) {
          reviews.push({
            progress: progress,
            pattern: patternsById[progress.patternId]!
          })
        }
      }
      return reviews
    }


    export async function countReviewsFor(userId: string): Promise<number> {
      return (await db.progress.getReviewsFor(userId)).length
    }

    /**
     * Call when a user has completed an SRS review for a given pattern.
     * Only updates srs level if it is the correct time to do so.
     */
    export async function recordReview(userId: string, patternId: string, remembered: boolean): Promise<Progress> {
      const progress = await db.progress.get(userId, patternId)
      if (!progress) {
        // Initial review
        return await db.querySingle<Progress>(
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
      }

      const nextReviewAt = progress.lastReviewedAt + time.toNextSRSLevel(progress.srsLevel)
      if (time.now() < nextReviewAt) {
        // Not time for review yet, ignore this one
        return progress
      } else {
        return await db.querySingle<Progress>(
          Update(
            Ref(Collection('progress'), progress.id),
            {
              data: {
                lastReviewedAt: Now(),
                srsLevel: progress.srsLevel + (remembered ? 1 : -1)
              }
            }
          )
        )
      }
    }
  }

  export namespace patterns {
    export function NotLearnedByUser(userId: string) {
      return Filter(
        Match(Index("all_patterns")),
        Lambda(
          "patternRef",
          Not(Exists(Match(Index("progress_by_user_and_pattern"), [
            Ref(Collection("users"), userId),
            Var("patternRef")
          ])))
        )
      )
    }

    export async function nextPatternFor(userId: string): Promise<Pattern | null> {
      return await db.querySingle<Pattern>(
        Let(
          { patterns: NotLearnedByUser(userId) },
          If(
            Exists(Var("patterns")),
            Get(Var("patterns")),
            null
          )
        )
      )
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
          Paginate(Match(Index("all_patterns"))),
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
      await db.fauna.client.query(
        Delete(
          Ref(Collection('patterns'), patternId)
        )
      )
    }
  }
}

