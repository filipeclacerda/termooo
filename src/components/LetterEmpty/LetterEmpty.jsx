import "./letterEmpty.scss";

export default function LetterEmpty({status, isActive, typedLetter, id, activeLetter, rowid, matrix}) {
    return (
            <div id={id} className={`letterSlot ${status[rowid][id]} ${(isActive) ? 'active' : ''}`}>
                {(matrix[rowid][id])}
            </div>
       
    )
}
