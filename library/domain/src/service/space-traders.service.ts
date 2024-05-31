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
import { ISpaceTradersRepository, spaceTradersRepository } from "../repository/space-traders.repository.js" // using the alias make the app crash
import { ServiceResponse } from "./service.type.js"

export interface ISpaceTradersService {
  retrieveServerState(): Promise<ServiceResponse<GetServerStateDTO>>
  retrieveMyAgent(token: string): Promise<ServiceResponse<GetMyAgentDTO>>
  createAgent: (username: string) => Promise<ServiceResponse<PostAgentDTO>>
  retrieveMyContracts: (token: string) => Promise<ServiceResponse<GetMyContractsDTO>>
  acceptContract: (token: string, contractId: string) => Promise<ServiceResponse<PostContractAcceptationDTO>>
  retrieveMyShips: (token: string) => Promise<ServiceResponse<GetMyShipsDTO>>
  retrieveWaypointsInSystem: (system: string) => Promise<ServiceResponse<GetWaypointsInSystemDTO>>
  retrieveShipyard: (waypoint: string) => Promise<ServiceResponse<GetShipyardDTO>>
}

export class SpaceTradersService implements ISpaceTradersService {
  public constructor(private spaceTradersRepository: ISpaceTradersRepository) {}

  public retrieveShipyard = async (waypoint: string) => {
    try {
      return { payload: await this.spaceTradersRepository.getShipyard(waypoint), error: undefined }
    } catch (error) {
      if (error instanceof CustomError) {
        if (error.code === "4103") return { payload: undefined, error: new NoTokenProvidedError() }
        if (error.code === "4100") return { payload: undefined, error: new UnrecognizedTokenError() }

        return { payload: undefined, error: error }
      }

      return { payload: undefined, error: new UnexpectedError() }
    }
  }

  public retrieveWaypointsInSystem = async (system: string) => {
    try {
      return {
        payload: await this.spaceTradersRepository.getWaypointsInSystem({ system, traits: "SHIPYARD" }),
        error: undefined,
      }
    } catch (error) {
      if (error instanceof CustomError) {
        if (error.code === "4103") return { payload: undefined, error: new NoTokenProvidedError() }
        if (error.code === "4100") return { payload: undefined, error: new UnrecognizedTokenError() }

        return { payload: undefined, error: error }
      }

      return { payload: undefined, error: new UnexpectedError() }
    }
  }

  public retrieveMyShips = async (token: string) => {
    try {
      return { payload: await this.spaceTradersRepository.getMyShips(token), error: undefined }
    } catch (error) {
      if (error instanceof CustomError) {
        if (error.code === "4103") return { payload: undefined, error: new NoTokenProvidedError() }
        if (error.code === "4100") return { payload: undefined, error: new UnrecognizedTokenError() }

        return { payload: undefined, error: error }
      }

      return { payload: undefined, error: new UnexpectedError() }
    }
  }

  public acceptContract = async (token: string, contractId: string) => {
    try {
      return { payload: await this.spaceTradersRepository.postContractAcceptation(token, contractId), error: undefined }
    } catch (error) {
      if (error instanceof CustomError) {
        if (error.code === "4103") return { payload: undefined, error: new NoTokenProvidedError() }
        if (error.code === "4100") return { payload: undefined, error: new UnrecognizedTokenError() }

        return { payload: undefined, error: error }
      }

      return { payload: undefined, error: new UnexpectedError() }
    }
  }

  public retrieveMyContracts = async (token: string) => {
    try {
      return { payload: await this.spaceTradersRepository.getMyContracts(token), error: undefined }
    } catch (error) {
      if (error instanceof CustomError) {
        if (error.code === "4103") return { payload: undefined, error: new NoTokenProvidedError() }
        if (error.code === "4100") return { payload: undefined, error: new UnrecognizedTokenError() }

        return { payload: undefined, error: error }
      }

      return { payload: undefined, error: new UnexpectedError() }
    }
  }

  public createAgent = async (username: string) => {
    try {
      return { payload: await this.spaceTradersRepository.postAgent(username), error: undefined }
    } catch (error) {
      if (error instanceof CustomError) {
        if (error.code === "4111") return { payload: undefined, error: new UsernameAlreadyTakenError() }
        if (error.code === "422")
          return { payload: undefined, error: new InvalidUsernameError({ detail: "from SpaceTraders’s api" }) }
        if (error instanceof InvalidUsernameError) return { payload: undefined, error }
        if (error instanceof InvalidPayloadError) return { payload: undefined, error }

        return { payload: undefined, error: new CustomError({ severity: "warning", message: error.message }) }
      }

      return { payload: undefined, error: new UnexpectedError() }
    }
  }

  public retrieveMyAgent = async (token: string) => {
    try {
      return { payload: await this.spaceTradersRepository.getMyAgent(token), error: undefined }
    } catch (error) {
      if (error instanceof CustomError) {
        if (error.code === "4103") return { payload: undefined, error: new NoTokenProvidedError() }
        if (error.code === "4100") return { payload: undefined, error: new UnrecognizedTokenError() }

        return { payload: undefined, error: error }
      }

      return { payload: undefined, error: new UnexpectedError() }
    }
  }

  public retrieveServerState = async () => {
    try {
      return { payload: await this.spaceTradersRepository.getServerState(), error: undefined }
    } catch (error) {
      if (error instanceof CustomError) {
        return { payload: undefined, error: error }
      }

      return { payload: undefined, error: new UnexpectedError() }
    }
  }
}

export const spaceTradersService = new SpaceTradersService(spaceTradersRepository)
