export interface IAppRepo {
  getAuthorizationToken: () => Promise<string>
}
