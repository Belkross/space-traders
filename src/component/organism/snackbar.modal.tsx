import { css } from "#styled-system/css"
import { token } from "#styled-system/tokens"
import { Severity } from "../../domain/model/feedback"
import { useAppState } from "../../store"

export function SnackbarModal() {
  const { state } = useAppState()

  return (
    <dialog
      open={state.snackbarOpened}
      className={cssContainer}
      style={dynamicCssContainer(state.snackbarOpened, state.snackbarSeverity)}
    >
      <p>{state.snackbarMessage}</p>
    </dialog>
  )
}

const dynamicCssContainer = (opened: boolean, severity: Severity = "info"): React.CSSProperties => {
  return {
    display: opened ? "flex" : "none",
    backgroundColor: token(`colors.*${severity}`),
  }
}

const cssContainer = css({
  top: "*base+1",
  left: "50%",
  transform: "translate(-50%, 0)",

  flexDirection: "row",
  flexWrap: "nowrap",
  alignItems: "center",
  gap: "*base",
  padding: "*base+1",
})

// une queue de messages
// les messages ont une durée
// quand un message a fini sa durée, animation de disparition, animation d’appartion pour l’alerte suivante
// Les animations se lancent en css lorsque la modal s’ouvre/se ferme

// première chose à faire: La modal s’affiche, elle se ferme toute seule après un certain temps
