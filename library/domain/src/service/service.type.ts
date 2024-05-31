import { CustomError } from "#error"

export type ServiceResponse<PayloadType> =
  | {
      payload: PayloadType
      error: undefined
    }
  | {
      payload: undefined
      error: CustomError
    }
