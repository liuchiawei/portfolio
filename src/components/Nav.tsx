import { NavItem } from "@/lib/props";
import { House, UserRound, BookImage, Mail } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
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

export default function Nav() {
  const isMobile = useIsMobile();
  return <div>Nav</div>;
}
