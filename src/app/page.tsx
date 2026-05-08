import WhyTravelWithUs from "../components/home/booking";
import TourPackages from "../components/home/tours";
import DestinationsHero from "../components/home/destination";
import HeroSection from "../components/home/hero";
import AboutUs from "../components/home/about";
import ExperienceSection from "../components/home/explore";
import Testimonials from "../components/home/testimonials";
import Blogs from "../components/home/blogs";
import FAQs from "../components/home/faq";
import VibeGallery from "../components/home/vibe";
import Footer from "../components/home/footer";

export default function Home() {
  return (
    <>
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
      <Footer />
    </>
  );
}