import { CustomError } from "#error"

export interface IUserService {
  saveToken: (token: string) => Promise<ServiceResponse<undefined>>
  retrieveToken: () => Promise<ServiceResponse<string>>
}

type ServiceResponse<PayloadType> =
  | {
      payload: PayloadType
      error: undefined
    }
  | {
      payload: undefined
      error: CustomError
    }
