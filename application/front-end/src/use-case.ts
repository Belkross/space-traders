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
  RetrieveMyShipsUC,
  RetrieveShipyardUC,
  RetrieveShipyardsInSystemUC,
} from "@library/domain"
import { logger } from "#service"

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

const retrieveMyShipsUC = new RetrieveMyShipsUC({
  logger: logger,
  spaceTradersFormatter: spaceTradersFormatter,
  spaceTradersRepository: spaceTradersRepository,
  spaceTradersService: spaceTradersService,
}).do

const retrieveShipyardsInSystemUC = new RetrieveShipyardsInSystemUC({
  logger: logger,
  spaceTradersFormatter: spaceTradersFormatter,
  spaceTradersRepository: spaceTradersRepository,
  spaceTradersService: spaceTradersService,
}).do

const retrieveShipyardUC = new RetrieveShipyardUC({
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
  retrieveMyShips: retrieveMyShipsUC,
  retrieveShipyardsInSystem: retrieveShipyardsInSystemUC,
  retrieveShipyard: retrieveShipyardUC,
}