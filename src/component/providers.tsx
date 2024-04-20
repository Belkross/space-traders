import { QueryClient, QueryClientProvider } from "react-query"
import React from "react"

/* every time I refocus a tab, it refetch */
const queryClient = new QueryClient()

export function Providers({ children }: { children: React.ReactNode }) {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}
