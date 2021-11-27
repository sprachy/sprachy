import faunadb, { Collection, Create, Documents, Expr, Get, Index, Login, Match, Ref, Update, Map, Lambda, Paginate, Var, Delete, If, Let, Exists, Now, Difference, Select, Filter, Not, Time } from 'faunadb'
import type { Pattern, ProgressItem, Review, User } from '../common/api'
import _ from 'lodash'
import { IS_PRODUCTION } from './settings'
import { FAUNA_ADMIN_KEY } from './secrets'
import { FaunaDocument, flattenFauna } from './faunaUtil'
import * as time from '../common/time'
import allPatterns from '../patterns'

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
     * This method of retrieval won't scale, but suffices for now
     * The whole calculation can potentially be done using Fauna query/index
     */
    export async function getReviewsFor(userId: string) {
      const allProgress = await db.progress.listAllFor(userId)
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
    export async function recordReview(userId: string, patternId: string, remembered: boolean): Promise<ProgressItem | null> {
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
              lastReviewedAt: Now(),
              srsLevel: 1
            }
          })
        )
      }

      const levelableAt = progress.lastLeveledAt + time.toNextSRSLevel(progress.srsLevel)

      let progressChanges: any = { lastReviewedAt: Now() }
      if (remembered && time.now() >= levelableAt) {
        progressChanges = {
          lastReviewedAt: Now(),
          lastLeveledAt: Now(),
          srsLevel: progress.srsLevel + 1
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