import { useAppState } from "#context"
import { displayFeedback } from "#helper"
import { RQueryEnum } from "#type"
import { spaceTradersUC } from "#use-case"
import { CustomError, Feedback, Waypoint } from "@library/domain"
import { useMutation } from "react-query"

type Props = {
  waypoints: Array<Waypoint>
}

export function WaypointList({ waypoints }: Props) {
  const { dispatch, state } = useAppState()

  const retrieveWaypointMutation = useMutation(RQueryEnum.retrieve_shipyards_in_system, {
    mutationFn: (system: string) => spaceTradersUC.retrieveShipyardsInSystem(system),

    onSuccess: (payload) => {
      dispatch({
        type: "update_shipyard_list",
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
      <button onClick={() => retrieveWaypointMutation.mutate(state.headquarters.slice(0, 7))}>
        Shipyards in system
      </button>
      {waypoints.map((waypoint) => {
        return (
          <article key={waypoint.symbol}>
            <p>{`symbol: ${waypoint.symbol}`}</p>
            <p>{`type: ${waypoint.type}`}</p>
            <p>{`system: ${waypoint.systemSymbol}`}</p>
            <p>{`location: x(${waypoint.x}) y(${waypoint.y})`}</p>
          </article>
        )
      })}
    </>
  )
}
