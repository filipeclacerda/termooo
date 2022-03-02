import "./app.scss";
import Home from './components/Home/Home';
import Header from './components/Header/Header';
import Keyboard from './components/Keyboard/Keyboard';
import { useState } from 'react';

function App() {
  const [activePosition, setActivePosition] = useState([0, 0]);
  const [typedLetter, setTypedLetter] = useState('')
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

  const [statusRows, setStatusRows] = useState(['edit', 'new', 'new', 'new', 'new', 'new'])

  return (
    <div className="app">
      <Header />
      <Home
        typedLetter={typedLetter}
        activePosition={activePosition}
        setActivePosition={setActivePosition}
        matrix={matrix}
        statusRows={statusRows} />
      <Keyboard
        setTypedLetter={setTypedLetter}
        activePosition={activePosition}
        setActivePosition={setActivePosition}
        matrix={matrix}
        setMatrix={setMatrix}
        statusRows={statusRows}
        setStatusRows={setStatusRows}
      />
    </div>
  );
}

export default App;
