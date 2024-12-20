import { HttpClientError } from './HttpClientError'

export class NotFoundError extends HttpClientError {
  constructor(message: string, cause?: Error) {
    super({
      statusCode: 404,
      message: `Not Found: ${message}`,
      cause,
    })
  }
}
