import React, { Component } from 'react'
import styled from 'styled-components'

export default class SignIn extends Component {
  render () {
    return (
      <span onClick={this.props.signIn}>sigin in</span>
    )
  }
}
