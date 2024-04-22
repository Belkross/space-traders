import { ISpaceTraderApi } from "../api/space-traders.api"
import { GetMyProfileDTO } from "../api/space-traders.schema"
import { SpaceTraderValidator } from "../api/space-traders.validator"
import { SpaceTradersApiError } from "../error/error"
import { ILogger } from "../logger"

export class SpaceTradersFetcher implements ISpaceTraderApi {
  readonly origin: string
  private logger: ILogger
  private validator: SpaceTraderValidator
  private token: string

  constructor({ logger, validator }: { logger: ILogger; validator: SpaceTraderValidator }) {
    this.origin = "https://api.spacetraders.io/v2"
    this.logger = logger
    this.validator = validator
    this.token = ""
  }

  public async getServerStatus() {
    const response = await fetch(this.origin)
    const payload = await response.json()

    if (!response.ok) {
      throw new SpaceTradersApiError(this.validator.spaceTraderError(payload))
    }

    return this.validator.getServerStatus(payload)
  }

  /**
   * We use this request to authenticate the user.
   * That’s why the token need to be set if the request succeed
   */
  public async getMyProfile(token: string): Promise<GetMyProfileDTO> {
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
    return this.validator.getMyProfile(payload)
  }
}
