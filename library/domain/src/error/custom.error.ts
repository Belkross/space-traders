import { Severity, Feedback } from "#model"

export class CustomError extends Error {
  severity: Severity
  code: string
  message: string
  duration: number
  detail: string

  constructor({
    severity,
    message,
    code,
    duration,
    detail,
  }: {
    severity?: Severity
    message: string
    code?: string
    duration?: number
    detail?: string
  }) {
    super(message)
    this.message = message
    this.code = code ?? ""
    this.severity = severity ?? "info"
    this.duration = duration ?? Feedback.DEFAULT_DURATION
    this.name = "CustomError"
    this.detail = detail ?? ""
  }
}
