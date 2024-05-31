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
    const { payload, error } = await this.spaceTradersService.retrieveShipyard(waypoint)

    if (error) {
      this.logger.debug(JSON.stringify(error, null, 2))
      throw error
    }

    return this.spaceTradersFormatter.retrieveShipyard(payload)
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
    const { payload, error } = await this.spaceTradersService.retrieveWaypointsInSystem(system)

    if (error) {
      this.logger.debug(JSON.stringify(error, null, 2))
      throw error
    }

    return this.spaceTradersFormatter.retrieveShipyardsInSystem(payload)
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
      const { payload: token, error: userServiceError } = await this.userService.retrieveToken()
      if (userServiceError) throw userServiceError

      const { payload, error: spaceTradersServiceError } = await this.spaceTradersService.retrieveMyShips(token)
      if (spaceTradersServiceError) throw spaceTradersServiceError

      return this.spaceTradersFormatter.retrieveMyShips(payload)
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
      const { payload: token, error: userServiceError } = await this.userService.retrieveToken()
      if (userServiceError) throw userServiceError

      const { payload, error } = await this.spaceTradersService.acceptContract(token, contractId)
      if (error) throw error

      return this.spaceTradersFormatter.acceptContract(payload)
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
    const { payload, error } = await this.spaceTradersService.retrieveMyAgent(token)

    if (error) {
      this.logger.debug(JSON.stringify(error, null, 2))
      throw error
    }

    return this.spaceTradersFormatter.login(payload)
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
      const { payload: token, error: userServiceError } = await this.userService.retrieveToken()
      if (userServiceError) throw userServiceError

      const { payload, error } = await this.spaceTradersService.retrieveMyContracts(token)
      if (error) throw error

      return this.spaceTradersFormatter.retrieveMyContracts(payload)
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
    const { payload, error } = await this.spaceTradersService.retrieveServerState()

    if (error) {
      this.logger.debug(JSON.stringify(error, null, 2))
      throw error
    }

    return payload
  }
}

export class CreateAgentUC {
  static USERNAME_MIN_LENGTH = 3
  static USERNAME_MAX_LENGTH = 14

  logger: ILogger
  validator: (username: string) => boolean
  spaceTradersService: ISpaceTradersService
  userService: IUserService

  constructor(input: {
    logger: ILogger
    validator: (username: string) => boolean
    spaceTradersService: ISpaceTradersService
    userService: IUserService
  }) {
    this.validator = input.validator
    this.spaceTradersService = input.spaceTradersService
    this.logger = input.logger
    this.userService = input.userService
  }

  public do = async (username: string): Promise<PostAgentDTO> => {
    try {
      if (!this.validator(username)) throw new InvalidUsernameError()

      const { payload, error } = await this.spaceTradersService.createAgent(username)
      if (error) throw error

      this.saveToken(payload.data.token)
      return payload
    } catch (error) {
      if (error instanceof CustomError) {
        this.logger.debug(JSON.stringify(error, null, 2))
        throw error
      }

      throw new UnexpectedError()
    }
  }

  private saveToken = async (token: string) => {
    const { error } = await this.userService.saveToken(token)

    if (error !== undefined) throw error
  }

  static validateUsername = (username: string) =>
    new RegExp(`^[A-Z\d]{${CreateAgentUC.USERNAME_MIN_LENGTH},${CreateAgentUC.USERNAME_MAX_LENGTH}}$`).test(username)
}
