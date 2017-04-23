import { format } from 'currency-formatter'
import React, { Component } from 'react'
import styled, { keyframes } from 'styled-components'
import Center from './shared/Center'
import { Link, withRouter } from 'react-router-dom'
import isEmail from 'is-email'

const Subtitle = styled.div`
  display: inline-block;
  color: ${props => props.theme.colors.subtitle};
  font-size: 1.75em;
  text-align: center;
  width: 100%;
  margin: 2.5em 0;
`

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(1.25turn);
  }
  50% {
    transform: rotate(2.50turn);
  }
  75% {
    transform: rotate(3.75turn);
  }
  100% {
    transform: rotate(5.00turn);
  }
`

const Spinner = styled.div`
  text-align: center;
  &::after {
    content: '';
    height: 3em;
    width: 3em;
    display: inline-block;
    animation: ${spin} 5s ease-in-out infinite;
    border: 0.25em solid ${props => props.theme.colors.subtitle};
    border-radius: 100%;
    border-top-color: white;
  }
`

const Balance = styled.div`
  text-align: center;
  color: ${props => props.theme.colors.subtitle};
  font-size: 4em;
  font-weight: 100;
  margin-top: -1em;
`

const FormWrapper = styled.form`
  display: inline-block;
  width: 100%;
  text-align: center;
  margin-top: -3em;
`

const GeneralInput = styled.input`
  display: inline-block;
  color: ${props => props.theme.colors.background};
  margin: auto;
  border: none;
  background: none;
  border-bottom: 0.1em ${props => props.theme.colors.background} solid;
  outline: 0;
  text-align: center;
  font-size: 1.5em;
  line-height: 1.75em;
  width: 10em;
`


const Divider = styled(Subtitle)`
  font-size: 1.25em;
  margin: 0.5em 0;
  margin-top: 1em;
`

const Button = styled.button`
  text-decoration: none;
  color: white;
  background: #E24224;
  ${props => props.disabled && 'opacity: 0.5;'}
  ${props => !props.disabled && 'cursor: pointer;'}
  margin: 1.5em;
  font-size: 1em;
  padding: 0.5em 1em;
  border: none;
  border-radius: 0.25em;
`

class Home extends Component {
  constructor() {
    super()
    this.state = {
      amount: 0,
      to: ''
    }
    this.transfer = this.transfer.bind(this)
    this.updateAmount = this.updateAmount.bind(this)
    this.updateEmail = this.updateEmail.bind(this)
    this.submit = e => e.preventDefault()
  }
  componentWillMount() {
    this.updateAmount()
  }
  updateAmount(e) {
    let amount;
    // replace anything not a number
    amount = this.raw(e ? e.target.value : 0)
    // restrict by current balance
    amount = (amount > this.props.balance) ? this.props.balance : amount
    // prepend dollar sign
    amount = format(new String(amount), {
      code: 'USD',
      decimal: '',
      precision: 0
    })
    // set decorated amount as state
    this.setState({ amount })
  }
  updateEmail(e) {
    this.setState({ to: e.target.value })
  }
  transfer() {
    this.props.history.push(`/transfer/${this.raw(this.state.amount)}/to/${this.state.to}/`)
  }
  raw(value) {
    return 0 + new Number(
      new String(value)
        .replace(/[^0-9]/g, '')
    )
  }
  render() {
    // dont display anything if no user
    if (this.props.balance === undefined) {
      return null
    }
    // display spinner if waiting on balance
    return (
      <Center>
        {
          this.props.balance === null
            ? (
              <div>
                <Subtitle>Creating your Account</Subtitle>
                <Spinner/>
              </div>
            )
            : (
              <div>
                <Subtitle>Current Balance</Subtitle>
                <Balance>
                  {format(this.props.balance, { code: 'USD' })}
                </Balance>
                <Subtitle>Make a Transfer</Subtitle>
                <FormWrapper onSubmit={this.submit}>
                  <GeneralInput
                    type="tel"
                    novalidate
                    value={this.state.amount}
                    onChange={this.updateAmount}
                  />
                  <Divider>to</Divider>
                  <GeneralInput
                    type="email"
                    novalidate
                    placeholder="Email Address"
                    value={this.state.to}
                    onChange={this.updateEmail}
                  />
                  <br/>
                  <Button
                    disabled={this.raw(this.state.amount) === 0 || !isEmail(this.state.to)}
                    onClick={this.transfer}
                  >
                    Transfer
                  </Button>
                </FormWrapper>
              </div>
            )
        }
      </Center>
    )
  }
}

export default withRouter(Home)
