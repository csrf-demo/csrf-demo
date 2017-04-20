import React, { Component } from 'react'
import firebase from 'firebase'

export default class Auth extends Component {
  signIn() {
    const provider = new firebase.auth.GoogleAuthProvider()
    provider.addScope('https://www.googleapis.com/auth/userinfo.email')
    firebase.auth().signInWithPopup(provider)
  }
  render () {
    // render app if signed in
    if (this.props.user) {
      return this.props.children
    }
    // render sign in page if not signed in
    if (this.props.user === null) {
      return (
        <a
          onClick={this.signIn}
          style={{
            color: 'blue',
            textDecoration: 'underline',
            cursor: 'pointer'
          }}
        >
          Sign in with Google
        </a>
      )
    }
    // render nothing if waiting for Firebase to load
    if (this.props.user === undefined) {
      return null
    }
  }
}
