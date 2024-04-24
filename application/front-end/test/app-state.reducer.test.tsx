import { initialAppState } from "#constant"
import { appStateReducer } from "#store/app-state.reducer"
import { Action, ActionType } from "../src/type/action.type"

test("changing page", () => {
  const action: Action = {
    type: ActionType.changePage,
    payload: "game",
  }

  const updatedAppState = appStateReducer(initialAppState, action)

  expect(updatedAppState.page).toBe("game")
})

describe("logging in", () => {
  test("it should drive to game page", () => {
    const action: Action = {
      type: ActionType.login,
      payload: { accountId: "", credits: 0, faction: "", headquarters: "", shipCount: 0, username: "" },
    }

    const updatedAppState = appStateReducer(initialAppState, action)

    expect(updatedAppState.page).toBe("game")
  })
})
