export default function checkForWinner(board, turn, setWinnerMessage, setIsGameOver) {
  const winningPositions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]

  const winnerFound = winningPositions.some((position) => {
    const [a, b, c] = position
    return board[a] === turn && board[b] === turn && board[c] === turn
  })

  if (winnerFound) {
    setWinnerMessage(`${turn} won the game.`)
    setIsGameOver(true)
    return
  }

  // if there is no undefined cell, means all cells filled
  // and still there is no win condition, so it is a tie
  if (!board.includes(undefined)) {
    setWinnerMessage("Tie")
    setIsGameOver(true)
    return
  }
}
