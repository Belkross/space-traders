export async function sleep(durationInMs: number): Promise<void> {
  return await new Promise<void>((resolve) => {
    setTimeout(() => resolve(), durationInMs)
  })
}
