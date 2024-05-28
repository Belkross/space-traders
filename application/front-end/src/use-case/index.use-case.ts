import {
  ISpaceTradersUC,
  RetrieveContractsUC,
  spaceTradersFormatter,
  spaceTradersRepository,
  createAgentUC,
  retrieveServerStateUC,
  loginUC,
  acceptContractUC,
  spaceTradersService,
} from "@library/domain"
import { logger } from "../service/logger.service"

const retrieveMyContractsUC = new RetrieveContractsUC({
  logger: logger,
  spaceTradersFormatter: spaceTradersFormatter,
  spaceTradersRepository: spaceTradersRepository,
  spaceTradersService: spaceTradersService,
}).do

export const spaceTradersUC: ISpaceTradersUC = {
  createAgent: createAgentUC,
  retrieveServerState: retrieveServerStateUC,
  login: loginUC,
  retrieveMyContracts: retrieveMyContractsUC,
  acceptContract: acceptContractUC,
}
