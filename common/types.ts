export type PatternDef = {
  id: string
  title: string
  slug: string
  explanation: string
  exercises: {
    content: string
    translation: string
  }[]
}
