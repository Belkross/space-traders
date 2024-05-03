import { Agent } from "../model/agent.model.js"
import {
  GetMyProfileDTO,
  GetServerStatusDTO,
  PostAgentDTO,
  SpaceTradersErrorDTO,
} from "../service/space-traders/space-traders.schema.js"

export interface ISpaceTradersRepository {
  getServerStatus: () => Promise<GetServerStatusDTO>
  getMyProfile: (token: string) => Promise<GetMyProfileDTO>
  postAgent: (username: string) => Promise<PostAgentDTO>
}

export interface ISpaceTraderValidator {
  getServerStatus: (payload: unknown) => GetServerStatusDTO
  getMyProfile: (payload: unknown) => GetMyProfileDTO
  postAgent: (payload: unknown) => PostAgentDTO
  spaceTraderError: (payload: unknown) => SpaceTradersErrorDTO
}

export interface ISpaceTraderFormatter {
  //  getServerStatus: (dto: GetServerStatusDTO) => object
  getMyProfile: (dto: GetMyProfileDTO) => Agent
}
