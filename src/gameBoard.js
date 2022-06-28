import GlobalVars from "./globalVars.js"
import Array from "./playGround.js"
import { useState } from "react"

import MoveBtns from "./moveBtns.js"

function CreateBoard(props) {
  const boardsize = GlobalVars.UNIT_SIZE * props.boardSize + "px"

  const [gameState, setGameState] = useState({
    gameArray: props.gameArr,
    isGameRunning: true,
    timers: [],
  })
  let playGround = Array.createPlayGround(gameState)
  console.log(playGround)
  return (
    <div>
      <div
        className="board"
        id="board"
        style={{ width: boardsize, height: boardsize }}
      >
        {playGround}
      </div>
      <div className="movement" id="movement">
        {MoveBtns("up", gameState, setGameState)}
        {MoveBtns("left", gameState, setGameState)}
        {MoveBtns("right", gameState, setGameState)}
        {MoveBtns("down", gameState, setGameState)}
      </div>
    </div>
  )
}

export default CreateBoard
