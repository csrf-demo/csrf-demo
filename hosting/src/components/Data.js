import React, { Component } from 'react'
import firebase from 'firebase'

export default class Data extends Component {
  constructor() {
    super()
    this.state = {
      user: null,
      balance: null
    }
  }
  componentWillMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user })
        firebase.database().ref(user.uid).on('value', (snapshot) => {
          this.setState({ balance: snapshot.val() })
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
