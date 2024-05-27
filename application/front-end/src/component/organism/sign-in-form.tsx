import { useAppState } from "#context"
import { displayFeedback } from "#helper"
import { userService } from "#service"
import { css } from "#styled-system/css"
import { ActionType, queryKey } from "#type"
import { CustomError, Feedback, spaceTradersUC } from "@library/domain"
import { ChangeEvent, useState } from "react"
import { useMutation } from "react-query"

export function SignInForm() {
  const [input, setInput] = useState("")
  const { dispatch } = useAppState()

  const loginMutation = useMutation(queryKey.retrieveMyAgent, {
    mutationFn: (token: string) => spaceTradersUC.login(token),

    onSuccess: (data) => {
      const { username, accountId, credits, headquarters, shipCount, startingFaction } = data

      dispatch({
        type: ActionType.login,
        payload: { username, accountId, credits, headquarters, shipCount, faction: startingFaction },
      })
    },

    onError: (error) => {
      const { message, severity, duration } = error as CustomError
      displayFeedback(new Feedback({ message, severity, duration }))
    },
  })

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value)
  }

  const handleUseSavedToken = async () => {
    try {
      setInput(await userService.retrieveToken())
    } catch (error) {
      const { message, severity, duration } = error as CustomError
      displayFeedback(new Feedback({ message, severity, duration }))
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
