import React from 'react'
import Hero from "../components/Hero";
import AboutOverlay from "../components/AboutOverlay";
import Carousel from "../components/Carousel";
import Events from "../components/Events";
import Footer from "../components/Footer";
const Home = () => {
  return (
    <div>
      <Hero />
      <AboutOverlay />
      <Carousel />
      <Events />
      <Footer />
    </div>
  )
}

export default Home
