import { useEffect, useState } from "react"
import Cell from "./Components/Cell"
import checkForWinner from "./helpers/checkForWinner"

function App() {
  const emptyBoard = Array(9).fill()
  const [board, setBoard] = useState(emptyBoard)
  const [turn, setTurn] = useState("X")
  const [winnerMessage, setWinnerMessage] = useState("")
  const [isGameOver, setIsGameOver] = useState(false)

  function handleClick(id) {
    const targetCell = board[id]

    // if target cell is NOT undefined (contains X / O)
    // or winner already declared, return
    if (targetCell || winnerMessage) return

    setBoard((prevBoard) => {
      const newBoard = [...prevBoard]
      newBoard[id] = turn
      return newBoard
    })
  }

  function restartGame() {
    setBoard(emptyBoard)
    setWinnerMessage("")
    // restarting game causes re-render, so useEffect() will set turn to "X" again
    setTurn("O")
    setIsGameOver(false)
  }

  useEffect(() => {
    setTurn((prevTurn) => (prevTurn === "X" ? "O" : "X"))

    checkForWinner(board, turn, setWinnerMessage, setIsGameOver)
  }, [board])

  const boardElements = board.map((sign, i) => {
    return (
      <Cell
        key={i}
        id={i}
        sign={sign}
        setBoard={setBoard}
        handleClick={handleClick}
        isGameOver={isGameOver}
      />
    )
  })

  return (
    <main className="app">
      <span>{winnerMessage || `${turn}'s turn.`}</span>
      <div className="game-grid">{boardElements}</div>
      {isGameOver ? (
        <button onClick={restartGame} className="restart-btn">
          PLAY AGAIN
        </button>
      ) : (
        <details className="fun-fact">
          <summary>Fun fact:</summary>
          All games end in a draw unless one of the players plays wrong. Actually, this fact isn't
          fun. 😁
        </details>
      )}
    </main>
  )
}

export default App
