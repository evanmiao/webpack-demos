import React from 'react'
import ReactDom from 'react-dom'

import './style.css'

function Main() {
  return <h1 className="msg">hello, world!</h1>
}

ReactDom.render(<Main />, document.getElementById('root'))
