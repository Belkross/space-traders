import { ISpaceTraderApi, ISpaceTraderFormatter } from "../api/space-traders.api"
import { GetServerStatusDTO } from "../api/space-traders.schema"
import { UnexpectedError } from "../error/error"
import { ILogger } from "../logger"
import { Agent } from "../model/agent.model"

export interface ISpaceTraderService {
  getServerStatus: () => Promise<GetServerStatusDTO>
  getMyProfile: (token: string) => Promise<Agent>
}
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

  public async getMyProfile(token: string): Promise<Agent> {
    try {
      const payload = await this.spaceTradersApi.getMyProfile(token)
      return this.formatter.getMyProfile(payload)
    } catch (error) {
      this.logger.error(this.getMyProfile.name)
      throw new UnexpectedError()
    }
  }
}
