import { InvalidPayloadError, UnexpectedError } from "#error"
import { retrieveServerState } from "#service"

beforeEach(() => {
  jest.clearAllMocks()
})

describe(retrieveServerState.name, () => {
  test("should be defined", () => {
    expect(retrieveServerState).toBeDefined()
  })

  test("should do a request and return it if successful", async () => {
    const dumyResponse = "dumyResponse"
    const requestMock = jest.fn().mockReturnValue(dumyResponse)

    const response = await retrieveServerState(requestMock)

    expect(requestMock).toHaveBeenCalledTimes(1)
    expect(response).toBe(dumyResponse)
  })

  test("should return an unexpected error when the error is unknown", async () => {
    const requestMock = jest.fn().mockRejectedValue("dumyError")

    const response = await retrieveServerState(requestMock)

    expect(response).toBeInstanceOf(UnexpectedError)
  })

  test("should return a specific error when the request payload is invalid", async () => {
    const requestMock = jest.fn().mockRejectedValue(new InvalidPayloadError())

    const response = await retrieveServerState(requestMock)

    expect(response).toBeInstanceOf(InvalidPayloadError)
  })
})
