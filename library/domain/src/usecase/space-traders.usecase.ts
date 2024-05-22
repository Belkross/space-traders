import { Agent } from "../model/agent.model.js"
import { GetServerStatusDTO, PostAgentDTO } from "../repository/space-traders.schema.js"
import { spaceTradersService } from "../service/space-traders.service.js"
import { createAgentUC } from "./create-agent.use-case.js"

interface AgentUC {
  createAgent: (username: string) => Promise<PostAgentDTO>
  retrieveServerState: () => Promise<GetServerStatusDTO>
  login: (token: string) => Promise<Agent>
}

export const agentUC: AgentUC = {
  createAgent: createAgentUC,
  retrieveServerState: retrieveServerStateUC,
  login: loginUC,
}

async function retrieveServerStateUC() {
  const response = await spaceTradersService.retrieveServerState()

  if (response instanceof Error) throw response
  else return response
}

async function loginUC(token: string) {
  const response = await spaceTradersService.retrieveMyAgent(token)

  if (response instanceof Error) throw response
  else return response
}
