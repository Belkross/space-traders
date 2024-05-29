import { ReactElement, useReducer } from "react"
import { appStateReducer } from "#store"
import { AppStateContext } from "#context"
import { initialAppState } from "#constant"

export function AppStateProvider({ children }: { children: ReactElement }) {
  const [appState, dispatch] = useReducer(appStateReducer, initialAppState)

  return <AppStateContext.Provider value={{ state: appState, dispatch }}>{children}</AppStateContext.Provider>
}
