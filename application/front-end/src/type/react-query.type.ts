import { StringEnum } from "#type"

type ReactQueryKey =
  | "retrieve_my_agent"
  | "retrieve_server_state"
  | "create_agent"
  | "retrieve_my_contracts"
  | "accept_contract"
  | "retrieve_my_ships"
  | "retrieve_shipyards_in_system"

export const RQueryEnum: StringEnum<ReactQueryKey> = {
  retrieve_my_agent: "retrieve_my_agent",
  retrieve_server_state: "retrieve_server_state",
  create_agent: "create_agent",
  retrieve_my_contracts: "retrieve_my_contracts",
  accept_contract: "accept_contract",
  retrieve_my_ships: "retrieve_my_ships",
  retrieve_shipyards_in_system: "retrieve_shipyards_in_system",
}
