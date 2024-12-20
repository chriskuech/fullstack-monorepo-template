import { schemas } from '@/domain/schemas'
import { loggerPreHandler } from '@/integrations/fastify/logger'
import { NotFoundError } from '@/integrations/fastify/NotFoundError'
import fastifyCors from '@fastify/cors'
import fastifySwagger from '@fastify/swagger'
import fastify from 'fastify'
import {
  createJsonSchemaTransformObject,
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'
import { mountApi } from './api'

export const createRouter = async () => {
  const app = fastify({
    logger: {
      transport: {
        target: 'pino-pretty',
        options: {
          translateTime: 'HH:MM:ss Z',
          ignore: 'pid,hostname',
        },
      },
    },
  })
    .setValidatorCompiler(validatorCompiler)
    .setSerializerCompiler(serializerCompiler)
    .register(fastifyCors, { origin: '*' })
    .register(fastifySwagger, {
      openapi: {
        info: {
          title: 'Full-Stack Monorepo Template API',
          version: '0.0.0',
        },
      },
      transform: jsonSchemaTransform,
      transformObject: createJsonSchemaTransformObject({ schemas }),
    })
    .addHook('onRequest', loggerPreHandler)
    .get('/', async () => 'OK') // required by App Service
    .register(mountApi, { prefix: '/api' })
    .setNotFoundHandler(async () => {
      throw new NotFoundError('No matching routes')
    })

  return app
}
