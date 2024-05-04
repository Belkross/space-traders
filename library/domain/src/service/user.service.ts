export interface IUserService {
  saveToken: (token: string) => Promise<void>
  retrieveToken: () => Promise<string>
}
