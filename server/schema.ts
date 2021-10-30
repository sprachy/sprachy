import { CreateCollection, CreateIndex, Collection, Get } from "faunadb"

// Note collections and indexes must be created in separate transactions

export const collections = [
  CreateCollection({ name: "patterns" }),
  CreateCollection({ name: "users" }),
  CreateCollection({ name: "progress" })
]

export const indexes = [
  CreateIndex({
    name: "users_by_email",
    source: Collection("users"),
    terms: [{ field: ["data", "email"] }],
    unique: true,
  }),
  CreateIndex({
    name: "all_patterns",
    source: Collection("patterns")
  }),
  CreateIndex({
    name: "progress_by_user_and_pattern",
    source: Collection("progress"),
    terms: [{ field: ["data", "userRef"] }, { field: ["data", "patternRef"] }],
    unique: true,
  }),
  CreateIndex({
    name: "progress_by_user",
    source: Collection("progress"),
    terms: [{ field: ["data", "userRef"] }]
  })
]