import { fail } from 'assert'
import { AsyncLocalStorage } from 'async_hooks'
import { FastifyBaseLogger, FastifyReply, FastifyRequest } from 'fastify'

const asyncLocalStorage = new AsyncLocalStorage<FastifyBaseLogger>()

export const logger = () =>
  asyncLocalStorage.getStore() ?? fail('No logger found in async context')

export const loggerPreHandler = (
  request: FastifyRequest,
  reply: FastifyReply,
  done: () => void,
) => asyncLocalStorage.run(request.log, done)
