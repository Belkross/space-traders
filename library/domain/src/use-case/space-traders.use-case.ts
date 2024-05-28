import { Agent, Contract } from "#model"
import { ISpaceTradersRepository, spaceTradersRepository } from "../repository/space-traders.repository.js"
import { GetServerStateDTO, PostAgentDTO } from "#schema"
import { ISpaceTradersService, spaceTradersService } from "../service/space-traders.service.js"
import { CustomError, InvalidUsernameError, formatter } from "../index.js"

interface ISpaceTradersUC {
  createAgent: (username: string) => Promise<PostAgentDTO>
  retrieveServerState: () => Promise<GetServerStateDTO>
  login: (token: string) => Promise<Agent>
  retrieveMyContracts: () => Promise<Array<Contract>>
  acceptContract: (contractId: string) => Promise<Contract>
}

export async function acceptContract(contractId: string) {
  const response = await spaceTradersService.acceptContract(contractId, spaceTradersRepository.postContractAcceptation)

  if (response instanceof Error) throw response
  else return formatter.acceptContract(response)
}

export async function retrieveMyContracts() {
  const response = await spaceTradersService.retrieveMyContracts(spaceTradersRepository.getMyContracts)

  if (response instanceof Error) throw response
  else return formatter.retrieveMyContracts(response)
}

export async function retrieveServerState() {
  const response = await spaceTradersService.retrieveServerState(spaceTradersRepository.getServerState)

  if (response instanceof Error) throw response
  else return response
}

export async function login(token: string) {
  const response = await spaceTradersService.retrieveMyAgent(token, spaceTradersRepository.getMyAgent)

  if (response instanceof Error) throw response
  else return formatter.getMyAgent(response)
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

const createAgent = new CreateAgentUC({
  validator: CreateAgentUC.validateUsername,
  service: spaceTradersService.createAgent,
  request: spaceTradersRepository.postAgent,
}).do

export const spaceTradersUC: ISpaceTradersUC = {
  createAgent,
  retrieveServerState,
  login,
  retrieveMyContracts,
  acceptContract,
}
