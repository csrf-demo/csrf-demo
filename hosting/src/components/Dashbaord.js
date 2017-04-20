import React, { Component } from 'react'
import firebase from 'firebase'

class Dashboard extends Component {
  constructor() {
    super()
    this.state = {
      accounts: []
    }
  }
  componentWillMount() {
    firebase.database().ref('/').on('value', (snapshot) => {
      this.setState({
        accounts: Object.values(snapshot.val()).filter(account => account.email)
      })
    })
  }
  render (){
    return (
      <div>
        {this.state.accounts.map((account) => (
          <div key={account.email}>
            {account.displayName} : {account.balance}
          </div>
        ))}
      </div>
    )
  }
}

export default Dashboard
