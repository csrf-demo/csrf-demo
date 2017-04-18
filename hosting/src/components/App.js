import React, { Component } from 'react'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import Home from './Home.js'
import Transfer from './Transfer.js'
import Data from './Data'

export default class App extends Component {
  render (){
    return (
      <Router>
        <Data>
          {(props) => (
            <div>
              <Route exact path="/" render={() => (
                <Home {...props}/>
              )}/>
              <Route exact path="/transfer/:amount/to/:to" render={(routeProps) => (
                <Transfer {...routeProps} {...props}/>
              )}/>
            </div>
          )}
        </Data>
      </Router>
    )
  }
}
