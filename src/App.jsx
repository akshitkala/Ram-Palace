import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import AboutOverlay from './components/AboutOverlay'
import Carousel from './components/Carousel'
import Events from './components/Events'
import Footer from './components/Footer'

const App = () => {
  return (
    <div>
      <Navbar/>
      <Hero/>
      <AboutOverlay/>
      <Carousel/>
    <Events/>

    <Footer/>
    </div>
  )
}

export default App
