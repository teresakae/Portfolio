import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import BeyondCode from "@/components/sections/BeyondCode";
import Projects from "@/components/sections/Projects";
import Timeline from "@/components/sections/Timeline";
import CTA from "@/components/sections/CTA";

export default function Home() {
  return (
    <>
      <main style={{ overflow: 'visible' }}>
        <Hero />
        <Projects />
        <About />
        <BeyondCode />
        <Timeline />
        <CTA />
      </main>
    </>
  );
}