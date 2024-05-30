import {
  CustomError,
  InvalidPayloadError,
  InvalidUsernameError,
  NoTokenProvidedError,
  UnexpectedError,
  UnrecognizedTokenError,
  UsernameAlreadyTakenError,
} from "#error"
import { ISpaceTradersRepository } from "#repository"
import {
  GetMyAgentDTO,
  GetMyContractsDTO,
  GetMyShipsDTO,
  GetServerStateDTO,
  GetShipyardDTO,
  GetWaypointsInSystemDTO,
  PostAgentDTO,
  PostContractAcceptationDTO,
} from "#schema"

export interface ISpaceTradersService {
  retrieveServerState(request: ISpaceTradersRepository["getServerState"]): Promise<GetServerStateDTO | CustomError>
  retrieveMyAgent(token: string, request: ISpaceTradersRepository["getMyAgent"]): Promise<GetMyAgentDTO | CustomError>
  createAgent: (username: string, request: ISpaceTradersRepository["postAgent"]) => Promise<PostAgentDTO | CustomError>
  retrieveMyContracts: (request: ISpaceTradersRepository["getMyContracts"]) => Promise<GetMyContractsDTO | CustomError>
  acceptContract: (
    contractId: string,
    request: ISpaceTradersRepository["postContractAcceptation"]
  ) => Promise<PostContractAcceptationDTO | CustomError>
  retrieveMyShips: (request: ISpaceTradersRepository["getMyShips"]) => Promise<GetMyShipsDTO | CustomError>
  retrieveWaypointsInSystem: (
    system: string,
    request: ISpaceTradersRepository["getWaypointsInSystem"]
  ) => Promise<GetWaypointsInSystemDTO | CustomError>
  retrieveShipyard: (
    waypoint: string,
    request: ISpaceTradersRepository["getShipyard"]
  ) => Promise<GetShipyardDTO | CustomError>
}

export const spaceTradersService: ISpaceTradersService = {
  createAgent,
  retrieveServerState,
  retrieveMyAgent,
  retrieveMyContracts,
  acceptContract,
  retrieveMyShips: retrieveMyShipsService,
  retrieveWaypointsInSystem: retrieveWaypointsInSystemService,
  retrieveShipyard: retrieveShipyardService,
}

export async function retrieveShipyardService(waypoint: string, request: ISpaceTradersRepository["getShipyard"]) {
  try {
    return await request(waypoint)
  } catch (error) {
    if (error instanceof CustomError) {
      if (error.code === "4103") return new NoTokenProvidedError()
      if (error.code === "4100") return new UnrecognizedTokenError()

      return error
    }

    return new UnexpectedError()
  }
}

export async function retrieveWaypointsInSystemService(
  system: string,
  request: ISpaceTradersRepository["getWaypointsInSystem"]
) {
  try {
    return await request({ system, traits: "SHIPYARD" })
  } catch (error) {
    if (error instanceof CustomError) {
      if (error.code === "4103") return new NoTokenProvidedError()
      if (error.code === "4100") return new UnrecognizedTokenError()

      return error
    }

    return new UnexpectedError()
  }
}

export async function retrieveMyShipsService(request: ISpaceTradersRepository["getMyShips"]) {
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

export async function acceptContract(contractId: string, request: ISpaceTradersRepository["postContractAcceptation"]) {
  try {
    return await request(contractId)
  } catch (error) {
    if (error instanceof CustomError) {
      if (error.code === "4103") return new NoTokenProvidedError()
      if (error.code === "4100") return new UnrecognizedTokenError()

      return error
    }

    return new UnexpectedError()
  }
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
