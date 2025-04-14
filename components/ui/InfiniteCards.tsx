"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { useSwipeable } from "react-swipeable";

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  items: {
    quote: string[];
    name: string;
    title: string;
  }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);

  const [start, setStart] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  const swipeRef = useRef(null);

  // Move addAnimation declaration before useEffect
  const addAnimation = () => {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  };

  useEffect(() => {
    const checkIsMobile = () => {
      if (typeof window !== "undefined") {
        setIsMobile(window.innerWidth <= 768);
      }
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);

    return () => {
      window.removeEventListener("resize", checkIsMobile);
    };
  }, []);

  useEffect(() => {
    if (!isMobile) {
      addAnimation();
    }
  }, [isMobile, addAnimation]);

  const getDirection = () => {
    if (containerRef.current) {
      containerRef.current.style.setProperty(
        "--animation-direction",
        direction === "left" ? "forwards" : "reverse"
      );
    }
  };

  const getSpeed = () => {
    if (containerRef.current) {
      const duration =
        speed === "fast" ? "20s" : speed === "normal" ? "40s" : "80s";
      containerRef.current.style.setProperty("--animation-duration", duration);
    }
  };

  const handleSwipeLeft = () => {
    setCurrentIndex((prevIndex) => (prevIndex === items.length - 1 ? 0 : prevIndex + 1));
    setVisible(false);
  };

  const handleSwipeRight = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? items.length - 1 : prevIndex - 1));
    setVisible(false);
  };

  const handlers = useSwipeable({
    onSwipedLeft: handleSwipeLeft,
    onSwipedRight: handleSwipeRight,
    trackMouse: true,
  });

  useEffect(() => {
    if (!visible) {
      const timer = setTimeout(() => {
        setVisible(true);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [visible]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 w-screen overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className
      )}
    >
      {/* Desktop/Laptop View - Infinite Scroll */}
      {!isMobile && (
        <ul
          ref={scrollerRef}
          className={cn(
            "flex min-w-full shrink-0 gap-16 py-4 w-max flex-nowrap",
            start && "animate-scroll",
            pauseOnHover && "hover:[animation-play-state:paused]"
          )}
        >
          {items.map((item, idx) => (
            <li
              key={idx}
              className="w-[90vw] max-w-full relative rounded-2xl border border-b-0 flex-shrink-0 border-slate-800 p-5 md:p-16 md:w-[60vw]"
              style={{
                background: "rgb(4,7,29)",
                backgroundColor:
                  "linear-gradient(90deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)",
              }}
            >
              <blockquote>
                <ul className="list-disc pl-5 space-y-2 text-sm md:text-lg text-white font-normal">
                  {item.quote.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
                <div className="mt-6 flex items-center">
                  <Image
                    src="/lofi.svg"
                    alt="Profile Image"
                    width={40}
                    height={40}
                    className="me-3"
                  />
                  <div>
                    <span className="block text-xl font-bold text-white">{item.name}</span>
                    <span className="block text-sm text-white-200">{item.title}</span>
                  </div>
                </div>
              </blockquote>
            </li>
          ))}
        </ul>
      )}

      {/* Mobile View - Manual Swipe with Fade-In Only and Infinite Loop */}
      {isMobile && (
        <div {...handlers} className="relative">
          <ul className="flex flex-wrap justify-center gap-4">
            {items.map((item, idx) => (
              <li
                key={idx}
                className={cn(
                  "w-[80vw] max-w-full rounded-2xl border border-b-0 p-5 md:p-16 transition-opacity duration-1000",
                  currentIndex === idx ? "opacity-100" : "opacity-0 absolute"
                )}
                style={{
                  background: "rgb(4,7,29)",
                  backgroundColor:
                    "linear-gradient(90deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)",
                }}
              >
                <blockquote>
                  <ul className="list-disc pl-5 space-y-2 text-sm md:text-lg text-white font-normal">
                    {item.quote.map((point, i) => (
                      <li key={i}>{point}</li>
                    ))}
                  </ul>
                  <div className="mt-6 flex items-center">
                    <Image
                      src="/lofi.svg"
                      alt="Profile Image"
                      width={40}
                      height={40}
                      className="me-3"
                    />
                    <div>
                      <span className="block text-xl font-bold text-white">{item.name}</span>
                      <span className="block text-sm text-white-200">{item.title}</span>
                    </div>
                  </div>
                </blockquote>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};