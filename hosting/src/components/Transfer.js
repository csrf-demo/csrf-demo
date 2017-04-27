import { format } from 'currency-formatter'
import React, { Component } from 'react'
import Center from './shared/Center'
import axios from 'axios'
import styled from 'styled-components'
import firebase from 'firebase'
import Balance from './shared/Balance'
import Spinner from './shared/Spinner'
import Subtitle from './shared/Subtitle'

const MainTitle = styled.div`
  font-size: 2em;
  text-align: center;
  margin-top: 3em;
`

export default class Transfer extends Component {
  constructor() {
    super()
    this.state = {
      error: undefined,
      amount: 0,
      to: null,
      name: null
    }
  }
  componentWillMount() {
    const { amount, to } = this.props.match.params

    this.setState({ amount, to })
    this.props.user.getToken()
      .then((token) => {
        return axios('https://us-central1-csrf-demo.cloudfunctions.net/transfer', {
          params: { amount, to, token }
        })
      })
      .then(() => this.setState({ error: null }))
      .catch((error) => this.setState({ error }))

    firebase.database().ref('/').once('value')
      .then(snapshot => snapshot.val())
      .then((accounts) => {
        Object.values(accounts).forEach((account) => {
          if (account.email === to) {
            this.setState({
              name: account.displayName.replace(/\s.*/g, '')
            })
          }
        })
      })
  }
  render () {
    return (
      <Center>
        {this.state.error && (
          <div>
            <div>
              <Subtitle>Error<br/>Nothing Transfered</Subtitle>
            </div>
            <div>
              <Subtitle>Current Balance</Subtitle>
              <Balance>${this.props.balance}</Balance>
            </div>
          </div>
        )}
        {this.state.error === null && (
          <div>
            <MainTitle>
              Transferd {
                format(this.state.amount, { code: 'USD', decimal: '', precision: 0 })
              } to {this.state.name}
            </MainTitle>
            <div>
              <Subtitle>New Balance</Subtitle>
              <Balance>${this.props.balance}</Balance>
            </div>
          </div>
        )}
        {this.state.error === undefined && (
          <div>
            <Spinner style={{ marginTop: '10em' }}/>
          </div>
        )}
      </Center>
    )
  }
}
