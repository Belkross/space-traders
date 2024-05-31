import { SpaceTradersService } from "#service"
import { STRepositoryMock } from "../mock/space-traders-repository.mock.js"

describe(SpaceTradersService.name, () => {
  test("should return the value of the request when the request succeeds", async () => {
    STRepositoryMock.getMyAgent = jest.fn().mockReturnValue("dumyResponse")

    const spaceTradersService = new SpaceTradersService(STRepositoryMock)
    const response = await spaceTradersService.retrieveMyAgent("dumyToken")

    expect(response.payload).toBe("dumyResponse")
    expect(response.error).toBeUndefined()
  })
})

/* import { CustomError, InvalidPayloadError, NoTokenProvidedError, UnexpectedError, UnrecognizedTokenError } from "#error"

describe.skip(retrieveMyAgent.name, () => {
  test("should do a request and return it when successful", async () => {
    const dumyResponse = "dumyResponse"
    const dumyToken = "dumyToken"
    const requestMock = jest.fn().mockReturnValue(dumyResponse)

    const response = await retrieveMyAgent(dumyToken, requestMock)

    expect(requestMock).toHaveBeenCalledTimes(1)
    expect(response).toBe(dumyResponse)
  })

  test("should return an unexpected error when the error is unknown", async () => {
    const dumyToken = "dumyToken"
    const requestMock = jest.fn().mockRejectedValue("dumyError")

    const response = await retrieveMyAgent(dumyToken, requestMock)

    expect(response).toBeInstanceOf(UnexpectedError)
  })

  test("should return a specific error when the request payload is invalid", async () => {
    const dumyToken = "dumyToken"
    const requestMock = jest.fn().mockRejectedValue(new InvalidPayloadError())

    const response = await retrieveMyAgent(dumyToken, requestMock)

    expect(response).toBeInstanceOf(InvalidPayloadError)
  })

  test("should return a specific error when no token provided", async () => {
    const dumyToken = "dumyToken"
    const requestMock = jest.fn().mockRejectedValue(new CustomError({ code: "4103", message: "dumyMessage" }))

    const response = await retrieveMyAgent(dumyToken, requestMock)

    expect(response).toBeInstanceOf(NoTokenProvidedError)
  })

  test("should return a specific error when the provided token is unrecognized", async () => {
    const dumyToken = "dumyToken"
    const requestMock = jest.fn().mockRejectedValue(new CustomError({ code: "4100", message: "dumyMessage" }))

    const response = await retrieveMyAgent(dumyToken, requestMock)

    expect(response).toBeInstanceOf(UnrecognizedTokenError)
  })
})
 */
