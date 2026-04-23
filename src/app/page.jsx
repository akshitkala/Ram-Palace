
// BRP-DEV: trigger reload
import Hero from "@/components/Hero";
import HeroAboutSection from "@/components/HeroAboutSection";
import Carousel from "@/components/Carousel";
import Events from "@/components/Events";
import Footer from "@/components/Footer";
import Testimonial from "@/components/Testimonial";
import testimonials from "@/Data/Testimonial";
import AntiGravitySection from "@/components/AntiGravitySection";
import MiniGallery from "@/components/MiniGallery";
import CateringFeature from "@/components/CateringFeature";
import HomeEnquiry from "@/components/HomeEnquiry";
import FAQSection from "@/components/FAQSection";


export default function Home() {
  return (
    <div>
      <Hero />
      <HeroAboutSection />
      <AntiGravitySection>
        <Carousel />
      </AntiGravitySection>
      <AntiGravitySection>
        <Events />
      </AntiGravitySection>
      <CateringFeature />
      <AntiGravitySection>
        <MiniGallery />
      </AntiGravitySection>
      <AntiGravitySection>
        <Testimonial testimonials={testimonials} autoplay={true} />
      </AntiGravitySection>
      <AntiGravitySection>
        <FAQSection />
      </AntiGravitySection>
      <HomeEnquiry />
      <AntiGravitySection>
        <Footer />
      </AntiGravitySection>
    </div>
  );
}