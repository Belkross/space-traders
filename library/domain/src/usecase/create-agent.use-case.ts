import { CustomError } from "../error/error-builder.js"
import { InvalidUsernameError } from "../error/space-traders.error.js"
import { PostAgentDTO } from "../repository/space-traders.schema.js"
import { ISpaceTradersService, spaceTradersService } from "../service/space-traders.service.js"

const USERNAME_MIN_LENGTH = 3
const USERNAME_MAX_LENGTH = 14

export const validateUsername = (username: string) =>
  new RegExp(`^[A-Z\d]{${USERNAME_MIN_LENGTH},${USERNAME_MAX_LENGTH}}$`).test(username)

export class CreateAgentUC {
  constructor(private validator: (username: string) => boolean, private service: ISpaceTradersService["createAgent"]) {}

  public do = async (username: string): Promise<PostAgentDTO> => {
    if (!this.validator(username)) throw new InvalidUsernameError()

    const result = await this.service(username)

    if (result instanceof CustomError) throw result
    else return result
  }
}

export const createAgentUC = new CreateAgentUC(validateUsername, spaceTradersService.createAgent).do
