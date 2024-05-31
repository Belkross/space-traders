import { IUserRepository } from "@library/domain"
class UserRepository implements IUserRepository {
  private readonly KEY_TOKEN = "space_traders_api_token"

  public constructor() {}

  public postToken = async (token: string) => {
    return new Promise<void>((resolve, reject) => {
      if (!token) reject()

      localStorage.setItem(this.KEY_TOKEN, token)
      resolve()
    })
  }

  public getToken = async () => {
    return new Promise<string>((resolve, reject) => {
      const token = localStorage.getItem(this.KEY_TOKEN)

      if (token === null || token === "") reject()
      else resolve(token)
    })
  }
}

export const userRepository = new UserRepository()
