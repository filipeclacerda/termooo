import { useEffect, useState } from "react";
import LetterEmpty from "../LetterEmpty/LetterEmpty";
import "./row.scss";

export default function Row({ typedLetter, statusLetters, activeRow, rowid, activePosition, setActivePosition, matrix }) {
    const letters = [0, 1, 2, 3, 4]
    const [activeLetter, setActiveLetter] = useState(1)
    const handleClick = (l) => {
        setActiveLetter(l);
        setActivePosition([rowid, l]);
    }

    return (
        <div className={`row`}>
            {letters.map(l => (
                <div key={l} className={l} onClick={() => (statusLetters[rowid][l] === 'edit') ? handleClick(l) : null}>
                    <LetterEmpty
                        className="letters"
                        status={statusLetters}
                        isActive={((statusLetters[rowid][l] === 'edit') ? `${activePosition[0]}${activePosition[1]}` === `${rowid}${l}` : false)}
                        typedLetter={typedLetter}
                        id={`${l}`}
                        activeLetter={activeLetter}
                        rowid={rowid}
                        matrix={matrix} />
                </div>
            ))}
        </div>
    )
}
