"use client";

import { useEffect, useState } from "react";
import { LayoutGroup, motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface TextRotateProps {
  texts: string[];
  rotationInterval?: number;
  initial?: any;
  animate?: any;
  exit?: any;
  staggerDuration?: number;
  staggerFrom?: "first" | "last" | "center" | number | "random";
  transition?: any;
  loop?: boolean;
  auto?: boolean;
  splitBy?: "words" | "characters" | "lines" | string;
  onNext?: () => void;
  mainClassName?: string;
  splitLevelClassName?: string;
  elementLevelClassName?: string;
}

export function TextRotate({
  texts,
  rotationInterval = 2000,
  initial = { y: "100%", opacity: 0 },
  animate = { y: 0, opacity: 1 },
  exit = { y: "-120%", opacity: 0 },
  staggerDuration = 0.025,
  staggerFrom = "last",
  transition = { type: "spring", damping: 30, stiffness: 400 },
  loop = true,
  auto = true,
  splitBy = "characters",
  onNext,
  mainClassName,
  splitLevelClassName,
  elementLevelClassName,
}: TextRotateProps) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  useEffect(() => {
    if (!auto) return;
    const interval = setInterval(() => {
      setCurrentTextIndex((prev) =>
        prev === texts.length - 1 ? (loop ? 0 : prev) : prev + 1
      );
      if (onNext) onNext();
    }, rotationInterval);
    return () => clearInterval(interval);
  }, [texts, loop, rotationInterval, auto, onNext]);

  const elements = texts[currentTextIndex].split(
    splitBy === "characters" ? "" : splitBy === "words" ? " " : splitBy
  );

  return (
    <motion.span
      className={cn("flex flex-wrap overflow-hidden", mainClassName)}
      layout
    >
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={currentTextIndex}
          className={cn("flex flex-wrap", splitLevelClassName)}
          layout
        >
          {elements.map((element, index) => {
            let delay = index * staggerDuration;
            if (staggerFrom === "last") {
              delay = (elements.length - 1 - index) * staggerDuration;
            } else if (staggerFrom === "center") {
              delay =
                Math.abs(Math.floor(elements.length / 2) - index) *
                staggerDuration;
            }

            return (
              <motion.span
                key={index}
                initial={initial}
                animate={animate}
                exit={exit}
                transition={{ ...transition, delay }}
                className={cn(
                  "inline-block whitespace-pre",
                  elementLevelClassName
                )}
              >
                {element}
              </motion.span>
            );
          })}
        </motion.span>
      </AnimatePresence>
    </motion.span>
  );
}