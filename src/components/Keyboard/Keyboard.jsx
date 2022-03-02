import "./keyboard.scss"
import BackspaceIcon from '@mui/icons-material/Backspace';

export default function Keyboard({ setTypedLetter, activePosition, setActivePosition, matrix, setMatrix, setStatusRows, statusRows }) {
    const firstRow = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'];
    const secondRow = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'];
    const thirdRow = ['Z', 'X', 'C', 'V', 'B', 'N', 'M'];


    const calcNextPosition = () => {
        let [firstPosition, secondPosition] = getActualRowAndColmun()
        if (secondPosition === 4) {
            secondPosition = 0;
            //firstPosition++;
        }
        else {
            secondPosition++;
        }
        let returnArray = [firstPosition, secondPosition]
        return returnArray;

    }

    const BackspacePressed = () => {
        let [firstPosition, secondPosition] = getActualRowAndColmun()
        let tmpMatrix = matrix;
        let positionX = activePosition[1];
        let positionY = activePosition[0];
        tmpMatrix[positionY][positionX] = '';
        if(secondPosition !== 0){
            secondPosition--;    
        }else{
            secondPosition=4;
        }
        let returnArray = [firstPosition, secondPosition]
        setMatrix(tmpMatrix)
        setActivePosition(returnArray)

    }

    const getActualRowAndColmun = () =>{
        let actualPosition = activePosition;
        let firstPosition = actualPosition[0];
        let secondPosition = actualPosition[1];
        return [firstPosition, secondPosition];

    }

    const addRow = () =>{
        let [row, colmun] = getActualRowAndColmun();
        if(row < 5){
            setActivePosition([row+1, colmun])
        }
        
    }
    const rightAnswer = () =>{
        let tmpStatusRows = statusRows;
        tmpStatusRows[activePosition[0]] = 'correct';
        setStatusRows(tmpStatusRows)
        console.log(statusRows)
        addRow() //temporary solve
    }

    const wrongAnswer = () =>{
        let tmpStatusRows = statusRows;
        tmpStatusRows[activePosition[0]] = 'old';
        if(activePosition[0] < 5){
            tmpStatusRows[activePosition[0]+1] = 'edit';
        }
        setStatusRows(tmpStatusRows)
        console.log(activePosition)
        console.log(activePosition[0])
        addRow()
    }
    const submitAnswer = () => {
        let [row, colmun] = getActualRowAndColmun()
        let word = matrix[row].join('')
        if(word.length === 5 ){
            if(word === "REACT"){
                rightAnswer()                
            }
            else{
                if(word !== "REACT"){
                    wrongAnswer()
                }
            }
        }
        else{
            alert("you must fill the 5 letters")
        }
    }

    const changePosition = (key) => {
        setTypedLetter(key)
        let nextPosition = calcNextPosition();
        setActivePosition(nextPosition)
        let tmpMatrix = matrix;
        let positionX = activePosition[1];
        let positionY = activePosition[0];
        tmpMatrix[positionY][positionX] = key;
        setMatrix(() => (tmpMatrix));
    }

    return (
        <div className="keyboard">
            <div className="first">
                {firstRow.map(key => (
                    <div className="key" id={key} onClick={() => { changePosition(key) }}>{key}</div>
                ))}
            </div>
            <div className="second">
                {secondRow.map(key => (
                    <div className="key" id={key} onClick={() => { changePosition(key) }}>{key}</div>
                ))}
                <div className="key" id="back" onClick={BackspacePressed}><BackspaceIcon /></div>
            </div>
            <div className="third">
                {thirdRow.map(key => (
                    <div className="key" id={key} onClick={() => { changePosition(key) }}>{key}</div>
                ))}
                <div className="key" id="enter" onClick={submitAnswer}>ENTER</div>
            </div>

        </div>
    )
}
