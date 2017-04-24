import React, { Component } from 'react'
import Center from './shared/Center'
import axios from 'axios'

export default class Transfer extends Component {
  constructor() {
    super()
    this.state = {
      error: undefined,
      amount: 0,
      to: null
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
  }
  render () {
    return (
      <Center>
        <h1>
          {this.state.error && 'Error: nothing transfered'}
          {this.state.error === null && `Transferd ${this.state.amount} to ${this.state.to}`}
        </h1>
        <h2>
          Current Balance: ${this.props.balance}
        </h2>
      </Center>
    )
  }
}
