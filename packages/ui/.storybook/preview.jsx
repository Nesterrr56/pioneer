import React from 'react'
import { GlobalStyle } from '../src/app/providers/GlobalStyle'

const stylesWrapperDecorator = (styleFn) => (
  <div>
    <GlobalStyle />
    {styleFn()}
  </div>
)

export const decorators = [stylesWrapperDecorator]

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  backgrounds: {
    default: 'white',
    values: [
      {
        name: 'black',
        value: '#000000',
      },
      {
        name: 'white',
        value: '#ffffff',
      },
    ],
  },
}