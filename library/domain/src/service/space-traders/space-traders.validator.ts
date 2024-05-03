import { ValueErrorIterator } from "@sinclair/typebox/errors"
import { Value } from "@sinclair/typebox/value"
import { InvalidPayloadError } from "../../error/index.js"
import { ILogger } from "../../logger.js"
import { ISpaceTraderValidator } from "../../repository/space-traders.repository.js"
import {
  SpaceTradersApiErrorSchema,
  getMyProfileSchema,
  getServerStatusSchema,
  postAgentSchema,
} from "./space-traders.schema.js"
import { TypeCompiler } from "@sinclair/typebox/compiler"

const spaceTradersErrorValidator = TypeCompiler.Compile(SpaceTradersApiErrorSchema)
const getServerStatusValidator = TypeCompiler.Compile(getServerStatusSchema)
const postAgentValidator = TypeCompiler.Compile(postAgentSchema)
export class SpaceTraderValidator implements ISpaceTraderValidator {
  private logger: ILogger

  public constructor(logger: ILogger) {
    this.logger = logger
  }

  public spaceTraderError(payload: unknown) {
    if (!spaceTradersErrorValidator.Check(payload)) {
      this.logErrorIterator(spaceTradersErrorValidator.Errors(payload), this.spaceTraderError.name)
      throw new InvalidPayloadError(this.spaceTraderError.name)
    }
    return payload
  }

  public postAgent(payload: unknown) {
    if (!postAgentValidator.Check(payload)) {
      this.logErrorIterator(postAgentValidator.Errors(payload), this.postAgent.name)
      throw new InvalidPayloadError(this.postAgent.name)
    }
    return payload
  }

  public getServerStatus(payload: unknown) {
    if (!getServerStatusValidator.Check(payload)) {
      this.logErrorIterator(getServerStatusValidator.Errors(payload), this.getServerStatus.name)
      throw new InvalidPayloadError(this.getServerStatus.name)
    }
    return payload
  }

  public getMyProfile(payload: unknown) {
    if (!Value.Check(getMyProfileSchema, payload)) {
      this.logErrorIterator(Value.Errors(getMyProfileSchema, payload), this.getMyProfile.name)
      throw new InvalidPayloadError(this.getMyProfile.name)
    }
    return payload
  }

  private logErrorIterator(errors: ValueErrorIterator, from?: string): void {
    for (const error of errors) {
      this.logger.info(`InvalidPayloadError ${from}, path: ${error.path}, message: ${error.message}`)
    }
  }
}
