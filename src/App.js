import "./app.scss";
import Home from './components/Home/Home';
import Header from './components/Header/Header';
import Keyboard from './components/Keyboard/Keyboard';
import { useEffect, useState } from 'react';
import dict from "./dict.json"
import { setCookie, getCookie, eraseCookie } from "./utils/Cookies"
import EndMessage from "./components/EndMessage/EndMessage";
//import { matrixDefault } from "./utils/MatrixDefault";
import { statusLettersDefault } from "./utils/StatusLettersDefault";


function App() {
  const [gameEnded, setGameEnded] = useState(false)
  const [activePosition, setActivePosition] = useState([0, 0]);
  const [typedLetter, setTypedLetter] = useState('')
  const [score, setScore] = useState(0)
  const [highscore, setHighScore] = useState(0)
  const [matrix, setMatrix] = useState([
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
  ])
  const [statusLetters, setStatusLetters] = useState(Array.from(statusLettersDefault))
  const [gameStatus, setGameStatus] = useState(null)

  const [rightLetters, setRightLetters] = useState([])
  const [wrongLetters, setWrongLetters] = useState([])
  const [placeLetters, setPlaceLetters] = useState([])
  

  const getWord = () => {
    var word = dict[Math.floor(Math.random() * 1000)].toUpperCase().replace('Ç', 'C').normalize('NFD').replace(/[\u0300-\u036f]/g, "");;
    if (!getCookie("word")) {
      setCookie("word", word, 1)
    }
    word = getCookie("word")
    return word;
  }
  var word = getWord()

  const restartGame = () => {
    resetCookies()
    setGameEnded(false)
    setActivePosition([0, 0])
    setTypedLetter('')
    setMatrix([
      ['', '', '', '', ''],
      ['', '', '', '', ''],
      ['', '', '', '', ''],
      ['', '', '', '', ''],
      ['', '', '', '', ''],
      ['', '', '', '', ''],
    ])
      setRightLetters([])
      setWrongLetters([])
      setPlaceLetters([])
    setStatusLetters(Array.from(statusLettersDefault))
  }

  const resetCookies = () => {
    eraseCookie('rightLetters')
    eraseCookie('wrongLetters')
    eraseCookie('placeLetters')
    eraseCookie('matrixCookie')
    eraseCookie('activePosition')
    eraseCookie('statusLetters')
    eraseCookie('gameEnded')
    eraseCookie('word')
  }

  console.log(word)

  useEffect(() => {
    let activePosition = getCookie("activePosition")
    let statusLetters = getCookie("statusLetters")
    let matrixCookie = getCookie("matrixCookie")
    let gameEnded = Boolean(getCookie("gameEnded"))
    let score = getCookie("score")
    let highscore = getCookie("highscore")
    if (matrixCookie) {
      setMatrix(JSON.parse(matrixCookie))
      setActivePosition(JSON.parse(activePosition))
      setStatusLetters(JSON.parse(statusLetters))
      setGameEnded(JSON.parse(gameEnded))
    }
    if (score) {
      setScore(Number(score))
      setHighScore(Number(highscore))
    }
  }, [])


  return (
    <div className="app">
      <Header />

      <Home
        typedLetter={typedLetter}
        activePosition={activePosition}
        setActivePosition={setActivePosition}
        matrix={matrix}
        statusLetters={statusLetters}
      />
      {(gameEnded) ?
        <EndMessage
          title={(gameStatus==='win') ? "Incrível, Parabéns!!" : "Tente novamente!"}
          score={score}
          highscore={highscore}
          restartGame={restartGame}
          word={word} />
        : ''}
      <Keyboard
        setTypedLetter={setTypedLetter}
        activePosition={activePosition}
        setActivePosition={setActivePosition}
        matrix={matrix}
        setMatrix={setMatrix}
        statusLetters={statusLetters}
        setStatusLetters={setStatusLetters}
        word={word}
        gameEnded={gameEnded}
        setGameEnded={setGameEnded}
        setScore={setScore}
        score={score}
        setGameStatus={setGameStatus}
        rightLetters = {rightLetters}
        setRightLetters = {setRightLetters}
        wrongLetters = {wrongLetters}
        setWrongLetters = {setWrongLetters}
        placeLetters = {placeLetters}
        setPlaceLetters = {setPlaceLetters}
        highscore = {highscore}
        setHighScore = {setHighScore} 
      />
    </div>
  );
}

export default App;
