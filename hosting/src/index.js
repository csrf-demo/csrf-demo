import 'babel-polyfill';
import React from 'react'
import ReactDOM from 'react-dom'
import firebase from 'firebase'

import App from './components/App.js'

firebase.initializeApp({
  apiKey: 'AIzaSyB80Jkep0vO07Y1BdvgK75Pr9MZy24MdXc',
  authDomain: 'csrf-demo.firebaseapp.com',
  databaseURL: 'https://csrf-demo.firebaseio.com'
});

ReactDOM.render(
  <App/>,
  document.getElementById('app')
)
