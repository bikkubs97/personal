"use client";;
import { StarsBackground } from "@/components/ui/shootingstars";
import { ShootingStars } from "@/components/ui/stars";
import { Navigation } from "../navigation";
import AboutMe from "../about";
import Footer from "../footer";
import Gallery from "../gallery";
import Hero from "../hero";
import FeaturedProjects from "../featured-projects";
import Link from "next/link";

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

      <section className="bg-black px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl rounded-2xl border border-white/10 bg-white/5 p-8 text-center shadow-[0_25px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl">
          <p className="text-sm uppercase tracking-[0.28em] text-fuchsia-200">
            Published work
          </p>
          <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
            Curate visual and literary work in one place
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-300">
            Launch a dedicated photo archive and a stories section for essays, poems, and short fiction with a clean content structure ready for Payload CMS integration.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/photogallery"
              className="rounded-full bg-fuchsia-500 px-6 py-3 font-medium text-white transition hover:bg-fuchsia-400"
            >
              View photo gallery
            </Link>
            <Link
              href="/stories"
              className="rounded-full border border-fuchsia-400/50 bg-fuchsia-500/10 px-6 py-3 font-medium text-fuchsia-100 transition hover:bg-fuchsia-500/20"
            >
              Read stories
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
