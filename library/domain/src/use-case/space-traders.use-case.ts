import { Agent, Contract, Ship, Shipyard, Waypoint } from "#model"
import { GetServerStateDTO, PostAgentDTO } from "#schema"
import { ISpaceTradersService, IUserService } from "#service"
import { CustomError, InvalidUsernameError, UnexpectedError } from "#error"
import { ISpaceTraderFormatter } from "#formatter"
import { ILogger } from "#logger"

export interface ISpaceTradersUC {
  createAgent: (username: string) => Promise<PostAgentDTO>
  retrieveServerState: () => Promise<GetServerStateDTO>
  login: (token: string) => Promise<Agent>
  retrieveMyContracts: () => Promise<Array<Contract>>
  acceptContract: (contractId: string) => Promise<{ contract: Contract; credits: number }>
  retrieveMyShips: () => Promise<Array<Ship>>
  retrieveShipyardsInSystem: (systemId: string) => Promise<Array<Waypoint>>
  retrieveShipyard: (waypoint: string) => Promise<Shipyard>
}

export class RetrieveShipyardUC {
  private logger: ILogger
  private spaceTradersFormatter: ISpaceTraderFormatter
  private spaceTradersService: ISpaceTradersService

  constructor(input: {
    logger: ILogger
    spaceTradersFormatter: ISpaceTraderFormatter
    spaceTradersService: ISpaceTradersService
  }) {
    this.logger = input.logger
    this.spaceTradersFormatter = input.spaceTradersFormatter
    this.spaceTradersService = input.spaceTradersService
  }

  public do = async (waypoint: string): Promise<Shipyard> => {
    const response = await this.spaceTradersService.retrieveShipyard(waypoint)

    if (response instanceof Error) {
      this.logger.debug(JSON.stringify(response, null, 2))
      throw response
    }

    return this.spaceTradersFormatter.retrieveShipyard(response)
  }
}

export class RetrieveShipyardsInSystemUC {
  private logger: ILogger
  private spaceTradersFormatter: ISpaceTraderFormatter
  private spaceTradersService: ISpaceTradersService

  constructor(input: {
    logger: ILogger
    spaceTradersFormatter: ISpaceTraderFormatter
    spaceTradersService: ISpaceTradersService
  }) {
    this.logger = input.logger
    this.spaceTradersFormatter = input.spaceTradersFormatter
    this.spaceTradersService = input.spaceTradersService
  }

  public do = async (system: string) => {
    const response = await this.spaceTradersService.retrieveWaypointsInSystem(system)

    if (response instanceof Error) {
      this.logger.debug(JSON.stringify(response, null, 2))
      throw response
    }

    return this.spaceTradersFormatter.retrieveShipyardsInSystem(response)
  }
}

export class RetrieveMyShipsUC {
  private logger: ILogger
  private spaceTradersFormatter: ISpaceTraderFormatter
  private spaceTradersService: ISpaceTradersService
  private userService: IUserService

  constructor(input: {
    logger: ILogger
    spaceTradersFormatter: ISpaceTraderFormatter
    spaceTradersService: ISpaceTradersService
    userService: IUserService
  }) {
    this.logger = input.logger
    this.spaceTradersFormatter = input.spaceTradersFormatter
    this.spaceTradersService = input.spaceTradersService
    this.userService = input.userService
  }

  public do = async () => {
    try {
      const { payload: token, error } = await this.userService.retrieveToken()
      if (error !== undefined) throw error

      const response = await this.spaceTradersService.retrieveMyShips(token)

      if (response instanceof Error) {
        this.logger.debug(JSON.stringify(response, null, 2))
        throw response
      }

      return this.spaceTradersFormatter.retrieveMyShips(response)
    } catch (error) {
      if (error instanceof CustomError) {
        this.logger.debug(JSON.stringify(error, null, 2))
        throw error
      }

      throw new UnexpectedError()
    }
  }
}
export class AcceptContractUC {
  private logger: ILogger
  private spaceTradersFormatter: ISpaceTraderFormatter
  private spaceTradersService: ISpaceTradersService
  private userService: IUserService

  constructor(input: {
    logger: ILogger
    spaceTradersFormatter: ISpaceTraderFormatter
    spaceTradersService: ISpaceTradersService
    userService: IUserService
  }) {
    this.logger = input.logger
    this.spaceTradersFormatter = input.spaceTradersFormatter
    this.spaceTradersService = input.spaceTradersService
    this.userService = input.userService
  }

