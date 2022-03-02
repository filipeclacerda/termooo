import { useState } from "react";
import LetterEmpty from "../LetterEmpty/LetterEmpty";
import "./row.scss";

export default function Row({typedLetter, statusReceived, activeRow, rowid, activePosition, setActivePosition, matrix}) {
    const letters = [0, 1, 2, 3, 4]
    const [activeLetter, setActiveLetter] = useState(1)

    const handleClick = (l) =>{
        setActiveLetter(l);
        setActivePosition([rowid,l]);
    }

    return (
        <div className={`row ${statusReceived[rowid]}`}>
            {letters.map(l => (
                <div className={l} onClick={()=>(statusReceived[rowid] === 'edit') ? handleClick(l) : null}>
                <LetterEmpty
                    className="letters"
                    status={statusReceived}
                    isActive={((statusReceived[rowid] === 'edit') ? `${activePosition[0]}${activePosition[1]}` === `${rowid}${l}` : false)}
                    typedLetter={typedLetter}
                    id={`${l}`}
                    activeLetter={activeLetter}
                    rowid={rowid}
                    matrix={matrix}/>
                </div>
            ))}
        </div>
  )
}
