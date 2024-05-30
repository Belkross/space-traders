import { useAppState } from "#context"
import { css } from "#styled-system/css"
import { ContractList, ShipList, ShipyardVisitor, WaypointList } from "#component"

export function GamePage() {
  const { state } = useAppState()

  return (
    <div className={cssContainer}>
      <h1>Game Page</h1>
      <p>{`username: ${state.username} - faction: ${state.faction}`}</p>
      <p>{`Credits: ${state.credits}`}</p>
      <p>{`Ship count: ${state.shipCount}`}</p>
      <p>{`Headquarters: ${state.headquarters}`}</p>

      <ShipyardVisitor />
      <WaypointList waypoints={state.shipsyards} />
      <ContractList contracts={state.contracts} />
      <ShipList ships={state.ships} />
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
