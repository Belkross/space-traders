import { IUserRepository, IUserService, SingletonNotInitializedError } from "@library/domain"
import { userRepository } from "../repository/user.repository"

class UserService implements IUserService {
  private static instance: UserService | undefined
  private userRepository: IUserRepository

  private constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository
  }

  public static initialize(userRepository: IUserRepository) {
    UserService.instance = new UserService(userRepository)
  }

  public static getInstance() {
    if (UserService.instance === undefined) {
      throw new SingletonNotInitializedError(UserService.name)
    }

    return UserService.instance
  }

  async saveToken(token: string): Promise<void> {
    await this.userRepository.postToken(token)
  }

  async retrieveToken(): Promise<string> {
    return await this.userRepository.getToken()
  }
}

UserService.initialize(userRepository)

export const userService = UserService.getInstance()
