import { css } from "#styled-system/css"
import { ChangeEvent, useState } from "react"
import { useMutation } from "react-query"
import { userService } from "#service"
import { ActionType, QueryKey } from "#type"
import { Feedback, feedback, CustomError, NoSavedTokenError, agentUC } from "@library/domain"
import { displayFeedback } from "#helper"
import { useAppState } from "#context"

export function SignInForm() {
  const [input, setInput] = useState("")
  const { dispatch } = useAppState()

  const loginMutation = useMutation(QueryKey.retrieveMyAgent, {
    mutationFn: (token: string) => agentUC.login(token),

    onSuccess: (data) => {
      const { username, accountId, credits, headquarters, shipCount, startingFaction } = data

      dispatch({
        type: ActionType.login,
        payload: { username, accountId, credits, headquarters, shipCount, faction: startingFaction },
      })
    },

    onError: (error) => {
      if (error instanceof CustomError) {
        displayFeedback(new Feedback({ message: error.message, severity: error.severity }))
      } else {
        displayFeedback(feedback.unexpected)
      }
    },
  })

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value)
  }

  const handleUseSavedToken = async () => {
    try {
      setInput(await userService.retrieveToken())
    } catch (error) {
      if (error instanceof NoSavedTokenError) displayFeedback(feedback.no_saved_token)
      else displayFeedback(feedback.unexpected)
    }
  }

  return (
    <div className={cssContainer}>
      <h2>Log in</h2>
      <p>Provide the token associated to your account to log in.</p>
      <input type="text" aria-label="login input" placeholder="Token" value={input} onChange={handleInputChange} />
      <button onClick={() => loginMutation.mutate(input)}>Log in</button>
      <button onClick={handleUseSavedToken}>Use saved token</button>
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
