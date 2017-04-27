import styled, { keyframes } from 'styled-components'

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(1.25turn);
  }
  50% {
    transform: rotate(2.50turn);
  }
  75% {
    transform: rotate(3.75turn);
  }
  100% {
    transform: rotate(5.00turn);
  }
`

const Spinner = styled.div`
  text-align: center;
  &::after {
    content: '';
    height: 3em;
    width: 3em;
    display: inline-block;
    animation: ${spin} 5s ease-in-out infinite;
    border: 0.25em solid ${props => props.theme.colors.subtitle};
    border-radius: 100%;
    border-top-color: white;
  }
`

export default Spinner
