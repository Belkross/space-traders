import { ValueErrorIterator } from "@sinclair/typebox/errors"
import { InvalidPayloadError, SingletonNotInitializedError } from "#error"
import { ISpaceTraderValidator } from "./space-traders.repository.js"
import {
  SpaceTradersApiErrorSchema,
  getMyAgentSchema,
  getServerStatusSchema,
  postAgentSchema,
} from "./space-traders.schema.js"
import { TypeCompiler } from "@sinclair/typebox/compiler"

const spaceTradersErrorValidator = TypeCompiler.Compile(SpaceTradersApiErrorSchema)
const getServerStatusValidator = TypeCompiler.Compile(getServerStatusSchema)
const getMyAgentValidator = TypeCompiler.Compile(getMyAgentSchema)
const postAgentValidator = TypeCompiler.Compile(postAgentSchema)

export class SpaceTraderValidator implements ISpaceTraderValidator {
  private static instance: SpaceTraderValidator | undefined

  private constructor() {}

  public static initialize() {
    if (SpaceTraderValidator.instance === undefined) {
      SpaceTraderValidator.instance = new SpaceTraderValidator()
    }
  }

  public static getInstance() {
    if (SpaceTraderValidator.instance === undefined) {
      throw new SingletonNotInitializedError()
    }

    return SpaceTraderValidator.instance
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

SpaceTraderValidator.initialize()
export const spaceTraderValidator = SpaceTraderValidator.getInstance()
