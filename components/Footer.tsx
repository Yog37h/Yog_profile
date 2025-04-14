"use client";

import { useEffect, useRef } from "react";
import { FaLocationArrow } from "react-icons/fa6";
import MagicButton from "./MagicButton";

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

  .svg-container {
    position: relative;
    width: 100%;
    max-width: 100%;
    margin: 0;
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

  @media (max-width: 640px) {
    .heading {
      font-size: 1.5rem;
    }
    .word-wrapper {
      padding: 0 0.15rem;
      transition-duration: 0.8s, 0.6s;
    }
    .heading-container {
      padding: 0 0.5rem;
    }
    .svg-container {
      max-width: 80%; /* Smaller SVG for mobile */
      margin: 2rem auto 0; /* Center horizontally, add top margin */
      position: relative;
      bottom: 0;
    }
    .svg-image {
      width: 100%;
    }
  }

  @media (min-width: 641px) and (max-width: 1024px) {
    .heading {
      font-size: 2rem;
    }
    .word-wrapper {
      padding: 0 0.2rem;
    }
    .svg-container {
      max-width: 100%;
    }
  }

  @media (min-width: 1025px) {
    .heading {
      font-size: 2.5rem;
    }
    .word-wrapper {
      padding: 0 0.25rem;
    }
    .svg-container {
      max-width: 100%;
    }
  }
`;

const Footer = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<HTMLImageElement>(null);

  // Handle heading and SVG animation
  useEffect(() => {
    const section = sectionRef.current;
    const svg = svgRef.current;
    if (!section || !svg) return;

    const words = section.querySelectorAll<HTMLDivElement>(".word-wrapper");

    const observer = new IntersectionObserver(
      ([entry]) => {
        words.forEach((word, index) => {
          const wordDelay = index * 200;
          if (entry.isIntersecting) {
            setTimeout(() => {
              word.classList.remove("word-hidden");
              word.classList.add("word-visible");
            }, wordDelay);
          } else {
            setTimeout(() => {
              word.classList.remove("word-visible");
              word.classList.add("word-hidden");
            }, wordDelay);
          }
        });

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

    words.forEach((word) => word.classList.add("word-hidden"));
    svg.classList.remove("svg-image-visible");

    return () => observer.disconnect();
  }, []);

  // Handle tilt effect
  useEffect(() => {
    const tiltElement = tiltRef.current;
    if (!tiltElement) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = tiltElement.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const mouseX = e.clientX - centerX;
      const mouseY = e.clientY - centerY;

      const rotateX = -(mouseY / rect.height) * 25;
      const rotateY = (mouseX / rect.width) * 25;

      tiltElement.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    };

    const handleMouseLeave = () => {
      tiltElement.style.transform = `rotateX(0deg) rotateY(0deg)`;
    };

    tiltElement.addEventListener("mousemove", handleMouseMove);
    tiltElement.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      tiltElement.removeEventListener("mousemove", handleMouseMove);
      tiltElement.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const headingText = "Crazy to take our digital convo to the next level?".split(" ");

  return (
    <footer
      ref={sectionRef}
      className="w-full pt-20 pb-32 relative"
      id="contact"
    >
      <style>{styles}</style>
      <div className="w-full absolute left-0 -bottom-72 min-h-96">
        <img
          src="/footer-grid.svg"
          alt="grid"
          className="w-full h-full opacity-50"
        />
      </div>

      <div className="flex flex-col md:flex-row w-full justify-between items-center h-full">
        <div className="flex flex-col items-center md:items-start w-full md:w-1/2 px-4 md:px-10">
          <div className="heading-container">
            <h1 className="heading font-bold mb-4 text-white">
              {headingText.map((word, index) => (
                <span
                  key={index}
                  className={`word-wrapper ${
                    word === "our" ? "highlight-word" : ""
                  }`}
                >
                  {word}
                </span>
              ))}
            </h1>
          </div>
          <p className="text-white-200 my-4 text-center md:text-left text-xl">
            Reach out to me today and let's get connected.
          </p>
          <a href="mailto:kiyogesh80@gmail.com">
            <MagicButton
              title="Let's get in touch"
              icon={<FaLocationArrow />}
              position="right"
            />
          </a>
        </div>

        <div className="w-full md:w-1/2 mt-10 md:mt-0 flex justify-center">
          <div ref={tiltRef} className="tilt-wrapper">
            <div className="svg-container">
              <img
                ref={svgRef}
                src="/astra3.svg"
                alt="Astra SVG"
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