"use client";
import {
  TextRevealCard
} from "@/components/ui/text-reveal-card";
import { cn } from "@/lib/utils";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { FaLocationArrow } from "react-icons/fa6";
import { FiLink } from "react-icons/fi";
import MagicButton from "./MagicButton";
import { FooterGridSVG } from "./ui/InlineSVGs";

const styles = `
  .svg-container {
    position: relative;
    width: 100%;
    max-width: 100%;
    margin: 0 auto;
    transform-style: preserve-3d;
    perspective: 1000px;
    flex: 1;
  }

  @keyframes dangle {
    0%, 100% {
      transform: translateY(0) rotateX(0deg);
    }
    50% {
      transform: translateY(-20px) rotateX(5deg);
    }
  }

  .svg-image {
    width: 100%;
    height: auto;
    animation: dangle 4s ease-in-out infinite;
    transition: transform 0.2s ease-out;
    filter: drop-shadow(0 10px 20px rgba(0, 0, 0, 0.3));
    transform-origin: center;
  }

  .tilt-wrapper {
    transform-style: preserve-3d;
    width: 100%;
    transition: transform 0.2s ease-out;
    flex: 1;
  }

  .heading-container {
    perspective: 1000px;
    overflow: visible;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    width: 100%;
    padding: 0 1rem;
    margin-bottom: 1rem;
  }

  .word-wrapper {
    display: inline-flex;
    transform-style: preserve-3d;
    transition: transform 1s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.8s ease;
    padding: 0 0.25rem;
    white-space: nowrap;
  }

  .word-hidden {
    transform: rotateX(-90deg);
    opacity: 0;
  }

  .word-visible {
    transform: rotateX(0deg);
    opacity: 1;
  }

  .highlight-word {
    color: #CBACF9;
    font-weight: 800;
    text-shadow: 0 0 8px rgba(203, 172, 249, 0.3);
  }

  .heading {
    line-height: 1.3;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    width: 100%;
    text-align: center;
    font-size: 1.5rem;
    color: white;
  }

  .footer-content {
    text-align: center;
    color: white;
    font-size: 1.25rem;
    margin: 2rem 0;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }

  .social-links {
    display: flex;
    justify-content: center;
    gap: 1.5rem;
    margin: 1.5rem 0;
  }

  .social-links a {
    color: white;
    font-size: 1.5rem;
    transition: color 0.3s ease;
  }

  .social-links a:hover {
    color: #CBACF9;
  }

  .location-container {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    color: white;
    font-size: 1rem;
    margin: 1rem 0;
  }

  .copyright {
    text-align: center;
    color: white;
    font-size: 0.875rem;
    margin: 1rem 0 1rem 0;
    opacity: 0.7;
  }

  .velocity-scroll-container {
    margin: 2rem 0;
    padding: 1rem 0;
    position: relative;
    z-index: 10;
  }

  @media (max-width: 640px) {
    .svg-container {
      max-width: 70%;
      margin: 1rem auto;
      position: relative;
      bottom: 0;
    }
    .svg-image {
      width: 100%;
      max-width: 300px;
    }
    .heading {
      font-size: 1.25rem;
    }
    .word-wrapper {
      padding: 0 0.15rem;
      transition-duration: 0.8s, 0.6s;
    }
    .heading-container {
      padding: 0 0.5rem;
    }
    .footer-content {
      font-size: 1rem;
      padding: 0 1rem;
    }
    .velocity-scroll-container {
      font-size: 1.5rem !important;
    }
  }

  @media (min-width: 641px) and (max-width: 1024px) {
    .svg-container {
      max-width: 100%;
    }
    .heading {
      font-size: 1.75rem;
    }
    .word-wrapper {
      padding: 0 0.2rem;
    }
    .velocity-scroll-container {
      font-size: 2.5rem !important;
    }
  }

  @media (min-width: 1025px) {
    .svg-container {
      max-width: 100%;
    }
    .heading {
      font-size: 2rem;
    }
    .word-wrapper {
      padding: 0 0.25rem;
    }
    .velocity-scroll-container {
      font-size: 3rem !important;
    }
  }
`;

interface VelocityScrollProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultVelocity?: number;
  className?: string;
  numRows?: number;
}

interface ParallaxProps extends React.HTMLAttributes<HTMLDivElement> {
  texts: string[];
  baseVelocity: number;
}

const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

