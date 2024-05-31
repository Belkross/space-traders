import { SpaceTradersService } from "#service"
import { STRepositoryMock } from "../mock/space-traders-repository.mock.js"

describe(SpaceTradersService.name, () => {
  test("should return the value of the request when the request succeeds", async () => {
    STRepositoryMock.getServerState = jest.fn().mockReturnValue("dumyResponse")

    const spaceTradersService = new SpaceTradersService(STRepositoryMock)
    const response = await spaceTradersService.retrieveServerState()

    expect(response.payload).toBe("dumyResponse")
    expect(response.error).toBeUndefined()
  })
})

/* import { InvalidPayloadError, UnexpectedError } from "#error"
import { retrieveServerState } from "#service"

beforeEach(() => {
  jest.clearAllMocks()
})

describe.skip(retrieveServerState.name, () => {
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
 */
