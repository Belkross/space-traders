import { css } from "#styled-system/css"
import { useState, ChangeEvent } from "react"
import { useMutation } from "react-query"
import { QueryKey } from "../../type/query.type"
import { spaceTraderService } from "#service/space-traders.service"
import { FeedbackError, Feedback, feedback } from "@library/domain"
import { displayFeedback } from "../../helper/display-feedback"

export function NewAgentForm() {
  const [input, setInput] = useState("")

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value)
  }

  const handleCreateAgent = useMutation(QueryKey.createAgent, {
    mutationFn: (username: string) => spaceTraderService.createAgent(username),

    onSuccess: (data) => {
      displayFeedback(new Feedback({ message: `Agent ${data.data.agent.symbol} created.`, severity: "success" }))

      localStorage.setItem("token", data.data.token)
    },

    onError: (error) => {
      if (error instanceof FeedbackError) {
        displayFeedback(new Feedback({ message: error.message, severity: error.severity }))
      } else {
        displayFeedback(feedback.unexpected_feedback)
      }
    },
  })

  return (
    <div className={cssContainer}>
      <h2>Register a new agent</h2>
      <p>Provide the token associated to your account to log in.</p>
      <input
        type="text"
        aria-label="new agent input"
        placeholder="Username"
        value={input}
        onChange={handleInputChange}
      />
      <button onClick={() => handleCreateAgent.mutate(input)}>Create agent</button>
    </div>
  )
}

const cssContainer = css({
  display: "flex",
  flexDirection: "column",
  flexWrap: "nowrap",
  gap: "*base",
  justifyContent: "center",
  alignItems: "center",
  borderWidth: "*base",
  padding: "*base",
  maxWidth: "400px",
})
