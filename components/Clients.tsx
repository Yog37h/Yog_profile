"use client";

import { testimonials } from "@/data";
import { useEffect, useRef } from "react";
import { InfiniteMovingCards } from "./ui/InfiniteCards";

// CSS styles
const styles = `
  .heading-container {
    perspective: 1000px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }

  .word-wrapper {
    display: inline-flex;
    transform-style: preserve-3d;
    transition: transform 1s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.8s ease;
    padding: 0 0.25rem; /* Consistent spacing */
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
    color: #CBACF9; /* Violet color */
    font-weight: 800; /* Slightly bolder */
    text-shadow: 0 0 8px rgba(203, 172, 249, 0.3); /* Subtle glow */
  }

  .heading {
    line-height: 1.3;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
  }

  @media (max-width: 640px) {
    .heading {
      font-size: 1.5rem;
    }
    .word-wrapper {
      padding: 0 0.15rem;
      transition-duration: 0.8s, 0.6s;
    }
  }

  @media (min-width: 641px) and (max-width: 1024px) {
    .heading {
      font-size: 2rem;
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

const Clients = () => {
  const sectionRef = useRef<HTMLElement>(null);

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
        threshold: 0.3,
        rootMargin: "0px",
      }
    );

    observer.observe(section);

    words.forEach((word) => word.classList.add("word-hidden"));

    return () => observer.disconnect();
  }, []);

  // Normalize the testimonials data
  const normalizedTestimonials = testimonials.map((testimonial) => ({
    ...testimonial,
    quote: Array.isArray(testimonial.quote) ? testimonial.quote : [testimonial.quote],
  }));

  const headingText = "Driven? Unveil my Progress".split(" ");

  return (
    <section id="testimonials" ref={sectionRef} className="py-20">
      <style>{styles}</style>
      <div className="heading-container">
        <h1 className="heading font-bold mb-5 text-white"> {/* Reduced from mb-16 to mb-8 */}
          {headingText.map((word, index) => (
            <span
              key={index}
              className={`word-wrapper ${
                word === "Progress" ? "highlight-word" : ""
              }`}
            >
              {word}
            </span>
          ))}
        </h1>
      </div>

      <div className="flex flex-col items-center mt-4"> {/* Reduced from max-lg:mt-10 to mt-4 */}
        <div className="h-[50vh] md:h-[30rem] rounded-md flex flex-col antialiased items-center justify-center relative overflow-hidden">
          <InfiniteMovingCards
            items={normalizedTestimonials}
            direction="right"
            speed="slow"
          />
        </div>
      </div>
    </section>
  );
};

export default Clients;