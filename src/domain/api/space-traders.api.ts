import { Agent } from "../model/agent.model"
import { GetMyProfileDTO } from "./space-traders.schema"

export interface ISpaceTraderValidator {
  getMyProfile: (payload: unknown) => GetMyProfileDTO
}

export interface ISpaceTraderApi {
  getMyProfile: () => Promise<GetMyProfileDTO>
}

export interface ISpaceTraderFormatter {
  getMyProfile: (dto: GetMyProfileDTO) => Agent
}
