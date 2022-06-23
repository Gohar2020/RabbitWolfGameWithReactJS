// <!DOCTYPE html>
// <html lang="en">
//   <head>
//     <meta charset="UTF-8" />
//     <meta http-equiv="X-UA-Compatible" content="IE=edge" />
//     <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//     <title>Rabbit-Wolf Game</title>
//     <link rel="stylesheet" href="style.css" />
//   </head>
//   <body>
//     <div class="container" id="container">
//       <h3>HELP THE BUNNY GET HOME</h3>
//     </div>
//     <script>
// const WOLF_MOVE_MIN_MILISEC = 2000
// const FREE_ID = 0
// const RABBIT_ID = 1
// const HOUSE_ID = 2
// const WOLF_ID = 3
// const FENCE_ID = 4
// const X = 0
// const Y = 1
// const UNIT_SIZE = 76
// let gameBoardNum = 0
// const GAME_STATES = {}
// const container = document.getElementById("container")

// const IMAGES = {
//   [FREE_ID]: "Images/1x1.png",
//   [RABBIT_ID]: "Images/rabbit.png",
//   [HOUSE_ID]: "Images/house.png",
//   [WOLF_ID]: "Images/wolf.png",
//   [FENCE_ID]: "Images/fence.png",
// }

// // function createNewGameButton() {
// //   newGameBtn = "<button id='newGame'>NEW GAME</button>"
// //   container.insertAdjacentHTML("beforeend", newGameBtn)
// // }
// // function addNewGameButtonEvent(gameBoardNum) {
// //   const btn = document.getElementById("newGame")
// //   btn.addEventListener("click", function () {
// //     createGameBody(Object.keys(GAME_STATES).length)
// //     addStartButtonEvent(gameBoardNum)
// //     addStartOverBtnEvent(gameBoardNum)
// //     gameBoardNum += 1
// //   })
// // }
// function createGameBody(gameBoardNum) {
//   const perGameBody = `
//           <div class="gameBody" id="body_${gameBoardNum}">
//             <div class="buttons">
//               <button class="start" id="start">START</button>
//               <select name="size" id="size" class="size">
//                 <option value="5">5 * 5</option>
//                 <option value="7">7 * 7</option>
//                 <option value="10">10 * 10</option>
//               </select>
//             </div>
//             <div class="board" id="board"></div>
//             <div class="movement" id="movement"></div>
//           </div>
//           <div class="gameOverWindow" id="gameOverWindow_${gameBoardNum}">
//             <div class="alert">
//               <p id="message" class="message"></p><br/>
//               <button class="startOver">START OVER</button>
//             </div>
//           </div>`
//   container.insertAdjacentHTML("beforeend", perGameBody)
// }

// function getBoardDivElement(gameBoardNum, elementClassName) {
//   const element = document.querySelector(
//     `#body_${gameBoardNum} .${elementClassName}`
//   )
//   return element
// }

// function addStartOverBtnEvent(gameBoardNum) {
//   const startOverBtn = getGameOverWindowElement(gameBoardNum, "startOver")
//   startOverBtn.addEventListener("click", function () {
//     startGameByNumber(gameBoardNum)

//     const gameWindow = document.getElementById(`gameOverWindow_${gameBoardNum}`)
//     const body = document.getElementById(`body_${gameBoardNum}`)

//     gameWindow.style.display = "none"
//     body.style.display = "block"
//   })
// }

// function addStartButtonEvent(gameBoardNum) {
//   const btn = getBoardDivElement(gameBoardNum, "start")
//   btn.addEventListener("click", function () {
//     startGameByNumber(gameBoardNum)
//   })
// }

// function getGameOverWindowElement(gameBoardNum, elementClassName) {
//   const element = document.querySelector(
//     `#gameOverWindow_${gameBoardNum} .${elementClassName}`
//   )
//   return element
// }

// function setgameStatusAlertStyle(gameBoardNum) {
//   const alert = getGameOverWindowElement(gameBoardNum, "alert")
//   alert.style.backgroundRepeat = "no-repeat"
//   alert.style.backgroundSize = "100%"
// }

// function drawGameOverBlock(gameState, image, message) {
//   const gameBoardNum = gameState.gameBoardNum
//   const gameWindow = document.getElementById(`gameOverWindow_${gameBoardNum}`)
//   gameWindow.style.display = "block"
//   const alert = getGameOverWindowElement(gameBoardNum, "alert")
//   alert.style.backgroundImage = image
//   const mess = getGameOverWindowElement(gameBoardNum, "message")
//   mess.innerHTML = message

//   const body = document.getElementById(`body_${gameBoardNum}`)
//   body.style.display = "none"
//   setgameStatusAlertStyle(gameBoardNum)
// }

// function setSizeOfGameGrid(boardSize, gameBoardNum) {
//   const board = getBoardDivElement(gameBoardNum, "board")
//   const boardsize = UNIT_SIZE * boardSize + "px"
//   board.style.width = boardsize
//   board.style.height = boardsize
// }

