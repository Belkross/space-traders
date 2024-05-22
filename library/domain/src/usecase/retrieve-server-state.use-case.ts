import { spaceTradersService } from "../service/space-traders.service.js"

export async function retrieveServerStateUC() {
  const response = await spaceTradersService.retrieveServerState()

  if (response instanceof Error) throw response
  else return response
}
