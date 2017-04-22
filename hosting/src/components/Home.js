import { format } from 'currency-formatter'
import React, { Component } from 'react'
import styled, { keyframes } from 'styled-components'
import Center from './shared/Center'

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

 class Home extends Component {
  render () {
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
              </div>
            )
        }
      </Center>
    )
  }
}

export default Home
