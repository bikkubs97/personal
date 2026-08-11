"use client";
import React from "react";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="w-full border-t border-white/10 bg-black/95 px-5 py-8 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-center text-sm text-neutral-400 md:text-left">
          © {new Date().getFullYear()} Bikku BS
        </div>
        <div className="flex items-center gap-3 text-xl text-white">
          <a
            href="https://github.com/bikkubs97"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-white/10 bg-white/[0.04] p-2 transition duration-200 hover:bg-white/[0.1] hover:text-purple-200"
            aria-label="GitHub"
          >
            <FaGithub />
          </a>
          <a
            href="https://www.linkedin.com/in/bikku-bs/"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-white/10 bg-white/[0.04] p-2 transition duration-200 hover:bg-white/[0.1] hover:text-purple-200"
            aria-label="LinkedIn"
          >
            <FaLinkedin />
          </a>
          <a
            href="mailto:bikku4444@gmail.com"
            className="rounded-lg border border-white/10 bg-white/[0.04] p-2 transition duration-200 hover:bg-white/[0.1] hover:text-purple-200"
            aria-label="Email"
          >
            <FaEnvelope />
          </a>
        </div>
      </div>
    </footer>
  );
}
