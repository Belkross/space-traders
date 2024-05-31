import {
  ISpaceTradersUC,
  RetrieveMyContractsUC,
  spaceTradersFormatter,
  spaceTradersService,
  CreateAgentUC,
  AcceptContractUC,
  LoginUC,
  RetrieveServerStateUC,
  RetrieveMyShipsUC,
  RetrieveShipyardUC,
  RetrieveShipyardsInSystemUC,
} from "@library/domain"
import { logger, userService } from "#service"

export const spaceTradersUC: ISpaceTradersUC = {
  createAgent: new CreateAgentUC({
    logger: logger,
    validator: CreateAgentUC.validateUsername,
    spaceTradersService: spaceTradersService,
    userService: userService,
  }).do,
  retrieveServerState: new RetrieveServerStateUC({
    logger: logger,
    spaceTradersService: spaceTradersService,
  }).do,
  login: new LoginUC({
    logger: logger,
    spaceTradersFormatter: spaceTradersFormatter,
    spaceTradersService: spaceTradersService,
  }).do,
  retrieveMyContracts: new RetrieveMyContractsUC({
    logger: logger,
    spaceTradersFormatter: spaceTradersFormatter,
    spaceTradersService: spaceTradersService,
    userService: userService,
  }).do,
  acceptContract: new AcceptContractUC({
    logger: logger,
    spaceTradersFormatter: spaceTradersFormatter,
    spaceTradersService: spaceTradersService,
    userService: userService,
  }).do,
  retrieveMyShips: new RetrieveMyShipsUC({
    logger: logger,
    spaceTradersFormatter: spaceTradersFormatter,
    spaceTradersService: spaceTradersService,
    userService: userService,
  }).do,
  retrieveShipyardsInSystem: new RetrieveShipyardsInSystemUC({
    logger: logger,
    spaceTradersFormatter: spaceTradersFormatter,
    spaceTradersService: spaceTradersService,
  }).do,
  retrieveShipyard: new RetrieveShipyardUC({
    logger: logger,
    spaceTradersFormatter: spaceTradersFormatter,
    spaceTradersService: spaceTradersService,
  }).do,
}
