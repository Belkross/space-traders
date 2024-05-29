import { initialAppState } from "#constant"
import { StateAction } from "#type"
import { appStateReducer } from "#store"

test("changing page", () => {
  const action: StateAction = {
    type: "change_page",
    payload: "game",
  }

  const updatedAppState = appStateReducer(initialAppState, action)

  expect(updatedAppState.page).toBe("game")
})

describe("logging in", () => {
  test("it should drives to game page", () => {
    const action: StateAction = {
      type: "log_in",
      payload: { accountId: "", credits: 0, faction: "", headquarters: "", shipCount: 0, username: "" },
    }

    const updatedAppState = appStateReducer(initialAppState, action)

    expect(updatedAppState.page).toBe("game")
  })
})
