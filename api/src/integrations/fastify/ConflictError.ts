import { HttpClientError } from './HttpClientError'

export class ConflictError extends HttpClientError {
  constructor(message: string, cause?: Error) {
    super({
      statusCode: 409,
      message: `Conflict: ${message}`,
      cause,
    })
  }
}
