import { useEffect, useState, useRef } from "react"
import Cell from "./Components/Cell"
import checkForWinner from "./helpers/checkForWinner"

function App() {
  const emptyBoard = Array(9).fill()
  const [board, setBoard] = useState(emptyBoard)
  const [turn, setTurn] = useState("X")
  const [winnerMessage, setWinnerMessage] = useState("")
  const [isGameOver, setIsGameOver] = useState(false)
  const initialRender = useRef(true)

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
    setTurn("X")
    setIsGameOver(false)
  }
  // FIXME: burada hala bir şeyler ters gidiyor
  useEffect(() => {
    if (!initialRender.current) {
      setTurn((prevTurn) => (prevTurn === "X" ? "O" : "X"))
      checkForWinner(board, turn, setWinnerMessage, setIsGameOver)
    } else {
      initialRender.current = false
    }
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
      <div className="board">{boardElements}</div>
      <div className="info-container">
        <span className="game-status">{winnerMessage || `${turn}'s turn.`}</span>
        {isGameOver ? (
          <button onClick={restartGame} className="restart-btn">
            Play Again
          </button>
        ) : (
          <div className="fun-fact">
            <p>Fun fact:</p>
            <p>All Tic-Tac-Toe games end in a draw when played correctly.</p>
            <p>Actually, this fact isn't fun.</p>
            <p className="old-school-smiley">:)</p>
          </div>
        )}
      </div>
    </main>
  )
}

export default App
