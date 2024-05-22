import { IUserRepository, NoTokenProvidedError } from "@library/domain"
class UserRepository implements IUserRepository {
  private static instance: UserRepository | undefined
  private readonly KEY_TOKEN = "space_traders_token"

  private constructor() {}

  public static getInstance(): UserRepository {
    if (UserRepository.instance === undefined) {
      UserRepository.instance = new UserRepository()
    }

    return UserRepository.instance
  }

  postToken(token: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      if (!token) reject()

      localStorage.setItem(this.KEY_TOKEN, token)
      resolve()
    })
  }

  getToken(): Promise<string> {
    return new Promise((resolve, reject) => {
      const token = localStorage.getItem(this.KEY_TOKEN)

      if (token === null) reject(new NoTokenProvidedError())
      else resolve(token)
    })
  }
}

export const userRepository = UserRepository.getInstance()
