import { HomePage } from "#component/page/home.page"
import { useAppState } from "../store"
import { GamePage } from "#component/page/game.page"
import { SnackbarModal } from "./organism/snackbar.modal"

export function App() {
  const { page } = useAppState().state

  let currentPage
  switch (page) {
    case "home":
      currentPage = <HomePage />
      break

    case "game":
      currentPage = <GamePage />
      break

    default:
      currentPage = <h1>Page Error</h1>
  }

  return (
    <>
      {currentPage}

      <SnackbarModal />
    </>
  )
}
