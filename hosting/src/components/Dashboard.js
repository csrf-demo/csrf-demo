import React, { Component } from 'react'
import styled, { ThemeProvider } from 'styled-components'
import Center from './shared/Center.js'
import firebase from 'firebase'

const Title = styled.h1`
  display: flex;
  justify-content: center;
  padding-top: .5em;
  color: ${props => props.theme.colors.title};
  font-size: 50px;
`

const SubTitle = styled.h2`
  font-size: 15px;
  color: ${props => props.theme.colors.subtitle};
`

const Users = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

  @media(${props => props.theme.mobile}){
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }
`

const User = styled.div`
  display: flex;
  justify-content: center;
  min-width: 10em;
  background-color: #eee;
  padding: 10px;
  margin: 10px;

  @media(${props => props.theme.mobile}){
    min-width: 100%;
  }
`

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
      <Center>
        <Title>
          Overview
        </Title>
        <Users>
          {this.state.accounts.map((account) => (
            <User key={account.email}>
              <div>
                <SubTitle>User: {account.displayName}</SubTitle>
                <SubTitle>Balance: {account.balance}</SubTitle>
              </div>
            </User>
          ))}
        </Users>
      </Center>
    )
  }
}

export default Dashboard
