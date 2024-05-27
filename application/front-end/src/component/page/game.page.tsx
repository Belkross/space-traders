import { useAppState } from "#context"
import { css } from "#styled-system/css"
import { useMutation } from "react-query"
import { queryKey } from "../../type/query.type"
import { CustomError, Feedback, spaceTradersUC } from "@library/domain"
import { ActionType } from "../../type/action.type"
import { displayFeedback } from "../../helper/display-feedback"

export function GamePage() {
  const { state, dispatch } = useAppState()

  const contracts = state.contracts.map((contract) => {
    return (
      <article key={contract.id}>
        <p>{`id: ${contract.id}`}</p>
        <p>{`type: ${contract.type}`}</p>
        <p>{`accepted: ${contract.accepted}`}</p>
        <p>{`fulfilled: ${contract.fulfilled}`}</p>
        <p>{`expiration: ${contract.expiration}`}</p>
        <p>{`deadlineToAccept: ${contract.deadlineToAccept}`}</p>
        <p>{`on accepted money: ${contract.terms.payment.onAccepted}`}</p>
        <p>{`on fulfilled money: ${contract.terms.payment.onFulfilled}`}</p>
        <p>{`deadline: ${contract.terms.deadline}`}</p>
        <p>{`deliver: ${JSON.stringify(contract.terms.deliver, null, 1)}`}</p>
      </article>
    )
  })

  const contractsMutation = useMutation(queryKey.retrieveMyContracts, {
    mutationFn: () => spaceTradersUC.retrieveMyContracts(),

    onSuccess: (data) => {
      dispatch({
        type: ActionType.updateContracts,
        payload: data,
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

      {contracts}
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
