import React from "react"
import ReactDOM from "react-dom/client"
import { App } from "#component/App"
import { Providers } from "#component/providers"
import "./index.css"
import "@fontsource/roboto"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Providers>
      <App />
    </Providers>
  </React.StrictMode>
)
