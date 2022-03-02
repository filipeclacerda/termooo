import logo from './logo.svg';
import "./app.scss";
import Home from './components/Home/Home';
import Header from './components/Header/Header';
import Keyboard from './components/Keyboard/Keyboard';
import { createContext, useEffect, useRef, useState } from 'react';

function App() {
  const [activePosition, setActivePosition] = useState([0,0]);
  const [typedLetter, setTypedLetter] = useState('')
  const correctAnswer = () =>{
    
  }
  const [matrix, setMatrix] = useState([
    ['','','','',''],
    ['','','','',''],
    ['','','','',''],
    ['','','','',''],
    ['','','','',''],
    ['','','','',''],
])


  
  return (
    <div className="app">
      <Header/>
      <Home typedLetter={typedLetter} activePosition={activePosition} setActivePosition={setActivePosition} matrix={matrix}/>
      <Keyboard setTypedLetter={setTypedLetter} activePosition={activePosition} setActivePosition={setActivePosition} matrix={matrix} setMatrix={setMatrix}/>
    </div>
  );
}

export default App;
