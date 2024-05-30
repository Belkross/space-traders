import {
  GetMyAgentDTO,
  GetMyContractsDTO,
  GetMyShipsDTO,
  GetWaypointsInSystemDTO,
  PostContractAcceptationDTO,
} from "#schema"
import { Agent, Contract, Ship, Waypoint } from "#model"

export interface ISpaceTraderFormatter {
  login: (dto: GetMyAgentDTO) => Agent
  retrieveMyContracts: (dto: GetMyContractsDTO) => Array<Contract>
  acceptContract: (dto: PostContractAcceptationDTO) => { contract: Contract; credits: number }
  retrieveMyShips: (dto: GetMyShipsDTO) => Array<Ship>
  retrieveShipyardsInSystem: (dto: GetWaypointsInSystemDTO) => Array<Waypoint>
}

export class SpaceTraderFormatter implements ISpaceTraderFormatter {
  public constructor() {}

  public retrieveShipyardsInSystem = (dto: GetWaypointsInSystemDTO) => {
    return dto.data.map((waypoint) => {
      const { symbol, type, systemSymbol, x, y, traits, isUnderConstruction } = waypoint
      return {
        symbol,
        type,
        systemSymbol,
        x,
        y,
        traits,
        isUnderConstruction,
      }
    })
  }

  public retrieveMyShips = (dto: GetMyShipsDTO): Array<Ship> => {
    return dto.data.map((ship) => {
      return {
        symbol: ship.symbol,
        owner: ship.registration.name,
        role: ship.registration.role,
      }
    })
  }

  public acceptContract = (dto: PostContractAcceptationDTO) => {
    return { contract: dto.data.contract, credits: dto.data.agent.credits }
  }

  public login = (dto: GetMyAgentDTO): Agent => {
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

  public retrieveMyContracts = (dto: GetMyContractsDTO): Array<Contract> => {
    return dto.data
  }
}

export const spaceTradersFormatter = new SpaceTraderFormatter()
