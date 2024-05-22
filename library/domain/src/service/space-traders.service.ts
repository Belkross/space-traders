import {
  CustomError,
  InvalidPayloadError,
  InvalidUsernameError,
  UnexpectedError,
  UsernameAlreadyTakenError,
} from "#error"
import { formatter } from "#formatter"
import { Agent, feedback } from "#model"
import { ISpaceTradersRepository, spaceTradersRepository } from "../repository/space-traders.repository.js"
import { GetServerStateDTO, PostAgentDTO } from "#schema"

export class CreateAgentService {
  constructor(private request: ISpaceTradersRepository["postAgent"]) {}

  public do = async (username: string): Promise<PostAgentDTO | CustomError> => {
    try {
      return await this.request(username)
    } catch (error) {
      if (error instanceof CustomError) {
        if (error.code === "4111") return new UsernameAlreadyTakenError()
        if (error.code === "422") return new InvalidUsernameError({ detail: "from SpaceTraders’s api" })
        if (error instanceof InvalidUsernameError) return error
        if (error instanceof InvalidPayloadError) return error

        return new CustomError({ severity: "warning", message: error.message })
      }

      return new UnexpectedError()
    }
  }
}

export const createAgentService = new CreateAgentService(spaceTradersRepository.postAgent).do
export interface ISpaceTradersService {
  retrieveServerState(request: ISpaceTradersRepository["getServerState"]): Promise<GetServerStateDTO | CustomError>
  retrieveMyAgent(token: string): Promise<Agent | CustomError>
  createAgent: (username: string) => Promise<PostAgentDTO | CustomError>
}

export const spaceTradersService: ISpaceTradersService = {
  createAgent: createAgentService,
  retrieveServerState,
  retrieveMyAgent: retrieveMyAgentService,
}

async function retrieveMyAgentService(token: string) {
  try {
    const payload = await spaceTradersRepository.getMyAgent(token)
    return formatter.getMyAgent(payload)
  } catch (error) {
    if (error instanceof CustomError) {
      if (error.code === "4100") return new CustomError(feedback.invalid_token)
      if (error.code === "4103") return new CustomError(feedback.no_token_provided)
      if (error instanceof InvalidPayloadError) return error

      return new CustomError({ severity: "warning", message: error.message })
    }

    return new UnexpectedError()
  }
}

export async function retrieveServerState(request: ISpaceTradersRepository["getServerState"]) {
  try {
    return await request()
  } catch (error) {
    if (error instanceof CustomError) {
      return error
    }

    return new UnexpectedError()
  }
}
