import { SpaceTradersErrorDTO } from "../repository/space-traders.schema.js"
import { Feedback, Severity } from "../model/feedback.js"

export class FeedbackError extends Error {
  severity: Severity
  message: string
  duration: number

  constructor({ severity, message, duration }: { severity?: Severity; message: string; duration?: number }) {
    super(message)
    this.severity = severity ?? "info"
    this.duration = duration ?? Feedback.DEFAULT_DURATION
    this.message = message
    this.name = "FeedbackError"
  }
}
export class UnexpectedError extends FeedbackError {
  constructor(message?: string) {
    super({ severity: "error", message: `Unexpected error: ${message ?? ""}` })
  }
}

export class SpaceTradersApiError extends FeedbackError {
  code: number

  constructor(errorDTO: SpaceTradersErrorDTO) {
    super({ severity: "info", message: errorDTO.error.message })
    this.code = errorDTO.error.code
    this.name = "SpaceTradersApiError"
  }
}

export class InvalidPayloadError extends FeedbackError {
  constructor(message: string) {
    super({ message: `Invalid payload: ${message}`, severity: "error" })
    this.name = "InvalidPayloadError"
  }
}
