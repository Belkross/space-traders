import { SpaceTradersErrorDTO } from "../repository/space-traders.schema.js"
import { CustomError } from "./index.js"

export class SpaceTradersApiError extends CustomError {
  constructor(errorDTO: SpaceTradersErrorDTO) {
    super({
      severity: "info",
      message: errorDTO.error.message,
      code: String(errorDTO),
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
