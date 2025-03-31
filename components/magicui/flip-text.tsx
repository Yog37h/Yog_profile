"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion, MotionProps, Variants } from "motion/react";
import React, { ElementType } from "react";

interface FlipTextProps extends MotionProps {
  duration?: number;
  delayMultiple?: number;
  framerProps?: Variants;
  className?: string;
  as?: ElementType;
  children: React.ReactNode;
  variants?: Variants;
}

const defaultVariants: Variants = {
  hidden: { rotateX: -90, opacity: 0 },
  visible: { rotateX: 0, opacity: 1 },
};

export function FlipText({
  children,
  duration = 0.5,
  delayMultiple = 0.08,
  className,
  as: Component = "span",
  variants,
  ...props
}: FlipTextProps) {
  const MotionComponent = motion.create(Component);
  const characters = React.Children.toArray(children)
    .map((child) =>
      typeof child === "string" ? child : (child as React.ReactElement).props.children
    )
    .join("")
    .split("");

  return (
    <div className="flex justify-center space-x-1">
      <AnimatePresence mode="wait">
        {characters.map((char, i) => (
          <MotionComponent
            key={i}
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={variants || defaultVariants}
            transition={{ duration, delay: i * delayMultiple }}
            className={cn("origin-center drop-shadow-sm inline-block", className)}
            {...props}
          >
            {char === " " ? "\u00A0" :char} {/* Preserve spaces */}
          </MotionComponent>
        ))}
      </AnimatePresence>
    </div>
  );
}