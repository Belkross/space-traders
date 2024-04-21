export type Severity = "info" | "success" | "warning" | "error"

export type Feedback = { message: string; severity: Severity; duration: number }

type Feedbacks = Record<FeedbackKey, Feedback>
type FeedbackKey = "invalid_username" | "realtime_disconnected"

const DEFAULT_DURATION = 2000

export const feedback: Feedbacks = {
  invalid_username: {
    severity: "warning",
    message: "Le pseudo n’est pas valide.",
    duration: DEFAULT_DURATION,
  },
  realtime_disconnected: {
    severity: "warning",
    message: "Vous êtes déconnecté du salon.",
    duration: DEFAULT_DURATION,
  },
}
