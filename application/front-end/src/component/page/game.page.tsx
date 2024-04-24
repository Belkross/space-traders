import { useAppState } from "../../store"

export function GamePage() {
  const { state } = useAppState()

  return (
    <>
      <h1>Game Page</h1>
      <p>{`username: ${state.username} - faction: ${state.faction}`}</p>
      <p>{`Credits: ${state.credits}`}</p>
      <p>{`Ship count: ${state.shipCount}`}</p>
      <p>{`Headquarters: ${state.headquarters}`}</p>
    </>
  )
}
