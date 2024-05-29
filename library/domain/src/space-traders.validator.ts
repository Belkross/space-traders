import { InvalidPayloadError } from "#error"
import {
  GetMyAgentDTO,
  GetMyContractsDTO,
  getMyContractsSchema,
  GetServerStateDTO,
  PostAgentDTO,
  PostContractAcceptationDTO,
  spaceTradersApiErrorSchema,
  SpaceTradersErrorDTO,
  getMyAgentSchema,
  getServerStatusSchema,
  postAgentSchema,
  postContractAcceptationSchema,
  GetMyShipsDTO,
  getMyShipsSchema,
} from "#schema"
import { TypeCompiler } from "@sinclair/typebox/compiler"
import { ValueErrorIterator } from "@sinclair/typebox/errors"

interface ISpaceTraderValidator {
  spaceTraderError: (payload: unknown) => SpaceTradersErrorDTO
  getServerState: (payload: unknown) => GetServerStateDTO
  getMyAgent: (payload: unknown) => GetMyAgentDTO
  postAgent: (payload: unknown) => PostAgentDTO
  getMyContracts: (payload: unknown) => GetMyContractsDTO
  postContractAcceptation: (payload: unknown) => PostContractAcceptationDTO
  getMyShips: (payload: unknown) => GetMyShipsDTO
}

const spaceTradersErrorValidator = TypeCompiler.Compile(spaceTradersApiErrorSchema)
const getServerStatusValidator = TypeCompiler.Compile(getServerStatusSchema)
const getMyAgentValidator = TypeCompiler.Compile(getMyAgentSchema)
const postAgentValidator = TypeCompiler.Compile(postAgentSchema)
const getMyContractsValidator = TypeCompiler.Compile(getMyContractsSchema)
const postContractAcceptationValidator = TypeCompiler.Compile(postContractAcceptationSchema)
const getMyShipsValidator = TypeCompiler.Compile(getMyShipsSchema)

export class SpaceTraderValidator implements ISpaceTraderValidator {
  public constructor() {}

  public postContractAcceptation = (payload: unknown) => {
    if (!postContractAcceptationValidator.Check(payload)) {
      const detail = this.createDetailError(
        this.postContractAcceptation.name,
        postContractAcceptationValidator.Errors(payload)
      )
      throw new InvalidPayloadError(detail)
    }

    return payload
  }

  public getMyShips = (payload: unknown) => {
    if (!getMyShipsValidator.Check(payload)) {
      const detail = this.createDetailError(this.getMyShips.name, getMyShipsValidator.Errors(payload))
      throw new InvalidPayloadError(detail)
    }

    return payload
  }

  public getMyContracts = (payload: unknown) => {
    if (!getMyContractsValidator.Check(payload)) {
      const detail = this.createDetailError(this.getMyContracts.name, getMyContractsValidator.Errors(payload))
      throw new InvalidPayloadError(detail)
    }

    return payload
  }

  /**
   * This validator ensure SpaceTradersAPI always respect the same format when returning an error
   */
  public spaceTraderError(payload: unknown) {
    if (!spaceTradersErrorValidator.Check(payload)) {
      const detail = this.createDetailError(this.spaceTraderError.name, spaceTradersErrorValidator.Errors(payload))
      throw new InvalidPayloadError(detail)
    }
    return payload
  }

  public postAgent(payload: unknown) {
    if (!postAgentValidator.Check(payload)) {
      const detail = this.createDetailError(this.postAgent.name, postAgentValidator.Errors(payload))
      throw new InvalidPayloadError(detail)
    }
    return payload
  }

  public getServerState(payload: unknown) {
    if (!getServerStatusValidator.Check(payload)) {
      const detail = this.createDetailError(this.getServerState.name, getServerStatusValidator.Errors(payload))
      throw new InvalidPayloadError(detail)
    }
    return payload
  }

  public getMyAgent(payload: unknown) {
    if (!getMyAgentValidator.Check(payload)) {
      const detail = this.createDetailError(this.getMyAgent.name, getMyAgentValidator.Errors(payload))
      throw new InvalidPayloadError(detail)
    }
    return payload
  }

  private createDetailError(from: string, errors: ValueErrorIterator): string {
    let problems = `${from}\n`

    for (const error of errors) {
      const string = `path: ${error.path}, message: ${error.message}\n`
      problems += string
    }

    return problems
  }
}

export const spaceTraderValidator = new SpaceTraderValidator()
