import { ChangeEvent, useState } from "react"
import { useMutation } from "react-query"
import { RQueryEnum } from "#type"
import { spaceTradersUC } from "#use-case"
import { displayFeedback } from "../../helper/display-feedback"
import { CustomError, Feedback, feedback } from "@library/domain"

export function ShipyardVisitor() {
  const [input, setInput] = useState("")
  const [shipTypes, setShipTypes] = useState<Array<string>>([])
  const [currentShipyard, setCurrentShipyard] = useState("none")

  const handleSubmit = useMutation(RQueryEnum.retrieve_shipyard, {
    mutationFn: (waypoint: string) => spaceTradersUC.retrieveShipyard(waypoint),

    onSuccess: (data) => {
      setShipTypes(data.shipTypes.map((item) => item.type))
      setCurrentShipyard(data.symbol)
    },

    onError: (error) => {
      if (error instanceof CustomError) {
        displayFeedback(new Feedback({ message: error.message, severity: error.severity }))
      } else {
        displayFeedback(feedback.unexpected)
      }
    },
  })

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value.toUpperCase())
  }

  return (
    <>
      <input value={input} type="text" placeholder="waypoint" onChange={handleInputChange} />
      <button onClick={() => handleSubmit.mutate(input)}>Visit Shipyard</button>
      <p>{`current shipyard: ${currentShipyard}`}</p>
      <p>{`type of ships available: ${shipTypes.length === 0 ? "NONE" : shipTypes.join(", ")}`}</p>
    </>
  )
}
