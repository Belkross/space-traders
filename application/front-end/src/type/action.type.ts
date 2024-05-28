import { Agent, Contract } from "@library/domain"
import { Page } from "#type"

export type StateAction = UpdateContractListAction | UpdateContractAction | ChangePageAction | LoginAction

type ActionKey = "update_contract_list" | "update_contract" | "log_in" | "change_page"

type Action<Key extends ActionKey, PayloadType> = {
  type: Key
  payload: PayloadType
}

type UpdateContractListAction = Action<"update_contract_list", Array<Contract>>
type UpdateContractAction = Action<"update_contract", Contract>
type ChangePageAction = Action<"change_page", Page>
type LoginAction = Action<"log_in", Agent>
