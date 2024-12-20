import { HttpClientError } from './HttpClientError'

export class UnauthorizedError extends HttpClientError {
  constructor(message: string, cause?: Error) {
    super({
      statusCode: 401,
      message: `Unauthorized: ${message}`,
      cause,
    })
  }
}
