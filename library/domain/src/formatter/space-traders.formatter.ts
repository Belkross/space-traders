import { GetMyAgentDTO, GetMyContractsDTO, PostContractAcceptationDTO } from "#schema"
import { Agent, Contract } from "#model"

export interface ISpaceTraderFormatter {
  getMyAgent: (dto: GetMyAgentDTO) => Agent
  retrieveMyContracts: (dto: GetMyContractsDTO) => Array<Contract>
  acceptContract: (dto: PostContractAcceptationDTO) => Contract
}

export class SpaceTraderFormatter implements ISpaceTraderFormatter {
  public constructor() {}

  public acceptContract(dto: PostContractAcceptationDTO): Contract {
    return dto.data.contract
  }

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

export const spaceTradersFormatter = new SpaceTraderFormatter()
