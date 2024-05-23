import { SpaceTradersRepository } from "#repository"
import { SpaceTraderValidator, spaceTraderValidator } from "#validator"

function logPayload(payload: unknown) {
  console.log(JSON.stringify(payload, null, 2))
}

describe.skip(SpaceTradersRepository.name, () => {
  const validator = new SpaceTraderValidator()
  const spaceTradersRepository = new SpaceTradersRepository(spaceTraderValidator)
  const TEST_TOKEN =
    "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZGVudGlmaWVyIjoiQUxCRVJUIiwidmVyc2lvbiI6InYyLjIuMCIsInJlc2V0X2RhdGUiOiIyMDI0LTA1LTE5IiwiaWF0IjoxNzE2NDc3NTk0LCJzdWIiOiJhZ2VudC10b2tlbiJ9.PgA1TeiEuV4q1hhUcnerXTatUCR-xBXLST19d32x59cVg8pSKDUvZq4GERGPHuOMswEyNP3ruwnmCCghrSrjEKFsiN15PssPwgfOKQpd7EmagrJxbEvHHY9UImfx1_yIRnmCo4JY-JwblR6r7JUIq5MMqqi5fW_FkUacNHGGc_dA7D95aUZ69qaFBRxVLMFvBVnobiLA8FtrBdIX1M2RE671npPQNmhmM0482yXqpERxivn4woKrSELCj0ukgoq6Zazpk79Hrato-77LDvbMCqNn3aWvN_VvoHEslyowrSdkgWik1Kv-FZboiBHtryd0MS7DlWe8t8TVJzjF9lHXxg"
  spaceTradersRepository.setToken(TEST_TOKEN)

  test(spaceTradersRepository.getMyContracts.name, async () => {
    const response = await spaceTradersRepository.getMyContracts()
    logPayload(response)

    expect(() => validator.getMyContracts(response)).not.toThrow()
  })
})
