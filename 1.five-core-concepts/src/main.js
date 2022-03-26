import React from 'react'
import ReactDom from 'react-dom'

import './styles/main.scss'
import flag from './assets/flag.svg'

class Main extends React.Component {
  render() {
    return (
      <div>
        <h1 className="msg">hello, world!</h1>
        <img src={flag} />
      </div>
    )
  }
}

ReactDom.render(<Main />, document.getElementById('root'))
