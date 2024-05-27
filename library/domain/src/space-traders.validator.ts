import { InvalidPayloadError } from "#error"
import {
  GetMyAgentDTO,
  GetMyContractsDTO,
  GetMyContractsSchema,
  GetServerStateDTO,
  PostAgentDTO,
  SpaceTradersApiErrorSchema,
  SpaceTradersErrorDTO,
  getMyAgentSchema,
  getServerStatusSchema,
  postAgentSchema,
} from "#schema"
import { TypeCompiler } from "@sinclair/typebox/compiler"
import { ValueErrorIterator } from "@sinclair/typebox/errors"

interface ISpaceTraderValidator {
  spaceTraderError: (payload: unknown) => SpaceTradersErrorDTO
  getServerState: (payload: unknown) => GetServerStateDTO
  getMyAgent: (payload: unknown) => GetMyAgentDTO
  postAgent: (payload: unknown) => PostAgentDTO
  getMyContracts: (payload: unknown) => GetMyContractsDTO
}

const spaceTradersErrorValidator = TypeCompiler.Compile(SpaceTradersApiErrorSchema)
const getServerStatusValidator = TypeCompiler.Compile(getServerStatusSchema)
const getMyAgentValidator = TypeCompiler.Compile(getMyAgentSchema)
const postAgentValidator = TypeCompiler.Compile(postAgentSchema)
const getMyContractsValidator = TypeCompiler.Compile(GetMyContractsSchema)

export class SpaceTraderValidator implements ISpaceTraderValidator {
  public constructor() {}

  public getMyContracts = (payload: unknown) => {
    if (!getMyContractsValidator.Check(payload)) {
      const detail = this.createDetailError(this.getMyContracts.name, getMyContractsValidator.Errors(payload))
      throw new InvalidPayloadError(detail)
    }

    return payload
  }

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
