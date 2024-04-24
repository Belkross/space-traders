import { ReactElement, useReducer } from "react"
import { appStateReducer } from "#store/app-state.reducer"
import { AppState } from "#type"
import { AppStateContext } from "#context"

const initialAppState: AppState = {
  page: "home",
  accountId: "",
  username: "",
  faction: "",
  headquarters: "",
  credits: NaN,
  shipCount: NaN,
}

export function AppStateProvider({ children }: { children: ReactElement }) {
  const [appState, dispatch] = useReducer(appStateReducer, initialAppState)

  return <AppStateContext.Provider value={{ state: appState, dispatch }}>{children}</AppStateContext.Provider>
}
