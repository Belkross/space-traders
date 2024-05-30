import { SpaceTradersApiError } from "#error"
import {
  GetMyContractsDTO,
  GetMyAgentDTO,
  GetServerStateDTO,
  PostAgentDTO,
  PostContractAcceptationDTO,
  GetMyShipsDTO,
  GetWaypointsInSystemDTO,
} from "#schema"
import { SpaceTraderValidator, spaceTraderValidator } from "#validator"

export interface ISpaceTradersRepository {
  getServerState: () => Promise<GetServerStateDTO>
  getMyAgent: (token: string) => Promise<GetMyAgentDTO>
  postAgent: (username: string) => Promise<PostAgentDTO>
  getMyContracts: () => Promise<GetMyContractsDTO>
  postContractAcceptation: (contractId: string) => Promise<PostContractAcceptationDTO>
  getMyShips: () => Promise<GetMyShipsDTO>
  getWaypointsInSystem: (input: { system: string; traits?: string }) => Promise<GetWaypointsInSystemDTO>
}

export class SpaceTradersRepository implements ISpaceTradersRepository {
  private readonly origin: string
  private readonly validator: SpaceTraderValidator
  private token: string

  public constructor(validator: SpaceTraderValidator) {
    this.origin = "https://api.spacetraders.io/v2"
    this.validator = validator
    this.token = ""
  }

  public setToken = (token: string) => {
    this.token = token
  }

  public getWaypointsInSystem = async (input: { system: string; traits?: string }) => {
    const queryParams = input.traits === undefined ? "" : `?traits=${input.traits}`
    const url = `${this.origin}/systems/${input.system}/waypoints${queryParams}`
    const response = await fetch(url, {
      method: "GET",
      headers: { accept: "application/json" },
    })

    const payload = await response.json()

    if (!response.ok) {
      const validError = this.validator.spaceTraderError(payload)
      throw new SpaceTradersApiError(validError)
    }

    return this.validator.getWaypointsInSystem(payload)
  }

  public getMyShips = async () => {
    const response = await fetch(`${this.origin}/my/ships`, {
      method: "GET",
      headers: { accept: "application/json", authorization: `Bearer ${this.token}` },
    })

    const payload = await response.json()

    if (!response.ok) {
      const validError = this.validator.spaceTraderError(payload)
      throw new SpaceTradersApiError(validError)
    }

    return this.validator.getMyShips(payload)
  }

  public postContractAcceptation = async (contractId: string) => {
    const url = `${this.origin}/my/contracts/${contractId}/accept`
    const response = await fetch(url, {
      method: "POST",
      headers: {
        authorization: `Bearer ${this.token}`,
      },
    })

    const payload = await response.json()

    if (!response.ok) {
      const validError = this.validator.spaceTraderError(payload)
      throw new SpaceTradersApiError(validError)
    }

    return this.validator.postContractAcceptation(payload)
  }

  public getMyContracts = async () => {
    const response = await fetch(this.origin + "/my/contracts", {
      headers: {
        authorization: `Bearer ${this.token}`,
      },
    })

    const payload = await response.json()

    if (!response.ok) {
      const validError = this.validator.spaceTraderError(payload)
      throw new SpaceTradersApiError(validError)
    }

    return this.validator.getMyContracts(payload)
  }

  public getServerState = async () => {
    const response = await fetch(this.origin)
    const payload = await response.json()

    if (!response.ok) {
      const validError = this.validator.spaceTraderError(payload)
      throw new SpaceTradersApiError(validError)
    }

    return this.validator.getServerState(payload)
  }

  /**
   * We use this request to authenticate the user.
   * That’s why the token need to be set if the request succeed
   */
  public getMyAgent = async (token: string): Promise<GetMyAgentDTO> => {
    const response = await fetch(this.origin + "/my/agent", {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
    const payload = await response.json()

    if (!response.ok) {
      const validError = this.validator.spaceTraderError(payload)
      throw new SpaceTradersApiError(validError)
    }

    this.token = token
    return this.validator.getMyAgent(payload)
  }

  public postAgent = async (username: string): Promise<PostAgentDTO> => {
    const body = JSON.stringify({
      faction: "COSMIC",
      symbol: username,
      email: "",
    })

    const response = await fetch(this.origin + "/register", {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
      },
      body,
    })

    const payload = await response.json()

    if (!response.ok) {
      const validError = this.validator.spaceTraderError(payload)
      throw new SpaceTradersApiError(validError)
    }

    return this.validator.postAgent(payload)
  }
}

export const spaceTradersRepository = new SpaceTradersRepository(spaceTraderValidator)
