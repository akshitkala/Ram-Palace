import React from 'react'
import Hero from "../components/Hero";
import HeroAboutSection from "../components/HeroAboutSection";
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
      {/* Hero Section 2 - About the Venue */}
      <HeroAboutSection />
      
      <AntiGravitySection>
        <Carousel />
      </AntiGravitySection>
      <AntiGravitySection>
        <Events />
      </AntiGravitySection>
      <AntiGravitySection>
        <Testimonial testimonials={testimonials} autoplay={true} autoplayInterval={2000} />
      </AntiGravitySection>
      <AntiGravitySection>
        <Footer />
      </AntiGravitySection>
    </div>
  )
}

export default Home;
