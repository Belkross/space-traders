import { useQuery } from "react-query"
import { APP_NAME } from "#domain"
import { spaceTraderService } from "#service/space-traders.service"

import { css } from "#styled-system/css"

export function HomePage() {
  const { data, isLoading, error } = useQuery("todos", () => spaceTraderService.getServerStatus())

  const announcements = data?.announcements ?? []

  return (
    <div className={cssContainer}>
      <h1>{APP_NAME}</h1>
      <p>{`Status: ${data?.status}`}</p>

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
