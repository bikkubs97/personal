"use client";

import React from "react";
import { motion } from "framer-motion";
import { Timeline } from "@/components/ui/timeline";

const cardClass =
  "rounded-lg border border-white/10 bg-white/[0.055] p-5 shadow-[0_16px_50px_rgba(0,0,0,0.3)] backdrop-blur-xl transition-all duration-300 hover:bg-white/[0.085]";

const cardMotion = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  whileHover: { scale: 1.01 },
};

export default function AboutMe() {
  return (
    <div
      id="about"
      className="relative overflow-hidden bg-[linear-gradient(180deg,#000_0%,#09090b_42%,#000_100%)] px-4 py-16 text-white sm:px-8 lg:px-16"
    >
      {/* Subtle radial overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.045),transparent)]" />
      <div className="relative z-10">
        <Timeline
          data={[
            {
              title: "Profile",
              subtitle: "Summary",
              date: "Now",
              content: (
                <motion.div
                  className={cardClass}
                  {...cardMotion}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                >
                  <h2 className="mb-3 text-lg font-semibold leading-snug text-white md:text-xl">
                    Full-Stack Engineer
                  </h2>
                  <p className="text-sm leading-7 text-neutral-300 md:text-base">
                    I build and ship product features end-to-end, with 2+ years
                    of experience developing scalable web applications,
                    automation systems, and AI-powered tools using Next.js,
                    TypeScript, and Node.js. My focus is rapid execution,
                    ownership, and solving real business problems through
                    engineering.
                  </p>
                </motion.div>
              ),
            },
            {
              title: "Skills",
              subtitle: "Technical Toolkit",
              date: "Current",
              content: (
                <div className="grid gap-4 md:grid-cols-2">
                  {[
                    {
                      label: "Frontend",
                      skills: "React, Next.js, TypeScript, Tailwind CSS",
                    },
                    {
                      label: "Backend",
                      skills: "Node.js, Express.js, REST APIs, MongoDB",
                    },
                    {
                      label: "Tools",
                      skills: "n8n, Webflow, Zoho, GoHighLevel",
                    },
                    {
                      label: "AI & Growth",
                      skills: "OpenAI API integration, SEO, automation systems",
                    },
                  ].map((group, i) => (
                    <motion.div
                      key={group.label}
                      className={cardClass}
                      {...cardMotion}
                      transition={{ duration: 0.6, delay: i * 0.12, ease: "easeOut" }}
                    >
                      <h2 className="mb-2 text-base font-semibold leading-snug text-white md:text-lg">
                        {group.label}
                      </h2>
                      <p className="text-sm leading-6 text-neutral-300">
                        {group.skills}
                      </p>
                    </motion.div>
                  ))}
                </div>
              ),
            },
            {
              title: "Experience",
              subtitle: "Professional Timeline",
              date: "2023 - Present",
              content: (
                <div className="space-y-6">
                  {[
                    {
                      company: "Black Pagoda Advisors",
                      role: "Full-Stack Engineer · Remote, USA · Apr 2024 - Present",
                      points: [
                        "Built and shipped production-ready features end-to-end using Next.js, TypeScript, and Node.js across multiple client products.",
                        "Developed scalable backend APIs and data workflows using Node.js and MongoDB to support business-critical operations.",
                        "Built a B2B marketplace platform enabling accounting firms to list services and generate leads.",
                        "Designed lead capture and qualification funnels integrated with GoHighLevel and Zoho, improving lead tracking and reducing manual follow-up.",
                        "Automated internal and marketing workflows using n8n, reducing repetitive operational work.",
                        "Improved organic search performance across multiple websites with technical SEO and automation strategies.",
                        "Integrated OpenAI APIs into internal tools and workflows to automate content generation and enhance product capabilities.",
                      ],
                    },
                    {
                      company: "Afame Technologies",
                      role: "Full-Stack Developer Intern · Remote, India · Feb 2024 - Mar 2024",
                      points: [
                        "Built and shipped features across frontend and backend using the MERN stack.",
                      ],
                    },
                    {
                      company: "Business Web Solutions Inc.",
                      role: "Full-Stack Developer Intern · Remote, India · Apr 2023 - Jun 2023",
                      points: [
                        "Worked across frontend and backend systems using MERN stack and Python to deliver production features.",
                      ],
                    },
                  ].map((item, i) => (
                    <motion.div
                      key={item.company}
                      className={cardClass}
                      {...cardMotion}
                      transition={{ duration: 0.6, delay: i * 0.15, ease: "easeOut" }}
                    >
                      <h2 className="text-lg font-semibold leading-snug text-white md:text-xl">
                        {item.company}
                      </h2>
                      <h3 className="mb-4 text-xs font-medium text-neutral-300 md:text-sm">
                        {item.role}
                      </h3>
                      <ul className="list-disc space-y-2 pl-4 text-xs leading-6 text-neutral-400 md:text-sm">
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
              title: "Projects",
              subtitle: "Selected Work",
              date: "Recent",
              content: (
                <div className="space-y-6">
                  {[
                    {
                      name: "Lillychat.live",
                      type: "AI Mental Health Chatbot",
                      details:
                        "Built and deployed a real-time AI chatbot using OpenAI APIs, designed to provide private emotional support. Developed full-stack using Next.js, TypeScript, and Node.js with focus on conversational UX, performance, and reliability.",
                    },
                    {
                      name: "Smart Indoor Localisation using LiFi",
                      type: "Academic Project",
                      details:
                        "Developed an Android application integrated with a LiFi-based lighting system for indoor navigation.",
                    },
                  ].map((project, i) => (
                    <motion.div
                      key={project.name}
                      className={cardClass}
                      {...cardMotion}
                      transition={{ duration: 0.6, delay: i * 0.15, ease: "easeOut" }}
                    >
                      <h2 className="text-lg font-semibold leading-snug text-white md:text-xl">
                        {project.name}
                      </h2>
                      <h3 className="mb-4 text-xs font-medium text-neutral-300 md:text-sm">
                        {project.type}
                      </h3>
                      <p className="text-sm leading-7 text-neutral-300 md:text-base">
                        {project.details}
                      </p>
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
                      course: "Full-Stack Software Developer Professional Certificate",
                      topics: ["Full-stack application development", "Software engineering foundations"],
                    },
                    {
                      platform: "Google - Coursera",
                      course: "UX Design Professional Certificate",
                      topics: ["UX research and prototyping", "User-centered product design"],
                    },
                  ].map((cert, i) => (
                    <motion.div
                      key={cert.course}
                      className={cardClass}
                      {...cardMotion}
                      transition={{ duration: 0.6, delay: i * 0.15, ease: "easeOut" }}
                    >
                      <h2 className="text-lg font-semibold leading-snug text-white md:text-xl">
                        {cert.platform}
                      </h2>
                      <h3 className="mb-4 text-xs font-medium text-neutral-300 md:text-sm">
                        {cert.course}
                      </h3>
                      <ul className="list-disc space-y-2 pl-4 text-xs leading-6 text-neutral-400 md:text-sm">
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
                  className={cardClass}
                  {...cardMotion}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                >
                  <h2 className="text-lg font-semibold leading-snug text-white md:text-xl">
                    APJ Abdul Kalam Technological University
                  </h2>
                  <h3 className="mb-4 text-xs font-medium text-neutral-300 md:text-sm">
                    B.Tech in Electronics and Communication Engineering
                  </h3>
                  <ul className="list-disc space-y-2 pl-4 text-xs leading-6 text-neutral-400 md:text-sm">
                    <li>Graduated with CGPA 6.98</li>
                    <li>Higher Secondary, Science Group: 91%</li>
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
