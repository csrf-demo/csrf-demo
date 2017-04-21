import React, { Component } from 'react'
import styled from 'styled-components'
import Center from './shared/Center'

const Title = styled.h1`
  display: inline-block;
  color: ${props => props.theme.colors.title};
  ${''/* margin-top: 60vh; */}
  font-size: 4em;
  text-shadow: 0 2px 5px rgba(0,0,0,0.75);

  @media (${props => props.theme.mobile}) {
    display: none;
  }
`

const Subtitle = styled.h2`
  display: inline-block;
  color: ${props => props.theme.colors.title};
  font-size: 2.5em;
  text-shadow: 0 2px 5px rgba(0,0,0,0.75);
  font-weight: normal;

  @media (${props => props.theme.mobile}) {
    display: none;
  }
`

const Main = styled.main`
  background-image: url(/img/landing.png);
  background-position: top center;
  background-size: cover;
  height: 45em;

  @media (${props => props.theme.mobile}) {
      background-position: top right;
  }
`

const CardWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`

const Card = styled.div`
  display: inline-block;
  background: white;
  width: 100%;
  max-width: 20em;
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(0,0,0,0.75);
  padding: 1em;
  text-align: center;
`

const CardSubtitle = styled.span`
  display: inline-block;
  font-size: 1.5em;
  color: ${props => props.theme.colors.subtitle};
`

const CardText = styled.span`
  display: inline-block;
  font-size: 1em;
  width: 100%;
  color: ${props => props.theme.colors.text};
`

export default class SignIn extends Component {
  render () {
    return (
      <Main>
        <Center>
          <CardWrapper>
            <Card>
              <CardSubtitle>Register</CardSubtitle>
              <CardText>By registering you understand this is a demonstration.</CardText>
            </Card>
          </CardWrapper>
          <br/>
          <Title>CSRF Bank</Title>
          <br/>
          <Subtitle>Banking at your request.</Subtitle>
        </Center>
      </Main>
    )
  }
}
