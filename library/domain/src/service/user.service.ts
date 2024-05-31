import { ServiceResponse } from "./service.type.js"

export interface IUserService {
  saveToken: (token: string) => Promise<ServiceResponse<undefined>>
  retrieveToken: () => Promise<ServiceResponse<string>>
}
