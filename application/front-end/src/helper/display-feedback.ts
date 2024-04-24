import { toast } from "react-toastify"
import { Feedback } from "#domain"

export function displayFeedback(feedback: Feedback) {
  const { severity, duration, message } = feedback

  toast(message, {
    type: severity,
    autoClose: duration,
  })
}
