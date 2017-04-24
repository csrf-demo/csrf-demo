import React, { Component } from 'react'
import styled from 'styled-components'
import Center from './shared/Center'

const mobile = 'max-width: 40em'

const Title = styled.h1`
  position: absolute;
  display: inline-block;
  color: ${props => props.theme.colors.title};
  font-size: 7vh;
  text-shadow: 0 2px 5px rgba(0,0,0,0.75);
  top: 75%;

  @media (${mobile}) {
    display: none;
  }
`

const Subtitle = styled.h2`
  position: absolute;
  display: inline-block;
  color: ${props => props.theme.colors.title};
  font-size: 5vh;
  text-shadow: 0 2px 5px rgba(0,0,0,0.75);
  font-weight: normal;
  top: calc(75% + 8.5vh);

  @media (${mobile}) {
    display: none;
  }
`

const Main = styled.main`
  background-image: url(/img/landing.png);
  background-position: top center;
  background-size: cover;
  height: 87vh;
  min-height: 29em;
  position: relative;

  @media (${mobile}) {
    background-position: top right;
  }
`

const CardWrapper = styled.div`
  display: flex;
  justify-content: flex-end;

  @media (${mobile}) {
    justify-content: center;
  }
`

const Card = styled.div`
  display: inline-block;
  background: white;
  width: 100%;
  max-width: 20em;
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(0,0,0,0.75);
  padding: 2em 1em;
  text-align: center;
  margin-top: 15vh;
  @media (${mobile}) {
    margin-top: 6vh;
  }
`

const CardTitle = styled.div`
  color: ${props => props.theme.colors.background};
  font-size: 2.75em;
  font-weight: bold;
  display: none;
  @media (${mobile}) {
    display: initial;
  }
`

const CardSubtitle = styled.span`
  display: inline-block;
  font-size: 1.75em;
  color: ${props => props.theme.colors.subtitle};
  margin: 1em 0;
`

const CardText = styled.span`
  display: inline-block;
  font-size: 1em;
  width: 100%;
  color: ${props => props.theme.colors.text};
  margin: 1em 0;
`

const GoogleButton = styled.a`
  display: inline-block;
  cursor: pointer;
  width: 80%;
  background-image: url(/img/google_login.svg);
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  padding-bottom: 18.66667%; ${''/* set button proporties 300 x 56 */}
  margin: 1em 0;
`

export default class SignIn extends Component {
  render () {
    return (
      <Main>
        <Center>
          <CardWrapper>
            <Card>
              <CardTitle>CSRF Bank</CardTitle>
              <CardSubtitle>Register</CardSubtitle>
              <GoogleButton onClick={this.props.signIn}/>
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
