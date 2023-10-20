import * as z from 'zod'

export const dialogueLineReadingSchema = z.object({
  type: z.literal("reading").default("reading"),
  from: z.string(),
  message: z.string().optional(),
  translation: z.string().optional(),
  image: z.string().optional(),
  imageAlt: z.string().optional()
})

export type DialogueLineReading = z.infer<typeof dialogueLineReadingSchema>

export const dialogueLineChoiceSchema = z.object({
  type: z.literal("choice").default("choice"),
  question: z.string(),
  choices: z.array(z.object({
    text: z.string(),
    correct: z.boolean().optional().default(false),
  }))
})

export type DialogueLineChoice = z.infer<typeof dialogueLineChoiceSchema>

export const dialogueLineSchema = z.union([
  dialogueLineReadingSchema,
  dialogueLineChoiceSchema
])

export type DialogueLine = z.infer<typeof dialogueLineSchema>

export const dialogueSchema = z.object({
  title: z.string(),
  lines: z.array(dialogueLineSchema)
})

export type Dialogue = z.infer<typeof dialogueSchema>