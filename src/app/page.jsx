
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


export const metadata = {
  title: "Basti Ram Palace — Luxury Banquet Hall in Manesar, Gurugram",
  description: "Basti Ram Palace is the premier banquet hall in Manesar, Gurugram for weddings, corporate events & private celebrations. Experiece world-class hospitality and luxury.",
};

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
      <HomeEnquiry />
      <AntiGravitySection>
        <Footer />
      </AntiGravitySection>
    </div>
  );
}