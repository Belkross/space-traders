import { SpaceTradersService } from "#service"
import { STRepositoryMock } from "../mock/space-traders-repository.mock.js"

describe(SpaceTradersService.name, () => {
  test("should return the value of the request when the request succeeds", async () => {
    STRepositoryMock.postAgent = jest.fn().mockReturnValue("dumyResponse")

    const spaceTradersService = new SpaceTradersService(STRepositoryMock)
    const response = await spaceTradersService.createAgent("dumyUsername")

    expect(response.payload).toBe("dumyResponse")
    expect(response.error).toBeUndefined()
  })

  /*   test("should return an unexpected error when the error is unknown", async () => {
    const dumyUsername = "dumyUsername"
    const request = jest.fn().mockRejectedValue("dumyError")

    const result = await createAgent(dumyUsername, request)

    expect(result).toBeInstanceOf(UnexpectedError)
  })

  test("should return a fallback error when the error known but not handled", async () => {
    const dumyUsername = "dumyUsername"
    const request = jest.fn().mockRejectedValue(new CustomError({ code: "dumyUnhandledCode", message: "dumyMessage" }))

    const result = await createAgent(dumyUsername, request)

    expect(result).toBeInstanceOf(CustomError)
    expect(result).toHaveProperty("severity", "warning")
  })

  test("should return an error when the username don’t pass SpaceTradersAPI’s validator", async () => {
    const dumyUsername = "dumyUsername"
    const request = jest.fn().mockRejectedValue(new CustomError({ code: "422", message: "dumyMessage" }))

    const result = await createAgent(dumyUsername, request)

    expect(result).toBeInstanceOf(InvalidUsernameError)
  })

  test("should return an error when username already taken", async () => {
    const dumyUsername = "dumyUsername"
    const request = jest.fn().mockRejectedValue(new CustomError({ code: "4111", message: "" }))

    const result = await createAgent(dumyUsername, request)

    expect(result).toBeInstanceOf(UsernameAlreadyTakenError)
  })

  test("should return an error when request payload is invalid", async () => {
    const dumyUsername = "dumyUsername"
    const request = jest.fn().mockRejectedValue(new InvalidPayloadError())

    const result = await createAgent(dumyUsername, request)

    expect(result).toBeInstanceOf(InvalidPayloadError)
  }) */
})
