import { format } from 'currency-formatter'
import React, { Component } from 'react'
import Center from './shared/Center'
import firebase from 'firebase'
import Subtitle from './shared/Subtitle'
import Balance from './shared/Balance'

class Dashboard extends Component {
  constructor() {
    super()
    this.state = {
      balance: null
    }
  }
  componentWillMount() {
    firebase.database().ref('/').on('value', (snapshot) => {
      const [ evilAccount ] = Object.values(snapshot.val())
        .filter(account => /evil\.com/.test(account.email))

      this.setState({ balance: evilAccount.balance })
    })
  }
  render (){
    return (
      <div>
        <Center>
          <Balance>
            {format(this.state.balance, { code: 'USD' })}
          </Balance>
        </Center>
      </div>
    )
  }
}

export default Dashboard
