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
  z-index: -1;
`

const fall = keyframes`
  from {
    transform: translateY(-12em);
  }
  to {
    transform: translateY(100vh);
  }
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
  top: 0;
  left: ${props => props.x || 0}%;
  width: ${props => props.size}em;
  height: ${props => props.size}em;
  opacity: 0.15;
  animation: ${fall} 20s linear infinite;
  animation-delay: ${props => props.delay}s;
  transform: translateY(-100vh);
  &::after {
    content: '';
    display: inline-block;
    width: 100%;
    height: 100%;
    background-image: url(/img/mask.svg);
    background-size: 150%;
    background-repeat: no-repeat;
    background-position: center;
    animation: ${rotate} ${props => props.rotationSpeed}s linear alternate infinite;
  }
`

class Hats extends Component {
  hats() {
    let hats = []
    for (let i = 0; i < 100; i += 2) {
      hats[i] = {
        // every 2 percentages with possible deviation of (-4%, 4%)
        x: i + (Math.floor(Math.random() * 8) - 4),
        // random between 2 and 10
        size: Math.floor(Math.random() * 8) + 2,
        // random between 3 and 7
        rotationSpeed: Math.floor(Math.random() * 6) + 3,
        // delay 0 to 10
        delay: i % 25 + Math.floor(Math.random() * 10)
      }
    }
    return hats.map((data) => (
      <Hat {...data} key={Math.random()}/>
    ))
  }
  shouldComponentUpdate() {
    return false
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
