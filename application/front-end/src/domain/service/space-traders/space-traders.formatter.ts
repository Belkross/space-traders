import { ISpaceTraderFormatter } from "../../api/space-traders.api"
import { GetMyProfileDTO } from "./space-traders.schema"
import { Agent } from "../../model/agent.model"

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
