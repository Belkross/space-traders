import { Agent } from "../model/agent.model"
import { GetMyProfileDTO, GetServerStatusDTO } from "./space-traders.schema"

export interface ISpaceTraderValidator {
  getServerStatus: (payload: unknown) => GetServerStatusDTO
  getMyProfile: (payload: unknown) => GetMyProfileDTO
}

export interface ISpaceTraderApi {
  getServerStatus: () => Promise<GetServerStatusDTO>
  getMyProfile: () => Promise<GetMyProfileDTO>
}

export interface ISpaceTraderFormatter {
  //  getServerStatus: (dto: GetServerStatusDTO) => object
  getMyProfile: (dto: GetMyProfileDTO) => Agent
}
