import React from "react"
import ReactDOM from "react-dom/client"
import { App } from "#component/App"
import "./index.css"
import "@fontsource/roboto"
import { Providers } from "#component/provider/providers"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Providers>
      <App />
    </Providers>
  </React.StrictMode>
)
