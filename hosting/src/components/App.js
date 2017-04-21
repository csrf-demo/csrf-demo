import React, { Component } from 'react'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import Auth from './Auth'
import Data from './Data'
import Dashboard from './Dashboard'
import Home from './Home'
import Transfer from './Transfer'
import Styles from './Styles'

export default class App extends Component {
  render (){
    return (
      <Router>
        <Styles>
          <Data>
            {(props) => (
              <Auth user={props.user}>
                <div>
                  <Route exact path="/" render={() => (
                    <Home {...props}/>
                  )}/>
                  <Route exact path="/transfer/:amount/to/:to" render={(routeProps) => (
                    <Transfer {...routeProps} {...props}/>
                  )}/>
                  <Route exact path="/dashboard" component={Dashboard}/>
                </div>
              </Auth>
            )}
          </Data>
        </Styles>
      </Router>
    )
  }
}
