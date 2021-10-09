export type User = {
  id: string
  email: string
  isAdmin: boolean
}

export type Pattern = {
  id: string
  title: string
  slug: string
  explanation: string
  exercises: {
    content: string
    translation: string
  }[]
}

export type Exercise = Pattern['exercises'][0]