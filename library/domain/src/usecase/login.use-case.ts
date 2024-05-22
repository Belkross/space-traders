import { spaceTradersService } from "../service/space-traders.service.js"

export async function loginUC(token: string) {
  const response = await spaceTradersService.retrieveMyAgent(token)

  if (response instanceof Error) throw response
  else return response
}
