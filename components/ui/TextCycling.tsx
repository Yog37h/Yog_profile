/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export const TextCycling = ({
  words,
  className,
}: {
  words: string;
  className?: string;
}) => {
  const cyclingTexts = words.split(","); // Split the input string by commas to create an array of cycling texts
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % cyclingTexts.length); // Cycle through words
    }, 2500); // Change text every 2.5 seconds

    return () => clearInterval(interval); // Clear interval on component unmount
  }, [words]);

  return (
    <div className={cn("font-bold", className)}>
      <div className="my-4 flex items-center justify-center text-lg sm:text-xl md:text-3xl">
        {/* Static "And I am" text with fade-in animation */}
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="mr-2 text-purple"
        ></motion.span>
        {/* Cycling text */}
        <AnimatePresence mode="wait">
          <motion.span
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="text-purple"
            style={{ display: "inline-block" }}
          >
            {cyclingTexts[index]}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
};
