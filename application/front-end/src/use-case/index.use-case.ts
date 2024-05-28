import {
  ISpaceTradersUC,
  RetrieveMyContractsUC,
  spaceTradersFormatter,
  spaceTradersRepository,
  spaceTradersService,
  CreateAgentUC,
  AcceptContractUC,
  LoginUC,
  RetrieveServerStateUC,
} from "@library/domain"
import { logger } from "../service/logger.service"

const retrieveMyContractsUC = new RetrieveMyContractsUC({
  logger: logger,
  spaceTradersFormatter: spaceTradersFormatter,
  spaceTradersRepository: spaceTradersRepository,
  spaceTradersService: spaceTradersService,
}).do

const createAgentUC = new CreateAgentUC({
  logger: logger,
  validator: CreateAgentUC.validateUsername,
  service: spaceTradersService.createAgent,
  request: spaceTradersRepository.postAgent,
}).do

const acceptContractUC = new AcceptContractUC({
  logger: logger,
  spaceTradersFormatter: spaceTradersFormatter,
  spaceTradersRepository: spaceTradersRepository,
  spaceTradersService: spaceTradersService,
}).do

const loginUC = new LoginUC({
  logger: logger,
  spaceTradersFormatter: spaceTradersFormatter,
  spaceTradersRepository: spaceTradersRepository,
  spaceTradersService: spaceTradersService,
}).do

const retrieveServerStateUC = new RetrieveServerStateUC({
  logger: logger,
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
