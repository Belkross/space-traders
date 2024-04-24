import React, { ReactElement } from "react"
import { act, render, RenderOptions } from "@testing-library/react"
import { Providers } from "#component/providers"

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return <Providers>{children}</Providers>
}

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, "wrapper">) =>
  render(ui, { wrapper: AllTheProviders, ...options })

export * from "@testing-library/react"
export { customRender as render }

// default values are from jsdom
export function resizeWindow(width: number, height = 768): void {
  window.innerWidth = width
  window.innerHeight = height

  act(() => {
    window.dispatchEvent(new Event("resize"))
  })
}
