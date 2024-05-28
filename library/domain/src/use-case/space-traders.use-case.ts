import { Agent, Contract } from "#model"
import { ISpaceTradersRepository, spaceTradersRepository } from "../repository/space-traders.repository.js"
import { GetServerStateDTO, PostAgentDTO } from "#schema"
import { ISpaceTradersService, spaceTradersService } from "../service/space-traders.service.js"
import { CustomError, ILogger, ISpaceTraderFormatter, InvalidUsernameError, spaceTradersFormatter } from "../index.js"

export interface ISpaceTradersUC {
  createAgent: (username: string) => Promise<PostAgentDTO>
  retrieveServerState: () => Promise<GetServerStateDTO>
  login: (token: string) => Promise<Agent>
  retrieveMyContracts: () => Promise<Array<Contract>>
  acceptContract: (contractId: string) => Promise<Contract>
}

export async function acceptContractUC(contractId: string) {
  const response = await spaceTradersService.acceptContract(contractId, spaceTradersRepository.postContractAcceptation)

  if (response instanceof Error) throw response
  else return spaceTradersFormatter.acceptContract(response)
}

export async function retrieveMyContractsUCPrev() {
  const response = await spaceTradersService.retrieveMyContracts(spaceTradersRepository.getMyContracts)

  if (response instanceof Error) throw response
  else return spaceTradersFormatter.retrieveMyContracts(response)
}

export class RetrieveContractsUC {
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

export async function retrieveServerStateUC() {
  const response = await spaceTradersService.retrieveServerState(spaceTradersRepository.getServerState)

  if (response instanceof Error) throw response
  else return response
}

export async function loginUC(token: string) {
  const response = await spaceTradersService.retrieveMyAgent(token, spaceTradersRepository.getMyAgent)

  if (response instanceof Error) throw response
  else return spaceTradersFormatter.getMyAgent(response)
}

export class CreateAgentUC {
  static USERNAME_MIN_LENGTH = 3
  static USERNAME_MAX_LENGTH = 14

  validator: (username: string) => boolean
  service: ISpaceTradersService["createAgent"]
  request: ISpaceTradersRepository["postAgent"]

  constructor(
    private input: {
      validator: (username: string) => boolean
      service: ISpaceTradersService["createAgent"]
      request: ISpaceTradersRepository["postAgent"]
    }
  ) {
    this.validator = input.validator
    this.service = input.service
    this.request = input.request
  }

  public do = async (username: string): Promise<PostAgentDTO> => {
    if (!this.input.validator(username)) throw new InvalidUsernameError()

    const result = await this.service(username, this.request)

    if (result instanceof CustomError) throw result
    else return result
  }

  static validateUsername = (username: string) =>
    new RegExp(`^[A-Z\d]{${CreateAgentUC.USERNAME_MIN_LENGTH},${CreateAgentUC.USERNAME_MAX_LENGTH}}$`).test(username)
}

export const createAgentUC = new CreateAgentUC({
  validator: CreateAgentUC.validateUsername,
  service: spaceTradersService.createAgent,
  request: spaceTradersRepository.postAgent,
}).do
