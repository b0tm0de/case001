import { useEffect, useState } from "react"
import Cell from "./Components/Cell"

function App() {
  const emptyBoard = Array(9).fill()
  const [board, setBoard] = useState(emptyBoard)
  const [turn, setTurn] = useState("X")
  const [winner, setWinner] = useState(null)

  function checkForWinner(turn) {
    if (!board.some((el) => el === undefined)) {
      setWinner("tie")
      console.log("tie")
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
      setWinner(turn)
      console.log("winner", turn)
    }
  }

  function handleClick(id) {
    const targetCell = board[id]

    // return if target cell is not null (contains X / O)
    if (targetCell || winner) return

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
