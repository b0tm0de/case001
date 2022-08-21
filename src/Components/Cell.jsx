import handPenCursor from "../assets/hand-pen-cursor.png"

export default function Cell({ id, sign, handleClick }) {
  return (
    <div
      onClick={() => handleClick(id)}
      className="cell"
      style={{ cursor: sign ? "not-allowed" : `url(${handPenCursor}), auto` }}
    >
      <span className="cell-sign">{sign}</span>
    </div>
  )
}
