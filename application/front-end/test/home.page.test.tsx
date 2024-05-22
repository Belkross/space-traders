import { HomePage } from "#component/page/home.page"
import { APP_NAME } from "#constant"
import { render, screen } from "./test-util"

beforeEach(() => {
  render(<HomePage />)
})

describe("HomePage", () => {
  test("the page shows the website name", () => {
    const appName = screen.getByRole("heading", { name: APP_NAME })

    expect(appName).toBeVisible()
  })

  test.skip("the page has a login form", () => {
    const title = screen.getByRole("heading", { name: "Log in" })
    const input = screen.getByRole("textbox", { name: "login input" })
    const buttonSubmit = screen.getByRole("button", { name: "Log in" })

    expect(title).toBeVisible()
    expect(input).toBeVisible()
    expect(buttonSubmit).toBeVisible()
  })

  test("the page has a new agent creation form ", () => {
    const title = screen.getByRole("heading", { name: "Register a new agent" })
    const textInput = screen.getByRole("textbox", { name: "new agent input" })
    const buttonSubmit = screen.getByRole("button", { name: "Create agent" })

    expect(title).toBeVisible()
    expect(textInput).toBeVisible()
    expect(buttonSubmit).toBeVisible()
  })
})
