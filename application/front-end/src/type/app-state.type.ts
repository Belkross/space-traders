import { Contract } from "@library/domain"

export type AppState = {
  page: Page
  accountId: string
  username: string
  faction: string
  headquarters: string
  credits: number
  shipCount: number
  contracts: Array<Contract>
}

export type Page = "home" | "game"
