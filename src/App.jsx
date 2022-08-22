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

    // if target cell is NOT undefined (contains X / O) or game over, return
    if (targetCell || isGameOver) return

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
      <div className="game-grid">{boardElements}</div>
      <div className="info-container">
        <span className="message">{winnerMessage || `${turn}'s turn.`}</span>
        {isGameOver ? (
          <button onClick={restartGame} className="restart-btn">
            Play Again
          </button>
        ) : (
          <div className="fun-fact">
            <p>
              Fun fact: All Tic-Tac-Toe games end in a draw when played correctly. Actually; this
              fact, isn't fun.😀
            </p>
          </div>
        )}
      </div>
    </main>
  )
}

export default App
