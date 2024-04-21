import { Dispatch, ReactElement, createContext, useContext, useReducer } from "react"
import { Severity } from "#domain"

type Page = "home" | "game"

type AppState = {
  page: Page
  snackbarOpened: boolean
  snackbarSeverity: Severity
  snackbarMessage: string
  accountId: string
  username: string
  faction: string
  headquarters: string
  credits: number
  shipCount: number
}

const initialAppState: AppState = {
  page: "home",
  snackbarOpened: false,
  snackbarSeverity: "info",
  snackbarMessage: "",
  accountId: "",
  username: "",
  faction: "",
  headquarters: "",
  credits: NaN,
  shipCount: NaN,
}

export enum ActionType {
  changePage = "change_page",
  login = "log_in",
  openSnackbar = "open_snackbar",
  closeSnackbar = "close_snackbar",
}

export enum QueryKey {
  getMyProfile = "get_my_profile",
  getServerStatus = "get_server_status",
}

type OpenSnackbarAction = {
  type: ActionType.openSnackbar
  payload: {
    severity: Severity
    message: string
  }
}

type CloseSnackbarAction = {
  type: ActionType.closeSnackbar
}

type LoginAction = {
  type: ActionType.login
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

type Action = LoginAction | OpenSnackbarAction | CloseSnackbarAction

export function appReducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case ActionType.openSnackbar: {
      const { severity, message } = action.payload
      return { ...state, snackbarOpened: true, snackbarSeverity: severity, snackbarMessage: message }
    }

    case ActionType.closeSnackbar: {
      return { ...state, snackbarOpened: false }
    }

    case ActionType.login: {
      return { ...state, ...action.payload }
    }

    default:
      return state
  }
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
