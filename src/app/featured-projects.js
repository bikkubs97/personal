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
      className="bg-gradient-to-b from-black via-[#3e0054] to-black px-4 md:px-8 lg:px-12 py-8 space-y-8"
    >
      {/* Featured Project Heading */}
      <motion.h2
        className="text-3xl md:text-4xl font-bold text-purple-300 text-center mb-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        Featured Project
      </motion.h2>

      {/* Full-width project cards */}
      <div className="flex flex-col gap-4 w-full">
        {devProjects.map((project, index) => (
          <motion.div
            key={project.title}
            className="bg-white/5 backdrop-blur-md border border-gray-700/20 rounded-xl p-4 shadow-md hover:bg-white/10 transition-colors w-full flex flex-col md:flex-row justify-between items-start md:items-center"
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
            <div className="flex-1 mb-3 md:mb-0">
              <h3 className="text-gray-200 text-xl md:text-2xl font-semibold mb-1">
                {project.title}
              </h3>
              <p className="text-gray-400 text-sm md:text-base">{project.description}</p>
            </div>

            <div className="flex gap-3 w-full md:w-auto">
              <a
                href={project.liveDemo}
                target="_blank"
                className="flex-1 md:flex-none rounded-lg bg-purple-600/80 px-3 py-1.5 text-sm text-center text-white hover:bg-purple-700 transition shadow-sm"
              >
                Live Demo
              </a>
              <a
                href={project.github}
                target="_blank"
                className="flex-1 md:flex-none rounded-lg bg-purple-600/80 px-3 py-1.5 text-sm text-center text-white hover:bg-purple-700 transition shadow-sm"
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
          className="inline-block rounded-lg bg-purple-600/80 px-5 py-2 text-white font-semibold hover:bg-purple-700 transition shadow-md"
        >
          View More Projects
        </a>
      </div>
    </section>
  );
}
