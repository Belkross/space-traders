import { Agent } from "../model/agent.model.js"
import {
  GetMyProfileDTO,
  GetServerStatusDTO,
  SpaceTradersErrorDTO,
} from "../service/space-traders/space-traders.schema.js"

export interface ISpaceTradersRepository {
  getServerStatus: () => Promise<GetServerStatusDTO>
  getMyProfile: (token: string) => Promise<GetMyProfileDTO>
}

export interface ISpaceTraderValidator {
  getServerStatus: (payload: unknown) => GetServerStatusDTO
  getMyProfile: (payload: unknown) => GetMyProfileDTO
  spaceTraderError: (payload: unknown) => SpaceTradersErrorDTO
}

export interface ISpaceTraderFormatter {
  //  getServerStatus: (dto: GetServerStatusDTO) => object
  getMyProfile: (dto: GetMyProfileDTO) => Agent
}
