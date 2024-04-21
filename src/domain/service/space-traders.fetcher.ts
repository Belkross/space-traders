import { ISpaceTraderApi } from "../api/space-traders.api"
import { GetMyProfileDTO } from "../api/space-traders.schema"
import { SpaceTraderValidator } from "../api/space-traders.validator"
import { UnexpectedError } from "../error/error"
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

    if (!response.ok) throw new UnexpectedError(this.getServerStatus.name)

    return this.validator.getServerStatus(await response.json())
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

    if (!response.ok) throw new UnexpectedError(this.getMyProfile.name)

    this.token = token
    return this.validator.getMyProfile(await response.json())
  }
}
