import { CustomError, NoTokenProvidedError, UnexpectedError, UnrecognizedTokenError } from "#error"
import { SpaceTradersService } from "#service"
import { STRepositoryMock } from "../mock/space-traders-repository.mock.js"

describe(SpaceTradersService.name + ".acceptContract", () => {
  test("should return the value of the request when the request succeeds", async () => {
    STRepositoryMock.postContractAcceptation = jest.fn().mockReturnValue("dumyResponse")

    const spaceTradersService = new SpaceTradersService(STRepositoryMock)
    const response = await spaceTradersService.acceptContract("dumyContractId")

    expect(response).toBe("dumyResponse")
  })

  test("should return a specific error when the request throw something handled", async () => {
    STRepositoryMock.postContractAcceptation = jest.fn().mockRejectedValue(new CustomError({ message: "dumyMessage" }))

    const spaceTradersService = new SpaceTradersService(STRepositoryMock)
    const response = await spaceTradersService.acceptContract("dumyContractId")

    expect(response).toBeInstanceOf(CustomError)
  })

  test("should return a specific error when error is unknown", async () => {
    STRepositoryMock.postContractAcceptation = jest.fn().mockRejectedValue("notACustomError")

    const spaceTradersService = new SpaceTradersService(STRepositoryMock)
    const response = await spaceTradersService.acceptContract("dumyContractId")

    expect(response).toBeInstanceOf(UnexpectedError)
  })

  test("should return a specific error when the token is not provided", async () => {
    STRepositoryMock.postContractAcceptation = jest
      .fn()
      .mockRejectedValue(new CustomError({ code: "4103", message: "dumyMessage" }))

    const spaceTradersService = new SpaceTradersService(STRepositoryMock)
    const response = await spaceTradersService.acceptContract("dumyContractId")

    expect(response).toBeInstanceOf(NoTokenProvidedError)
  })

  test("should return a specific error when the token is unrecognized", async () => {
    STRepositoryMock.postContractAcceptation = jest
      .fn()
      .mockRejectedValue(new CustomError({ message: "dumyMessage", code: "4100" }))

    const spaceTradersService = new SpaceTradersService(STRepositoryMock)
    const response = await spaceTradersService.acceptContract("dumyContractId")

    expect(response).toBeInstanceOf(UnrecognizedTokenError)
  })
})
