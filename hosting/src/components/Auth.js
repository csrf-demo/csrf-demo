import React, { Component } from 'react'
import firebase from 'firebase'

export default class Auth extends Component {
  signIn() {
    const provider = new firebase.auth.GoogleAuthProvider()

    provider.addScope('https://www.googleapis.com/auth/userinfo.email')

    firebase.auth().signInWithPopup(provider)
      .then(({ user }) => {
        console.log(user);
      })
      .catch((err) => {
        console.log(err);
      })
  }
  render (){
    return (
      this.props.user ? this.props.children : (
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
    )
  }
}
