import React from 'react'
import ReactDom from 'react-dom'

import printMe from '../print'
printMe()

function Main() {
  return <h1 className="msg">search page</h1>
}

ReactDom.render(<Main />, document.getElementById('root'))
