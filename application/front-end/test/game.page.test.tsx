import { GamePage } from "#component/page/game.page"
import { render, screen } from "./test-util"

test("a button to show my contracts should be visible", () => {
  render(<GamePage />)

  const contractsButton = screen.getByRole("button", { name: "Contracts" })

  expect(contractsButton).toBeVisible
})