import { CustomError } from "./index.js"

export class InvalidPayloadError extends CustomError {
  constructor(message: string) {
    super({ message: `Invalid payload: ${message}`, severity: "error" })
    this.name = InvalidPayloadError.name
  }
}

export class UnexpectedError extends CustomError {
  constructor(message?: string) {
    super({ severity: "error", message: `Unexpected error: ${message ?? ""}` })
  }
}

export class SingletonNotInitializedError extends CustomError {
  constructor(className: string) {
    super({ severity: "error", message: `${className} singleton not initialized` })
  }
}
