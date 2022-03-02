import Row from "../Row/Row";
import "./home.scss";

export default function Home({typedLetter, activePosition, setActivePosition, matrix, statusLetters}) {
    const rows = [0, 1, 2, 3, 4, 5]
    
  return (
    <div className="home">
        {rows.map(r=>(
            <Row key={r} typedLetter={typedLetter} statusLetters={statusLetters} rowid={r} activePosition={activePosition} setActivePosition={setActivePosition} matrix={matrix}/>
        ))}
    </div>
  )
}
