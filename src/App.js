import React, { useState } from "react"
import ReactDOM from "react-dom"
import "./style.css"
import rabit from "./Images/rabbit.png"

// import * as Globals from "./globalVars.js"

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
  // return Array(boardSize).fill(Array(boardSize).fill(FREE_ID))
  const gameArray = []
  for (let i = 0; i < boardSize; i++) {
    gameArray[i] = []
    for (let j = 0; j < boardSize; j++) {
      gameArray[i][j] = FREE_ID
    }
  }
  return gameArray
}

const getRandomLocation = (gameArray) => {
  const rawIndex = Math.floor(Math.random() * gameArray.length)
  const colIndex = Math.floor(Math.random() * gameArray.length)

  return gameArray[rawIndex][colIndex] === FREE_ID
    ? [rawIndex, colIndex]
    : getRandomLocation(gameArray)
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
function deleteAllChildElements(gameBoardNum) {
  const board = getBoardDivElement(gameBoardNum, "board")
  while (board.lastElementChild) {
    board.removeChild(board.lastElementChild)
  }
}
function getImage(character) {
  // return <img src={IMAGES[character]} alt="" />
  const player = document.createElement("img")
  player.src = IMAGES[character]
  return player
}

function createPlayGround(gameState) {
  const gameArray = gameState.gameArray
  const gameBoardNum = gameState.gameBoardNum
  deleteAllChildElements(gameBoardNum)
  const board = getBoardDivElement(gameBoardNum, "board")

  for (let i = 0; i < gameArray.length; i++) {
    for (let j = 0; j < gameArray.length; j++) {
      let div = document.createElement("div")
      board.appendChild(div)
      const cellValue = gameArray[i][j]
      div.appendChild(getImage(cellValue))
    }
  }
}

const startGameByNumber = (gameBoardNum) => {
  const select = getBoardDivElement(gameBoardNum, "size")
  const boardSize = Number(select.value)
  setSizeOfGameGrid(boardSize, gameBoardNum)
  const primaryArray = createMultidimensionalArray(boardSize)
  const newGameArray = setAllPlayersLocation(primaryArray, boardSize)
  const gameState = {
    gameArray: newGameArray,
    isGameRunning: true,
    gameBoardNum,
    timers: [],
  }
  GAME_STATES[gameBoardNum] = gameState
  createPlayGround(gameState)
  console.log(newGameArray)
  // getImage(FREE_ID)
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
  let [gameBody, setgameBody] = useState("")

  return (
    <div className="App">
      <div className="container" id="container">
        <button
          id="newGame"
          onClick={(event) => {
            setgameBody((gameBody = CreateGameBody(gameBoardNum)))
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
