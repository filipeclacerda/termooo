import "./keyboard.scss"
import BackspaceIcon from '@mui/icons-material/Backspace';
import { useState } from "react";

export default function Keyboard({ setTypedLetter, activePosition, setActivePosition, matrix, setMatrix, statusLetters, setStatusLetters, word }) {
    const firstRow = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'];
    const secondRow = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'];
    const thirdRow = ['Z', 'X', 'C', 'V', 'B', 'N', 'M'];
    const [gameEnded, setGameEnded] = useState(false)
    const calcNextPosition = () => {
        let [firstPosition, secondPosition] = getActualRowAndColmun()
        if (secondPosition !== 4) {
            secondPosition++;
        }
        let returnArray = [firstPosition, secondPosition]
        return returnArray;

    }

    const BackspacePressed = () => {
        if (!gameEnded) {
            let [firstPosition, secondPosition] = getActualRowAndColmun()
            let tmpMatrix = matrix;
            let positionX = activePosition[1];
            let positionY = activePosition[0];
            tmpMatrix[positionY][positionX] = '';
            if (secondPosition !== 0) {
                secondPosition--;
            }
            let returnArray = [firstPosition, secondPosition]
            setMatrix(tmpMatrix)
            setActivePosition(returnArray)
        }

    }

    const getActualRowAndColmun = () => {
        let actualPosition = activePosition;
        let firstPosition = actualPosition[0];
        let secondPosition = actualPosition[1];
        return [firstPosition, secondPosition];

    }

    const addRow = () => {
        let [row, colmun] = getActualRowAndColmun();
        if (row < 5) {
            setActivePosition([row + 1, 0])
        }

    }
    const rightAnswer = () => {
        let tmpstatusLetters = statusLetters;
        tmpstatusLetters[activePosition[0]] = ['correct', 'correct', 'correct', 'correct', 'correct'];
        setStatusLetters(tmpstatusLetters)
        console.log(statusLetters)
        setGameEnded(true) 
        setActivePosition([0,0])
    }

    const wrongAnswer = () => {
        let tmpstatusLetters = statusLetters;

        tmpstatusLetters[activePosition[0]] = checkRightLetters();
        if (activePosition[0] < 5) {
            tmpstatusLetters[activePosition[0] + 1] = ['edit', 'edit', 'edit', 'edit', 'edit'];
        }
        setStatusLetters(tmpstatusLetters)
        addRow()
    }

    const checkRightLetters = () => {
        let letrasCorretas = []
        matrix[activePosition[0]].forEach(function (element, index) {
            if (element === word.split('')[index]) {
                letrasCorretas.push('correct')
            } else if (word.split('').join('').includes(element)) {
                letrasCorretas.push('place')
            } else {
                letrasCorretas.push('old')
            }
        })
        return letrasCorretas
    }

    const submitAnswer = () => {
        if (!gameEnded) {
            let [row, colmun] = getActualRowAndColmun()
            let typedWord = matrix[row].join('')
            if (typedWord.length === 5) {
                if (typedWord === word) {
                    rightAnswer()
                }
                else {
                    if (typedWord !== word) {
                        wrongAnswer()
                    }
                }
            }
            else {
                alert("you must fill the 5 letters")
            }
        }
    }

    const changePosition = (key) => {
        if (!gameEnded) {
            setTypedLetter(key)
            let nextPosition = calcNextPosition();
            setActivePosition(nextPosition)
            let tmpMatrix = matrix;
            let positionX = activePosition[1];
            let positionY = activePosition[0];
            tmpMatrix[positionY][positionX] = key;
            setMatrix(() => (tmpMatrix));
        }
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
