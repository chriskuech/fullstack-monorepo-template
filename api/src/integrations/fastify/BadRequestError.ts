import { HttpClientError } from './HttpClientError'

export class BadRequestError extends HttpClientError {
  constructor(message: string, cause?: Error) {
    super({
      statusCode: 400,
      message: `Bad Request: ${message}`,
      cause,
    })
  }
}
