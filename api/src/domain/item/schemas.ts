import { z } from 'zod'

export const ItemSchema = z.object({
  id: z.number(),
  name: z.string(),
})

export type Item = z.infer<typeof ItemSchema>

export const CreateItemSchema = ItemSchema.omit({ id: true })
export type CreateItem = z.infer<typeof CreateItemSchema>
