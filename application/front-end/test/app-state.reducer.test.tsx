import { initialAppState } from "#constant"
import { appStateReducer } from "#store/app-state.reducer"
import { StateAction } from "../src/type/action.type"

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
