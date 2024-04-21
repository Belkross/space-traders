import { TOKEN, SpaceTraderService, ILogger, SpaceTraderValidator, SpaceTradersFetcher } from "#domain"
import { SpaceTraderFormatter } from "../domain/service/space-trader.formatter"

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
const spaceTradersApi = new SpaceTradersFetcher({ logger, validator })
export const spaceTraderService = new SpaceTraderService({ logger, spaceTradersApi, formatter })
