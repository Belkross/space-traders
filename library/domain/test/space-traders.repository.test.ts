import { SpaceTradersRepository } from "#repository"
import { SpaceTraderValidator, spaceTraderValidator } from "#validator"

function logPayload(payload: unknown) {
  console.log(JSON.stringify(payload, null, 2))
}

describe.skip(SpaceTradersRepository.name, () => {
  const validator = new SpaceTraderValidator()
  const spaceTradersRepository = new SpaceTradersRepository(spaceTraderValidator)
  const TEST_TOKEN =
    "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZGVudGlmaWVyIjoiQVpVUiIsInZlcnNpb24iOiJ2Mi4yLjAiLCJyZXNldF9kYXRlIjoiMjAyNC0wNS0xOSIsImlhdCI6MTcxNjU3OTE3NSwic3ViIjoiYWdlbnQtdG9rZW4ifQ.DliC_tY0ZJgrhmEysKdE-JucShDxDZLdSdBrctivzKT4Akpj2Iz1i8papMjCq74ifq3OwwDiuAI6XdYuhjk1wfKwjizocj3VZ5sz59VWv90LdE6YCvlViyjxPTKo7kW2FFl_FLw7YC-P1M4TS_8w2s7c8fc4Sv1t9V20UIIu6L2vkX2LaFU70RzEntUW3oBet38chuwQcojmWM6w7XuaUnUv1I4wBDCdAyPLcwjoYLkwvtdidSvaWNgio7Ohu4ZqeHl0qW4iIxQl3yA1LfY5JW8PospIDeVZpqAyF_GcVtc7AUNcYe8GxIRMhV3GBcr414XZbLXFdI8I705EpVdTag"
  spaceTradersRepository.setToken(TEST_TOKEN)

  test(spaceTradersRepository.getMyContracts.name, async () => {
    const response = await spaceTradersRepository.getMyContracts()
    logPayload(response)

    expect(() => validator.getMyContracts(response)).not.toThrow()
  })
})
