import { GetMyAgentDTO, GetMyContractsDTO } from "#schema"
import { Agent, Contract } from "#model"

export interface ISpaceTraderFormatter {
  getMyAgent: (dto: GetMyAgentDTO) => Agent
  retrieveMyContracts: (dto: GetMyContractsDTO) => Array<Contract>
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

  public retrieveMyContracts(dto: GetMyContractsDTO): Array<Contract> {
    return dto.data
  }
}

export const formatter = new SpaceTraderFormatter()
