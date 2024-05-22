import { CustomError, InvalidPayloadError, UnexpectedError } from "../error/index.js"
import { spaceTradersRepository } from "../repository/space-traders.repository.js"
import { GetServerStatusDTO, PostAgentDTO } from "../repository/space-traders.schema.js"
import { createAgentService } from "./create-agent.service.js"

export interface ISpaceTradersService {
  retrieveServerState(): Promise<GetServerStatusDTO>
  //retrieveMyAgent(token: string): Promise<Agent>
  createAgent: (username: string) => Promise<PostAgentDTO | CustomError>
}

export const spaceTradersService: ISpaceTradersService = {
  createAgent: createAgentService,
  retrieveServerState,
}

async function retrieveServerState() {
  try {
    return await spaceTradersRepository.getServerState()
  } catch (error) {
    if (error instanceof CustomError) {
      if (error instanceof InvalidPayloadError) throw error
      throw new CustomError({ severity: "error", message: error.message })
    }

    throw new UnexpectedError()
  }
}

/* export class SpaceTraderService implements ISpaceTradersService {
  constructor(private spaceTradersRepository: ISpaceTradersRepository, private formatter: ISpaceTraderFormatter) {}

  public async createAgent(username: string) {
    const data = await this.spaceTradersRepository.postAgent(username)
    try {
      const usernameIsValid = usernamePattern.test(username)
      if (!usernameIsValid) throw new InvalidUsernameError()

      return data
    } catch (error) {
      if (error.code === "422") throw new InvalidUsernameError()
      if (error instanceof CustomError) {
        if (error.code === "4111") throw new UsernameAlreadyTakenError()
        if (error instanceof InvalidPayloadError) throw error
        if (error instanceof InvalidUsernameError) throw error

        throw new CustomError({ severity: "warning", message: error.message })
      }

      throw new UnexpectedError()
    }
  }

  public async retrieveServerState() {
    try {
      return await this.spaceTradersRepository.getServerState()
    } catch (error) {
      if (error instanceof CustomError) {
        if (error instanceof InvalidPayloadError) throw error
        throw new CustomError({ severity: "error", message: error.message })
      }

      throw new UnexpectedError()
    }
  }

  public async retrieveMyAgent(token: string): Promise<Agent> {
    try {
      const payload = await this.spaceTradersRepository.getMyAgent(token)
      return this.formatter.getMyAgent(payload)
    } catch (error) {
      if (error instanceof CustomError) {
        if (error.code === "4100") throw new CustomError(feedback.invalid_token)
        if (error.code === "4103") throw new CustomError(feedback.no_token_provided)
        if (error instanceof InvalidPayloadError) throw error

        throw new CustomError({ severity: "warning", message: error.message })
      }

      throw new UnexpectedError()
    }
  }
} */
