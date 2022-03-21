import "./endMessage.scss"
import { useState } from 'react';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

export default function EndMessage({ title, score, highscore, restartGame, word }) {

  const [display, setDisplay] = useState('on')

  const changeDisplay = () => {
    if (display === 'on') {
      setDisplay('off')
    } else {
      setDisplay('on')
    }
  }

  return (
    <div className={`endMessage ${display}`} onClick={changeDisplay}>
      <div className="container">
        <div className="cont">
          <div className="title">
          {`${title}`}
          </div>
          <div className="title">
          {` a palavra era: ${word}`}
          </div>
        </div>
        <div className="body">
          <div className="score">
            Sua pontuação: {score}
          </div>
          <div className="highscore">
            Seu recorde: {highscore}
          </div>
        </div>
        <div className="footer">
          <div className="message">
            Jogue Novamente
          </div>
          <div className="restartDiv">
            <div className="restartGame" onClick={restartGame}>
              <RestartAltIcon className='resetArrow' />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
