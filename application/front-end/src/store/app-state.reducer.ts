import { StateAction, AppState } from "#type"

export function appStateReducer(state: AppState, action: StateAction): AppState {
  switch (action.type) {
    case "change_page": {
      return { ...state, page: action.payload }
    }

    case "log_in": {
      return { ...state, ...action.payload, page: "game" }
    }

    case "update_contract_list": {
      return { ...state, contracts: action.payload }
    }

    case "accept_contract": {
      const { contract: contractToUpdate, credits } = action.payload

      const contracts = state.contracts.map((item) => {
        if (item.id !== contractToUpdate.id) return item

        return contractToUpdate
      })

      return { ...state, contracts, credits }
    }

    default:
      return state
  }
}
