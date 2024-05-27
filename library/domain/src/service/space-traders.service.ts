import {
  CustomError,
  InvalidPayloadError,
  InvalidUsernameError,
  NoTokenProvidedError,
  UnexpectedError,
  UnrecognizedTokenError,
  UsernameAlreadyTakenError,
} from "#error"
import { ISpaceTradersRepository } from "../repository/space-traders.repository.js" //the app crashes when using alias
import { GetMyAgentDTO, GetMyContractsDTO, GetServerStateDTO, PostAgentDTO } from "#schema"

export interface ISpaceTradersService {
  retrieveServerState(request: ISpaceTradersRepository["getServerState"]): Promise<GetServerStateDTO | CustomError>
  retrieveMyAgent(token: string, request: ISpaceTradersRepository["getMyAgent"]): Promise<GetMyAgentDTO | CustomError>
  createAgent: (username: string, request: ISpaceTradersRepository["postAgent"]) => Promise<PostAgentDTO | CustomError>
  retrieveMyContracts: (request: ISpaceTradersRepository["getMyContracts"]) => Promise<GetMyContractsDTO | CustomError>
}

export const spaceTradersService: ISpaceTradersService = {
  createAgent,
  retrieveServerState,
  retrieveMyAgent,
  retrieveMyContracts,
}

export async function retrieveMyContracts(request: ISpaceTradersRepository["getMyContracts"]) {
  try {
    return await request()
  } catch (error) {
    if (error instanceof CustomError) {
      if (error.code === "4103") return new NoTokenProvidedError()
      if (error.code === "4100") return new UnrecognizedTokenError()

      return error
    }

    return new UnexpectedError()
  }
}

export async function createAgent(username: string, request: ISpaceTradersRepository["postAgent"]) {
  try {
    return await request(username)
  } catch (error) {
    if (error instanceof CustomError) {
      if (error.code === "4111") return new UsernameAlreadyTakenError()
      if (error.code === "422") return new InvalidUsernameError({ detail: "from SpaceTraders’s api" })
      if (error instanceof InvalidUsernameError) return error
      if (error instanceof InvalidPayloadError) return error

      return new CustomError({ severity: "warning", message: error.message })
    }

    return new UnexpectedError()
  }
}

export async function retrieveMyAgent(token: string, request: ISpaceTradersRepository["getMyAgent"]) {
  try {
    return await request(token)
  } catch (error) {
    if (error instanceof CustomError) {
      if (error.code === "4103") return new NoTokenProvidedError()
      if (error.code === "4100") return new UnrecognizedTokenError()

      return error
    }

    return new UnexpectedError()
  }
}

export async function retrieveServerState(request: ISpaceTradersRepository["getServerState"]) {
  try {
    return await request()
  } catch (error) {
    if (error instanceof CustomError) {
      return error
    }

    return new UnexpectedError()
  }
}
