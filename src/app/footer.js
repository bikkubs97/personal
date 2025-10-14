"use client";

import React from "react";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="w-full px-5 py-8 bg-black backdrop-blur-md border-t border-white/10 object-cover shadow-[0_0_30px_rgba(168,85,247,0.4)]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-white text-sm text-center md:text-left">
          © {new Date().getFullYear()} Bikku BS
        </div>
        <div className="flex items-center gap-6 text-white text-3xl">
          <a
            href="https://github.com/bikkubs97"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-purple-400 transition duration-200"
            aria-label="GitHub"
          >
            <FaGithub />
          </a>
          <a
            href="https://www.linkedin.com/in/bikku-bs/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-purple-400 transition duration-200"
            aria-label="LinkedIn"
          >
            <FaLinkedin />
          </a>
          <a
            href="mailto:bikku4444@gmail.com"
            className="hover:text-purple-400 transition duration-200"
            aria-label="Email"
          >
            <FaEnvelope />
          </a>
        </div>
      </div>
    </footer>
  );
}
