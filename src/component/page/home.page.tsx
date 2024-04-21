import { useQuery } from "react-query"
import { APP_NAME, TOKEN } from "#domain"
import { spaceTraderService } from "#service/space-traders.service"

import { css } from "#styled-system/css"
import { ConnectionForm } from "#component/organism/connection-form"
import { QueryKey } from "../../store"

export function HomePage() {
  const { data } = useQuery(QueryKey.getServerStatus, () => spaceTraderService.getServerStatus())

  const announcements = data?.announcements ?? []

  return (
    <div className={cssContainer}>
      <h1>{APP_NAME}</h1>
      <p>{`Status: ${data?.status}`}</p>

      <ConnectionForm />

      <p data-testid="description">{data?.description}</p>
      <div>
        <p>{`Last server reset: ${data?.resetDate}`}</p>
        <p>{`Next server reset: ${data?.serverResets.next}`}</p>
      </div>
      <ul>
        <li>{`Agents: ${data?.stats.agents}`}</li>
        <li>{`Ships: ${data?.stats.ships}`}</li>
        <li>{`Systems: ${data?.stats.systems}`}</li>
        <li>{`Waypoints: ${data?.stats.waypoints}`}</li>
      </ul>
      <h2>Announcements</h2>
      {announcements.map((element) => {
        return (
          <div key={element.title}>
            <h3>{element.title}</h3>
            <p>{element.body}</p>
          </div>
        )
      })}

      <p>{`Version: ${data?.version}`}</p>
      <p>{TOKEN}</p>
    </div>
  )
}

const cssContainer = css({
  display: "flex",
  flexDirection: "column",
  gap: "*base+2",
  padding: "*base",
})

// Connecter un compte
// XXX Recevoir un token avec un input
// XXX Valider le token avec un bouton
// XXX Expliquer le fonctionnement de la connexion avec le token
// XXX Vérifier le token avec la récupération des détails d’un agent
// gérer lorsque le token est invalide avec la snackbar
// XXX si le token est valide, on passe à la page de jeu
// XXX afficher les données de l’agent sur la page de jeu
// XXX changer le nom de la query pour le login et celle pour la home page
