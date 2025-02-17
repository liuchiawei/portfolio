"use client";

import { BackgroundLines } from "@/components/ui/background-lines";
import SlideUpLetters from "@/components/SlideUpLetters";
import ScrollDown from "@/components/ScrollDown";
import { motion } from "framer-motion";

export default function IntroHeader() {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      <BackgroundLines
        className="absolute inset-0 z-0"
        svgOptions={{ duration: 15 }}
      />

      <div className="relative z-10 text-center space-y-8">
        <SlideUpLetters
          text="LIUCHIAWEI"
          className="text-7xl md:text-9xl font-black"
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="text-xl md:text-3xl font-medium text-foreground/80"
        >
          <span className="block">Graphic Designer</span>
          <span className="block">Frontend Engineer</span>
          <span className="block">Illustrator</span>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-20 z-10"
      >
        <ScrollDown />
      </motion.div>
    </section>
  );
}
