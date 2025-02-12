"use client";

import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // height of the Button to show: 720px
      if (window.scrollY > 720) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    // cleanup function
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Button
      className={`${
        isVisible ? "opacity-100" : "opacity-0"
      } fixed bottom-8 right-8 cursor-pointer transition-opacity duration-300`}
      onClick={handleClick}
    >
      <ArrowUp className="w-4 h-4" />
    </Button>
  );
}
