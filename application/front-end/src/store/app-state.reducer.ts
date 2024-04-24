import { Action, ActionType } from "../type/action.type"
import { AppState } from "../type/app-state.type"

export function appStateReducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case ActionType.login: {
      return { ...state, ...action.payload }
    }

    default:
      return state
  }
}
