// import { useState } from "react";
import * as motion from "motion/react-client";
import type { Variants } from "motion/react";

export default function ScrollUpItem({ emoji }: { emoji: string }) {
  // const [isHovered, setIsHovered] = useState(false);
  return (
    <motion.div
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ amount: 0.4 }}
      className="mx-auto mt-8 w-full max-w-xl h-[450px] rounded-3xl bg-accent-gradient flex justify-center items-center relative overflow-hidden"
    >
      <motion.div
        variants={scrollUpItemVariants}
        className="size-60 bg-stone-50 rounded-3xl flex justify-center items-center absolute shadow-xl"
      >
        <div className="text-[132px] select-none">{emoji}</div>
      </motion.div>
    </motion.div>
  );
}

const scrollUpItemVariants: Variants = {
  offscreen: {
    y: -400,
  },
  onscreen: {
    y: 1 / 2,
    rotate: -8,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 1,
    },
  },
};
