import React, { useEffect, useRef } from "react";
import LocomotiveScroll from "locomotive-scroll";
import Navbar from "./components/Navbar";
import "locomotive-scroll/dist/locomotive-scroll.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx"
import Contact from "./pages/Contact.jsx";
import VirtualTour from "./pages/VirtualTour.jsx";
import EventsPage from "./pages/EventsPage.jsx";
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
    <div data-scroll-container ref={scrollRef} className="overflow-x-hidden">
      <Navbar/>
      <Routes>
        <Route path="/" element ={<Home/>}/>
        <Route path="/Contact" element ={<Contact/>}/>
        <Route path="/VirtualTour" element ={<VirtualTour/>}/>
        <Route path="/EventsPage" element ={<EventsPage/>}/>
      </Routes>
    </div>
  );
};

export default App;
