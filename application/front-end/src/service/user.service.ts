import { CustomError, IUserRepository, IUserService } from "@library/domain"
import { userRepository } from "#repository"

class UserService implements IUserService {
  private userRepository: IUserRepository

  public constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository
  }

  public saveToken = async (token: string) => {
    try {
      await this.userRepository.postToken(token)
      return { payload: undefined, error: undefined }
    } catch (error) {
      return {
        payload: undefined,
        error: new CustomError({ message: "An error occurred while saving the token." }),
      }
    }
  }

  public retrieveToken = async () => {
    try {
      return { payload: await this.userRepository.getToken(), error: undefined }
    } catch (error) {
      return {
        payload: undefined,
        error: new CustomError({ message: "An error occurred while retrieving the token." }),
      }
    }
  }
}

export const userService = new UserService(userRepository)
