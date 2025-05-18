// @/components/Expertise.tsx
"use client";
import { useEffect, useRef } from "react";
import { Particles } from "./magicui/particles";
import { AnimatedTestimonials } from "./ui/animated-testimonials";

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
      font-size: 1.5rem;
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
      font-size: 2rem;
    }
    .word-wrapper {
      padding: 0 0.2rem;
    }
  }

  @media (min-width: 1025px) {
    .heading {
      font-size: 2.75rem;
    }
    .word-wrapper {
      padding: 0 0.25rem;
    }
  }
`;

export const Expertise: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const words = section.querySelectorAll<HTMLDivElement>(".word-wrapper");

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

    observer.observe(section);

    words.forEach((word) => word.classList.add("word-hidden"));

    return () => observer.disconnect();
  }, []);

  const headingText = "Here is What I Built".split(" ");

  const testimonials = [
    {
      quote:
        "Developed fullstack web applications across different frameworks and tech stacks",
      name: "05+ WEB APPS",
      designation: "MERN, MEAN, DJANGO, SPRING",
      src: "https://i.pinimg.com/736x/e2/a7/27/e2a727851f98f143a6e2c385e0a81275.jpg",
    },
    {
      quote:
        "Built Playstore ready apps with different domain use cases",
      name: "07+ MOBILE APPS",
      designation: "REACT NATIVE, FLUTTER",
      src: "https://i.pinimg.com/736x/90/12/b0/9012b0d793fb2a456e30538798095526.jpg",
    },
    {
      quote:
        "Built Blockchain applications concentrating on Micro-investment, crowdfunding",
      name: "03+ WEB3 APPS",
      designation: "SOLIDITY, SOLANA, REMIX, METAMASK, THIRDWEB",
      src: "https://i.pinimg.com/736x/ad/f0/a8/adf0a841575cfba0a611b17e43fc3cd3.jpg",
    },
    {
      quote:
        "Built GenAI products, crafted AI agents with MCP and human-in-loop",
      name: "03+ AI PRODUCTS",
      designation: "DEEPSEEK R1, OLAMA, N8N, ZAPIER, CREWAI",
      src: "https://i.pinimg.com/736x/b8/22/ed/b822ed2cb939609e215532a5d20951bb.jpg",
    },
    {
      quote:
        "Designed IOT systems powered with ML and AI support",
      name: "04+ IOT PROJECTS",
      designation: "LORAWAN, NFC, RFID, OPENCV, ULTRALYTICS, YOLO",
      src: "https://i.pinimg.com/736x/46/e1/bc/46e1bc28b1ab7a9cefd20d4ab455ef34.jpg",
    },
    {
      quote:
        "Worked along with two startup projects and software development freelancing",
      name: "02+ ENTREPRENEURSHIP PROJECTS",
      designation: "NEXTJS DASHBOARDS, DATABASE INTEGRATIONS, MODEL-TRAINING",
      src: "https://i.pinimg.com/736x/32/6a/57/326a570229e29cde1c112a829a588b94.jpg",
    },
  ];

  return (
    <section
      id="expertise"
      className="relative w-full bg-black-100 flex flex-col items-center justify-start py-12 px-6 md:px-12 overflow-hidden"
    >
      <style>{styles}</style>
      {/* Particles Background */}
      <Particles
        className="absolute inset-0 z-0"
        quantity={80}
        ease={80}
        color="#CBACF9"
        refresh
      />

      {/* Foreground Content */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto">
        <div className="heading-container">
          <h1 className="heading font-bold mb-6 text-white">
            {headingText.map((word, index) => (
              <span
                key={index}
                className={`word-wrapper ${
                  word === "Built" ? "highlight-word" : ""
                }`}
              >
                {word}
              </span>
            ))}
          </h1>
        </div>

        {/* Testimonials Section */}
        <div className="mt-8">
          <AnimatedTestimonials testimonials={testimonials} />
        </div>
      </div>
    </section>
  );
};

export default Expertise;