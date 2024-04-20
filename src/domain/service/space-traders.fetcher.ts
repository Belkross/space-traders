import { ISpaceTraderApi } from "../api/space-traders.api"
import { GetMyProfileDTO } from "../api/space-traders.schema"
import { SpaceTraderValidator } from "../api/space-traders.validator"
import { UnexpectedError } from "../error/error"
import { ILogger } from "../logger"

export class SpaceTradersFetcher implements ISpaceTraderApi {
  readonly origin: string
  private logger: ILogger
  private validator: SpaceTraderValidator
  private readonly token

  constructor({ token, logger, validator }: { token: string; logger: ILogger; validator: SpaceTraderValidator }) {
    this.origin = "https://api.spacetraders.io/v2"
    this.logger = logger
    this.validator = validator
    this.token = token
  }

  public async getServerStatus() {
    const response = await fetch(this.origin)

    if (!response.ok) throw new UnexpectedError(this.getServerStatus.name)

    return this.validator.getServerStatus(await response.json())
  }

  public async getMyProfile(): Promise<GetMyProfileDTO> {
    const response = await fetch(this.origin + "/my/agent", {
      headers: {
        authorization: `Bearer ${this.token}`,
      },
    })

    if (!response.ok) throw new UnexpectedError(this.getMyProfile.name)

    return this.validator.getMyProfile(await response.json())
  }
}