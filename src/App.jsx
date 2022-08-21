import { useEffect, useState } from "react"
import Cell from "./Components/Cell"

function App() {
  const emptyBoard = Array(9).fill("")
  const [board, setBoard] = useState(emptyBoard)
  const [turn, setTurn] = useState("X")

  function checkForWinner(turn) {
    const firstRow = board[0] === board[1] && board[0] === board[2]
    const secondRow = board[3] === board[4] && board[3] === board[5]
    const thirdRow = board[6] === board[7] && board[6] === board[8]
    const horizontalWin = [firstRow, secondRow, thirdRow].some((elem) => elem === true)

    const firstCol = board[0] === board[3] && board[0] === board[6]
    const secondCol = board[1] === board[4] && board[1] === board[7]
    const thirdCol = board[2] === board[5] && board[2] === board[8]
    const verticalWin = [firstCol, secondCol, thirdCol].some((elem) => elem === true)

    const firstCross = board[0] === board[4] && board[0] === board[8]
    const secondCross = board[2] === board[4] && board[2] === board[6]
    const diagonalWin = [firstCross, secondCross].some((elem) => elem === true)

    if (diagonalWin || verticalWin || horizontalWin) {
      console.log("Winner: " + turn)
    }
  }

  function handleClick(id) {
    const targetCell = board[id]

    // return if target cell is not null (contains X / O)
    if (targetCell) return

    setBoard((prevBoard) => {
      const newBoard = [...prevBoard]
      newBoard[id] = turn
      return newBoard
    })
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
      <span>{turn}'s turn.</span>
      <div className="game-grid">{boardElements}</div>

      <details className="fun-fact">
        <summary>Fun fact:</summary>
        All games end in a draw unless one of the players plays wrong. Actually, this fact isn't
        fun. 😁
      </details>
    </main>
  )
}

export default App
