import "./endMessage.scss"
import { useState } from 'react';

export default function EndMessage({ title, body, footer }) {

  const [display, setDisplay] = useState('on')

  const changeDisplay = () =>{
    if(display == 'on'){
      setDisplay('off')
    }else{
      setDisplay('on')
    }
  }

  return (
    <div className={`endMessage ${display}`} onClick={changeDisplay}>
      <div className="container">
        <div className="title">
          {title}
        </div>
        <div className="body">
          {body}
        </div>
        <div className="footer">
          {footer}
        </div>
      </div>
    </div>
  )
}
