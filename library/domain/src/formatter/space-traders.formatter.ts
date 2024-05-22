import { GetMyAgentDTO } from "#schema"
import { Agent } from "#model"

export interface ISpaceTraderFormatter {
  getMyAgent: (dto: GetMyAgentDTO) => Agent
}

export class SpaceTraderFormatter implements ISpaceTraderFormatter {
  public constructor() {}

  public getMyAgent(dto: GetMyAgentDTO): Agent {
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
