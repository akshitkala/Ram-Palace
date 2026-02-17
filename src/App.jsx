import React, { useEffect, useRef } from "react";
import LocomotiveScroll from "locomotive-scroll";
import Navbar from "./components/Navbar";
import "locomotive-scroll/dist/locomotive-scroll.css";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Contact from "./pages/Contact.jsx";
import EventsPage from "./pages/EventsPage.jsx";
import Gallery from "./pages/Gallery.jsx";
import Weddings from "./pages/events/Weddings.jsx";
import CorporateEvents from "./pages/events/CorporateEvents.jsx";
import PrivateParties from "./pages/events/PrivateParties.jsx";
import Enquiry from "./pages/Enquiry.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";

const App = () => {
  const scrollRef = useRef(null);
  const location = useLocation();
  const locoScrollRef = useRef(null);

  useEffect(() => {
    if (!scrollRef.current) return;
    
    locoScrollRef.current = new LocomotiveScroll({
      el: scrollRef.current,
      smooth: true,
      multiplier: 1,
      smartphone: { smooth: true },
      tablet: { smooth: true },
    });

    return () => {
      if (locoScrollRef.current) {
        locoScrollRef.current.destroy();
        locoScrollRef.current = null;
      }
    };
  }, []);

  // Handle route changes
  useEffect(() => {
    // Native scroll reset
    window.scrollTo(0, 0);

    // Locomotive scroll reset
    if (locoScrollRef.current) {
      // Small timeout to allow DOM to update
      setTimeout(() => {
        locoScrollRef.current.update();
        locoScrollRef.current.scrollTo("top", { duration: 0, disableLerp: true });
      }, 100);
    }
  }, [location.pathname]);

  return (
    <div data-scroll-container ref={scrollRef} className="overflow-x-hidden">
      <ScrollToTop />
      <Navbar/>
      <Routes>
        <Route path="/" element ={<Home/>}/>
        <Route path="/Contact" element ={<Contact/>}/>
        <Route path="/EventsPage" element ={<EventsPage/>}/>
        <Route path="/gallery" element ={<Gallery/>}/>
        <Route path="/events/weddings" element={<Weddings/>}/>
        <Route path="/events/corporate-events" element={<CorporateEvents/>}/>
        <Route path="/events/private-parties" element={<PrivateParties/>}/>
        <Route path="/enquiry" element={<Enquiry/>}/>
      </Routes>
    </div>
  );
};

export default App;
