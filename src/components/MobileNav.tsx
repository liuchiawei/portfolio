"use client";

import Link from "next/link";
import type { Variants } from "motion/react";
import * as motion from "motion/react-client";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { House, UserRound, BookImage, Mail } from "lucide-react";
import { NavItem } from "@/lib/props";

const navItems: NavItem[] = [
  {
    labelEN: "Home",

    labelJP: "ホーム",
    href: "/",
    icon: <House />,
  },
  {
    labelEN: "About",
    labelJP: "プロフィール",
    href: "/about",
    icon: <UserRound />,
  },
  {
    labelEN: "Works",
    labelJP: "作品一覧",
    href: "/works",
    icon: <BookImage />,
  },
  {
    labelEN: "Contact",
    labelJP: "お問い合わせ",
    href: "/contact",
    icon: <Mail />,
  },
];

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { height } = useDimensions(containerRef);
  return (
    <motion.nav
      initial={false}
      animate={isOpen ? "open" : "closed"}
      custom={height}
      ref={containerRef}
      className="w-full"
    >
      <motion.div
        variants={sidebarVariants}
        className="w-full md:w-[360px] absolute top-0 right-0 bottom-0 bg-yellow-300"
      />
      <Navigation isOpen={isOpen} />
      <MenuToggle toggle={() => setIsOpen(!isOpen)} />
    </motion.nav>
  );
}

const navVariants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

const Navigation = ({ isOpen }: { isOpen: boolean }) => (
  <motion.ul
    variants={navVariants}
    className={`p-10 absolute right-0 top-1/2 -translate-y-1/2 list-none select-none w-full md:w-[360px] flex-col gap-8 items-center justify-center ${
      isOpen ? "flex" : "hidden"
    }`}
  >
    {navItems.map((item, index) => (
      <MenuItem key={index} item={item} />
    ))}
  </motion.ul>
);

const itemVariants = {
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

const MenuItem = ({ item }: { item: NavItem }) => {
  return (
    <motion.li
      className="cursor-pointer"
      variants={itemVariants}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <Link href={item.href} className="flex items-center justify-center gap-4">
        {item.icon}
        <div className="text-2xl w-24">{item.labelEN}</div>
      </Link>
    </motion.li>
  );
};

//
const sidebarVariants = {
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

const MenuToggle = ({ toggle }: { toggle: () => void }) => (
  <Button
    variant="ghost"
    onClick={toggle}
    className="w-[50px] h-[50px] absolute top-4 right-4 cursor-pointer bg-transparent border-none bg-white user-select-none"
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

/**
 * ==============   Utils   ================
 */

// Naive implementation - in reality would want to attach
// a window or resize listener. Also use state/layoutEffect instead of ref/effect
// if this is important to know on initial client render.
// It would be safer to  return null for unmeasured states.
const useDimensions = (ref: React.RefObject<HTMLDivElement | null>) => {
  const dimensions = useRef({ width: 0, height: 0 });

  useEffect(() => {
    if (ref.current) {
      dimensions.current.width = ref.current.offsetWidth;
      dimensions.current.height = ref.current.offsetHeight;
    }
  }, [ref]);

  return dimensions.current;
};
