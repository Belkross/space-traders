import { ILogger } from "@library/domain"

export const logger: ILogger = {
  info(message) {
    console.log(message)
  },
  warn(message) {
    console.warn(message)
  },
  error(message) {
    console.error(message)
  },
  debug: (message) => {
    console.log(`DEBUG: ${message}`)
  },
}
