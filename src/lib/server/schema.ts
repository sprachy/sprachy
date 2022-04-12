import faunadb from "faunadb"
const q = faunadb.query

// Note collections and indexes must be created in separate transactions

export const collections = [
  q.CreateCollection({ name: "users" }),
  q.CreateCollection({ name: "progress" })
]


export const indexes = [
  q.CreateIndex({
    name: "users_by_email",
    source: q.Collection("users"),
    terms: [{ field: ["data", "email"] }],
    unique: true,
  }),
  q.CreateIndex({
    name: "users_by_remindable",
    source: {
      collection: q.Collection("users"),
      fields: {
        remindable: q.Query(
          q.Lambda(
            'doc',
            q.And(
              q.LT(
                q.Select(['data', 'lastReminderEmailSentAt'], q.Var('doc'), 0),
                q.Select(['data', 'lastReviewAt'], q.Var('doc'), 0)
              ),
              q.Select(['data', 'wantsReminderEmails'], q.Var('doc'), false)
            ),
          ),
        ),
      }
    },
    terms: [
      { binding: "remindable" }
    ]
  }),
  q.CreateIndex({
    name: "progress_by_user_and_pattern",
    source: q.Collection("progress"),
    terms: [{ field: ["data", "userRef"] }, { field: ["data", "patternId"] }],
    unique: true,
  }),
  q.CreateIndex({
    name: "progress_by_user",
    source: q.Collection("progress"),
    terms: [{ field: ["data", "userRef"] }]
  })
]