import React, { Component } from 'react'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import Auth from './Auth'
import Dashboard from './Dashboard'
import Data from './Data'
import Home from './Home'
import LanguageBar from './shared/LanguageBar'
import Footer from './shared/Footer'
import Styles from './Styles'
import Transfer from './Transfer'

export default class App extends Component {
  render (){
    return (
      <Router>
        <Styles>
          <Data>
            {(props) => (
              <div>
                <Route exact path="/dashboard" component={Dashboard}/>
                <Route exact path="(/|/transfer.*)" render={() => (
                  <div>
                    <LanguageBar>English</LanguageBar>
                    <Auth user={props.user}>
                      <div>
                        <Route exact path="/" render={() => (
                          <Home {...props}/>
                        )}/>
                        <Route exact path="/transfer/:amount/to/:to"  render={(routeProps) => (
                          <Transfer {...routeProps} {...props}/>
                        )}/>
                      </div>
                    </Auth>
                    <Footer/>
                  </div>
                )}/>
              </div>
            )}
          </Data>
        </Styles>
      </Router>
    )
  }
}
