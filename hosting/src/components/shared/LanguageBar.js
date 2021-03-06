import styled from 'styled-components'

const LanguageBar = styled.div`
  height: 3vh;
  font-size: 0.85em;
  background: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.barText};
  padding: 0.25em 0.5em;
  text-align: right;
  cursor: default;
`

export default LanguageBar
