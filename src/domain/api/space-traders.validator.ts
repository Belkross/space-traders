import { ValueErrorIterator } from "@sinclair/typebox/errors"
import { Value } from "@sinclair/typebox/value"
import { InvalidPayloadError } from "../error/error"
import { ILogger } from "../logger"
import { ISpaceTraderValidator } from "./space-traders.api"
import { getMyProfileSchema } from "./space-traders.schema"

export class SpaceTraderValidator implements ISpaceTraderValidator {
  private logger: ILogger

  public constructor(logger: ILogger) {
    this.logger = logger
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
