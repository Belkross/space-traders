import { Ship } from "@library/domain"

type Props = {
  ships: Array<Ship>
}

export function ShipList({ ships }: Props) {
  return ships.map((ship) => {
    return (
      <article key={ship.symbol}>
        <p>{`symbol: ${ship.symbol}`}</p>
        <p>{`owner: ${ship.owner}`}</p>
        <p>{`role: ${ship.role}`}</p>
      </article>
    )
  })
}
