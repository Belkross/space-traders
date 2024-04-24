import { ISpaceTradersRepository, ISpaceTraderFormatter } from "../../repository/space-traders.repository.js"
import { SpaceTradersApiError, FeedbackError, UnexpectedError, InvalidPayloadError } from "../../error/index.js"
import { ILogger } from "../../logger.js"
import { Agent } from "../../model/agent.model.js"
import { feedback } from "../../model/feedback.js"

export class SpaceTraderService {
  private spaceTradersRepository: ISpaceTradersRepository
  private formatter: ISpaceTraderFormatter

  constructor({
    spaceTradersRepository,
    formatter,
  }: {
    logger: ILogger
    spaceTradersRepository: ISpaceTradersRepository
    formatter: ISpaceTraderFormatter
  }) {
    this.spaceTradersRepository = spaceTradersRepository
    this.formatter = formatter
  }

  public async getServerStatus() {
    try {
      return await this.spaceTradersRepository.getServerStatus()
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
      const payload = await this.spaceTradersRepository.getMyProfile(token)
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
