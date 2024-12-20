import { config } from '@/config'
import { UnauthorizedError } from '@/integrations/fastify/UnauthorizedError'
import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { mountItems } from './items'

export const mountApi = async <App extends FastifyInstance>(app: App) =>
  app
    .addHook('preHandler', (req, reply, next) => {
      const [scheme, token] = req.headers.authorization?.split(' ') ?? []

      if (scheme !== 'Bearer') {
        throw new UnauthorizedError('Unsupported authorization scheme')
      }

      if (!token) {
        throw new UnauthorizedError('Missing authorization token')
      }

      if (token !== config.API_KEY) {
        throw new UnauthorizedError('Invalid authorization token')
      }

      next()
    })
    .withTypeProvider<ZodTypeProvider>()
    .register(mountItems, { prefix: '/items' })
