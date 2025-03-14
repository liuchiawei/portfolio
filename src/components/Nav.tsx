"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavItemProps } from "@/lib/props";
import { House, UserRound, BookImage, Mail } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useIsMobile } from "@/hooks/useMobile";
import MobileNav from "./MobileNav";
import ThemeToggle from "./ThemeToggle";
import { Button } from "@/components/ui/button";
import SlideUpLetters from "@/components/SlideUpLetters";
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
    labelEN: "Profile",
    labelJP: "私について",
    href: "/profile",
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
    <div className="sticky p-6 top-0 z-20 bg-background/40 backdrop-blur-sm border-b-1 border-foreground flex justify-center md:justify-between items-end">
      <Link href="/">
        <SlideUpLetters text="LIUCHIAWEI" className="text-4xl font-black text-center" />
      </Link>
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
  const pathname = usePathname();
  const isActive = pathname === item.href;
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
          className={`flex justify-center items-center overflow-hidden relative *:text-center *:font-bold *:text-xl *:w-38 *:cursor-pointer transition-all ${
            isActive ? "*:data-active:bg-foreground text-background" : ""
          }`}
        >
          <Button
            data-active={isActive}
            variant="ghost"
            className="rounded-lg"
          >
            {!isHovered && (
              <motion.div
                key="en"
                initial={{ y: -26 }} // 初期位置
                animate={{ y: 0 }} // アニメーション中の位置 (hover時に中から上に移動)
                exit={{ y: -26 }} // 終了位置
                transition={{ duration: 0.3 }} // アニメーションの持続時間
              >
                {item.labelEN}
              </motion.div>
            )}
            {isHovered && (
              <motion.div
                key="jp"
                initial={{ y: 26 }} // 初期位置
                animate={{ y: 0 }} // アニメーション中の位置 (hover時に下から中に移動)
                exit={{ y: 26 }} // 終了位置
                transition={{ duration: 0.3 }} // アニメーションの持続時間
                className={`${isActive ? "text-background" : "text-stone-950"}`}
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
