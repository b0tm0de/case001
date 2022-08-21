import { useState } from "react"
import Cell from "./Components/Cell"

function App() {
  const defaultBoard = new Array(9).fill(null)
  const [board, setBoard] = useState(defaultBoard)
  const [turn, setTurn] = useState("X")

  function handleClick(id) {
    if (board[id]) return
    setBoard((prevBoard) => {
      const newBoard = [...prevBoard]
      newBoard[id] = turn
      return newBoard
    })

    setTurn((prevTurn) => (prevTurn === "X" ? "O" : "X"))
  }

  const boardMapped = board.map((sign, i) => {
    return <Cell key={i} id={i} sign={sign} setBoard={setBoard} handleClick={handleClick} />
  })

  return (
    <main className="app">
      <span>{turn}'s turn.</span>
      <div className="game-grid">{boardMapped}</div>

      <details className="fun-fact">
        <summary>Fun fact:</summary>
        All games end in a draw unless one of the players plays wrong. Actually, this fact isn't
        fun. 😁
      </details>
    </main>
  )
}

export default App
