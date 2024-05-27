import { Contract } from "@library/domain"
import { Page } from "./app-state.type"

export type Action = LoginAction | ChangePageAction | UpdateContracts

export enum ActionType {
  changePage = "change_page",
  login = "log_in",
  updateContracts = "update_contracts",
}

export type UpdateContracts = {
  type: ActionType.updateContracts
  payload: Array<Contract>
}

export type ChangePageAction = {
  type: ActionType.changePage
  payload: Page
}

export type LoginAction = {
  type: ActionType.login
  payload: {
    accountId: string
    username: string
    faction: string
    headquarters: string
    credits: number
    shipCount: number
  }
}
