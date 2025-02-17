"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import type { Variants } from "motion/react";
import * as motion from "motion/react-client";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { NavItemProps } from "@/lib/props";

export default function MobileNav({
  navItems,
  className,
}: {
  navItems: NavItemProps[];
  className?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  return (
    <motion.nav
      initial={false}
      animate={isOpen ? "open" : "closed"}
      ref={containerRef}
      className={cn(
        "z-50 fixed top-0 left-0 right-0 transition-all duration-300",
        className,
        isOpen ? "bottom-0" : "bottom-full delay-500"
      )}
    >
      {/* モバイルナビゲーションの背景 */}
      <motion.div
        variants={sidebarVariants}
        className="w-full md:w-[360px] absolute top-0 right-0 bottom-0 bg-accent/60 backdrop-blur-sm"
      />
      {/* モバイルナビゲーションのコンテンツ */}
      <Navigation isOpen={isOpen} navItems={navItems} setIsOpen={setIsOpen} />
      {/* ビゲーションのボタン */}
      <MenuToggle toggle={() => setIsOpen(!isOpen)} />
    </motion.nav>
  );
}

const navVariants: Variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

const Navigation = ({
  isOpen,
  navItems,
  setIsOpen,
}: {
  isOpen: boolean;
  navItems: NavItemProps[];
  setIsOpen: (isOpen: boolean) => void;
}) => (
  <motion.ul
    variants={navVariants}
    className={`p-10 absolute right-0 top-1/2 -translate-y-1/2 list-none select-none w-full md:w-[360px] flex-col gap-8 items-center justify-center ${
      isOpen ? "flex" : "hidden"
    }`}
  >
    {navItems.map((item, index) => (
      <MenuItem key={index} item={item} setIsOpen={setIsOpen} />
    ))}
  </motion.ul>
);

const itemVariants: Variants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};

const MenuItem = ({ item, setIsOpen }: { item: NavItemProps, setIsOpen: (isOpen: boolean) => void }) => {
  return (
    <motion.li
      className="cursor-pointer"
      variants={itemVariants}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <Link
        href={item.href}
        className="flex items-center justify-center gap-4 text-white text-4xl"
        onClick={() => setIsOpen(false)}
      >
        {item.icon}
        <div className="w-36 font-bold">{item.labelEN}</div>
      </Link>
    </motion.li>
  );
};

// Sidebar Open/Close Style
const sidebarVariants: Variants = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at calc(100% - 40px) 40px)`,
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2,
    },
  }),
  closed: {
    clipPath: "circle(0px at calc(100% - 40px) 40px)",
    transition: {
      delay: 0.2,
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
  },
};

interface PathProps {
  d?: string;
  variants: Variants;
  transition?: { duration: number };
}

const Path = (props: PathProps) => (
  <motion.path
    fill="transparent"
    strokeWidth="3"
    stroke="hsl(0, 0%, 18%)"
    strokeLinecap="round"
    {...props}
  />
);

// Toggle Hamburger Button
const MenuToggle = ({ toggle }: { toggle: () => void }) => (
  <Button
    variant="ghost"
    onClick={toggle}
    className="size-10 absolute top-4 right-4 cursor-pointer bg-transparent border-none bg-white user-select-none"
  >
    <svg width="23" height="23" viewBox="0 0 23 23">
      <Path
        variants={{
          closed: { d: "M 2 2.5 L 20 2.5" },
          open: { d: "M 3 16.5 L 17 2.5" },
        }}
      />
      <Path
        d="M 2 9.423 L 20 9.423"
        variants={{
          closed: { opacity: 1 },
          open: { opacity: 0 },
        }}
        transition={{ duration: 0.1 }}
      />
      <Path
        variants={{
          closed: { d: "M 2 16.346 L 20 16.346" },
          open: { d: "M 3 2.5 L 17 16.346" },
        }}
      />
    </svg>
  </Button>
);