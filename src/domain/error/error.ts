export class InvalidPayloadError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "InvalidPayloadError"
  }
}

export class UnexpectedError extends Error {
  constructor(message?: string) {
    super(`Unexpected error. ${message}`)
    this.name = "UnexpectedError"
  }
}
