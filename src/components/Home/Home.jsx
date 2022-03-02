import { useState } from "react";
import Row from "../Row/Row";
import "./home.scss";

export default function Home({typedLetter, activePosition, setActivePosition, matrix}) {
    const rows = [0, 1, 2, 3, 4, 5]
    const [activeRow, setActiveRow] = useState(0)
  return (
    <div className="home">
        {rows.map(r=>(
            <Row typedLetter={typedLetter} statusReceived={(activeRow ==  r) ? 'edit' : 'new'} activeRow={activeRow} rowid={r} activePosition={activePosition} setActivePosition={setActivePosition} matrix={matrix}/>
        ))}
    </div>
  )
}
