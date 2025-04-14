"use client";

import {
  TextRevealCard,
  TextRevealCardDescription,
  TextRevealCardTitle,
} from "@/components/ui/text-reveal-card";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { FaLocationArrow } from "react-icons/fa6";
import MagicButton from "./MagicButton";

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
    transition: transform 0.2s ease-out, opacity 1s ease-in-out;
    filter: drop-shadow(0 10px 20px rgba(0, 0, 0, 0.3));
    transform-origin: center;
    opacity: 0;
  }

  .svg-image-visible {
    opacity: 1;
  }

  .svg-container:hover .svg-image {
    animation: none;
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
  }
`;

const Footer = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<HTMLImageElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const svg = svgRef.current;
    if (!section || !svg) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            svg.classList.add("svg-image-visible");
          }, 1000);
        } else {
          svg.classList.remove("svg-image-visible");
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px",
      }
    );

    observer.observe(section);
    svg.classList.remove("svg-image-visible");

    return () => observer.disconnect();
  }, []);

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

  const headingText = "Crazy to take our Digital Convo next level".split(" ");
  const highlightWords = ["Digital", "Convo"];

  return (
    <footer
      ref={sectionRef}
      className="w-full pt-20 pb-32 relative"
      id="contact"
    >
      <style>{styles}</style>
      <div className="w-full absolute left-0 -bottom-72 min-h-96">
        <Image
          src="/footer-grid.svg"
          alt="grid"
          width={1920}
          height={1080}
          className="w-full h-full opacity-50"
        />
      </div>

      <div className="flex flex-col md:flex-row w-full justify-center md:justify-between items-center h-full px-4 sm:px-10">
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
                </span>
              ))}
            </h1>
          </div>
          <div className="w-full max-w-[90vw] sm:max-w-[40rem] mx-auto">
            <TextRevealCard
              text="Reach out today"
              revealText="Lets get connected"
            >
              <TextRevealCardTitle>
                Sometimes, it's better to Hover
              </TextRevealCardTitle>
              <TextRevealCardDescription>
                To keep Networking
              </TextRevealCardDescription>
            </TextRevealCard>
          </div>
          <a href="mailto:kiyogesh80@gmail.com" className="mt-6">
            <MagicButton
              title="Let's get in touch"
              icon={<FaLocationArrow />}
              position="right"
              otherClasses="mx-auto"
            />
          </a>
        </div>

        <div className="w-full md:w-1/2 flex justify-center">
          <div ref={tiltRef} className="tilt-wrapper">
            <div className="svg-container">
              <Image
                ref={svgRef}
                src="/astra3.svg"
                alt="Astra SVG"
                width={500}
                height={500}
                className="svg-image"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;