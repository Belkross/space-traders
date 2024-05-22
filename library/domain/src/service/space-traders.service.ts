import { CustomError, InvalidPayloadError, UnexpectedError } from "#error"
import { formatter } from "../formatter/space-traders.formatter.js"
import { Agent } from "../model/agent.model.js"
import { feedback } from "../model/feedback.js"
import { ISpaceTradersRepository, spaceTradersRepository } from "../repository/space-traders.repository.js"
import { GetServerStateDTO, PostAgentDTO } from "../repository/space-traders.schema.js"
import { createAgentService } from "./create-agent.service.js"

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
