import React from 'react'
import Hero from "../components/Hero";
import AboutOverlay from "../components/AboutOverlay";
import Carousel from "../components/Carousel";
import Events from "../components/Events";
import Footer from "../components/Footer";
import Testimonial from '../components/Testimonial';
import testimonials from "../Data/Testimonial";
import AntiGravitySection from '../components/AntiGravitySection';

const Home = () => {
  return (
    <div>
      <Hero />
      <AntiGravitySection>
        <AboutOverlay />
      </AntiGravitySection>
      <AntiGravitySection>
        <Carousel />
      </AntiGravitySection>
      <AntiGravitySection>
        <Events />
      </AntiGravitySection>
      <AntiGravitySection>
        <Testimonial testimonials={testimonials} />
      </AntiGravitySection>
      <AntiGravitySection>
        <Footer />
      </AntiGravitySection>
    </div>
  )
}

export default Home;
