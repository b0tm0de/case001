import { useEffect, useState } from "react"
import Cell from "./Components/Cell"

function App() {
  const emptyBoard = Array(9).fill()
  const [board, setBoard] = useState(emptyBoard)
  const [turn, setTurn] = useState("X")
  const [winnerMessage, setWinnerMessage] = useState("")

  function checkForWinner(turn) {
    if (!board.some((el) => el === undefined)) {
      setWinnerMessage("Tie")
    }

    const firstRow = [board[0], board[1], board[2]].every((el) => el === turn)
    const secondRow = [board[3], board[4], board[5]].every((el) => el === turn)
    const thirdRow = [board[6], board[7], board[8]].every((el) => el === turn)

    const horizontalWin = [firstRow, secondRow, thirdRow].some((el) => el === true)

    const firstCol = [board[0], board[3], board[6]].every((el) => el === turn)
    const secondCol = [board[1], board[4], board[7]].every((el) => el === turn)
    const thirdCol = [board[2], board[5], board[8]].every((el) => el === turn)

    const verticalWin = [firstCol, secondCol, thirdCol].some((el) => el === true)

    const firstCross = [board[0], board[4], board[8]].every((el) => el === turn)
    const secondCross = [board[2], board[4], board[6]].every((el) => el === turn)

    const diagonalWin = [firstCross, secondCross].some((el) => el === true)

    if (horizontalWin || verticalWin || diagonalWin) {
      setWinnerMessage(`${turn} won the game.`)
    }
  }

  function handleClick(id) {
    const targetCell = board[id]

    // return if target cell is not null (contains X / O)
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
    setTurn("O")
  }

  useEffect(() => {
    setTurn((prevTurn) => (prevTurn === "X" ? "O" : "X"))

    checkForWinner(turn)
  }, [board])

  const boardElements = board.map((sign, i) => {
    return <Cell key={i} id={i} sign={sign} setBoard={setBoard} handleClick={handleClick} />
  })

  return (
    <main className="app">
      <span>{winnerMessage || `${turn}'s turn.`}</span>
      <div className="game-grid">{boardElements}</div>

      {winnerMessage ? (
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
