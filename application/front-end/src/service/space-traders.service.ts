import { SpaceTraderService, SpaceTraderValidator, SpaceTradersRepository, SpaceTraderFormatter } from "@library/domain"
import { logger } from "./logger.service"

const validator = new SpaceTraderValidator(logger)
const spaceTradersRepository = new SpaceTradersRepository({ validator })

const formatter = new SpaceTraderFormatter()
export const spaceTraderService = new SpaceTraderService(spaceTradersRepository, formatter)
