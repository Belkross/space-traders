import {
  UsernameAlreadyTakenError,
  InvalidUsernameError,
  CustomError,
  InvalidPayloadError,
  UnexpectedError,
} from "#error"
import { ISpaceTradersRepository, spaceTradersRepository } from "../repository/space-traders.repository.js"
import { PostAgentDTO } from "../repository/space-traders.schema.js"

export class CreateAgentService {
  constructor(private request: ISpaceTradersRepository["postAgent"]) {}

  public do = async (username: string): Promise<PostAgentDTO | CustomError> => {
    try {
      return await this.request(username)
    } catch (error) {
      if (error instanceof CustomError) {
        if (error.code === "4111") return new UsernameAlreadyTakenError()
        if (error.code === "422") return new InvalidUsernameError({ detail: "from SpaceTraders’s api" })
        if (error instanceof InvalidUsernameError) return error
        if (error instanceof InvalidPayloadError) return error

        return new CustomError({ severity: "warning", message: error.message })
      }

      return new UnexpectedError()
    }
  }
}

export const createAgentService = new CreateAgentService(spaceTradersRepository.postAgent).do
