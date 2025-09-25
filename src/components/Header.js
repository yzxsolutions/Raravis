"use client";
import Image from "next/image";
import { ChevronDown } from "lucide-react";

export default function Header() {
  return (
    <header className="relative w-full h-98 rounded-b-[50px] overflow-hidden">
      {/* Background Image */}
      <Image
        src="/images/home-image.jpg"
        alt="Header background"
        fill
        priority
        className="object-cover"
      />

      {/* Black Overlay (46% opacity) */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Overlay Content */}
      <div className="absolute inset-0 flex flex-col justify-between">
        {/* Top-left: Logo + Text */}
        <div className="p-4 flex items-center gap-3 text-white font-semibold text-lg">
          <Image
            src="/images/logo.png"
            alt="App Logo"
            width={28}
            height={28}
            className="z-10"
          />
          <p className="uppercase tracking-wide">RARAVIES</p>
        </div>

        <div className="p-4 flex items-center justify-center gap-3 text-white font-semibold text-lg">
            <Image
              src="/images/svg/menu.svg"
              alt="App Logo"
              width={250}
              height={250}
              className="z-10"
            />
        </div>

        {/* Bottom-center: Arrow */}
        <div className="flex justify-center pb-3">
          <button>
            <Image
              src="/images/svg/arrowdown.svg"
              alt="Scroll Down"
              width={20}
              height={20}
              className="animate-bounce"
            />
          </button>
        </div>
      </div>
    </header>
  );
}
