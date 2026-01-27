import React, { useEffect, useRef } from "react";
import LocomotiveScroll from "locomotive-scroll";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import AboutOverlay from "./components/AboutOverlay";
import Carousel from "./components/Carousel";
import Events from "./components/Events";
import Footer from "./components/Footer";

import "locomotive-scroll/dist/locomotive-scroll.css";

const App = () => {
  const scrollRef = useRef(null);

  useEffect(() => {
    const locoScroll = new LocomotiveScroll({
      el: scrollRef.current,
      smooth: true,
      multiplier: 1,
      smartphone: { smooth: true },
      tablet: { smooth: true },
    });

    return () => {
      locoScroll.destroy();
    };
  }, []);

  return (
    <div data-scroll-container ref={scrollRef}>
      <Navbar />
      <Hero />
      <AboutOverlay />
      <Carousel />
      <Events />
      <Footer />
    </div>
  );
};

export default App;
