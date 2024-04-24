export type Severity = "info" | "success" | "warning" | "error"

export class Feedback {
  readonly message: string
  readonly severity: Severity
  readonly duration: number
  static readonly DEFAULT_DURATION = 6000

  constructor({ message, severity, duration }: { message: string; severity?: Severity; duration?: number }) {
    this.message = message
    this.severity = severity ?? "info"
    this.duration = duration ?? Feedback.DEFAULT_DURATION
  }
}

type Feedbacks = Record<FeedbackKey, Feedback>
type FeedbackKey = "no_token_provided" | "invalid_token" | "unexpected_feedback"

export const feedback: Feedbacks = {
  no_token_provided: new Feedback({
    severity: "info",
    message: "Please provide a token to log in.",
  }),
  invalid_token: new Feedback({
    severity: "warning",
    message: "The provided token is invalid.",
  }),
  unexpected_feedback: new Feedback({
    severity: "error",
    message: "Something unexpected happened !",
  }),
}
