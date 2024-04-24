import { css } from "#styled-system/css"
import { ChangeEvent, useState } from "react"
import { useMutation } from "react-query"
import { spaceTraderService } from "#service/space-traders.service"
import { ActionType, QueryKey, useAppState } from "../../store"
import { Feedback, feedback, FeedbackError } from "@library/domain"
import { displayFeedback } from "../../helper/display-feedback"

export function ConnectionForm() {
  const [input, setInput] = useState("")
  const { dispatch } = useAppState()

  const loginMutation = useMutation(QueryKey.getMyProfile, {
    mutationFn: (token: string) => spaceTraderService.getMyProfile(token),

    onSuccess: (data) => {
      const { username, accountId, credits, headquarters, shipCount, startingFaction } = data

      dispatch({
        type: ActionType.login,
        payload: { page: "game", username, accountId, credits, headquarters, shipCount, faction: startingFaction },
      })
    },

    onError: (error) => {
      if (error instanceof FeedbackError) {
        displayFeedback(new Feedback({ message: error.message, severity: error.severity }))
      } else {
        displayFeedback(feedback.unexpected_feedback)
      }
    },
  })

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value)
  }

  return (
    <div className={cssContainer}>
      <h2>Log in</h2>
      <p>Provide the token associated to your account to log in.</p>
      <input type="text" aria-label="login input" placeholder="Token" value={input} onChange={handleInputChange} />
      <button onClick={() => loginMutation.mutate(input)}>Log in</button>
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
