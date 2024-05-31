import {
  CustomError,
  InvalidPayloadError,
  InvalidUsernameError,
  NoTokenProvidedError,
  UnexpectedError,
  UnrecognizedTokenError,
  UsernameAlreadyTakenError,
} from "#error"
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
import { ISpaceTradersRepository, spaceTradersRepository } from "../repository/space-traders.repository.js"

export interface ISpaceTradersService {
  retrieveServerState(): Promise<GetServerStateDTO | CustomError>
  retrieveMyAgent(token: string): Promise<GetMyAgentDTO | CustomError>
  createAgent: (username: string) => Promise<PostAgentDTO | CustomError>
  retrieveMyContracts: (token: string) => Promise<GetMyContractsDTO | CustomError>
  acceptContract: (token: string, contractId: string) => Promise<PostContractAcceptationDTO | CustomError>
  retrieveMyShips: (token: string) => Promise<GetMyShipsDTO | CustomError>
  retrieveWaypointsInSystem: (system: string) => Promise<GetWaypointsInSystemDTO | CustomError>
  retrieveShipyard: (waypoint: string) => Promise<GetShipyardDTO | CustomError>
}

export class SpaceTradersService implements ISpaceTradersService {
  public constructor(private spaceTradersRepository: ISpaceTradersRepository) {}

  public retrieveShipyard = async (waypoint: string) => {
    try {
      return await this.spaceTradersRepository.getShipyard(waypoint)
    } catch (error) {
      if (error instanceof CustomError) {
        if (error.code === "4103") return new NoTokenProvidedError()
        if (error.code === "4100") return new UnrecognizedTokenError()

        return error
      }

      return new UnexpectedError()
    }
  }

  public retrieveWaypointsInSystem = async (system: string) => {
    try {
      return await this.spaceTradersRepository.getWaypointsInSystem({ system, traits: "SHIPYARD" })
    } catch (error) {
      if (error instanceof CustomError) {
        if (error.code === "4103") return new NoTokenProvidedError()
        if (error.code === "4100") return new UnrecognizedTokenError()

        return error
      }

      return new UnexpectedError()
    }
  }

  public retrieveMyShips = async (token: string) => {
    try {
      return await this.spaceTradersRepository.getMyShips(token)
    } catch (error) {
      if (error instanceof CustomError) {
        if (error.code === "4103") return new NoTokenProvidedError()
        if (error.code === "4100") return new UnrecognizedTokenError()

        return error
      }

      return new UnexpectedError()
    }
  }

  public acceptContract = async (token: string, contractId: string) => {
    try {
      return await this.spaceTradersRepository.postContractAcceptation(token, contractId)
    } catch (error) {
      if (error instanceof CustomError) {
        if (error.code === "4103") return new NoTokenProvidedError()
        if (error.code === "4100") return new UnrecognizedTokenError()

        return error
      }

      return new UnexpectedError()
    }
  }

  public retrieveMyContracts = async (token: string) => {
    try {
      return await this.spaceTradersRepository.getMyContracts(token)
    } catch (error) {
      if (error instanceof CustomError) {
        if (error.code === "4103") return new NoTokenProvidedError()
        if (error.code === "4100") return new UnrecognizedTokenError()

        return error
      }

      return new UnexpectedError()
    }
  }

  public createAgent = async (username: string) => {
    try {
      return await this.spaceTradersRepository.postAgent(username)
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

  public retrieveMyAgent = async (token: string) => {
    try {
      return await this.spaceTradersRepository.getMyAgent(token)
    } catch (error) {
      if (error instanceof CustomError) {
        if (error.code === "4103") return new NoTokenProvidedError()
        if (error.code === "4100") return new UnrecognizedTokenError()

        return error
      }

      return new UnexpectedError()
    }
  }

  public retrieveServerState = async () => {
    try {
      return await this.spaceTradersRepository.getServerState()
    } catch (error) {
      if (error instanceof CustomError) {
        return error
      }

      return new UnexpectedError()
    }
  }
}

export const spaceTradersService = new SpaceTradersService(spaceTradersRepository)
