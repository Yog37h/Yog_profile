import { cn } from "@/lib/utils";
import React, { useEffect, useRef, useState } from "react";
import { useSwipeable } from "react-swipeable"; // Adding swipeable hook

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

  const isMobile = window.innerWidth <= 768; // Mobile detection

  const swipeRef = useRef(null);

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
                <div
                  aria-hidden="true"
                  className="user-select-none -z-1 pointer-events-none absolute -left-0.5 -top-0.5 h-[calc(100%_+_4px)] w-[calc(100%_+_4px)]"
                ></div>
                <ul className="list-disc pl-5 space-y-2 relative z-20 text-sm md:text-lg leading-[1.6] text-white font-normal">
                  {item.quote.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
                <div className="relative z-20 mt-6 flex flex-row items-center">
                  <div className="me-3">
                    <img src="/profile.svg" alt="profile" />
                  </div>
                  <span className="flex flex-col gap-1">
                    <span className="text-xl font-bold leading-[1.6] text-white">
                      {item.name}
                    </span>
                    <span className="text-sm leading-[1.6] text-white-200 font-normal">
                      {item.title}
                    </span>
                  </span>
                </div>
              </blockquote>
            </li>
          ))}
        </ul>
      )}

      {/* Mobile View - Manual Swipe with Fade-In Only and Infinite Loop */}
      {isMobile && (
        <div
          {...handlers} // Register swipe handlers
          className="relative"
        >
          <ul
            className="flex flex-wrap justify-center gap-4 transition-all duration-1000 ease-in-out"
            style={{ opacity: visible ? 1 : 0 }} // Apply fade-in effect on visibility
          >
            {items.map((item, idx) => (
              <li
                key={idx}
                className={cn(
                  "w-[80vw] max-w-full relative rounded-2xl border border-b-0 flex-shrink-0 border-slate-800 p-5 md:p-16",
                  currentIndex === idx ? "block" : "hidden"
                )}
                style={{
                  background: "rgb(4,7,29)",
                  backgroundColor:
                    "linear-gradient(90deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)",
                }}
              >
                <blockquote>
                  <div
                    aria-hidden="true"
                    className="user-select-none -z-1 pointer-events-none absolute -left-0.5 -top-0.5 h-[calc(100%_+_4px)] w-[calc(100%_+_4px)]"
                  ></div>
                  <ul className="list-disc pl-5 space-y-2 relative z-20 text-sm md:text-lg leading-[1.6] text-white font-normal">
                    {item.quote.map((point, i) => (
                      <li key={i}>{point}</li>
                    ))}
                  </ul>
                  <div className="relative z-20 mt-6 flex flex-row items-center">
                    <div className="me-3">
                      <img src="/profile.svg" alt="profile" />
                    </div>
                    <span className="flex flex-col gap-1">
                      <span className="text-xl font-bold leading-[1.6] text-white">
                        {item.name}
                      </span>
                      <span className="text-sm leading-[1.6] text-white-200 font-normal">
                        {item.title}
                      </span>
                    </span>
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
