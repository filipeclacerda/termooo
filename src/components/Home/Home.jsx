import Row from "../Row/Row";
import "./home.scss";

export default function Home({typedLetter, activePosition, setActivePosition, matrix, statusRows}) {
    const rows = [0, 1, 2, 3, 4, 5]
    
  return (
    <div className="home">
        {rows.map(r=>(
            <Row typedLetter={typedLetter} statusReceived={statusRows} rowid={r} activePosition={activePosition} setActivePosition={setActivePosition} matrix={matrix}/>
        ))}
    </div>
  )
}
