import { CustomError } from "#error"

export class InvalidPayloadError extends CustomError {
  constructor(detail?: string) {
    super({
      message: `Invalid payload.`,
      severity: "error",
      detail,
    })
    this.name = InvalidPayloadError.name
  }
}

export class UnexpectedError extends CustomError {
  constructor(detail?: string) {
    super({
      severity: "error",
      message: "Unexpected error.",
      detail,
    })
    this.name = UnexpectedError.name
  }
}

export class SingletonNotInitializedError extends CustomError {
  constructor(detail?: string) {
    super({
      severity: "error",
      message: `Singleton not initialized. ${detail}`,
      detail,
    })
    this.name = SingletonNotInitializedError.name
  }
}
