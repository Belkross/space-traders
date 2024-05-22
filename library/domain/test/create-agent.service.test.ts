import {
  CustomError,
  InvalidPayloadError,
  InvalidUsernameError,
  UnexpectedError,
  UsernameAlreadyTakenError,
} from "#error"
import { CreateAgentService } from "../src/service/create-agent.service.js"

describe(CreateAgentService.name, () => {
  test("should return the result of the request when success", async () => {
    const dumyUsername = "dumyUsername"
    const dumyRequestPayload = "dumyRequestPayload"
    const request = jest.fn().mockReturnValue(dumyRequestPayload)
    const createAgentService = new CreateAgentService(request)

    const result = await createAgentService.do(dumyUsername)

    expect(result).toBe(dumyRequestPayload)
  })

  test("should return an unexpected error when the error is unknown", async () => {
    const dumyUsername = "dumyUsername"
    const request = jest.fn().mockRejectedValue("dumyError")
    const createAgentService = new CreateAgentService(request)

    const result = await createAgentService.do(dumyUsername)

    expect(result).toBeInstanceOf(UnexpectedError)
  })

  test("should return a fallback error when the error known but not handled", async () => {
    const dumyUsername = "dumyUsername"
    const request = jest.fn().mockRejectedValue(new CustomError({ code: "dumyUnhandledCode", message: "dumyMessage" }))
    const createAgentService = new CreateAgentService(request)

    const result = await createAgentService.do(dumyUsername)

    expect(result).toBeInstanceOf(CustomError)
    expect(result).toHaveProperty("severity", "warning")
  })

  test("should return an error when the username don’t pass SpaceTradersAPI’s validator", async () => {
    const dumyUsername = "dumyUsername"
    const request = jest.fn().mockRejectedValue(new CustomError({ code: "422", message: "dumyMessage" }))
    const createAgentService = new CreateAgentService(request)

    const result = await createAgentService.do(dumyUsername)

    expect(result).toBeInstanceOf(InvalidUsernameError)
  })

  test("should return an error when username already taken", async () => {
    const dumyUsername = "dumyUsername"
    const request = jest.fn().mockRejectedValue(new CustomError({ code: "4111", message: "" }))
    const createAgentService = new CreateAgentService(request)

    const result = await createAgentService.do(dumyUsername)

    expect(result).toBeInstanceOf(UsernameAlreadyTakenError)
  })

  test("should return an error when request payload is invalid", async () => {
    const dumyUsername = "dumyUsername"
    const request = jest.fn().mockRejectedValue(new InvalidPayloadError())
    const createAgentService = new CreateAgentService(request)

    const result = await createAgentService.do(dumyUsername)

    expect(result).toBeInstanceOf(InvalidPayloadError)
  })
})
