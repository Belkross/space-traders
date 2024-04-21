import { Dispatch, ReactElement, createContext, useContext, useReducer } from "react"

type Page = "home" | "game"

type AppState = {
  page: Page
  accountId: string
  username: string
  faction: string
  headquarters: string
  credits: number
  shipCount: number
}

const initialAppState: AppState = {
  page: "home",
  accountId: "",
  username: "",
  faction: "",
  headquarters: "",
  credits: NaN,
  shipCount: NaN,
}

export enum ActionType {
  change_page = "change_page",
}

export enum QueryKey {
  getMyProfile = "get_my_profile",
  getServerStatus = "get_server_status",
}

type ChangePageAction = {
  type: ActionType
  payload: {
    page: Page
    accountId: string
    username: string
    faction: string
    headquarters: string
    credits: number
    shipCount: number
  }
}

type Action = ChangePageAction

export function appReducer(state: AppState, action: Action) {
  if (action.type === ActionType.change_page) {
    return { ...state, ...action.payload }
  }

  return state
}

export const AppStateContext = createContext<{ state: AppState; dispatch: Dispatch<Action> } | undefined>(undefined)

export const useAppState = () => {
  const context = useContext(AppStateContext)
  if (context === undefined) throw new OutOfProviderContextError()
  return context
}

export function AppStateProvider({ children }: { children: ReactElement }) {
  const [appState, dispatch] = useReducer(appReducer, initialAppState)

  return <AppStateContext.Provider value={{ state: appState, dispatch }}>{children}</AppStateContext.Provider>
}

export class OutOfProviderContextError extends Error {
  constructor() {
    super("Context used out of provider’s scope")
  }
}
