import { GamePage, HomePage } from "#component"
import { useAppState } from "#context"
import { Bounce, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

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

      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
    </>
  )
}
