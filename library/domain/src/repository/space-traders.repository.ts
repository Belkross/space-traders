import { SpaceTradersApiError } from "#error"
import { GetMyAgentDTO, GetServerStateDTO, PostAgentDTO, SpaceTradersErrorDTO } from "#schema"
import { SpaceTraderValidator, spaceTraderValidator } from "#validator"

export interface ISpaceTradersRepository {
  getServerState: () => Promise<GetServerStateDTO>
  getMyAgent: (token: string) => Promise<GetMyAgentDTO>
  postAgent: (username: string) => Promise<PostAgentDTO>
}

export interface ISpaceTraderValidator {
  getServerState: (payload: unknown) => GetServerStateDTO
  getMyAgent: (payload: unknown) => GetMyAgentDTO
  postAgent: (payload: unknown) => PostAgentDTO
  spaceTraderError: (payload: unknown) => SpaceTradersErrorDTO
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

  public getServerState = async () => {
    const response = await fetch(this.origin)
    const payload = await response.json()

    if (!response.ok) {
      throw new SpaceTradersApiError(this.validator.spaceTraderError(payload))
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
      throw new SpaceTradersApiError(this.validator.spaceTraderError(payload))
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
      throw new SpaceTradersApiError(this.validator.spaceTraderError(payload))
    }

    return this.validator.postAgent(payload)
  }
}

export const spaceTradersRepository = new SpaceTradersRepository(spaceTraderValidator)
