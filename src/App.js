import React, { useState } from "react"
import ReactDOM from "react-dom"
import "./style.css"

const WOLF_MOVE_MIN_MILISEC = 2000
const FREE_ID = 0
const RABBIT_ID = 1
const HOUSE_ID = 2
const WOLF_ID = 3
const FENCE_ID = 4
const X = 0
const Y = 1
const UNIT_SIZE = 76
let gameBoardNum = 0
const GAME_STATES = {}
const container = document.getElementById("container")

const IMAGES = {
  [FREE_ID]: "Images/1x1.png",
  [RABBIT_ID]: "Images/rabbit.png",
  [HOUSE_ID]: "Images/house.png",
  [WOLF_ID]: "Images/wolf.png",
  [FENCE_ID]: "Images/fence.png",
}

const getBoardDivElement = (gameBoardNum, elementClassName) => {
  const element = document
    .getElementById(gameBoardNum)
    .getElementsByClassName(elementClassName)[0]

  return element
}

const setSizeOfGameGrid = (boardSize, gameBoardNum) => {
  const board = getBoardDivElement(gameBoardNum, "board")
  const boardsize = UNIT_SIZE * boardSize + "px"
  board.style.width = boardsize
  board.style.height = boardsize
}

const createMultidimensionalArray = (boardSize) => {
  const gameArray = Array(boardSize)
    .fill()
    .map((_, indexH) =>
      Array(boardSize)
        .fill()
        .map((_, indexW) => FREE_ID)
    )
  return gameArray
}

const getRandomLocation = (gameArray) => {
  const i = Math.floor(Math.random() * gameArray.length)
  const j = Math.floor(Math.random() * gameArray.length)

  return gameArray[i][j] === FREE_ID ? [i, j] : getRandomLocation(gameArray)
}

const setCharacterLocation = (gameArray, characterId) => {
  const [x, y] = getRandomLocation(gameArray)
  gameArray[x][y] = characterId
  return gameArray
}

const setAllPlayersLocation = (gameArray, boardSize) => {
  setCharacterLocation(gameArray, RABBIT_ID)
  setCharacterLocation(gameArray, HOUSE_ID)
  for (let i = 0; i < (boardSize / 100) * 60; i++) {
    setCharacterLocation(gameArray, WOLF_ID)
  }
  for (let i = 0; i < (boardSize / 100) * 40; i++) {
    setCharacterLocation(gameArray, FENCE_ID)
  }
  return gameArray
}

const createPlayGround = (gameState) => {
  const gameArray = gameState.gameArray
  const gameBoardNum = gameState.gameBoardNum
  const board = getBoardDivElement(gameBoardNum, "board")
  const divList = gameArray.map((row, i) =>
    row.map((col, j) => (
      <div key={`${i}${j}`} data-demantion={`${i}${j}`}>
        <img src={IMAGES[col]} alt="" />
      </div>
    ))
  )
  ReactDOM.render(divList, board)
}

const createButtonElement = (name, id) => {
  return (
    <button className={name} id={name}>
      {name.toUpperCase()}
    </button>
  )
}

function createMovementButtons(gameBoardNum) {
  const movementdiv = getBoardDivElement(gameBoardNum, "movement")
  const upBtn = createButtonElement("up", gameBoardNum)
  const leftBtn = createButtonElement("left", gameBoardNum)
  const rightBtn = createButtonElement("right", gameBoardNum)
  const downBtn = createButtonElement("down", gameBoardNum)
  const moveBtns = [upBtn, leftBtn, rightBtn, downBtn]
  ReactDOM.render(moveBtns, movementdiv)
}

const startGameByNumber = (gameBoardNum) => {
  const select = getBoardDivElement(gameBoardNum, "size")
  const boardSize = Number(select.value)
  setSizeOfGameGrid(boardSize, gameBoardNum)
  const primaryArray = createMultidimensionalArray(boardSize)
  const newGameArray = setAllPlayersLocation(primaryArray, boardSize)
  console.log(newGameArray)
  const gameState = {
    gameArray: newGameArray,
    isGameRunning: true,
    gameBoardNum,
    timers: [],
  }
  GAME_STATES[gameBoardNum] = gameState
  createPlayGround(gameState)
  createMovementButtons(gameState.gameBoardNum)
  // console.log(newGameArray)
  // // getImage(FREE_ID)
}

const CreateGameBody = (gameBoardNum) => {
  return (
    <div className="gameBody" id={gameBoardNum}>
      <div className="buttons">
        <button
          className="start"
          id="start"
          onClick={() => {
            startGameByNumber(gameBoardNum)
          }}
        >
          START
        </button>
        <select name="size" id="size" className="size">
          <option value="5">5 * 5</option>
          <option value="7">7 * 7</option>
          <option value="10">10 * 10</option>
        </select>
      </div>
      <div className="board" id="board"></div>
      <div className="movement" id="movement"></div>
      <div className="gameOverWindow">
        <div className="alert">
          <p id="message" className="message"></p>
          <br />
          <button className="startOver">START OVER</button>
        </div>
      </div>
    </div>
  )
}

function App() {
  let arr = []
  let [gameBody, setgameBody] = useState([])

  return (
    <div className="App">
      <div className="container" id="container">
        <button
          id="newGame"
          onClick={() => {
            setgameBody([
              ...gameBody,
              (gameBody = CreateGameBody(gameBoardNum)),
            ])
            gameBoardNum++
            console.log(gameBoardNum)
          }}
        >
          NEW GAME
        </button>
        {gameBody}

      </div>
    </div>
  )
}

export default App
