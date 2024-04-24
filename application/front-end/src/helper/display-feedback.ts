import { toast } from "react-toastify"
import {} from "@library/domain"
import { Feedback } from "@library/domain"

export function displayFeedback(feedback: Feedback) {
  const { severity, duration, message } = feedback

  toast(message, {
    type: severity,
    autoClose: duration,
  })
}
