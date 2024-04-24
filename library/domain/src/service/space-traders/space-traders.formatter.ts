import { ISpaceTraderFormatter } from "../../repository/space-traders.repository.js"
import { GetMyProfileDTO } from "./space-traders.schema.js"
import { Agent } from "../../model/agent.model.js"

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
