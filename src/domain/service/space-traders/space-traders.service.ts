import { sleep } from "#helper/index"
import { ISpaceTraderApi, ISpaceTraderFormatter } from "../../api/space-traders.api"
import { GetServerStatusDTO } from "./space-traders.schema"
import { SpaceTradersApiError, FeedbackError, UnexpectedError, InvalidPayloadError } from "../../error"
import { ILogger } from "../../logger"
import { Agent } from "../../model/agent.model"
import { feedback } from "../../model/feedback"

export interface ISpaceTraderService {
  getServerStatus: () => Promise<GetServerStatusDTO>
  getMyProfile: (token: string) => Promise<Agent>
}
export class SpaceTraderService implements ISpaceTraderService {
  private spaceTradersApi: ISpaceTraderApi
  private formatter: ISpaceTraderFormatter

  constructor({
    spaceTradersApi,
    formatter,
  }: {
    logger: ILogger
    spaceTradersApi: ISpaceTraderApi
    formatter: ISpaceTraderFormatter
  }) {
    this.spaceTradersApi = spaceTradersApi
    this.formatter = formatter
  }

  public async getServerStatus() {
    try {
      await sleep(1000)
      return await this.spaceTradersApi.getServerStatus()
    } catch (error) {
      if (error instanceof SpaceTradersApiError) {
        throw new FeedbackError({ severity: "error", message: error.message })
      }

      if (error instanceof InvalidPayloadError) {
        throw error
      }

      throw new UnexpectedError()
    }
  }

  public async getMyProfile(token: string): Promise<Agent> {
    try {
      const payload = await this.spaceTradersApi.getMyProfile(token)
      return this.formatter.getMyProfile(payload)
    } catch (error) {
      if (error instanceof SpaceTradersApiError) {
        const { code, message } = error

        if (code === 4100) {
          throw new FeedbackError(feedback.invalid_token)
        }

        if (code === 4103) {
          throw new FeedbackError(feedback.no_token_provided)
        }

        throw new FeedbackError({ severity: "warning", message: message })
      }

      if (error instanceof InvalidPayloadError) {
        throw error
      }

      throw new UnexpectedError()
    }
  }
}
