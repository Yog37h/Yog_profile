"use client"; // Add this if using Next.js for client-side rendering

import { cn } from "@/lib/utils"; // Ensure this path matches your project structure
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
    quote: string[]; // Updated to array of strings
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
  const [currentIndex, setCurrentIndex] = useState(0); // Track the current card index
  const [visible, setVisible] = useState(true); // Track visibility of card for fade-in effect
  const [isMobile, setIsMobile] = useState(false); // Dynamically track if the user is on mobile

  const swipeRef = useRef(null);

  useEffect(() => {
    // Check if running in a browser environment
    const checkIsMobile = () => {
      if (typeof window !== "undefined") {
        setIsMobile(window.innerWidth <= 768);
      }
    };

    checkIsMobile(); // Initial check
    window.addEventListener("resize", checkIsMobile); // Listen for resize events

    return () => {
      window.removeEventListener("resize", checkIsMobile); // Cleanup event listener
    };
  }, []);

  useEffect(() => {
    if (!isMobile) {
      addAnimation();
    }
  }, [isMobile]);

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
    setVisible(false); // Set visibility to false to trigger fade-in
  };

  const handleSwipeRight = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? items.length - 1 : prevIndex - 1));
    setVisible(false); // Set visibility to false to trigger fade-in
  };

  // Handling swipeable events using react-swipeable
  const handlers = useSwipeable({
    onSwipedLeft: handleSwipeLeft,
    onSwipedRight: handleSwipeRight,
    trackMouse: true,
  });

  useEffect(() => {
    if (!visible) {
      const timer = setTimeout(() => {
        setVisible(true); // Set visibility back to true after fade-out
      }, 500); // Time duration for the fade-out effect

      return () => clearTimeout(timer); // Cleanup on component unmount
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
                  <img src="/lofi.svg" alt="profile" className="me-3" />
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
              <img src="/lofi.svg" alt="profile" className="me-3" />
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
)}</div>)}
