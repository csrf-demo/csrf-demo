import React, { Component } from 'react'
import firebase from 'firebase'

export default class Data extends Component {
  constructor() {
    super()
    this.state = {
      user: undefined,
      balance: undefined
    }
  }
  componentWillMount() {
    firebase.auth().onAuthStateChanged((user) => {
      this.setState({ user })
      if (user) {
        firebase.database().ref(user.uid).on('value', (snapshot) => {
          const value = snapshot.val()
          this.setState({ balance: value ? value.balance : null })
        })
      }
    })
  }
  render (){
    return (
      <this.props.children {...this.state}/>
    )
  }
}
