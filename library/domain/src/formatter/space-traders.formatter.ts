import { GetMyAgentDTO, GetMyContractsDTO, PostContractAcceptationDTO } from "#schema"
import { Agent, Contract } from "#model"

export interface ISpaceTraderFormatter {
  login: (dto: GetMyAgentDTO) => Agent
  retrieveMyContracts: (dto: GetMyContractsDTO) => Array<Contract>
  acceptContract: (dto: PostContractAcceptationDTO) => { contract: Contract; credits: number }
}

export class SpaceTraderFormatter implements ISpaceTraderFormatter {
  public constructor() {}

  public acceptContract(dto: PostContractAcceptationDTO) {
    return { contract: dto.data.contract, credits: dto.data.agent.credits }
  }

  public login(dto: GetMyAgentDTO): Agent {
    const { accountId, symbol, credits, headquarters, shipCount, startingFaction } = dto.data

    return {
      accountId,
      username: symbol,
      credits,
      headquarters,
      shipCount,
      faction: startingFaction,
    }
  }

  public retrieveMyContracts(dto: GetMyContractsDTO): Array<Contract> {
    return dto.data
  }
}

export const spaceTradersFormatter = new SpaceTraderFormatter()
