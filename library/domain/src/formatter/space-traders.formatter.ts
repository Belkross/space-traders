import { GetMyProfileDTO } from "../repository/space-traders.schema.js"
import { Agent } from "../model/agent.model.js"

export interface ISpaceTraderFormatter {
  //  getServerStatus: (dto: GetServerStatusDTO) => object
  getMyProfile: (dto: GetMyProfileDTO) => Agent
}

export class SpaceTraderFormatter implements ISpaceTraderFormatter {
  public constructor() {}

  /* public getServerStatus(dto: GetServerStatusDTO) {
    throw new Error(dto)
  } */

  public getMyProfile(dto: GetMyProfileDTO): Agent {
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
