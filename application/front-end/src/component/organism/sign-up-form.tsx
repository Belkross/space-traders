import { css } from "#styled-system/css"
import { useState, ChangeEvent } from "react"
import { useMutation } from "react-query"
import { queryKey } from "../../type/query.type"
import { userService } from "#service"
import { CustomError, Feedback, spaceTradersUC, feedback } from "@library/domain"
import { displayFeedback } from "../../helper/display-feedback"

export function SignUpForm() {
  const [input, setInput] = useState("")

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value.toUpperCase())
  }

  const handleCreateAgent = useMutation(queryKey.createAgent, {
    mutationFn: (username: string) => spaceTradersUC.createAgent(username),

    onSuccess: async (data) => {
      await userService.saveToken(data.data.token)
      displayFeedback(new Feedback({ message: `Agent ${data.data.agent.symbol} created.`, severity: "success" }))
    },

    onError: (error) => {
      if (error instanceof CustomError) {
        displayFeedback(new Feedback({ message: error.message, severity: error.severity }))
      } else {
        displayFeedback(feedback.unexpected)
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
