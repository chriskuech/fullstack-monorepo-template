// We just need .statusCode for now, but in the future we should implement `FastifyError` interface instead
// https://fastify.dev/docs/latest/Reference/Validation-and-Serialization/#statuscode-property
type FastifyHttpError = { statusCode: number } // & FastifyError

type HttpErrorParams = {
  statusCode: number
  message: string
  cause?: Error
}

export class HttpClientError extends Error implements FastifyHttpError {
  readonly statusCode: number
  readonly message: string
  readonly cause?: Error

  constructor({ statusCode, message, cause }: HttpErrorParams) {
    super(message, { cause })
    this.statusCode = statusCode
    this.message = message
  }
}
