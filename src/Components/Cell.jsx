import handPenCursor from "../assets/hand-pen-cursor.cur"

export default function Cell({ id, sign, handleClick }) {
  const style = {
    // App > handleClick() preventing clicks if necessary, here only for visuals
    cursor: sign ? "not-allowed" : `url(${handPenCursor}) 10 32, auto`,
    color: sign === "X" ? "var(--color-pencil-blue)" : "var(--color-pencil-red)",
  }

  return (
    <div onClick={() => handleClick(id)} className="cell" style={style}>
      <span className="cell-sign">{sign}</span>
    </div>
  )
}
