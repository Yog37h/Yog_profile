"use client";

import { workExperience } from "@/data";
import Image from "next/image"; // Import Image component
import { useEffect, useRef } from "react";
import { Button } from "./ui/MovingBorders";

// CSS styles
const styles = `
  .heading-container {
    perspective: 1000px;
    overflow: visible;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    width: 100%;
    padding: 0 1rem;
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
  }

  @media (max-width: 640px) {
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
    .heading {
      font-size: 1.75rem;
    }
    .word-wrapper {
      padding: 0 0.2rem;
    }
  }

  @media (min-width: 1025px) {
    .heading {
      font-size: 2.5rem;
    }
    .word-wrapper {
      padding: 0 0.25rem;
    }
  }
`;

const Experience = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const words = section.querySelectorAll<HTMLDivElement>(".word-wrapper");

    const observer = new IntersectionObserver(
      ([entry]) => {
        words.forEach((word, index) => {
          const delay = index * 200; // 200ms stagger
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

    observer.observe(section);

    words.forEach((word) => word.classList.add("word-hidden"));

    return () => observer.disconnect();
  }, []);

  const headingText = "My work experience".split(" ");

  return (
    <div ref={sectionRef} className="py-20 w-full">
      <style>{styles}</style>
      {/* Section for swipe to view text (visible only on mobile) */}
      <div className="text-center mb-6 md:hidden">
        <p
          className="text-lg font-semibold text-gray-700 dark:text-gray-300 mt-[-220px]"
          style={{ lineHeight: "10" }}
        >
          Swipe to view
          <Image
            src="/hi.svg"
            alt="hi"
            width={24} // Matches w-6 (6rem * 4 = 24px)
            height={24} // Matches h-6
            className="inline-block ml-2 align-text-top"
            style={{ position: "relative", top: "0px" }}
          />
        </p>
      </div>

      {/* Section for heading */}
      <div className="heading-container">
        <h1 className="heading font-bold mb-8 text-white">
          {headingText.map((word, index) => (
            <span
              key={index}
              className={`word-wrapper ${
                word === "experience" ? "highlight-word" : ""
              }`}
            >
              {word}
            </span>
          ))}
        </h1>
      </div>

      {/* Cards section */}
      <div className="w-full mt-4 grid lg:grid-cols-4 grid-cols-1 gap-10">
        {workExperience.map((card) => (
          <Button
            key={card.id}
            duration={Math.floor(Math.random() * 10000) + 10000}
            borderRadius="1.75rem"
            style={{
              background: "rgb(4,7,29)",
              backgroundColor:
                "linear-gradient(90deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)",
              borderRadius: `calc(1.75rem * 0.96)`,
            }}
            className="flex-1 text-black dark:text-white border-neutral-200 dark:border-slate-800"
          >
            <div className="flex lg:flex-row flex-col lg:items-center p-3 py-6 md:p-5 lg:p-10 gap-2">
              <Image
                src={card.thumbnail}
                alt={card.title}
                width={128}
                height={128}
                loading="lazy" // Experience section loads later
                sizes="(max-width: 768px) 64px, (max-width: 1024px) 80px, 128px"
                className="lg:w-32 md:w-20 w-16"
              />
              <div className="lg:ms-5">
                <h1 className="text-start text-xl md:text-2xl font-bold">
                  {card.title}
                </h1>
                <p className="text-start text-white-100 mt-3 font-semibold">
                  {card.desc}
                </p>
              </div>
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default Experience;