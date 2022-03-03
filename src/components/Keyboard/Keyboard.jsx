import "./keyboard.scss"
import BackspaceIcon from '@mui/icons-material/Backspace';
import { useEffect, useState } from "react";
import { getCookie, setCookie } from "../utils/Cookies";

export default function Keyboard({ setTypedLetter, activePosition, setActivePosition, matrix, setMatrix, statusLetters, setStatusLetters, word, gameEnded, setGameEnded }) {

    const firstRow = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'];
    const secondRow = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'];
    const thirdRow = ['Z', 'X', 'C', 'V', 'B', 'N', 'M'];
    const [rightLetters, setRightLetters] = useState([])
    const [wrongLetters, setWrongLetters] = useState([])
    const [placeLetters, setPlaceLetters] = useState([])

    useEffect(() => {
        let rightLetters = getCookie("rightLetters")
        let wrongLetters = getCookie("wrongLetters")
        let placeLetters = getCookie("placeLetters")

        if (rightLetters) {
            setRightLetters(JSON.parse(rightLetters))
            setWrongLetters(JSON.parse(wrongLetters))
            setPlaceLetters(JSON.parse(placeLetters))
        }
      }, [])

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
            setAllCookies(matrix, activePosition)
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
            setAllCookies(matrix, [row + 1, 0])
        }

    }
    const rightAnswer = () => {
        let tmpstatusLetters = statusLetters;
        tmpstatusLetters[activePosition[0]] = ['correct', 'correct', 'correct', 'correct', 'correct'];
        setStatusLetters(tmpstatusLetters)
        console.log(statusLetters)
        setGameEnded(true)
        setCookie('gameEnded', true, 1)
        setCookie('statusLetters', JSON.stringify(tmpstatusLetters), 1)
        setActivePosition([0, 0])
    }

    const wrongAnswer = () => {
        let tmpstatusLetters = statusLetters;

        tmpstatusLetters[activePosition[0]] = checkRightLetters();
        if (activePosition[0] < 5) {
            tmpstatusLetters[activePosition[0] + 1] = ['edit', 'edit', 'edit', 'edit', 'edit'];
        }
        addRow()
        setStatusLetters(tmpstatusLetters)
    }

    const checkRightLetters = () => {
        let letrasCorretas = []
        matrix[activePosition[0]].forEach(function (element, index) {
            if (element === word.split('')[index]) {
                letrasCorretas.push('correct')
                setRightLetters(putLetterIntoRightLetters(element))
            } else if (word.split('').join('').includes(element)) {
                letrasCorretas.push('place')
                setPlaceLetters(putLetterIntoPlaceLetters(element))
            } else {
                letrasCorretas.push('old')
                setWrongLetters(putLetterIntoWrongLetters(element))
            }
        })
        return letrasCorretas
    }

    const putLetterIntoPlaceLetters = (letter) => {
        let tmpPlaceLetters = placeLetters
        tmpPlaceLetters.push(letter)
        return tmpPlaceLetters
    }

    const putLetterIntoRightLetters = (letter) => {
        let tmpRightLetters = rightLetters
        tmpRightLetters.push(letter)
        return tmpRightLetters
    }

    const putLetterIntoWrongLetters = (letter) => {
        let tmpWrongLetters = wrongLetters
        tmpWrongLetters.push(letter)
        return tmpWrongLetters
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
                        setCookie('rightLetters', JSON.stringify(rightLetters), 1)
                        setCookie('wrongLetters', JSON.stringify(wrongLetters), 1)
                        setCookie('placeLetters', JSON.stringify(placeLetters), 1)
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
            setAllCookies(tmpMatrix, nextPosition);
        }
    }

    const setAllCookies = (tmpMatrix, nextPosition) => {
        setCookie('matrixCookie', JSON.stringify(tmpMatrix), 1)
        setCookie('activePosition', JSON.stringify(nextPosition), 1)
        setCookie('statusLetters', JSON.stringify(statusLetters), 1)
    }

    return (
        <div className="keyboard">
            <div className="first">
                {firstRow.map(key => (
                    <div className={`key ${(rightLetters.includes(key))?'right':''} ${(wrongLetters.includes(key))?'wrong': ''} ${(placeLetters.includes(key))?'place':''}`} id={key} key={key} onClick={() => { changePosition(key) }}>{key}</div>
                ))}
            </div>
            <div className="second">
                {secondRow.map(key => (
                    <div className={`key ${(rightLetters.includes(key))?'right':''} ${(wrongLetters.includes(key))?'wrong': ''} ${(placeLetters.includes(key))?'place':''}`} id={key} key={key} onClick={() => { changePosition(key) }}>{key}</div>
                ))}
                <div className={`key`} id="back" onClick={BackspacePressed}><BackspaceIcon /></div>
            </div>
            <div className="third">
                {thirdRow.map(key => (
                    <div className={`key ${(rightLetters.includes(key))?'right':''} ${(wrongLetters.includes(key))?'wrong': ''} ${(placeLetters.includes(key))?'place':''}`} id={key} key={key} onClick={() => { changePosition(key) }}>{key}</div>
                ))}
                <div className={`key`} id="enter" onClick={submitAnswer}>ENTER</div>
            </div>

        </div>
    )
}
