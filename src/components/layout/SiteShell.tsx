"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import LayoutPreloader from "@/components/ui/LayoutPreloader";
import StarfieldBackground from '@/components/ui/StarfieldBackground';

export default function SiteShell({ children }: { children: React.ReactNode }) {
  const [isMounted, setIsMounted] = useState(false);
  const [showPreloader, setShowPreloader] = useState(true);

  useEffect(() => {
    setIsMounted(true);
    
    if (sessionStorage.getItem("preloader-done") === "1") {
      setShowPreloader(false);
    }
  }, []);

  const handleComplete = () => {
    sessionStorage.setItem("preloader-done", "1");
    setShowPreloader(false);
  };

  if (!isMounted) {
    return (
      <>
        <StarfieldBackground />
        <LayoutPreloader onComplete={() => {}} />
      </>
    );
  }

  return (
    <>
      <StarfieldBackground />

      {showPreloader && <LayoutPreloader onComplete={handleComplete} />}

      <motion.div
        initial={false}
        animate={!showPreloader ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{
          duration: 0.75,
          ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
          delay: 0.05,
        }}
      >
        {children as any}
      </motion.div>
    </>
  );
}