  public do = async (contractId: string) => {
    try {
      const { payload: token, error } = await this.userService.retrieveToken()
      if (error !== undefined) throw error

      const response = await this.spaceTradersService.acceptContract(token, contractId)

      if (response instanceof Error) {
        this.logger.debug(JSON.stringify(response, null, 2))
        throw response
      }

      return this.spaceTradersFormatter.acceptContract(response)
    } catch (error) {
      if (error instanceof CustomError) {
        this.logger.debug(JSON.stringify(error, null, 2))
        throw error
      }

      throw new UnexpectedError()
    }
  }
}

export class LoginUC {
  private logger: ILogger
  private spaceTradersFormatter: ISpaceTraderFormatter
  private spaceTradersService: ISpaceTradersService

  constructor(input: {
    logger: ILogger
    spaceTradersFormatter: ISpaceTraderFormatter
    spaceTradersService: ISpaceTradersService
  }) {
    this.logger = input.logger
    this.spaceTradersFormatter = input.spaceTradersFormatter
    this.spaceTradersService = input.spaceTradersService
  }

  public do = async (token: string) => {
    const response = await this.spaceTradersService.retrieveMyAgent(token)

    if (response instanceof Error) {
      this.logger.debug(JSON.stringify(response, null, 2))
      throw response
    }

    return this.spaceTradersFormatter.login(response)
  }
}

export class RetrieveMyContractsUC {
  private logger: ILogger
  private spaceTradersFormatter: ISpaceTraderFormatter
  private spaceTradersService: ISpaceTradersService
  private userService: IUserService

  constructor(input: {
    logger: ILogger
    spaceTradersFormatter: ISpaceTraderFormatter
    spaceTradersService: ISpaceTradersService
    userService: IUserService
  }) {
    this.logger = input.logger
    this.spaceTradersFormatter = input.spaceTradersFormatter
    this.spaceTradersService = input.spaceTradersService
    this.userService = input.userService
  }

  public do = async () => {
    try {
      const { payload: token, error } = await this.userService.retrieveToken()
      if (error !== undefined) throw error

      const response = await this.spaceTradersService.retrieveMyContracts(token)

      if (response instanceof Error) {
        this.logger.debug(JSON.stringify(response, null, 2))
        throw response
      }

      return this.spaceTradersFormatter.retrieveMyContracts(response)
    } catch (error) {
      if (error instanceof CustomError) {
        this.logger.debug(JSON.stringify(error, null, 2))
        throw error
      }

      throw new UnexpectedError()
    }
  }
}

export class RetrieveServerStateUC {
  private logger: ILogger
  private spaceTradersService: ISpaceTradersService

  constructor(input: { logger: ILogger; spaceTradersService: ISpaceTradersService }) {
    this.logger = input.logger
    this.spaceTradersService = input.spaceTradersService
  }

  public do = async () => {
    const response = await this.spaceTradersService.retrieveServerState()

    if (response instanceof Error) {
      this.logger.debug(JSON.stringify(response, null, 2))
      throw response
    }

    return response
  }
}

export class CreateAgentUC {
  static USERNAME_MIN_LENGTH = 3
  static USERNAME_MAX_LENGTH = 14

  logger: ILogger
  validator: (username: string) => boolean
  service: ISpaceTradersService["createAgent"]

  constructor(
    private input: {
      logger: ILogger
      validator: (username: string) => boolean
      service: ISpaceTradersService["createAgent"]
    }
  ) {
    this.validator = input.validator
    this.service = input.service

    this.logger = input.logger
  }

  public do = async (username: string): Promise<PostAgentDTO> => {
    try {
      if (!this.input.validator(username)) throw new InvalidUsernameError()

      const result = await this.service(username)

      if (result instanceof CustomError) throw result
      else return result
    } catch (error) {
      this.logger.debug(JSON.stringify(error, null, 2))
      throw error
    }
  }

  static validateUsername = (username: string) =>
    new RegExp(`^[A-Z\d]{${CreateAgentUC.USERNAME_MIN_LENGTH},${CreateAgentUC.USERNAME_MAX_LENGTH}}$`).test(username)
}
