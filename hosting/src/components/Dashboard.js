import { format } from 'currency-formatter'
import Balance from './shared/Balance'
import Center from './shared/Center'
import firebase from 'firebase'
import MainTitle from './shared/MainTitle'
import React, { Component } from 'react'
import styled from 'styled-components'
import Subtitle from './shared/Subtitle'

const SmallBalance = styled(Balance)`
  margin-top: -1.5em;
  font-size: 3em;
`

const CustomSubtitle = styled(Subtitle)`
  margin-top: 0.5em;
`

class Dashboard extends Component {
  constructor() {
    super()
    this.state = {
      account: {}
    }
  }
  componentWillMount() {
    firebase.database().ref('/').on('value', (snapshot) => {
      const [ evilAccount ] = Object.values(snapshot.val())
        .filter(account => /evil\.com/.test(account.email))

      this.setState({ account: evilAccount })
    })
  }
  render (){
    return (
      <div>
        <Center>
          <MainTitle>{this.state.account.displayName}</MainTitle>
          <CustomSubtitle>{this.state.account.email}</CustomSubtitle>
          <CustomSubtitle>Current Balance</CustomSubtitle>
          <SmallBalance>
            {format(this.state.account.balance, { code: 'USD' })}
          </SmallBalance>
        </Center>
      </div>
    )
  }
}

export default Dashboard
