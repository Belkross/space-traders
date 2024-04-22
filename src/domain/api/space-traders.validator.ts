import { ValueErrorIterator } from "@sinclair/typebox/errors"
import { Value } from "@sinclair/typebox/value"
import { InvalidPayloadError } from "../error/error"
import { ILogger } from "../logger"
import { ISpaceTraderValidator } from "./space-traders.api"
import { SpaceTradersApiErrorSchema, getMyProfileSchema, getServerStatusSchema } from "./space-traders.schema"
import { TypeCompiler } from "@sinclair/typebox/compiler"

const spaceTradersErrorValidator = TypeCompiler.Compile(SpaceTradersApiErrorSchema)
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

  public getServerStatus(payload: unknown) {
    if (!Value.Check(getServerStatusSchema, payload)) {
      this.logErrorIterator(Value.Errors(getServerStatusSchema, payload), this.getServerStatus.name)
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
