import React from 'react'

import Deck from './Components/RevealComponents/Deck'
import Slides from './Slides'

import './index.css'
import './Themes/override.css'
import 'reveal.js/dist/theme/dracula.css'

const Index = () => (
  <div className='App'>
    <Deck>{Slides}</Deck>
    <div>Notogri</div>
  </div>
)
export default Index
