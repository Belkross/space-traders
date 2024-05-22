import { Agent } from "#model"
import { spaceTradersRepository } from "../repository/space-traders.repository.js"
import { GetServerStateDTO, PostAgentDTO } from "#schema"
import { spaceTradersService } from "../service/space-traders.service.js"
import { createAgentUC } from "./create-agent.use-case.js"

interface ISpaceTradersUC {
  createAgent: (username: string) => Promise<PostAgentDTO>
  retrieveServerState: () => Promise<GetServerStateDTO>
  login: (token: string) => Promise<Agent>
}

export const spaceTradersUC: ISpaceTradersUC = {
  createAgent: createAgentUC,
  retrieveServerState: retrieveServerStateUC,
  login: loginUC,
}

export async function retrieveServerStateUC() {
  const response = await spaceTradersService.retrieveServerState(spaceTradersRepository.getServerState)

  if (response instanceof Error) throw response
  else return response
}

export async function loginUC(token: string) {
  const response = await spaceTradersService.retrieveMyAgent(token)

  if (response instanceof Error) throw response
  else return response
}
