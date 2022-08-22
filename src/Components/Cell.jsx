import handPenCursor from "../assets/pencil-cursor.cur"

export default function Cell({ id, sign, handleClick, isGameOver }) {
  function disabledCellsStyle(gameOver) {
    // App > handleClick() preventing clicks if necessary, here only for visuals
    return gameOver
      ? {
          cursor: "not-allowed",
          color: sign === "X" ? "var(--color-pencil-blue)" : "var(--color-pencil-red)",
        }
      : {
          cursor: sign ? "not-allowed" : `url(${handPenCursor}) 0 0, auto`,
          color: sign === "X" ? "var(--color-pencil-blue)" : "var(--color-pencil-red)",
        }
  }

  const style = disabledCellsStyle(isGameOver)

  return (
    <div onClick={() => handleClick(id)} className="cell" style={style}>
      <span className="cell-sign">{sign}</span>
    </div>
  )
}
