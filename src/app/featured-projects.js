import React from "react";
import { motion } from "framer-motion";

export default function FeaturedProjects() {
  const devProjects = [
    {
      title: "Lilly.AI",
      description:
        "A friendly chatbot for mental health support, built with empathetic design and AI-driven responses.",
      liveDemo: "http://lillychat.live/",
      github: "https://github.com/bikkubs97/lilly-chat",
    },
  ];

  return (
    <section
      id="projects"
      className="bg-black px-4 py-14 md:px-8 lg:px-12"
    >
      {/* Featured Project Heading */}
      <motion.h2
        className="mx-auto mb-10 max-w-4xl text-center text-3xl font-semibold leading-tight text-white md:text-4xl"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        Featured Project
      </motion.h2>

      {/* Full-width project cards */}
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4">
        {devProjects.map((project, index) => (
          <motion.div
            key={project.title}
            className="flex w-full flex-col items-start justify-between gap-5 rounded-lg border border-white/10 bg-white/[0.055] p-5 shadow-[0_18px_60px_rgba(0,0,0,0.34)] backdrop-blur-xl transition-colors hover:bg-white/[0.08] md:flex-row md:items-center md:p-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
              delay: index * 0.15,
              ease: "easeOut",
            }}
            whileHover={{ scale: 1.01 }}
          >
            <div className="flex-1">
              <h3 className="mb-2 text-xl font-semibold text-white md:text-2xl">
                {project.title}
              </h3>
              <p className="max-w-2xl text-sm leading-6 text-neutral-300 md:text-base">
                {project.description}
              </p>
            </div>

            <div className="flex w-full gap-3 md:w-auto">
              <a
                href={project.liveDemo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 rounded-lg bg-white px-4 py-2 text-center text-sm font-medium text-black shadow-sm transition hover:bg-neutral-200 md:flex-none"
              >
                Live Demo
              </a>
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 rounded-lg border border-white/14 bg-white/[0.06] px-4 py-2 text-center text-sm font-medium text-white transition hover:bg-white/[0.1] md:flex-none"
              >
                GitHub
              </a>
            </div>
          </motion.div>
        ))}
      </div>

      {/* More Projects Link */}
      <div className="w-full text-center mt-6">
        <a
          href="https://github.com/bikkubs97"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block rounded-lg border border-white/12 bg-white/[0.055] px-5 py-2 text-sm font-medium text-white shadow-sm backdrop-blur-md transition hover:bg-white/[0.1]"
        >
          View More Projects
        </a>
      </div>
    </section>
  );
}
