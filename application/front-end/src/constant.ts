import { AppState } from "./type/app-state.type"

export const APP_NAME = "Space Traders"

export const initialAppState: AppState = {
  page: "home",
  accountId: "",
  username: "",
  faction: "",
  headquarters: "",
  credits: NaN,
  shipCount: NaN,
  contracts: [],
} as const
