import {
  SpaceTraderService,
  ILogger,
  SpaceTraderValidator,
  SpaceTradersRepository,
  SpaceTraderFormatter,
} from "@library/domain"

const logger: ILogger = {
  info(message) {
    console.log(message)
  },
  warn(message) {
    console.warn(message)
  },
  error(message) {
    console.error(message)
  },
}

const validator = new SpaceTraderValidator(logger)
const formatter = new SpaceTraderFormatter()
const spaceTradersApi = new SpaceTradersRepository({ logger, validator })
export const spaceTraderService = new SpaceTraderService({ logger, spaceTradersApi, formatter })
