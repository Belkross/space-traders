import { useAppState } from "#context"
import { displayFeedback } from "#helper"
import { RQueryEnum } from "#type"
import { spaceTradersUC } from "#use-case"
import { Contract, CustomError, Feedback } from "@library/domain"
import { useMutation } from "react-query"

type Props = {
  contracts: Array<Contract>
}

export function ContractList({ contracts }: Props) {
  const { dispatch } = useAppState()

  const contractsMutation = useMutation(RQueryEnum.retrieve_my_contracts, {
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

  const acceptContractMutation = useMutation(RQueryEnum.accept_contract, {
    mutationFn: (contractId: string) => spaceTradersUC.acceptContract(contractId),

    onSuccess: (payload) => {
      dispatch({
        type: "accept_contract",
        payload,
      })
      displayFeedback(new Feedback({ message: "Contract accepted" }))
    },

    onError: (error) => {
      const { message, severity, duration } = error as CustomError
      displayFeedback(new Feedback({ message, severity, duration }))
    },
  })

  return (
    <>
      <button onClick={() => contractsMutation.mutate()}>Contracts</button>
      {contracts.map((contract) => {
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
            <button disabled={contract.accepted} onClick={() => acceptContractMutation.mutate(contract.id)}>
              Accept
            </button>
          </article>
        )
      })}
    </>
  )
}
