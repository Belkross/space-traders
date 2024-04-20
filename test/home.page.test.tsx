import { HomePage } from "#component/page/home.page"
import { APP_NAME } from "#domain"
import { render, screen } from "./test-util"

test("initial test", () => {
  render(<HomePage />)

  const appTitle = screen.getByRole("heading", { name: APP_NAME })
  //const description = screen.getByTestId("description")

  expect(appTitle).toBeVisible()
  //expect(description).toBeVisible()
})
