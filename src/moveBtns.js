import drawRabbitMovement from "./gameLogic.js"
const MoveBtns = (direction, gameState, setGameState) => {
  return (
    <button
      className={direction}
      key={direction}
      onClick={() => {
        const afterMoveArr = drawRabbitMovement(gameState, direction)
        setGameState({
          gameArray: afterMoveArr,
          isGameRunning: true,
          timers: [],
        })
        console.log(afterMoveArr)
      }}
    >
      {direction.toUpperCase()}
    </button>
  )
}

export default MoveBtns
