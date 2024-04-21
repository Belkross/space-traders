import { HomePage } from "#component/page/home.page"
import { useAppState } from "../store"
import { GamePage } from "#component/page/game.page"

export function App() {
  const { page } = useAppState().state

  switch (page) {
    case "home":
      return <HomePage />

    case "game":
      return <GamePage />

    default:
      return <h1>Page Error</h1>
  }
}
