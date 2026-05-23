"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { useLenis } from "@/hooks/useLenis";
import MagneticGlowButton from "@/components/ui/MagneticGlowButton";

const NAV_LINKS = [
  { label: "Projects",     href: "/projects" },
  { label: "Process",      href: "#workflow" },
  { label: "Achievements", href: "#timeline" },
];

const navbarVariants: Variants = {
  hidden: { opacity: 0, y: -16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      staggerChildren: 0.06,
      delayChildren: 0.15,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: -8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
    },
  },
};

export default function Navbar() {
  const [scrolled, setScrolled]     = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useLenis(({ scroll }) => {
    setScrolled(scroll > 60);
  });

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-5 px-4 pointer-events-none">
      <motion.nav
        variants={navbarVariants}
        initial="hidden"
        animate="visible"
        className="flex items-center w-full max-w-2xl px-2 py-2 pointer-events-auto transition-[background,box-shadow] duration-500"
        style={{
          background: scrolled
            ? "rgba(5, 8, 16, 0.82)"
            : "rgba(5, 8, 16, 0.55)",
          backdropFilter: "blur(20px) saturate(180%)",
          WebkitBackdropFilter: "blur(20px) saturate(180%)",
          border: "1px solid rgba(255, 255, 255, 0.07)",
          borderRadius: "999px",
          boxShadow: scrolled
            ? "0 1px 0 rgba(255,255,255,0.05) inset, 0 8px 32px rgba(0,0,0,0.45)"
            : "0 1px 0 rgba(255,255,255,0.03) inset",
        }}
      >
        <motion.div variants={itemVariants}>
          <Link
            href="/"
            className="px-4 py-1.5 rounded-full text-sm whitespace-nowrap transition-colors duration-200 hover:bg-white/5"
            style={{
              color: "rgba(255, 255, 255, 0.92)",
              letterSpacing: "-0.02em",
              fontFamily: "var(--font-sans)",
              fontWeight: 500,
              border: "1px solid rgba(255, 255, 255, 0.14)",
              borderRadius: "999px",
            }}
          >
            Teresa Kae
          </Link>
        </motion.div>

        <div className="flex-1" />

        <div className="hidden md:flex items-center gap-0.5">
          {NAV_LINKS.map((item) => (
            <motion.div key={item.label} variants={itemVariants}>
              <a
                href={item.href}
                className="px-4 py-1.5 rounded-full text-sm transition-colors duration-200 hover:bg-white/5 hover:text-white/80"
                style={{
                  color: "rgba(255, 255, 255, 0.50)",
                  fontWeight: 400,
                  fontFamily: "var(--font-sans)",
                }}
              >
                {item.label}
              </a>
            </motion.div>
          ))}
        </div>

        <div className="flex-1 hidden md:block" />

        <motion.div variants={itemVariants} className="hidden md:block">
          <MagneticGlowButton
            text="Let's talk →"
            href="#contact"
            glowColor="rgba(105,155,255,0.6)"
            enableGlass
            glassColor="rgba(105,155,255,0.08)"
            blurAmount={12}
            textColor="rgba(255,255,255,0.88)"
            borderWidth={1}
            outerGlowColor="transparent"
            showOuterGlow={false}
            fontSize={13}
            fontWeight={500}
            paddingX={20}
            paddingY={8}
          />
        </motion.div>

        <button
          className="md:hidden ml-2 px-3 py-1.5 rounded-full hover:bg-white/5 transition-colors duration-200"
          style={{ color: "rgba(255,255,255,0.75)" }}
          aria-label="Toggle menu"
          onClick={() => setMobileOpen((v) => !v)}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            {mobileOpen ? (
              <path d="M4 4l10 10M14 4L4 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            ) : (
              <path d="M2 5h14M2 9h14M2 13h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </motion.nav>

      {mobileOpen && (
        <div
          className="absolute top-20 left-4 right-4 pointer-events-auto md:hidden rounded-2xl overflow-hidden"
          style={{
            background: "rgba(5, 8, 16, 0.92)",
            backdropFilter: "blur(20px) saturate(180%)",
            WebkitBackdropFilter: "blur(20px) saturate(180%)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <div className="flex flex-col py-2">
            {NAV_LINKS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="px-5 py-3.5 text-sm transition-colors duration-200 hover:bg-white/5"
                style={{
                  color: "rgba(255,255,255,0.75)",
                  fontWeight: 400,
                  fontFamily: "var(--font-sans)",
                  borderBottom: "1px solid rgba(255,255,255,0.05)",
                }}
              >
                {item.label}
              </a>
            ))}
            <div className="px-5 py-4">
              <a
                href="#contact"
                onClick={() => setMobileOpen(false)}
                className="block text-center text-sm font-medium py-2.5 rounded-full transition-colors duration-200"
                style={{
                  background: "rgba(105,155,255,0.12)",
                  border: "1px solid rgba(105,155,255,0.2)",
                  color: "rgba(255,255,255,0.88)",
                  fontFamily: "var(--font-sans)",
                }}
              >
                Let's talk →
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
