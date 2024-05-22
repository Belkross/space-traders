import { Agent } from "../model/agent.model.js"
import { spaceTradersRepository } from "../repository/space-traders.repository.js"
import { GetServerStateDTO, PostAgentDTO } from "../repository/space-traders.schema.js"
import { spaceTradersService } from "#service"
import { createAgentUC } from "./create-agent.use-case.js"

interface ISpaceTradersUC {
  createAgent: (username: string) => Promise<PostAgentDTO>
  retrieveServerState: () => Promise<GetServerStateDTO>
  login: (token: string) => Promise<Agent>
}

export const spaceTradersUC: ISpaceTradersUC = {
  createAgent: createAgentUC,
  retrieveServerState,
  login: loginUC,
}

export async function retrieveServerState() {
  const response = await spaceTradersService.retrieveServerState(spaceTradersRepository.getServerState)

  if (response instanceof Error) throw response
  else return response
}

export async function loginUC(token: string) {
  const response = await spaceTradersService.retrieveMyAgent(token)

  if (response instanceof Error) throw response
  else return response
}
