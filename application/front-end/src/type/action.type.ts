import { Agent, Contract, Ship, Waypoint } from "@library/domain"
import { Page } from "#type"

export type StateAction =
  | UpdateContractListAction
  | UpdateContractAction
  | ChangePageAction
  | LoginAction
  | UpdateShipListAction
  | UpdateShipyardListAction

type ActionKey =
  | "update_contract_list"
  | "accept_contract"
  | "log_in"
  | "change_page"
  | "update_ship_list"
  | "update_shipyard_list"

type Action<Key extends ActionKey, PayloadType> = {
  type: Key
  payload: PayloadType
}

type UpdateContractListAction = Action<"update_contract_list", Array<Contract>>
type UpdateContractAction = Action<"accept_contract", { contract: Contract; credits: number }>
type ChangePageAction = Action<"change_page", Page>
type LoginAction = Action<"log_in", Agent>
type UpdateShipListAction = Action<"update_ship_list", Array<Ship>>
type UpdateShipyardListAction = Action<"update_shipyard_list", Array<Waypoint>>
