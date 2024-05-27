import { createContext, Dispatch, useContext } from "react"
import { AppState, StateAction } from "#type"

class OutOfProviderContextError extends Error {
  constructor() {
    super("Context used out of provider’s scope")
  }
}

export const AppStateContext = createContext<{ state: AppState; dispatch: Dispatch<StateAction> } | undefined>(
  undefined
)

export const useAppState = () => {
  const context = useContext(AppStateContext)
  if (context === undefined) throw new OutOfProviderContextError()
  return context
}
