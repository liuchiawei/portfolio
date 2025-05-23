"use client";

import { BackgroundLines } from "@/components/ui/background-lines";
import SlideUpLetters from "@/components/SlideUpLetters";
import ScrollDown from "@/components/ScrollDown";
import { motion } from "framer-motion";
import Image from "next/image";
import { useIsMobile } from "@/hooks/useMobile";

export default function IntroHeader() {
  const isMobile = useIsMobile();
  return (
    <section className="relative h-screen w-full flex items-center justify-center">
      <BackgroundLines
        className="absolute inset-0 z-0"
        svgOptions={{ duration: 15 }}
      />

      <div className="relative z-10 text-center flex flex-col items-center justify-center px-4 md:px-0">
        <SlideUpLetters text="リュウチャーウェイ" className="text-2xl md:text-4xl text-foreground/30" />
        <SlideUpLetters
          text="LIUCHIAWEI"
          className="text-6xl md:text-9xl font-black"
        />
        {/* 画像 */}
        <motion.div
          initial={{ opacity: 0, y: -100, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            type: "spring",
            bounce: 0.6,
            delay: 0.4,
            duration: 1,
            custom: 0,
          }}
          className="absolute bottom-0 left-0 w-full h-full flex justify-center items-center z-10"
        >
          <Image
            src="/images/liuchiawei.svg"
            alt="liuchiawei"
            width={100}
            height={1200}
          />
        </motion.div>
        {/* 背景 */}
        <motion.div
          initial={{ opacity: 0, y: 200, scale: 0.8 }}
          whileInView={isMobile ? { opacity: 1, y: 175, scale: 1 } : { opacity: 1, y: 135, scale: 1 }}
          custom={2}
          transition={{
            type: "spring",
            bounce: 0.6,
            duration: 0.6,
            delay: 0.5,
          }}
          className="absolute bottom-0 left-0 right-0 flex justify-center items-center z-0"
        >
          <Image
            src="/images/liuchiawei-base.svg"
            alt="liuchiawei"
            width={200}
            height={600}
          />
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
