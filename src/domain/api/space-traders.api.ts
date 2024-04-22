import { Agent } from "../model/agent.model"
import { GetMyProfileDTO, GetServerStatusDTO, SpaceTradersErrorDTO } from "./space-traders.schema"

export interface ISpaceTraderValidator {
  getServerStatus: (payload: unknown) => GetServerStatusDTO
  getMyProfile: (payload: unknown) => GetMyProfileDTO
  spaceTraderError: (payload: unknown) => SpaceTradersErrorDTO
}

export interface ISpaceTraderApi {
  getServerStatus: () => Promise<GetServerStatusDTO>
  getMyProfile: (token: string) => Promise<GetMyProfileDTO>
}

export interface ISpaceTraderFormatter {
  //  getServerStatus: (dto: GetServerStatusDTO) => object
  getMyProfile: (dto: GetMyProfileDTO) => Agent
}
