import { CustomError, NoTokenProvidedError, UnexpectedError, UnrecognizedTokenError } from "#error"
import { SpaceTradersService } from "#service"
import { STRepositoryMock } from "../mock/space-traders-repository.mock.js"

describe(SpaceTradersService.name + ".acceptContract", () => {
  test("should return the value of the request when the request succeeds", async () => {
    STRepositoryMock.postContractAcceptation = jest.fn().mockReturnValue("dumyResponse")

    const spaceTradersService = new SpaceTradersService(STRepositoryMock)
    const response = await spaceTradersService.acceptContract("dumyToken", "dumyContractId")

    expect(response.payload).toBe("dumyResponse")
    expect(response.error).toBeUndefined()
  })

  test("should return a specific error when the request throw something handled", async () => {
    STRepositoryMock.postContractAcceptation = jest.fn().mockRejectedValue(new CustomError({ message: "dumyMessage" }))

    const spaceTradersService = new SpaceTradersService(STRepositoryMock)
    const response = await spaceTradersService.acceptContract("dumyToken", "dumyContractId")

    expect(response.error).toBeInstanceOf(CustomError)
    expect(response.payload).toBeUndefined()
  })

  test("should return a specific error when error is unknown", async () => {
    STRepositoryMock.postContractAcceptation = jest.fn().mockRejectedValue("notACustomError")

    const spaceTradersService = new SpaceTradersService(STRepositoryMock)
    const response = await spaceTradersService.acceptContract("dumyToken", "dumyContractId")

    expect(response.error).toBeInstanceOf(UnexpectedError)
    expect(response.payload).toBeUndefined()
  })

  test("should return a specific error when the token is not provided", async () => {
    STRepositoryMock.postContractAcceptation = jest
      .fn()
      .mockRejectedValue(new CustomError({ code: "4103", message: "dumyMessage" }))

    const spaceTradersService = new SpaceTradersService(STRepositoryMock)
    const response = await spaceTradersService.acceptContract("dumyToken", "dumyContractId")

    expect(response.error).toBeInstanceOf(NoTokenProvidedError)
    expect(response.payload).toBeUndefined()
  })

  test("should return a specific error when the token is unrecognized", async () => {
    STRepositoryMock.postContractAcceptation = jest
      .fn()
      .mockRejectedValue(new CustomError({ message: "dumyMessage", code: "4100" }))

    const spaceTradersService = new SpaceTradersService(STRepositoryMock)
    const response = await spaceTradersService.acceptContract("dumyToken", "dumyContractId")

    expect(response.error).toBeInstanceOf(UnrecognizedTokenError)
    expect(response.payload).toBeUndefined()
  })
})
