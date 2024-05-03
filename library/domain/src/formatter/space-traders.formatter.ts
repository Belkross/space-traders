import { GetMyProfileDTO } from "../repository/space-traders.schema.js"
import { Agent } from "../model/agent.model.js"

export interface ISpaceTraderFormatter {
  //  retrieveServerState: (dto: GetServerStatusDTO) => object
  getMyAgent: (dto: GetMyProfileDTO) => Agent
}

export class SpaceTraderFormatter implements ISpaceTraderFormatter {
  public constructor() {}

  /* public retrieveServerState(dto: GetServerStatusDTO) {
    throw new Error(dto)
  } */

  public getMyAgent(dto: GetMyProfileDTO): Agent {
    const { accountId, symbol, credits, headquarters, shipCount, startingFaction } = dto.data

    return {
      accountId,
      username: symbol,
      credits,
      headquarters,
      shipCount,
      startingFaction,
    }
  }
}
