export interface IUserRepository {
  postToken: (token: string) => Promise<void>
  getToken: () => Promise<string>
}
