import {
  createItem,
  deleteItem,
  getItem,
  getItems,
  updateItem,
} from '@/domain/item/operations'
import { ItemSchema } from '@/domain/item/schemas'
import { NotFoundError } from '@/integrations/fastify/NotFoundError'
import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

export const mountItems = async <App extends FastifyInstance>(app: App) =>
  app
    .withTypeProvider<ZodTypeProvider>()
    .route({
      method: 'GET',
      url: '/',
      schema: {
        response: {
          200: z.array(ItemSchema),
        },
      },
      handler: async () => await getItems(),
    })
    .route({
      method: 'GET',
      url: '/:id',
      schema: {
        params: z.object({
          id: z.coerce.number().int().positive(),
        }),
        response: {
          200: ItemSchema,
        },
      },
      handler: async ({ params: { id } }) => {
        const item = await getItem(id)

        if (!item) {
          throw new NotFoundError('Item not found')
        }

        return item
      },
    })
    .route({
      method: 'POST',
      url: '/',
      schema: {
        body: z.object({
          name: z.string(),
        }),
        response: {
          200: ItemSchema,
        },
      },
      handler: async ({ body }) => await createItem(body),
    })
    .route({
      method: 'PUT',
      url: '/:id',
      schema: {
        params: z.object({
          id: z.coerce.number().int().positive(),
        }),
        body: z.object({
          name: z.string(),
        }),
        response: {
          200: ItemSchema,
        },
      },
      handler: async ({ params: { id }, body }) => await updateItem(id, body),
    })
    .route({
      method: 'DELETE',
      url: '/:id',
      schema: {
        params: z.object({
          id: z.coerce.number().int().positive(),
        }),
      },
      handler: async ({ params: { id } }) => await deleteItem(id),
    })
