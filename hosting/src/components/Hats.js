import React, { Component } from 'react'
import styled, { keyframes } from 'styled-components'

const Background = styled.div`
  position: fixed;
  display: inline-block;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: white;
  ${''/* z-index: -1; */}
`

const rotate = keyframes`
  from {
    transform: rotate(-20deg);
  }
  to {
    transform: rotate(17.5deg);
  }
`

const Hat = styled.div`
  display: inline-block;
  position: absolute;
  top: 0;/*-${props => props.size}em;*/
  left: ${props => props.x || 0}%;
  width: ${props => props.size}em;
  height: ${props => props.size}em;
  opacity: 0.15;
  &::after {
    content: '';
    display: inline-block;
    width: 100%;
    height: 100%;
    background-image: url(/img/mask.svg);
    background-size: 150%;
    background-repeat: no-repeat;
    background-position: center;
    animation: ${rotate} 3s linear alternate infinite;
  }
`

class Hats extends Component {
  hats() {
    return [
      { size: 4,  x: 4  },
      { size: 10, x: 7  },
      { size: 5,  x: 17 },
      { size: 12, x: 24 },
    ].map((data) => (
      <Hat {...data} key={Math.random()}/>
    ))
  }
  render() {
    return (
      <Background>
        {this.hats()}
      </Background>
    )
  }
}

export default Hats
