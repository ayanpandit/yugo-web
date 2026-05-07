import WhyTravelWithUs from "../components/home/booking";
import TourPackages from "../components/home/tours";
import DestinationsHero from "../components/home/destination";
import HeroSection from "../components/home/hero";
import AboutUs from "../components/home/about";
import ExperienceSection from "../components/home/explore";
export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutUs />
      <ExperienceSection />
      <DestinationsHero />
      <TourPackages />
      <WhyTravelWithUs />
    </>
  );
}