import { Contract } from "@library/domain"
import { Page } from "#type"

export type StateAction = UpdateContractsAction | UpdateContractAction | ChangePageAction | LoginAction

export type UpdateContractsAction = {
  type: "update_contracts"
  payload: Array<Contract>
}

export type UpdateContractAction = {
  type: "update_contract"
  payload: Contract
}

export type ChangePageAction = {
  type: "change_page"
  payload: Page
}

export type LoginAction = {
  type: "log_in"
  payload: {
    accountId: string
    username: string
    faction: string
    headquarters: string
    credits: number
    shipCount: number
  }
}
