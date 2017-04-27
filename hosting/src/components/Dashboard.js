import { format } from 'currency-formatter'
import Balance from './shared/Balance'
import Center from './shared/Center'
import firebase from 'firebase'
import MainTitle from './shared/MainTitle'
import React, { Component } from 'react'
import styled from 'styled-components'
import Subtitle from './shared/Subtitle'
import Hats from './Hats'

const SmallBalance = styled(Balance)`
  margin-top: -1.5em;
  font-size: 3em;
  transition: transform 500ms;

  &.grow {
    transform: scale(1.1);
  }
`

const CustomSubtitle = styled(Subtitle)`
  margin-top: 0.5em;
`

const WhiteBack = styled.div`
  background: white;
  box-shadow: 0 0 3em 1em white;
  width: 50%;
  padding-bottom: 2em;
  margin: auto;
  margin-top: 20vh;
`

class Dashboard extends Component {
  constructor() {
    super()
    this.state = {
      account: {},
      bounce: false
    }
  }
  componentWillMount() {
    firebase.database().ref('/').on('value', (snapshot) => {
      const [ evilAccount ] = Object.values(snapshot.val())
        .filter(account => /evil\.com/.test(account.email))
      this.setState({ account: evilAccount })
    })
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.account.balance !== this.state.account.balance) {
      this.setState({ bounce: true })
      setTimeout(() => {
        this.setState({ bounce: false })
      }, 500)
    }
  }
  render (){
    return (
      <div>
        {this.state.account.displayName && (
          <Center>
            <WhiteBack>
              <MainTitle style={{ marginTop: 0 }}>{this.state.account.displayName}</MainTitle>
              <CustomSubtitle>{this.state.account.email}</CustomSubtitle>
              <CustomSubtitle>Current Balance</CustomSubtitle>
              <SmallBalance className={this.state.bounce && 'grow'}>
                {format(this.state.account.balance, { code: 'USD' })}
              </SmallBalance>
            </WhiteBack>
          </Center>
        )}
        <Hats/>
      </div>
    )
  }
}

export default Dashboard
