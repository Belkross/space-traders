import { ShipType } from "./ship.model.js"

export type Shipyard = {
  //ships: Array<ShipyardShip>
  symbol: string
  shipTypes: Array<{ type: ShipType }>
}

type ShipyardShip = {
  type: ShipType
  name: string
  description: string
  supply: string
  activity: string
  purchasePrice: number
}
