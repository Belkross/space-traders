import { SpaceTradersErrorDTO } from "../repository/space-traders.schema.js"
import { CustomError } from "./index.js"

export class SpaceTradersApiError extends CustomError {
  code: number

  constructor(errorDTO: SpaceTradersErrorDTO) {
    super({ severity: "info", message: errorDTO.error.message })
    this.code = errorDTO.error.code
    this.name = SpaceTradersApiError.name
  }
}

export class InvalidUsernameError extends CustomError {
  constructor() {
    super({ message: "Invalid username.", severity: "info" })
    this.name = InvalidUsernameError.name
  }
}

export class UsernameAlreadyTakenError extends CustomError {
  constructor() {
    super({ message: "Username already taken.", severity: "info" })
    this.name = UsernameAlreadyTakenError.name
  }
}
