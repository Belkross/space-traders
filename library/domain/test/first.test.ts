import { InvalidUsernameError } from "../src/error/index.js"
import { PostAgentDTO } from "../src/repository/space-traders.schema.js"

function createAgent({
  username,
  validator,
}: {
  username: string
  validator: (username: string) => boolean
}): Promise<PostAgentDTO> {
  /* if (validator(username) === false) throw new InvalidUsernameError()
  return true as any */

  throw new InvalidUsernameError()
}

describe(createAgent.name, () => {
  test("should be defined", () => {
    expect(createAgent).toBeDefined()
  })

  test("should throw if the username don’t pass the validator", async () => {
    const dummyUsername = "username"
    const validator = jest.fn().mockReturnValue(false)

    const agentCreation = async () => await createAgent({ username: dummyUsername, validator })

    expect(agentCreation).rejects.toThrow(InvalidUsernameError)
  })
})
