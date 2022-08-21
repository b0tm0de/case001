export default function Cell({ id, sign, handleClick }) {
  return (
    <div
      onClick={() => handleClick(id)}
      className="cell"
      style={{ cursor: sign ? "not-allowed" : "url('../cursor.cur'), auto" }}
    >
      <span className="cell-sign">{sign}</span>
    </div>
  )
}