// function createMultidimensionalArray(boardSize) {
//   const gameArray = []
//   for (let i = 0; i < boardSize; i++) {
//     gameArray[i] = []
//     for (let j = 0; j < boardSize; j++) {
//       gameArray[i][j] = FREE_ID
//     }
//   }
//   return gameArray
// }

// function getRandomLocation(gameArray) {
//   const rawIndex = Math.floor(Math.random() * gameArray.length)
//   const colIndex = Math.floor(Math.random() * gameArray.length)
//   if (gameArray[rawIndex][colIndex] === FREE_ID) {
//     return [rawIndex, colIndex]
//   } else {
//     return getRandomLocation(gameArray)
//   }
// }

// function setCharacterLocation(gameArray, characterId) {
//   const [x, y] = getRandomLocation(gameArray)
//   gameArray[x][y] = characterId
//   return gameArray
// }

// function setAllPlayersLocation(gameArray, boardSize) {
//   setCharacterLocation(gameArray, RABBIT_ID)
//   setCharacterLocation(gameArray, HOUSE_ID)
//   for (let i = 0; i < (boardSize / 100) * 60; i++) {
//     setCharacterLocation(gameArray, WOLF_ID)
//   }
//   for (let i = 0; i < (boardSize / 100) * 40; i++) {
//     setCharacterLocation(gameArray, FENCE_ID)
//   }
//   return gameArray
// }

// function deleteAllChildElements(gameBoardNum) {
//   const board = getBoardDivElement(gameBoardNum, "board")
//   while (board.lastElementChild) {
//     board.removeChild(board.lastElementChild)
//   }
// }
// function getImage(character) {
//   const player = document.createElement("img")
//   player.src = IMAGES[character]
//   return player
// }

// function createPlayGround(gameState) {
//   const gameArray = gameState.gameArray
//   const gameBoardNum = gameState.gameBoardNum
//   deleteAllChildElements(gameBoardNum)
//   const board = getBoardDivElement(gameBoardNum, "board")

//   for (let i = 0; i < gameArray.length; i++) {
//     for (let j = 0; j < gameArray.length; j++) {
//       let div = document.createElement("div")
//       board.appendChild(div)
//       const cellValue = gameArray[i][j]
//       div.appendChild(getImage(cellValue))
//     }
//   }
// }

// function createButtonElement(name, id, divToAppend) {
//   const btn = document.createElement("button")
//   btn.id = `${name}_${id}`
//   btn.classList.add(`${name}`)
//   btn.innerHTML = name.toUpperCase()
//   divToAppend.appendChild(btn)
// }

// function createMovementButtons(gameBoardNum) {
//   const movementdiv = getBoardDivElement(gameBoardNum, "movement")
//   while (movementdiv.lastElementChild) {
//     movementdiv.removeChild(movementdiv.lastElementChild)
//   }
//   createButtonElement("up", gameBoardNum, movementdiv)
//   createButtonElement("left", gameBoardNum, movementdiv)
//   createButtonElement("right", gameBoardNum, movementdiv)
//   createButtonElement("down", gameBoardNum, movementdiv)
// }

// function setRabbitMovementDirections() {
//   return (dirValues = {
//     ["Up"]: [-1, 0],
//     ["Down"]: [1, 0],
//     ["Right"]: [0, 1],
//     ["Left"]: [0, -1],
//   })
// }

// function getCorrdsOf(gameArray, characterId) {
//   const findInArray = function (accumulator, row, x) {
//     row.forEach((element, y) => {
//       if (element === characterId) {
//         accumulator.push([x, y])
//       }
//     })
//     return accumulator
//   }
//   return gameArray.reduce(findInArray, [])
// }

// function youLost(gameState) {
//   const image = "url('Images/sadrabbit.png')"
//   const message = '"UPSSS..YOU LOST !!!"'
//   drawGameOverBlock(gameState, image, message)
//   console.log(gameState.timers)
//   gameState.timers.forEach(clearInterval)
// }

// function youWon(gameState) {
//   const image = "url('Images/balloons.png')"
//   const message = '"CONGRATULATIONS.. YOU WON !!!"'
//   drawGameOverBlock(gameState, image, message)
//   gameState.timers.forEach(clearInterval)
// }

// function moveRabbit(gameState, direction, directionVal) {
//   if (gameState.isGameRunning === false) {
//     return
//   }
//   const gameArray = gameState.gameArray
//   const [rabbitX, rabbitY] = getCorrdsOf(gameArray, RABBIT_ID).shift()
//   const [directionX, directionY] = directionVal
//   const maxStep = gameArray.length

//   let [x, y] = [rabbitX + directionX, rabbitY + directionY]
//   x = (x + maxStep) % maxStep
//   y = (y + maxStep) % maxStep

//   if (gameArray[x][y] === FREE_ID) {
//     gameArray[rabbitX][rabbitY] = FREE_ID
//     gameArray[x][y] = RABBIT_ID
//   } else if (gameArray[x][y] === HOUSE_ID) {
//     gameArray[rabbitX][rabbitY] = FREE_ID
//     gameState.isGameRunning = false
//     youWon(gameState)
//   }
// }

