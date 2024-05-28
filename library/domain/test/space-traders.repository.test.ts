import { SpaceTradersRepository } from "#repository"
import { SpaceTraderValidator, spaceTraderValidator } from "#validator"

function logPayload(payload: unknown) {
  console.log(JSON.stringify(payload, null, 2))
}

describe.skip(SpaceTradersRepository.name, () => {
  const validator = new SpaceTraderValidator()
  const spaceTradersRepository = new SpaceTradersRepository(spaceTraderValidator)
  const TEST_TOKEN =
    "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZGVudGlmaWVyIjoiSU9VIiwidmVyc2lvbiI6InYyLjIuMCIsInJlc2V0X2RhdGUiOiIyMDI0LTA1LTE5IiwiaWF0IjoxNzE2ODkwMDQwLCJzdWIiOiJhZ2VudC10b2tlbiJ9.EZYwFObQ437Ts4dIqyjWt6D_3uGjE277p2khwxvZYGwHmLjqpwrWayYikQZUqOiNhMrUbEX5ro9q-jMa30PmjFSaYTy3t4Co_JZacjsyy_JOJDH6TIkJ044hA9xaBADzmAVZZZSTryFJDykRjJlGw0VnUK_iHCCQvYg3B8gg4CYmRF0yOVy9gRZ8oT-LygW7aVb6qxnBF7fK5JwM8TJfaQD1USAWNuYANQ4FuSwPuAhoNOZFDQ0xgHXMfKmDkTL5t1kHfrnXUSUbAUzF99HRPoovMQv3WIFcs1x9nQOOkfQijxNCPFdixgn9pUmEGbmSfkm3vWwJIt2GO307tCk0uQ"
  spaceTradersRepository.setToken(TEST_TOKEN),
    test(spaceTradersRepository.getMyContracts.name, async () => {
      const response = await spaceTradersRepository.getMyContracts()
      logPayload(response)

      expect(() => validator.getMyContracts(response)).not.toThrow()
    })

  test(spaceTradersRepository.postContractAcceptation.name, async () => {
    const contractId = "clwq801sw076ls60c13jotq3g"
    const response = await spaceTradersRepository.postContractAcceptation(contractId)
    logPayload(response)

    expect(() => validator.postContractAcceptation(response)).not.toThrow()
  })
})
