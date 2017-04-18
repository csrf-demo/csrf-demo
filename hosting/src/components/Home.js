import React, { Component } from 'react'

export default class Home extends Component {
  render (){
    return (
      <h1>{this.props.user && this.props.user.email}</h1>
    )
  }
}
