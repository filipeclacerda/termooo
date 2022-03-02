import "./app.scss";
import Home from './components/Home/Home';
import Header from './components/Header/Header';
import Keyboard from './components/Keyboard/Keyboard';
import { useEffect, useState } from 'react';
import dict from "./dict.json"
import { setCookie, getCookie } from "./components/utils/Cookies"
import EndMessage from "./components/EndMessage/EndMessage";

var word = dict[Math.floor(Math.random() * 1000)].toUpperCase().replace('Ç', 'C').normalize('NFD').replace(/[\u0300-\u036f]/g, "");;
if (!getCookie("word")) {
  setCookie("word", word, 1)
}
word = getCookie("word")

function App() {
  const [gameEnded, setGameEnded] = useState(false)
  const [activePosition, setActivePosition] = useState([0, 0]);
  const [typedLetter, setTypedLetter] = useState('')
  console.log(word)

  const [matrix, setMatrix] = useState([
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
  ])

  const [statusLetters, setStatusLetters] = useState([
    ['edit', 'edit', 'edit', 'edit', 'edit'],
    ['new', 'new', 'new', 'new', 'new'],
    ['new', 'new', 'new', 'new', 'new'],
    ['new', 'new', 'new', 'new', 'new'],
    ['new', 'new', 'new', 'new', 'new'],
    ['new', 'new', 'new', 'new', 'new'],
  ])


  useEffect(() => {
    let matrixCookie = getCookie("matrixCookie")
    let activePosition = getCookie("activePosition")
    let statusLetters = getCookie("statusLetters")
    let gameEnded = Boolean(getCookie("gameEnded"))
    if (matrixCookie) {
      setMatrix(JSON.parse(matrixCookie))
      setActivePosition(JSON.parse(activePosition))
      setStatusLetters(JSON.parse(statusLetters))
      setGameEnded(JSON.parse(gameEnded))
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
        <EndMessage title="Você venceu!" body="parabens" footer="top"/>
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
      />
    </div>
  );
}

export default App;
