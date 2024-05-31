import { SpaceTradersService } from "#service"
import { STRepositoryMock } from "../mock/space-traders-repository.mock.js"

describe(SpaceTradersService.name, () => {
  test("should return the value of the request when the request succeeds", async () => {
    STRepositoryMock.getMyShips = jest.fn().mockReturnValue("dumyResponse")

    const spaceTradersService = new SpaceTradersService(STRepositoryMock)
    const response = await spaceTradersService.retrieveMyShips("dumyToken")

    expect(response.payload).toBe("dumyResponse")
    expect(response.error).toBeUndefined()
  })
})

/* import { CustomError, UnexpectedError, NoTokenProvidedError, UnrecognizedTokenError } from "#error"
import { acceptContract, retrieveMyShipsService } from "#service"

describe.skip(retrieveMyShipsService.name, () => {
  test("should be defined", () => {
    expect(retrieveMyShipsService).toBeDefined()
  })

  test("should return the value of the request when succes", async () => {
    const contractId = "dumyContractId"
    const request = jest.fn().mockReturnValue("dumyResponse")

    const response = await acceptContract(contractId, request)

    expect(response).toBe("dumyResponse")
  })

  test("should return a specific error when the request throw something handled", async () => {
    const contractId = "dumyContractId"
    const request = jest.fn().mockRejectedValue(new CustomError({ message: "dumyMessage" }))

    const response = await acceptContract(contractId, request)

    expect(response).toBeInstanceOf(CustomError)
  })

  test("should return a specific error when error is unknown", async () => {
    const contractId = "dumyContractId"
    const request = jest.fn().mockRejectedValue("dumyException")

    const response = await acceptContract(contractId, request)

    expect(response).toBeInstanceOf(UnexpectedError)
  })

  test("should return a specific error when the token is not provided", async () => {
    const contractId = "dumyContractId"
    const request = jest.fn().mockRejectedValue(new CustomError({ code: "4103", message: "dumyMessage" }))

    const response = await acceptContract(contractId, request)

    expect(response).toBeInstanceOf(NoTokenProvidedError)
  })

  test("should return a specific error when the token is unrecognized", async () => {
    const contractId = "dumyContractId"
    const request = jest.fn().mockRejectedValue(new CustomError({ message: "dumyMessage", code: "4100" }))

    const response = await acceptContract(contractId, request)

    expect(response).toBeInstanceOf(UnrecognizedTokenError)
  })
})
 */
