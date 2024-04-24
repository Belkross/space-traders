import { Page } from "./app-state.type"

export type Action = LoginAction | ChangePageAction

export enum ActionType {
  changePage = "change_page",
  login = "log_in",
}

export type ChangePageAction = {
  type: ActionType.changePage
  payload: Page
}

export type LoginAction = {
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
