import { useAppState } from "#context"
import { css } from "#styled-system/css"
import { useMutation } from "react-query"
import { queryKey } from "#type"
import { CustomError, Feedback } from "@library/domain"
import { displayFeedback } from "#helper"
import { spaceTradersUC } from "#use-case"
import { ContractList } from "../organism/contract-list"

export function GamePage() {
  const { state, dispatch } = useAppState()

  const contractsMutation = useMutation(queryKey.retrieveMyContracts, {
    mutationFn: () => spaceTradersUC.retrieveMyContracts(),

    onSuccess: (payload) => {
      dispatch({
        type: "update_contract_list",
        payload,
      })
    },

    onError: (error) => {
      const { message, severity, duration } = error as CustomError
      displayFeedback(new Feedback({ message, severity, duration }))
    },
  })

  return (
    <div className={cssContainer}>
      <h1>Game Page</h1>
      <p>{`username: ${state.username} - faction: ${state.faction}`}</p>
      <p>{`Credits: ${state.credits}`}</p>
      <p>{`Ship count: ${state.shipCount}`}</p>
      <p>{`Headquarters: ${state.headquarters}`}</p>

      <button onClick={() => contractsMutation.mutate()}>Contracts</button>

      <ContractList contracts={state.contracts} />
    </div>
  )
}

const cssContainer = css({
  display: "flex",
  flexDirection: "column",
  gap: "*base+2",
  padding: "*base",
  alignItems: "center",
})
