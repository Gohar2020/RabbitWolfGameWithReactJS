import GlobalVars from "./globalVars.js"

function setRabbitMovementDirections() {
  return {
    ["up"]: [-1, 0],
    ["down"]: [1, 0],
    ["right"]: [0, 1],
    ["left"]: [0, -1],
  }
}

function getCorrdsOf(gameArray, characterId) {
  const findInArray = function (accumulator, row, x) {
    row.forEach((element, y) => {
      if (element === characterId) {
        accumulator.push([x, y])
      }
    })
    return accumulator
  }
  return gameArray.reduce(findInArray, [])
}

function moveRabbit(gameState, directionVal) {
  if (gameState.isGameRunning === false) {
    return
  }
  const gameArray = gameState.gameArray
  const [rabbitX, rabbitY] = getCorrdsOf(
    gameArray,
    GlobalVars.RABBIT_ID
  ).shift()
  const [directionX, directionY] = directionVal
  const maxStep = gameArray.length

  let [x, y] = [rabbitX + directionX, rabbitY + directionY]
  x = (x + maxStep) % maxStep
  y = (y + maxStep) % maxStep

  if (gameArray[x][y] === GlobalVars.FREE_ID) {
    gameArray[rabbitX][rabbitY] = GlobalVars.FREE_ID
    gameArray[x][y] = GlobalVars.RABBIT_ID
  } else if (gameArray[x][y] === GlobalVars.HOUSE_ID) {
    gameArray[rabbitX][rabbitY] = GlobalVars.FREE_ID
    gameState.isGameRunning = false
    console.log("win")
    // youWon(gameState)
  }
  return gameArray
}

function drawRabbitMovement(gameState, direction) {
  const actionVal = setRabbitMovementDirections()[direction]
  return moveRabbit(gameState, actionVal)
  //   createPlayGround(gameState)
}

export default drawRabbitMovement
