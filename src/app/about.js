"use client";

import React from "react";
import { motion } from "framer-motion";
import { Timeline } from "@/components/ui/timeline";

export default function AboutMe() {
  return (
    <div
      id="about"
      className="relative bg-gradient-to-b from-black via-[#3e0054] to-black text-white overflow-hidden py-12 px-4 sm:px-8 lg:px-16"
    >
      {/* Subtle radial overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.06)_0%,_transparent_70%)] pointer-events-none" />
      <div className="relative z-10">
        <Timeline
          data={[
            {
              title: "Experience",
              subtitle: "Professional Timeline",
              date: "2023 - Present",
              content: (
                <div className="space-y-6">
                  {[
                    {
                      company: "Black Pagoda Advisors",
                      role: "Full Stack Engineer",
                      points: [
                        "Experienced in UI design and development using Figma, Next.js, TypeScript , Tailwind CSS, Webflow, creating visually appealing user interfaces",
                        "Worked on scalable back-end applications with Node JS and Mongo DB. Worked with OpenAI APIs and to build intelligent chatbots, enhancing user interaction and automation.",
                      ],
                    },
                    {
                      company: "Afame Technologies",
                      role: "Full Stack Developer Intern",
                      points: [
                        "Worked on projects using MERN Stack",
                      ],
                    },
                    {
                      company: "Business Web Solutions",
                      role: "Full Stack Developer Intern",
                      points: [
                        "Worked on projects using MERN Stack and Python",
                      ],
                    },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      className="bg-white/5 rounded-xl p-5 shadow-md border border-white/10 hover:bg-white/10 transition-all duration-300"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: i * 0.15, ease: "easeOut" }}
                      whileHover={{ scale: 1.01 }}
                    >
                      <h2 className="text-lg md:text-xl font-semibold text-purple-200">
                        {item.company}
                      </h2>
                      <h3 className="text-xs md:text-sm text-gray-300 mb-3">{item.role}</h3>
                      <ul className="list-disc list-inside space-y-1 text-xs md:text-sm text-gray-400">
                        {item.points.map((point, idx) => (
                          <li key={idx}>{point}</li>
                        ))}
                      </ul>
                    </motion.div>
                  ))}
                </div>
              ),
            },
            {
              title: "Certifications",
              subtitle: "Courses & Programs",
              date: "2022 - Present",
              content: (
                <div className="space-y-6">
                  {[
                    {
                      platform: "IBM - Coursera",
                      course: "Full Stack Web Development",
                      topics: ["JavaScript, React, Node.js", "MongoDB, Python, ML"],
                    },
                    {
                      platform: "Google - Coursera",
                      course: "UX Design Professional Certification",
                      topics: ["UX Research & Prototyping", "Figma & Adobe XD"],
                    },
                  ].map((cert, i) => (
                    <motion.div
                      key={i}
                      className="bg-white/5 rounded-xl p-5 shadow-md border border-white/10 hover:bg-white/10 transition-all duration-300"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: i * 0.15, ease: "easeOut" }}
                      whileHover={{ scale: 1.01 }}
                    >
                      <h2 className="text-lg md:text-xl font-semibold text-purple-200">
                        {cert.platform}
                      </h2>
                      <h3 className="text-xs md:text-sm text-gray-300 mb-3">{cert.course}</h3>
                      <ul className="list-disc list-inside space-y-1 text-xs md:text-sm text-gray-400">
                        {cert.topics.map((t, idx) => (
                          <li key={idx}>{t}</li>
                        ))}
                      </ul>
                    </motion.div>
                  ))}
                </div>
              ),
            },
            {
              title: "Education",
              subtitle: "Academic Background",
              date: "2019 - 2023",
              content: (
                <motion.div
                  className="bg-white/5 rounded-xl p-5 shadow-md border border-white/10 hover:bg-white/10 transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  whileHover={{ scale: 1.01 }}
                >
                  <h2 className="text-lg md:text-xl font-semibold text-purple-200">
                    APJ Abdul Kalam Technological University
                  </h2>
                  <h3 className="text-xs md:text-sm text-gray-300 mb-3">B.Tech in ECE</h3>
                  <ul className="list-disc list-inside space-y-1 text-xs md:text-sm text-gray-400">
                    <li>Graduated with CGPA 6.98</li>
                    <li>Graduation project : Smart Indoor Localization using Li-Fi</li>
                  </ul>
                </motion.div>
              ),
            },
          ]}
        />
      </div>
    </div>
  );
}
