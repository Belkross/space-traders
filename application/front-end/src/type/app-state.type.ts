export type AppState = {
  page: Page
  accountId: string
  username: string
  faction: string
  headquarters: string
  credits: number
  shipCount: number
}

export type Page = "home" | "game"
