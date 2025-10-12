"use client";;
import { StarsBackground } from "@/components/ui/shootingstars";
import { ShootingStars } from "@/components/ui/stars";
import { Navigation } from "./navigation";
import AboutMe from "./about";
import Footer from "./footer";
import Gallery from "./gallery";
import Hero from "./hero";
import FeaturedProjects from "./featured-projects";


export default function Home() {
  return (
    <>
      <Navigation />
      <StarsBackground />
      <ShootingStars />
      <Hero />
        <FeaturedProjects />
      <AboutMe />
      <Gallery />
    
      <Footer />
    </>
  );
}
