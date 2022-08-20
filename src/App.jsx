import { useState } from "react"
import Cell from "./Components/Cell"

function App() {
  const [board, setBoard] = useState(["x", "o", "x", "o", "x", "v", "o", "x", "o"])

  const boardMapped = board.map((element, i) => {
    return <Cell key={i} id={i} sign={element} />
  })

  return (
    <main className="app">
      <div className="game-grid">{boardMapped}</div>
    </main>
  )
}

export default App
