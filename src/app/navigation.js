"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { IconMenu2, IconX } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";

const NAV_ITEMS = Object.freeze([
  { name: "Home", link: "/" },
  { name: "About me", link: "/#about" },
  { name: "Photo Gallery", link: "/photogallery" },
  { name: "Stories", link: "/stories" },
  { name: "Resume", link: "/myresume.pdf" },
]);

export function Navigation() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  function handleToggle() {
    setIsMobileOpen((prev) => !prev);
  }

  function handleClose() {
    setIsMobileOpen(false);
  }

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-4 left-1/2 z-50 w-[95vw] max-w-6xl -translate-x-1/2 md:rounded-full border border-white/20 bg-white/30 px-6 py-3 shadow-lg backdrop-blur-md backdrop-saturate-150 "
    >
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center space-x-2 font-semibold text-black dark:text-white"
        >
          <Image
            src={"/bikku.jpg"}
            width={40}
            height={40}
            alt="bikku-inage"
            className="border rounded-3xl"
          />

          <span>Bikku BS</span>
        </Link>

        {/* Desktop nav items */}
        <div className="hidden gap-6 text-sm text-black/80 dark:text-white/80 md:flex">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.name}
              href={item.link}
              className="relative rounded-full px-4 py-2 transition hover:bg-white/40 hover:backdrop-blur-sm dark:hover:bg-white/10"
            >
              {item.name}
            </a>
          ))}
        </div>

        {/* Mobile menu toggle */}
        <div className="md:hidden">
          {isMobileOpen ? (
            <IconX
              className="text-white"
              onClick={handleToggle}
            />
          ) : (
            <IconMenu2
              className="text-white"
              onClick={handleToggle}
            />
          )}
        </div>
      </div>

      {/* Mobile nav items */}
      <AnimatePresence>
        {isMobileOpen && (
          <div className="overflow-hidden">
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4 flex flex-col gap-3 rounded-xl bg-white/40 p-4 text-black md:hidden"
            >
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.name}
                  href={item.link}
                  onClick={handleClose}
                  className="w-full rounded-lg px-3 py-2 text-left hover:bg-white/60 dark:hover:bg-white/20"
                >
                  {item.name}
                </a>
              ))}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
