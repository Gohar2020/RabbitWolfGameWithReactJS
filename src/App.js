import React, { useState } from "react"
import ReactDOM from "react-dom"
import "./style.css"
import CreateStartBtns from "./startBtns.js"

function App() {
  let [startBtns, setStartBtns] = useState("")

  return (
    <div className="App">
      <div className="container" id="container">
        <button
          id="newGame"
          onClick={() => {
            const startBtns = <CreateStartBtns />
            setStartBtns(startBtns)
          }}
        >
          NEW GAME
        </button>
        {startBtns}
      </div>
    </div>
  )
}

export default App
