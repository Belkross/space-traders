import { GetMyProfileDTO } from "#schema"
import { Agent } from "#model"

export interface ISpaceTraderFormatter {
  //  retrieveServerState: (dto: GetServerStateDTO) => object
  getMyAgent: (dto: GetMyProfileDTO) => Agent
}

export class SpaceTraderFormatter implements ISpaceTraderFormatter {
  public constructor() {}

  /* public retrieveServerState(dto: GetServerStateDTO) {
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

export const formatter = new SpaceTraderFormatter()