function ParallaxText({
  texts,
  baseVelocity = 3,
  ...props
}: ParallaxProps) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });

  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });

  const [repetitions, setRepetitions] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const calculateRepetitions = () => {
      if (containerRef.current && textRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const textWidth = textRef.current.offsetWidth;
        const newRepetitions = Math.ceil(containerWidth / textWidth) + 3; // Increased for smoother looping
        setRepetitions(newRepetitions);
      }
    };

    calculateRepetitions();
    window.addEventListener("resize", calculateRepetitions);
    return () => window.removeEventListener("resize", calculateRepetitions);
  }, [texts]);

  const x = useTransform(baseX, (v) => `${wrap(-100 / repetitions, 0, v)}%`);

  const directionFactor = React.useRef<number>(1);
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  const combinedText = texts.join(" • "); // Changed separator to bullet for cleaner spacing

  return (
    <div
      ref={containerRef}
      className="w-full overflow-hidden whitespace-nowrap"
      {...props}
    >
      <motion.div className="inline-block text-[inherit]" style={{ x }}>
        {Array.from({ length: repetitions }).map((_, i) => (
          <span key={i} ref={i === 0 ? textRef : null} className="mx-2">
            {combinedText}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

function SequentialVelocityScroll({
  defaultVelocity = 2,
  numRows = 2,
  className,
  ...props
}: VelocityScrollProps) {
  const texts = [
    "DevOps",
    "Hackathons",
    "Pitch decks",
    "AI influencer modeling",
    "Trading",
    "AI automations",
    "Fullstack Dev",
    "Content creation",
    "Mentorships",
    "Landing pages",
  ];

  return (
    <div
      className={cn(
        "velocity-scroll-container relative w-full font-bold tracking-[-0.02em] text-white",
        className,
      )}
      {...props}
    >
      {Array.from({ length: numRows }).map((_, i) => (
        <ParallaxText
          key={i}
          texts={texts}
          baseVelocity={defaultVelocity * (i % 2 === 0 ? 1 : -1)}
        />
      ))}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/6 bg-gradient-to-r from-black/50 to-transparent"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/6 bg-gradient-to-l from-black/50 to-transparent"></div>
    </div>
  );
}

const Footer = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const headingSection = headingRef.current;
    if (!headingSection) return;

    const words = headingSection.querySelectorAll<HTMLDivElement>(".word-wrapper");

    const observer = new IntersectionObserver(
      ([entry]) => {
        words.forEach((word, index) => {
          const delay = index * 200;
          if (entry.isIntersecting) {
            setTimeout(() => {
              word.classList.remove("word-hidden");
              word.classList.add("word-visible");
            }, delay);
          } else {
            setTimeout(() => {
              word.classList.remove("word-visible");
              word.classList.add("word-hidden");
            }, delay);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px",
      }
    );

    observer.observe(headingSection);
    words.forEach((word) => word.classList.add("word-hidden"));

    return () => observer.disconnect();
  }, []);

  const headingText = "Crazy to take our digital convo next level".split(" ");
  const highlightWords = ["digital", "convo"];

  return (
    <footer
      ref={sectionRef}
      className="w-full pt-20 pb-0 relative bg-black-100"
      id="contact"
    >
      <style>{styles}</style>
      {/* Background Grid - Version 1 UI */}
      <div
        className="absolute inset-0 w-full min-h-screen dark:bg-black-100 bg-white dark:bg-grid-white/[0.03] bg-grid-black-100/[0.2]
        top-0 left-0 flex items-center justify-center"
      >
        <div
          className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black-100
          bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"
        />
      </div>

      <div className="w-full absolute left-0 -bottom-72 min-h-96">
        <FooterGridSVG className="w-full h-full opacity-50" />
      </div>

      <div className="flex flex-col md:flex-row w-full justify-center md:justify-between items-center h-full px-4 sm:px-10 relative z-10">
        <div className="flex flex-col items-center w-full md:w-1/2 mb-10 md:mb-0 text-center">
          <div ref={headingRef} className="heading-container">
            <h1 className="heading font-bold mb-4">
              {headingText.map((word, index) => (
                <span
                  key={index}
                  className={`word-wrapper ${
                    highlightWords.includes(word) ? "highlight-word" : ""
                  }`}
                >
                  {word}
                </span  >
                ))}
            </h1>
          </div>
          <div className="w-full max-w-[90vw] sm:max-w-[40rem] mx-auto">
            <TextRevealCard
              text="Reach out today"
              revealText="Lets get connected"
            />
          </div>
          <a href="mailto:kiyogesh80@gmail.com" className="mt-6">
            <MagicButton
              title="Get in touch"
              icon={<FaLocationArrow />}
              position="right"
              otherClasses="mx-auto"
            />
          </a>
        </div>

        <div className="w-full md:w-1/2 flex justify-center">
          <div ref={tiltRef} className="tilt-wrapper">
            < div className="svg-container">
              <Image
                src="/astra3.avif"
                alt="Astra SVG"
                width={500}
                height={500}
                loading="eager"
                priority={true}
                sizes="(max-width: 768px) 100vw, 500px"
                className="svg-image"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Sequential Velocity Scroll Component - Full Screen Width */}
      <div className="w-screen relative left-1/2 transform -translate-x-1/2 mt-12 mb-20 z-8">
        <SequentialVelocityScroll defaultVelocity={2} numRows={2} />
      </div>

      {/* Footer Content with Gradient Background */}
      <div className="w-screen relative left-1/2 transform -translate-x-1/2 z-5"
           style={{ background: 'linear-gradient(to top, #0f172a, #164e63, #22d3ee)' }}>
        <div className="w-full max-w-7xl mx-auto px-4 relative z-10 pt-1 pb-4">
          <div className="footer-content text-center">
            Need a hand with anything above? Feel free to hit me up!
          </div>
          <div className="flex justify-center items-center text-white text-base font-sans">
            <a href="#hero" className="flex items-center no-underline text-white text-base font-sans">
              <FiLink className="mr-1" />
              <span> Socials</span>
            </a>
          </div>
          <div className="location-container flex justify-center items-center gap-2 text-white">
            <FaLocationArrow />
            <span className="font-sans text-base text-white">Bengaluru</span>
          </div>
          <div className="copyright text-center mb-0">
            © 2025 Yogeshwaran S - All rights reserved
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;