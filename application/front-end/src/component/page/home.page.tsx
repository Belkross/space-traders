import { SignInForm, SignUpForm } from "#component"
import { APP_NAME } from "#constant"
import { css } from "#styled-system/css"
import { RQueryEnum } from "#type"
import { spaceTradersUC } from "#use-case"
import { useQuery } from "react-query"

export function HomePage() {
  //Faire la requête. Si elle réussit on met le status vert
  //Si la requête foire, on met le statu en rouge
  //Si elle charge, on met une animation de loading
  const { data, isLoading, isError } = useQuery(RQueryEnum.retrieve_server_state, () =>
    spaceTradersUC.retrieveServerState()
  )

  const announcements = data?.announcements ?? []

  return (
    <div className={cssContainer}>
      <h1>{APP_NAME}</h1>
      <p>{`Status: ${isLoading || isError ? "OFF" : "ON"}`}</p>

      <SignUpForm />
      <SignInForm />

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
    </div>
  )
}

const cssContainer = css({
  display: "flex",
  flexDirection: "column",
  gap: "*base+2",
  padding: "*base",
})
