import { Agent, Contract, Ship, Shipyard, Waypoint } from "#model"
import { ISpaceTradersRepository } from "#repository"
import { GetServerStateDTO, PostAgentDTO } from "#schema"
import { ISpaceTradersService } from "#service"
import { CustomError, InvalidUsernameError } from "#error"
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
  private spaceTradersRepository: ISpaceTradersRepository

  constructor(input: {
    logger: ILogger
    spaceTradersFormatter: ISpaceTraderFormatter
    spaceTradersService: ISpaceTradersService
    spaceTradersRepository: ISpaceTradersRepository
  }) {
    this.logger = input.logger
    this.spaceTradersFormatter = input.spaceTradersFormatter
    this.spaceTradersService = input.spaceTradersService
    this.spaceTradersRepository = input.spaceTradersRepository
  }

  public do = async (waypoint: string): Promise<Shipyard> => {
    const response = await this.spaceTradersService.retrieveShipyard(waypoint, this.spaceTradersRepository.getShipyard)

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
  private spaceTradersRepository: ISpaceTradersRepository

  constructor(input: {
    logger: ILogger
    spaceTradersFormatter: ISpaceTraderFormatter
    spaceTradersService: ISpaceTradersService
    spaceTradersRepository: ISpaceTradersRepository
  }) {
    this.logger = input.logger
    this.spaceTradersFormatter = input.spaceTradersFormatter
    this.spaceTradersService = input.spaceTradersService
    this.spaceTradersRepository = input.spaceTradersRepository
  }

  public do = async (system: string) => {
    const response = await this.spaceTradersService.retrieveWaypointsInSystem(
      system,
      this.spaceTradersRepository.getWaypointsInSystem
    )

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
  private spaceTradersRepository: ISpaceTradersRepository

  constructor(input: {
    logger: ILogger
    spaceTradersFormatter: ISpaceTraderFormatter
    spaceTradersService: ISpaceTradersService
    spaceTradersRepository: ISpaceTradersRepository
  }) {
    this.logger = input.logger
    this.spaceTradersFormatter = input.spaceTradersFormatter
    this.spaceTradersService = input.spaceTradersService
    this.spaceTradersRepository = input.spaceTradersRepository
  }

  public do = async () => {
    const response = await this.spaceTradersService.getMyShips(this.spaceTradersRepository.getMyShips)

    if (response instanceof Error) {
      this.logger.debug(JSON.stringify(response, null, 2))
      throw response
    }

    return this.spaceTradersFormatter.retrieveMyShips(response)
  }
}
export class AcceptContractUC {
  private logger: ILogger
  private spaceTradersFormatter: ISpaceTraderFormatter
  private spaceTradersService: ISpaceTradersService
  private spaceTradersRepository: ISpaceTradersRepository

  constructor(input: {
    logger: ILogger
    spaceTradersFormatter: ISpaceTraderFormatter
    spaceTradersService: ISpaceTradersService
    spaceTradersRepository: ISpaceTradersRepository
  }) {
    this.logger = input.logger
    this.spaceTradersFormatter = input.spaceTradersFormatter
    this.spaceTradersService = input.spaceTradersService
    this.spaceTradersRepository = input.spaceTradersRepository
  }

  public do = async (contractId: string) => {
    const response = await this.spaceTradersService.acceptContract(
      contractId,
      this.spaceTradersRepository.postContractAcceptation
    )

    if (response instanceof Error) {
      this.logger.debug(JSON.stringify(response, null, 2))
      throw response
    }

    return this.spaceTradersFormatter.acceptContract(response)
  }
}

export class LoginUC {
  private logger: ILogger
  private spaceTradersFormatter: ISpaceTraderFormatter
  private spaceTradersService: ISpaceTradersService
  private spaceTradersRepository: ISpaceTradersRepository

  constructor(input: {
    logger: ILogger
    spaceTradersFormatter: ISpaceTraderFormatter
    spaceTradersService: ISpaceTradersService
    spaceTradersRepository: ISpaceTradersRepository
  }) {
    this.logger = input.logger
    this.spaceTradersFormatter = input.spaceTradersFormatter
    this.spaceTradersService = input.spaceTradersService
    this.spaceTradersRepository = input.spaceTradersRepository
  }

  public do = async (token: string) => {
    const response = await this.spaceTradersService.retrieveMyAgent(token, this.spaceTradersRepository.getMyAgent)

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
  private spaceTradersRepository: ISpaceTradersRepository

  constructor(input: {
    logger: ILogger
    spaceTradersFormatter: ISpaceTraderFormatter
    spaceTradersService: ISpaceTradersService
    spaceTradersRepository: ISpaceTradersRepository
  }) {
    this.logger = input.logger
    this.spaceTradersFormatter = input.spaceTradersFormatter
    this.spaceTradersService = input.spaceTradersService
    this.spaceTradersRepository = input.spaceTradersRepository
  }

  public do = async () => {
    const response = await this.spaceTradersService.retrieveMyContracts(this.spaceTradersRepository.getMyContracts)

    if (response instanceof Error) {
      this.logger.debug(JSON.stringify(response, null, 2))
      throw response
    }

    return this.spaceTradersFormatter.retrieveMyContracts(response)
  }
}

export class RetrieveServerStateUC {
  private logger: ILogger
  private spaceTradersService: ISpaceTradersService
  private spaceTradersRepository: ISpaceTradersRepository

  constructor(input: {
    logger: ILogger
    spaceTradersService: ISpaceTradersService
    spaceTradersRepository: ISpaceTradersRepository
  }) {
    this.logger = input.logger
    this.spaceTradersService = input.spaceTradersService
    this.spaceTradersRepository = input.spaceTradersRepository
  }

  public do = async () => {
    const response = await this.spaceTradersService.retrieveServerState(this.spaceTradersRepository.getServerState)

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
  request: ISpaceTradersRepository["postAgent"]

  constructor(
    private input: {
      logger: ILogger
      validator: (username: string) => boolean
      service: ISpaceTradersService["createAgent"]
      request: ISpaceTradersRepository["postAgent"]
    }
  ) {
    this.validator = input.validator
    this.service = input.service
    this.request = input.request
    this.logger = input.logger
  }

  public do = async (username: string): Promise<PostAgentDTO> => {
    try {
      if (!this.input.validator(username)) throw new InvalidUsernameError()

      const result = await this.service(username, this.request)

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
