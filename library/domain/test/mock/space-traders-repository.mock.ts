import { ISpaceTradersRepository } from "#repository"

export const STRepositoryMock: ISpaceTradersRepository = {
  getMyAgent: jest.fn(),
  postAgent: jest.fn(),
  getMyContracts: jest.fn(),
  postContractAcceptation: jest.fn(),
  getMyShips: jest.fn(),
  getServerState: jest.fn(),
  getShipyard: jest.fn(),
  getWaypointsInSystem: jest.fn(),
}
