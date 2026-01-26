import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import AboutOverlay from './components/AboutOverlay'
import Carousel from './components/Carousel'
import Events from './components/Events'


const App = () => {
  return (
    <div>
      <Navbar/>
      <Hero/>
      <AboutOverlay/>
      <Carousel/>
    <Events/>
    
    </div>
  )
}

export default App
