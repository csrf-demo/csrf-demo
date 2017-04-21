import React, { Component } from 'react'
import styled from 'styled-components'

const Title = styled.h1`
  color: ${props => props.theme.background};
`

export default class Home extends Component {
  render (){
    return (
      <Title>
        {this.props.user && this.props.user.email}
      </Title>
    )
  }
}
