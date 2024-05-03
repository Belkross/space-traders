import { ISpaceTradersRepository } from "../../repository/space-traders.repository.js"
import { SpaceTradersApiError, FeedbackError, UnexpectedError, InvalidPayloadError } from "../../error/index.js"
import { ILogger } from "../../logger.js"
import { Agent } from "../../model/agent.model.js"
import { feedback } from "../../model/feedback.js"
import { GetServerStatusDTO, PostAgentDTO } from "../../repository/space-traders.schema.js"
import { ISpaceTraderFormatter } from "../../formatter/space-traders.formatter.js"

interface ISpaceTradersService {
  getServerStatus(): Promise<GetServerStatusDTO>
  getMyProfile(token: string): Promise<Agent>
  createAgent(username: string): Promise<PostAgentDTO>
}

export class SpaceTraderService implements ISpaceTradersService {
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

  public async createAgent(username: string) {
    //vérifier que le username est bien une string entre 3 et 14 caractères
    //affiner la gestion des erreurs
    //4111: username already taken
    //422: username invalid
    //refaire la sauvegarde du token
    //refactor le systèmes d’erreur
    //refactor les domain / infra
    // faire un bouton qui permet d’utiliser le token sauvegardé

    try {
      const data = await this.spaceTradersRepository.postAgent(username)

      return data
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
