import { SpaceTradersService } from "#service"
import { STRepositoryMock } from "../mock/space-traders-repository.mock.js"

describe(SpaceTradersService.name, () => {
  test("should return the value of the request when the request succeeds", async () => {
    STRepositoryMock.getMyContracts = jest.fn().mockReturnValue("dumyResponse")

    const spaceTradersService = new SpaceTradersService(STRepositoryMock)
    const response = await spaceTradersService.retrieveMyContracts("dumyToken")

    expect(response.payload).toBe("dumyResponse")
    expect(response.error).toBeUndefined()
  })
})

/* import { CustomError, NoTokenProvidedError, UnexpectedError, UnrecognizedTokenError } from "#error"
import { retrieveMyContracts } from "#service"

describe.skip(retrieveMyContracts.name, () => {
  test("should be defined", () => {
    expect(retrieveMyContracts).toBeDefined()
  })

  test("should return the value of the request when succes", async () => {
    const request = jest.fn().mockReturnValue("dumyResponse")

    const response = await retrieveMyContracts(request)

    expect(response).toBe("dumyResponse")
  })

  test("should return a specific error when the request throw something handled", async () => {
    const request = jest.fn().mockRejectedValue(new CustomError({ message: "dumyMessage" }))

    const response = await retrieveMyContracts(request)

    expect(response).toBeInstanceOf(CustomError)
  })

  test("should return a specific error when error is unknown", async () => {
    const request = jest.fn().mockRejectedValue("dumyException")

    const response = await retrieveMyContracts(request)

    expect(response).toBeInstanceOf(UnexpectedError)
  })

  test("should return a specific error when the token is not provided", async () => {
    const request = jest.fn().mockRejectedValue(new CustomError({ code: "4103", message: "dumyMessage" }))

    const response = await retrieveMyContracts(request)

    expect(response).toBeInstanceOf(NoTokenProvidedError)
  })

  test("should return a specific error when the token is unrecognized", async () => {
    const request = jest.fn().mockRejectedValue(new CustomError({ message: "dumyMessage", code: "4100" }))

    const response = await retrieveMyContracts(request)

    expect(response).toBeInstanceOf(UnrecognizedTokenError)
  })
})
 */
