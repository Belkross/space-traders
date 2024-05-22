import { CustomError } from "#error"

export class NoSavedTokenError extends CustomError {
  constructor() {
    super({ message: "cannot found any saved token" })
    this.name = NoSavedTokenError.name
  }
}
