import { spaceTradersUC } from "#use-case"
import { CustomError, Feedback, Ship } from "@library/domain"
import { useMutation } from "react-query"
import { displayFeedback } from "../../helper/display-feedback"
import { RQueryEnum } from "../../type/react-query.type"
import { useAppState } from "#context"

type Props = {
  ships: Array<Ship>
}

export function ShipList({ ships }: Props) {
  const { dispatch } = useAppState()

  const shipsMutation = useMutation(RQueryEnum.retrieve_my_ships, {
    mutationFn: () => spaceTradersUC.retrieveMyShips(),

    onSuccess: (payload) => {
      dispatch({
        type: "update_ship_list",
        payload,
      })
    },

    onError: (error) => {
      const { message, severity, duration } = error as CustomError
      displayFeedback(new Feedback({ message, severity, duration }))
    },
  })

  return (
    <>
      <button onClick={() => shipsMutation.mutate()}>Ships</button>
      {ships.map((ship) => {
        return (
          <article key={ship.symbol}>
            <p>{`symbol: ${ship.symbol}`}</p>
            <p>{`owner: ${ship.owner}`}</p>
            <p>{`role: ${ship.role}`}</p>
          </article>
        )
      })}
    </>
  )
}
