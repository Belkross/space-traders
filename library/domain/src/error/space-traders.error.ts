import { SpaceTradersErrorDTO } from "#schema"
import { CustomError } from "#error"

export class SpaceTradersApiError extends CustomError {
  constructor(errorDTO: SpaceTradersErrorDTO) {
    super({
      severity: "info",
      message: errorDTO.error.message,
      code: String(errorDTO.error.code),
    })
    this.name = SpaceTradersApiError.name
  }
}

export class InvalidUsernameError extends CustomError {
  constructor(input?: { detail?: string }) {
    super({ message: "Invalid username.", severity: "info", detail: input?.detail })
    this.name = InvalidUsernameError.name
  }
}

export class UsernameAlreadyTakenError extends CustomError {
  constructor() {
    super({ message: "Username already taken.", severity: "info" })
    this.name = UsernameAlreadyTakenError.name
  }
}

export class NoTokenProvidedError extends CustomError {
  constructor() {
    super({ message: "No token provided.", severity: "info" })
    this.name = NoTokenProvidedError.name
  }
}

export class UnrecognizedTokenError extends CustomError {
  constructor() {
    super({ message: "Unrecognized token.", severity: "warning" })
    this.name = UnrecognizedTokenError.name
  }
}
