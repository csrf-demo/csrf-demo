import React, { Component } from 'react'
import firebase from 'firebase'
import styled, { keyframes } from 'styled-components'

const Square = (props) => {
  const hyp = Math.sqrt(props.size**2 * 2);

  const start = `
    translateY(calc(100vh + ${hyp - props.size}em));
  `

  const lift = keyframes`
    from {
      transform: ${start};
    }
    to {
      transform: translateY(-${hyp}em);
    }
  `

  const rotate = keyframes`
    from {
      transform: rotate(360deg);
    }
    to {
      transform: rotate(0deg);
    }
  `

  const Square = styled.div`
    display: inline-block;
    position: fixed;
    width: ${props.size}em;
    height: ${props.size}em;
    opacity: 0.25;
    left: calc(${props.x}vw - ${props.size / 2}em);
    animation: ${lift} ${props.lift}s linear infinite;
    animation-delay: ${props.delay}s;
    transform: ${start};

    &::after {
      content: '';
      display: inline-block;
      width: 100%;
      height: 100%;
      background: black;
      border-radius: 2%;
      animation: ${rotate} ${props.rotate}s linear infinite;
    }
  `

  return <Square/>;
}




class Dashboard extends Component {
  shouldComponentUpdate() {
    return false;
  }
  render (){
    return (
      <div>
        <Square x={10} size={5} rotate={25} lift={25} delay={4}/>
      </div>
    )
  }
}

export default Dashboard
