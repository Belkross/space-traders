import { SpaceTradersErrorDTO } from "../api/space-traders.schema"
import { Feedback, Severity } from "../model/feedback"

export class FeedbackError extends Error {
  severity: Severity
  message: string
  duration: number

  constructor({ severity, message, duration }: { severity: Severity; message: string; duration?: number }) {
    super(message)
    this.severity = severity
    this.duration = duration ?? Feedback.DEFAULT_DURATION
    this.message = message
    this.name = "FeedbackError"
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

export class UnexpectedError extends FeedbackError {
  constructor(message?: string) {
    super({ severity: "error", message: `Unexpected error: ${message ?? ""}` })
  }
}

export class InvalidPayloadError extends FeedbackError {
  constructor(message: string) {
    super({ message: `Invalid payload: ${message}`, severity: "error" })
    this.name = "InvalidPayloadError"
  }
}
