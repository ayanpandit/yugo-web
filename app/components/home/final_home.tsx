import WhyTravelWithUs from "./booking";
import TourPackages from "./tours";
import DestinationsHero from "./destination";
import HeroSection from "./hero";
import AboutUs from "./about";
import ExperienceSection from "./explore";
import Testimonials from "./testimonials";
import Blogs from "./blogs";
import FAQs from "./faq";
import VibeGallery from "./vibe";
import Footer from "./footer";
import SmoothScrollProvider from "../providers/smooth-scroll";
export default function Final_home() {
  return (
    <SmoothScrollProvider>
      <HeroSection />
      <AboutUs />
      <ExperienceSection />
      <DestinationsHero />
      <TourPackages />
      <WhyTravelWithUs />
      <Testimonials />
      <Blogs />
      <VibeGallery />
      <FAQs />
      <Footer/>
    </SmoothScrollProvider>
  );
}