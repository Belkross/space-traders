import { Agent } from "../model/agent.model.js"
import { GetServerStatusDTO, PostAgentDTO } from "../repository/space-traders.schema.js"
import { spaceTradersService } from "../service/space-traders.service.js"
import { createAgentUC } from "./create-agent.use-case.js"
import { loginUC } from "./login.use-case.js"
import { retrieveServerStateUC } from "./retrieve-server-state.use-case.js"

interface ISpaceTradersUC {
  createAgent: (username: string) => Promise<PostAgentDTO>
  retrieveServerState: () => Promise<GetServerStatusDTO>
  login: (token: string) => Promise<Agent>
}

export const spaceTradersUC: ISpaceTradersUC = {
  createAgent: createAgentUC,
  retrieveServerState: retrieveServerStateUC,
  login: loginUC,
}
