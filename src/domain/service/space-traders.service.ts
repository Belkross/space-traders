import { ISpaceTraderApi, ISpaceTraderFormatter } from "../api/space-traders.api"
import { GetServerStatusDTO } from "../api/space-traders.schema"
import { InvalidPayloadError, UnexpectedError } from "../error/error"
import { ILogger } from "../logger"
import { Agent } from "../model/agent.model"

export interface ISpaceTraderService {
  getServerStatus: () => Promise<GetServerStatusDTO>
  getMyProfile: () => Promise<Agent | null>
}

//type Response<PayloadType> = {success: true, payload: PayloadType} | {success: false, payload: string}

export class SpaceTraderService implements ISpaceTraderService {
  private logger: ILogger
  private spaceTradersApi: ISpaceTraderApi
  private formatter: ISpaceTraderFormatter

  constructor({
    logger,
    spaceTradersApi,
    formatter,
  }: {
    logger: ILogger
    spaceTradersApi: ISpaceTraderApi
    formatter: ISpaceTraderFormatter
  }) {
    this.spaceTradersApi = spaceTradersApi
    this.logger = logger
    this.formatter = formatter
  }

  public async getServerStatus() {
    try {
      return await this.spaceTradersApi.getServerStatus()
    } catch (error) {
      this.logger.error(this.getServerStatus.name)
      throw new UnexpectedError()
    }
  }

  public async getMyProfile(): Promise<Agent | null> {
    try {
      const payload = await this.spaceTradersApi.getMyProfile()
      return this.formatter.getMyProfile(payload)
    } catch (error) {
      this.logger.error(this.getMyProfile.name)
      return null
    }
  }
}
