"use client";

import { motion, Variants } from "framer-motion";

const WORDS = ["Teresa", "Kae"];

const container: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
};

const word: Variants = {
  hidden: { opacity: 0, y: 40, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
};

const subtitle: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      delay: 0.55,
    },
  },
};

const scrollDot: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { delay: 1.1, duration: 0.6 },
  },
};

export default function Hero() {
  return (
    <section
      id="hero"
      style={{
        minHeight: "100svh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        paddingLeft: "var(--space-section-x)",
        paddingRight: "var(--space-section-x)",
        paddingBottom: "15vh", 
        position: "relative",
      }}
    >
      <motion.h1
        variants={container}
        initial="hidden"
        animate="show"
        style={{
          fontFamily: "var(--font-display)",
          fontStyle: "italic",
          fontSize: "var(--text-hero)",
          fontWeight: 300,
          letterSpacing: "-0.02em",
          lineHeight: 1.05,
          color: "var(--color-text)",
          margin: 0,
        }}
      >
        {WORDS.map((w) => (
          <motion.span
            key={w}
            variants={word}
            style={{ display: "inline-block", marginRight: "0.25em" }}
          >
            {w}
          </motion.span>
        ))}
      </motion.h1>

      <motion.p
        variants={subtitle}
        initial="hidden"
        animate="show"
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: "var(--text-small)",
          fontWeight: 500,
          color: "var(--color-text-secondary)",
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          marginTop: "1.25rem",
        }}
      >
        Full-stack developer &amp; product designer
      </motion.p>

      <motion.div
        variants={scrollDot}
        initial="hidden"
        animate="show"
        style={{
          position: "absolute",
          bottom: "calc(30vh + 2.5rem)", 
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <motion.div
          style={{
            width: 1,
            height: 48,
            background:
              "linear-gradient(to bottom, rgba(255,255,255,0.25), transparent)",
            borderRadius: 1,
          }}
          animate={{ scaleY: [1, 0.4, 1], opacity: [0.6, 0.2, 0.6] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}
