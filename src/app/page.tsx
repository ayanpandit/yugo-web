import type { Metadata } from "next";
import Final_home from "../components/home/final_home";
import AboutPage from "../components/footer/about-page";
import BlogsPage from "../components/footer/blogs-page";
import BookTripPage from "../components/footer/book-a-trip-page";
import PrivacyPage from "../components/footer/privacy-policy-page";
import TermsPage from "../components/footer/terms-conditions-page";
import ToursPage from "../components/footer/tours-page";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export async function generateMetadata({ searchParams }: { searchParams: SearchParams }): Promise<Metadata> {
  const resolvedParams = await searchParams;
  const route = resolvedParams?.route;

  switch (route) {
    case 'about': return { title: "About YouGO — Our Story", description: "Discover how YouGO is redefining travel." };
    case 'blogs': return { title: "Travel Stories — YouGO Blogs", description: "Read amazing travel stories from the YouGO community." };
    case 'book-a-trip': return { title: "Book a Trip — YouGO", description: "Start your adventure with YouGO." };
    case 'privacy-policy': return { title: "Privacy Policy — YouGO", description: "Our privacy policy and data handling." };
    case 'terms-conditions': return { title: "Terms and Conditions — YouGO", description: "Terms of service for using YouGO." };
    case 'tours': return { title: "Explore Tours — YouGO", description: "Discover our curated travel packages." };
    default: return { title: "YouGO — Find Travel Partners & AI Planned Trips" };
  }
}

export default async function Home({ searchParams }: { searchParams: SearchParams }) {
  const resolvedParams = await searchParams;
  const route = resolvedParams?.route;

  if (route === 'about') return <AboutPage />;
  if (route === 'blogs') return <BlogsPage />;
  if (route === 'book-a-trip') return <BookTripPage />;
  if (route === 'privacy-policy') return <PrivacyPage />;
  if (route === 'terms-conditions') return <TermsPage />;
  if (route === 'tours') return <ToursPage />;

  return <Final_home />;
}