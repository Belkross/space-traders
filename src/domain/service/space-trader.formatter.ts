import { ISpaceTraderFormatter } from "../api/space-traders.api"
import { GetMyProfileDTO } from "../api/space-traders.schema"
import { Agent } from "../model/agent.model"

export class SpaceTraderFormatter implements ISpaceTraderFormatter {
  public constructor() {}

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
