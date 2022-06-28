import { useState } from "react"
import CreateBoard from "./gameBoard.js"
import Array from "./playGround.js"

const CreateStartBtns = () => {
  const [selectValue, setSelectValue] = useState(5)
  const [gameBoard, setGameBoard] = useState("")

  return (
    <div className="gameBody" id="gameBody">
      <div className="buttons">
        <button
          className="start"
          id="start"
          onClick={() => {
            const primaryArray = Array.createMultidimensionalArray(selectValue)
            const newGameArray = Array.setAllPlayersLocation(
              primaryArray,
              selectValue
            )
            console.log(newGameArray)
            setGameBoard(
              <CreateBoard boardSize={selectValue} gameArr={newGameArray} />
            )
          }}
        >
          START
        </button>
        <select
          className="size"
          onChange={(ev) => {
            const selectedValue = Number(ev.target.value)
            setSelectValue(selectedValue)
          }}
        >
          <option value="5">5 * 5</option>
          <option value="7">7 * 7</option>
          <option value="10">10 * 10</option>
        </select>
      </div>
      {gameBoard}
    </div>
  )
}

export default CreateStartBtns
