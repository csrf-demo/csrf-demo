import React, { Component } from 'react'
import styled from 'styled-components'

const FooterWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 10vh;
  font-size: 0.85em;
  background: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.barText};
  padding: 0.25em 0.5em;
  text-align: center;
  cursor: default;
`

const Content = styled.div`
`

const Link = styled.a`
  color: white;
`

export default class Footer extends Component {
  render (){
    return (
      <FooterWrapper>
        <Content>
          Not FDIC Insured
          <br/>
          <Link href="https://github.com/csrf-demo/csrf-demo" target="_blank">
            Fork on Github
          </Link>
          <br/>
          Nick Breaton &#183; Jeremy Bohannon &#183; Hunter Aeraer
        </Content>
      </FooterWrapper>
    )
  }
}
