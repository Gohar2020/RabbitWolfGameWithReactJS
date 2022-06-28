import GlobalVars from "./globalVars.js"

const createMultidimensionalArray = (boardSize) => {
  const gameArray = Array(boardSize)
    .fill()
    .map((_, indexH) =>
      Array(boardSize)
        .fill()
        .map((_, indexW) => GlobalVars.FREE_ID)
    )
  return gameArray
}

const getRandomLocation = (gameArray) => {
  const i = Math.floor(Math.random() * gameArray.length)
  const j = Math.floor(Math.random() * gameArray.length)

  return gameArray[i][j] === GlobalVars.FREE_ID
    ? [i, j]
    : getRandomLocation(gameArray)
}

const setCharacterLocation = (gameArray, characterId) => {
  const [x, y] = getRandomLocation(gameArray)
  gameArray[x][y] = characterId
  return gameArray
}

const setAllPlayersLocation = (gameArray, boardSize) => {
  setCharacterLocation(gameArray, GlobalVars.RABBIT_ID)
  setCharacterLocation(gameArray, GlobalVars.HOUSE_ID)
  for (let i = 0; i < (boardSize / 100) * 60; i++) {
    setCharacterLocation(gameArray, GlobalVars.WOLF_ID)
  }
  for (let i = 0; i < (boardSize / 100) * 40; i++) {
    setCharacterLocation(gameArray, GlobalVars.FENCE_ID)
  }
  return gameArray
}

const createPlayGround = (gameState) => {
  const gameArray = gameState.gameArray
  const divList = gameArray.map((row, i) =>
    row.map((col, j) => (
      <div key={`${i}${j}`} data-demantion={`${i}${j}`}>
        <img key={`${i}`} src={GlobalVars.IMAGES[col]} alt="" />
      </div>
    ))
  )
  return divList
}

export default {
  createMultidimensionalArray,
  setAllPlayersLocation,
  createPlayGround,
}
