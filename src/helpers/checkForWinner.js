export default function checkForWinner(board, turn, setWinnerMessage, setIsGameOver) {
  // if there is no undefined cell, means all cells filled
  // and still there is no win condition, so it is a tie
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
    setIsGameOver(true)
  }
}
