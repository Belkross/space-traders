import { ShipType } from "./ship.model.js"

export type Shipyard = {
  ships: Array<ShipyardShip>
  shipTypes: Array<ShipType>
}

type ShipyardShip = {
  type: ShipType
  name: string
  description: string
  supply: string
  activity: string
  purchasePrice: number
}
