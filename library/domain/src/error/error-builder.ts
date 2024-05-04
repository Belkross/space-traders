import { Severity, Feedback } from "../model/feedback.js"

export class CustomError extends Error {
  severity: Severity
  message: string
  duration: number

  constructor({ severity, message, duration }: { severity?: Severity; message: string; duration?: number }) {
    super(message)
    this.severity = severity ?? "info"
    this.duration = duration ?? Feedback.DEFAULT_DURATION
    this.message = message
    this.name = "CustomError"
  }
}
