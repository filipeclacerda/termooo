import "./app.scss";
import Home from './components/Home/Home';
import Header from './components/Header/Header';
import Keyboard from './components/Keyboard/Keyboard';
import { useState } from 'react';
import dict from "./dict.json"

var word = dict[Math.floor(Math.random() * 1000)].toUpperCase().replace('Ç','C').normalize('NFD').replace(/[\u0300-\u036f]/g, "");;
  if(!getCookie("word")){
    setCookie("word", word, 1)
  }
  word = getCookie("word")

function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  let expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return null;
}

function App() {
  const [activePosition, setActivePosition] = useState([0, 0]);
  const [typedLetter, setTypedLetter] = useState('')
  console.log(word)
  
  const correctAnswer = () => {

  }

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

  return (
    <div className="app">
      <Header />
      <Home
        typedLetter={typedLetter}
        activePosition={activePosition}
        setActivePosition={setActivePosition}
        matrix={matrix}
        statusLetters={statusLetters} />
      <Keyboard
        setTypedLetter={setTypedLetter}
        activePosition={activePosition}
        setActivePosition={setActivePosition}
        matrix={matrix}
        setMatrix={setMatrix}
        statusLetters={statusLetters}
        setStatusLetters={setStatusLetters}
        word={word}
      />
    </div>
  );
}

export default App;
