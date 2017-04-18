import React, { Component } from 'react'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import Home from './Home.js'
import Transfer from './Transfer.js'

export default class App extends Component {
  render (){
    return (
      <Router>
        <div>
          <Route exact path="/" component={Home}/>
          <Route exact path="/transfer/:amount/to/:to" component={Transfer}/>
        </div>
      </Router>
    )
  }
}
