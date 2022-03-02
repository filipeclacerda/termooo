import "./keyboard.scss"
import BackspaceIcon from '@mui/icons-material/Backspace';
import { useEffect } from "react";

export default function Keyboard({ setTypedLetter, activePosition, setActivePosition, matrix, setMatrix }) {
    const firstRow = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'];
    const secondRow = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'];
    const thirdRow = ['Z', 'X', 'C', 'V', 'B', 'N', 'M'];


    const calcNextPosition = (array) => {

        let firstPosition = array[0];
        let secondPosition = array[1];
        if (secondPosition == 4) {
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
        let array = activePosition
        let firstPosition = array[0];
        let secondPosition = array[1];
        let tmpMatrix = matrix;
        let positionX = activePosition[1];
        let positionY = activePosition[0];
        tmpMatrix[positionY][positionX] = '';
        if(secondPosition != 0){
            secondPosition--;    
        }
        let returnArray = [firstPosition, secondPosition]
        setMatrix(tmpMatrix)
        setActivePosition(returnArray)

    }

    const submitAnswer = () => {
        let row = activePosition[0]
        let colmun = activePosition[1]
        let word = matrix[row].join('')
        if(word.length == 5 ){
            if(word == "REACT"){
                alert("correct answer")
            }
            else{
                alert('wrong answer')
            }
        }
        else{
            alert("you must fill the 5 letters")
        }
    }

    const changePosition = (key) => {
        setTypedLetter(key)
        let nextPosition = calcNextPosition(activePosition);
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
