import { SpaceTradersApiError } from "../error/index.js"
import { GetMyProfileDTO, GetServerStatusDTO, PostAgentDTO, SpaceTradersErrorDTO } from "./space-traders.schema.js"
import { SpaceTraderValidator } from "./space-traders.validator.js"

export interface ISpaceTradersRepository {
  getServerState: () => Promise<GetServerStatusDTO>
  getMyAgent: (token: string) => Promise<GetMyProfileDTO>
  postAgent: (username: string) => Promise<PostAgentDTO>
}

export interface ISpaceTraderValidator {
  getServerState: (payload: unknown) => GetServerStatusDTO
  getMyAgent: (payload: unknown) => GetMyProfileDTO
  postAgent: (payload: unknown) => PostAgentDTO
  spaceTraderError: (payload: unknown) => SpaceTradersErrorDTO
}

export class SpaceTradersRepository implements ISpaceTradersRepository {
  readonly origin: string
  private validator: SpaceTraderValidator
  private token: string

  constructor({ validator }: { validator: SpaceTraderValidator }) {
    this.origin = "https://api.spacetraders.io/v2"
    this.validator = validator
    this.token = ""
  }

  public async getServerState() {
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
  public async getMyAgent(token: string): Promise<GetMyProfileDTO> {
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

  public async postAgent(username: string): Promise<PostAgentDTO> {
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
