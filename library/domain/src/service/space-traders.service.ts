import { ISpaceTradersRepository } from "../repository/space-traders.repository.js"
import {
  SpaceTradersApiError,
  CustomError,
  UnexpectedError,
  InvalidPayloadError,
  InvalidUsernameError,
  UsernameAlreadyTakenError,
} from "../error/index.js"

import { Agent } from "../model/agent.model.js"
import { feedback } from "../model/feedback.js"
import { GetServerStatusDTO, PostAgentDTO } from "../repository/space-traders.schema.js"
import { ISpaceTraderFormatter } from "../formatter/space-traders.formatter.js"
import { usernamePattern } from "../constant.js"

interface ISpaceTradersService {
  retrieveServerState(): Promise<GetServerStatusDTO>
  retrieveMyAgent(token: string): Promise<Agent>
  createAgent(username: string): Promise<PostAgentDTO>
}

export class SpaceTraderService implements ISpaceTradersService {
  constructor(private spaceTradersRepository: ISpaceTradersRepository, private formatter: ISpaceTraderFormatter) {}

  public async createAgent(username: string) {
    try {
      const usernameIsValid = usernamePattern.test(username)
      if (!usernameIsValid) throw new InvalidUsernameError()

      const data = await this.spaceTradersRepository.postAgent(username)

      return data
    } catch (error) {
      if (error instanceof SpaceTradersApiError) {
        if (error.code === 422) throw new InvalidUsernameError()
        if (error.code === 4111) throw new UsernameAlreadyTakenError()

        throw new CustomError({ severity: "warning", message: error.message })
      }

      if (error instanceof InvalidPayloadError || error instanceof InvalidUsernameError) {
        throw error
      }

      throw new UnexpectedError()
    }
  }

  public async retrieveServerState() {
    try {
      return await this.spaceTradersRepository.getServerState()
    } catch (error) {
      if (error instanceof SpaceTradersApiError) {
        throw new CustomError({ severity: "error", message: error.message })
      }

      if (error instanceof InvalidPayloadError) {
        throw error
      }

      throw new UnexpectedError()
    }
  }

  public async retrieveMyAgent(token: string): Promise<Agent> {
    try {
      const payload = await this.spaceTradersRepository.getMyAgent(token)
      return this.formatter.getMyAgent(payload)
    } catch (error) {
      if (error instanceof SpaceTradersApiError) {
        const { code, message } = error

        if (code === 4100) {
          throw new CustomError(feedback.invalid_token)
        }

        if (code === 4103) {
          throw new CustomError(feedback.no_token_provided)
        }

        throw new CustomError({ severity: "warning", message: message })
      }

      if (error instanceof InvalidPayloadError) {
        throw error
      }

      throw new UnexpectedError()
    }
  }
}
