import { css } from "#styled-system/css"

export function NewAgentForm() {
  return (
    <div className={cssContainer}>
      <h2>Register a new agent</h2>
      <p>Provide the token associated to your account to log in.</p>
      <input type="text" aria-label="new agent input" placeholder="Username" />
      <button>Create agent</button>
    </div>
  )
}

const cssContainer = css({
  display: "flex",
  flexDirection: "column",
  flexWrap: "nowrap",
  gap: "*base",
  justifyContent: "center",
  alignItems: "center",
  borderWidth: "*base",
  padding: "*base",
  maxWidth: "400px",
})
