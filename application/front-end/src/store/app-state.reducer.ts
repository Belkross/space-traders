import { StateAction } from "../type/action.type"
import { AppState } from "../type/app-state.type"

export function appStateReducer(state: AppState, action: StateAction): AppState {
  switch (action.type) {
    case "change_page": {
      return { ...state, page: action.payload }
    }

    case "log_in": {
      return { ...state, ...action.payload, page: "game" }
    }

    case "update_contracts": {
      return { ...state, contracts: action.payload }
    }

    default:
      return state
  }
}
