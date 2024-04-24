import { HomePage } from "#component/page/home.page"
import { APP_NAME } from "#constant"
import { render, screen } from "./test-util"

test("initial test", () => {
  render(<HomePage />)

  const appName = screen.getByRole("heading", { name: APP_NAME })
  const inputLogin = screen.getByRole("textbox", { name: "login input" })
  const buttonSubmitLogin = screen.getByRole("button", { name: "Log in" })

  expect(appName).toBeVisible()
  expect(inputLogin).toBeVisible()
  expect(buttonSubmitLogin).toBeVisible()
})
