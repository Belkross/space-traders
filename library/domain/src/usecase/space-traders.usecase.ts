import { GetServerStatusDTO, PostAgentDTO } from "../repository/space-traders.schema.js"
import { spaceTradersService } from "../service/space-traders.service.js"
import { createAgentUC } from "./create-agent.use-case.js"

interface AgentUC {
  createAgent: (username: string) => Promise<PostAgentDTO>
  retrieveServerState: () => Promise<GetServerStatusDTO>
}

export const agentUC: AgentUC = {
  createAgent: createAgentUC,
  retrieveServerState: retrieveServerStateUC,
}

async function retrieveServerStateUC() {
  return await spaceTradersService.retrieveServerState()
}