// function drawRabbitMovement(gameState, direction) {
//   const actionVal = setRabbitMovementDirections()[direction]
//   moveRabbit(gameState, direction, actionVal)
//   createPlayGround(gameState)
// }

// function addMovmentButtonEvent(gameState, clickedButton, direction) {
//   const btn = document.getElementById(
//     `${clickedButton}_${gameState.gameBoardNum}`
//   )
//   btn.onclick = function () {
//     drawRabbitMovement(gameState, direction)
//   }
// }

// function callMovmentButtonsEvents(gameState) {
//   addMovmentButtonEvent(gameState, "up", "Up")
//   addMovmentButtonEvent(gameState, "left", "Left")
//   addMovmentButtonEvent(gameState, "right", "Right")
//   addMovmentButtonEvent(gameState, "down", "Down")
// }

// const calculateDistance = (location1) => (location2) => {
//   if (location1 !== undefined && location1 !== undefined) {
//     return Math.sqrt(
//       Math.pow(location1[X] - location2[X], 2) +
//         Math.pow(location1[Y] - location2[Y], 2)
//     )
//   }
// }

// function getNearCellsOf([x, y]) {
//   return [
//     [x - 1, y],
//     [x + 1, y],
//     [x, y + 1],
//     [x, y - 1],
//   ]
// }

// function findWolvesSteps(gameState, location) {
//   const gameArray = gameState.gameArray
//   const [x, y] = location

//   const allNeighbourDirections = getNearCellsOf([x, y])
//   const isInRange = ([x, y]) =>
//     x >= 0 && x < gameArray.length && y >= 0 && y < gameArray.length
//   const steps = allNeighbourDirections.filter(isInRange)

//   const rabbitNearCoord = steps.find(
//     (step) => gameArray[step[X]][step[Y]] === RABBIT_ID
//   )

//   if (rabbitNearCoord) {
//     return [rabbitNearCoord]
//   } else {
//     // any Free Cell
//     return steps.filter((step) => gameArray[step[X]][step[Y]] === FREE_ID)
//   }
// }

// function moveWolf(gameState, wolfIndex) {
//   const gameArray = gameState.gameArray
//   const wolfCoordList = getCorrdsOf(gameArray, WOLF_ID)
//   console.log(wolfCoordList)
//   const wolf = wolfCoordList[wolfIndex]

//   const rabbitCoord = getCorrdsOf(gameArray, RABBIT_ID).shift()

//   if (gameState.isGameRunning === false) {
//     return
//   }

//   const steps = findWolvesSteps(gameState, wolf)
//   if (steps.length === 0) {
//     return
//   }

//   let nearPoint
//   if (steps.length === 1) {
//     nearPoint = steps[0]
//   } else {
//     const distances = steps.map(calculateDistance(rabbitCoord))
//     const index = distances.indexOf(Math.min(...distances))
//     nearPoint = steps[index]
//   }

//   if (gameArray[nearPoint[X]][nearPoint[Y]] === RABBIT_ID) {
//     gameState.isGameRunning = false
//     youLost(gameState)
//   } else {
//     gameArray[nearPoint[X]][nearPoint[Y]] = WOLF_ID
//     gameArray[wolf[X]][wolf[Y]] = FREE_ID
//     createPlayGround(gameState)
//   }
// }

// function setIntervalToEachWolf(gameState, boardSize) {
//   const wolfCount = (boardSize / 100) * 60
//   console.log(wolfCount)
//   for (let i = 0; i < wolfCount; i++) {
//     const randomMilisec = Math.round(Math.random() * 500)
//     const interval = setInterval(
//       moveWolf,
//       WOLF_MOVE_MIN_MILISEC + randomMilisec,
//       gameState,
//       i
//     )
//     console.log(interval)
//     gameState.timers.push(interval)
//   }
//   console.log(gameState.timers)
// }

// function startGameByNumber(gameBoardNum) {
//   console.log("startGameByNumber: AAAAAAAAAA")
//   if (GAME_STATES[gameBoardNum]) {
//     const oldGame = GAME_STATES[gameBoardNum]
//     oldGame.timers.forEach(clearInterval)
//   }

//   const select = getBoardDivElement(gameBoardNum, "size")
//   const boardSize = select.value
//   setSizeOfGameGrid(boardSize, gameBoardNum)
//   const primaryArray = createMultidimensionalArray(boardSize)
//   const newGameArray = setAllPlayersLocation(primaryArray, boardSize)

//   const gameState = {
//     gameArray: newGameArray,
//     isGameRunning: true,
//     gameBoardNum,
//     timers: [],
//   }
//   GAME_STATES[gameBoardNum] = gameState
//   console.log(GAME_STATES)
//   createPlayGround(gameState)
//   createMovementButtons(gameState.gameBoardNum)
//   callMovmentButtonsEvents(gameState)
//   setIntervalToEachWolf(gameState, boardSize)
// }

// createNewGameButton()
// addNewGameButtonEvent(gameBoardNum)
// //     </script>
//   </body>
// </html>
