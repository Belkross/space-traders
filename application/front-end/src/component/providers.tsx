import { QueryClient, QueryClientProvider } from "react-query"
import React from "react"
import { AppStateProvider } from "../store"

/* every time I refocus a tab, it refetch */
const queryClient = new QueryClient({
  defaultOptions: {
    queries: { refetchOnWindowFocus: false, refetchInterval: false },
  },
})

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AppStateProvider>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </AppStateProvider>
  )
}
