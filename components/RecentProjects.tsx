"use client";

import { projects } from "@/data";
import { useEffect, useRef } from "react";
import { FaLocationArrow } from "react-icons/fa6";
import { Particles } from "./magicui/particles";
import { PinContainer } from "./ui/Pin";

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

const handleRedirect = (url: string | undefined) => {
  if (url) {
    window.open(url, "_blank", "noopener noreferrer");
  }
};

const RecentProjects = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const words = section.querySelectorAll<HTMLDivElement>(".word-wrapper");
    const images = section.querySelectorAll<HTMLDivElement>(".animated-image");

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

        if (entry.isIntersecting) {
          images.forEach((image) => image.classList.add("animate-fly-in"));
        } else {
          images.forEach((image) => image.classList.remove("animate-fly-in"));
        }
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

  const headingText = "A small selection of my potential projects".split(" ");

  return (
    <div ref={sectionRef} className="relative py-20 px-6 md:px-12 overflow-hidden">
      <style>{styles}</style>
      {/* Particles Background */}
      <Particles
        className="absolute inset-0 z-0"
        quantity={100}
        ease={80}
        color="#CBACF9"
        refresh
      />

      {/* Foreground Content */}
      <div className="relative z-10">
        <div className="heading-container">
          <h1 className="heading font-bold mb-8 text-white"> {/* Reduced from mb-16 to mb-8 */}
            {headingText.map((word, index) => (
              <span
                key={index}
                className={`word-wrapper ${
                  word === "potential" ? "highlight-word" : ""
                }`}
              >
                {word}
              </span>
            ))}
          </h1>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-16 md:gap-x-20 gap-y-28 mt-4 mx-auto max-w-[1400px] place-items-center"> {/* Reduced from mt-16 to mt-4 */}
          {projects.map((item) => (
            <div key={item.id}>
              <div onClick={() => handleRedirect(item.link)} className="cursor-pointer w-full">
                <PinContainer title={item.link}>
                  <div className="relative w-full max-w-[550px] h-[180px] sm:h-[200px] md:h-[220px] overflow-hidden rounded-2xl mb-6">
                    <img
                      src="/bg.png"
                      alt="bgimg"
                      className="absolute inset-0 w-full h-full object-cover opacity-100"
                    />
                    <img
                      src={item.img}
                      alt="cover"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>

                  <h1 className="font-bold text-base sm:text-lg md:text-xl line-clamp-1 text-white text-center">
                    {item.title}
                  </h1>

                  <p className="text-xs sm:text-sm md:text-base text-gray-400 mt-2 line-clamp-2 text-center">
                    {item.des}
                  </p>

                  <div className="flex flex-col md:flex-row items-center justify-between mt-5 w-full space-y-4 md:space-y-0">
                    <div className="flex space-x-3">
                      {item.iconLists.map((icon, index) => (
                        <div
                          key={index}
                          className="border border-white/[.2] rounded-full bg-black w-10 h-10 sm:w-12 sm:h-12 flex justify-center items-center"
                        >
                          <img src={icon} alt="icon" className="p-2 sm:p-3" />
                        </div>
                      ))}
                    </div>

                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-purple text-xs sm:text-sm md:text-base"
                    >
                      Visit GitHub
                      <FaLocationArrow className="ml-2 text-lg" color="#CBACF9" />
                    </a>
                  </div>
                </PinContainer>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentProjects;