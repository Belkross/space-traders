import { APP_NAME, TOKEN, SpaceTraderService, ILogger, SpaceTraderValidator, SpaceTraderApi } from "#domain"
import { SpaceTraderFormatter } from "../../domain/service/space-trader.formatter"

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
const spaceTradersApi = new SpaceTraderApi({ logger, validator, token: TOKEN })
const spaceTraderService = new SpaceTraderService({ logger, spaceTradersApi, formatter })

export function HomePage() {
  const handleClick = async () => {
    const agent = await spaceTraderService.getMyProfile()

    console.log(agent)
  }

  return (
    <>
      <h1>{APP_NAME}</h1>
      <button onClick={() => handleClick()}>Log agent information</button>
    </>
  )
}
