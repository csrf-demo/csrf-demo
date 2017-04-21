import React from 'react'
import { injectGlobal, ThemeProvider } from 'styled-components'

injectGlobal`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-family: 'Source Sans Pro';
  }
`

const theme = {
  background: '#444444',
  title: '#D8D8D8',
  subtitle: '#787878',
  text: '#A3A3A3'
}

const Styles = (props) => (
  <ThemeProvider theme={theme}>
    {props.children}
  </ThemeProvider>
)

export default Styles
