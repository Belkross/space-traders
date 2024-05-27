export type Contract = {
  id: string
  factionSymbol: string
  type: string
  terms: Terms
  accepted: boolean
  fulfilled: boolean
  expiration: string
  deadlineToAccept: string
}

type Payment = {
  onAccepted: number
  onFulfilled: number
}

type Deliver = {
  tradeSymbol: string
  destinationSymbol: string
  unitsRequired: number
  unitsFulfilled: number
}

type Terms = {
  deadline: string
  payment: Payment
  deliver: Deliver[]
}
