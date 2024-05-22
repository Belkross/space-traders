import { CustomError, InvalidPayloadError, NoTokenProvidedError, UnexpectedError, UnrecognizedTokenError } from "#error"
import { retrieveMyAgent } from "#service"

describe(retrieveMyAgent.name, () => {
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
