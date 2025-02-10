"use client";
import { useState } from "react";
import Link from "next/link";
import { NavItemProps } from "@/lib/props";
import { House, UserRound, BookImage, Mail } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useIsMobile } from "@/hooks/use-mobile";
import MobileNav from "./MobileNav";
import ThemeToggle from "./ThemeToggle";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
} from "@/components/ui/navigation-menu";

const navItems: NavItemProps[] = [
  {
    labelEN: "Home",
    labelJP: "ホーム",
    href: "/",
    icon: <House />,
  },
  {
    labelEN: "About",
    labelJP: "私について",
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

export default function Nav() {
  const isMobile = useIsMobile();
  if (isMobile) return <MobileNav navItems={navItems} />;
  return (
    <div className="sticky p-4 top-0 z-20 bg-background/80 backdrop-blur-sm border-b border-foreground flex justify-center md:justify-between items-end">
      <div className="text-4xl font-black text-center">DOUBLECHEAP</div>
      <NavigationMenu>
          <NavigationMenuList>
            {navItems.map((item) => (
              <NavItem key={item.href} item={item} />
            ))}
            <ThemeToggle />
          </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}


const NavItem = ({ item }: { item: NavItemProps }) => {
  const [isHovered, setIsHovered] = useState(false);
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  return (
    <NavigationMenuItem
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <AnimatePresence>
        <Link
          href={item.href}
          className="flex justify-center items-center h-20px overflow-hidden relative *:text-center *:font-bold *:text-xl *:w-36 *:cursor-pointer"
        >
          <Button variant="ghost">
            {!isHovered && (
              <motion.div
                key="en"
                initial={{ y: -20 }} // 初期位置
                animate={{ y: 0 }} // アニメーション中の位置 (hover時に中から上に移動)
                exit={{ y: -20 }} // 終了位置
                transition={{ duration: 0.3 }} // アニメーションの持続時間
              >
                {item.labelEN}
              </motion.div>
            )}
            {isHovered && (
              <motion.div
                key="jp"
                initial={{ y: 20 }} // 初期位置
                animate={{ y: 0 }} // アニメーション中の位置 (hover時に下から中に移動)
                exit={{ y: 20 }} // 終了位置
                transition={{ duration: 0.3 }} // アニメーションの持続時間
              >
                {item.labelJP}
              </motion.div>
            )}
          </Button>
        </Link>
      </AnimatePresence>
    </NavigationMenuItem>
  );
};
