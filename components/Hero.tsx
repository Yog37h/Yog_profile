"use client";

import Image from "next/image"; // Import Image component
import { useEffect, useRef, useState } from "react";
import { FaGithub, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import { FaLocationArrow } from "react-icons/fa6";
import MagicButton from "./MagicButton";
import { Spotlight } from "./ui/Spotlight";
import { TextCycling } from "./ui/TextCycling";
import { TextGenerateEffect } from "./ui/TextGenerateEffect";

const Hero = () => {
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const aboutSectionRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      {
        threshold: 0.5,
      }
    );

    observer.observe(section);

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []); // No dependencies needed since `section` is stable

  return (
    <div className="min-h-screen pb-20 pt-36 relative flex items-center" ref={sectionRef}>
      {/* Spotlights */}
      <div>
        <Spotlight
          className="-top-40 -left-10 md:-left-32 md:-top-20 h-screen"
          fill="white"
        />
        <Spotlight
          className="h-[80vh] w-[50vw] top-10 left-full"
          fill="purple"
        />
        <Spotlight className="left-80 top-28 h-[80vh] w-[50vw]" fill="blue" />
      </div>

      {/* Background Grid */}
      <div
        className="absolute inset-0 w-full min-h-screen dark:bg-black-100 bg-white dark:bg-grid-white/[0.03] bg-grid-black-100/[0.2]
       absolute top-0 left-0 flex items-center justify-center"
      >
        <div
          className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black-100
         bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between w-full">
        {/* Main AVIF Image for Laptop */}
        <div className="hidden md:block relative w-1/2 lg:w-1/2 animate-bounce-slow">
          <Image
            src="/tol1.avif"
            alt="Yogeshwaran"
            width={600} // Estimated for full-width image
            height={600} // Assuming square aspect ratio
            className={`rounded-full object-cover w-full lg:w-[150%] transition-transform duration-1000 ${inView ? 'translate-x-0' : '-translate-x-full'}`}
          />
          <Image
            src="/tol2.avif"
            alt="Additional Top Left"
            width={100} // Matches max-w-[100px]
            height={100} // Square aspect ratio
            className={`absolute top-[-20px] left-[5%] w-[25%] max-w-[100px] rounded-full shadow-md transition-transform duration-1000 ${inView ? 'translate-x-0' : '-translate-x-full'}`}
            style={{ transform: inView ? "translateY(-10px)" : "translateY(-10px) translateX(-50%)" }}
          />
          <Image
            src="/tol3.avif"
            alt="Additional Bottom Right"
            width={120} // Estimated for w-[30%]
            height={120} // Square aspect ratio
            className={`absolute bottom-[-40px] right-[-40px] w-[30%] rounded-full shadow-md transition-transform duration-1000 ${inView ? 'translate-x-0' : 'translate-x-full'}`}
            style={{ transform: inView ? "translateY(-10px)" : "translateY(-10px) translateX(50%)" }}
          />
        </div>

        {/* Text and Social Links */}
        <div className="w-full max-w-3xl px-4 text-center md:text-left flex flex-col items-center md:items-start justify-center mx-auto md:mx-0 md:pl-20">
          <p className="uppercase tracking-widest text-lg text-center md:text-left text-blue-100 mb-[-10px]">
            Hello, This is me
          </p>

          <TextGenerateEffect
            words="YOGESHWARAN"
            className="text-center md:text-left text-[40px] md:text-5xl lg:text-6xl transition-all duration-300 hover:text-purple hover:[text-shadow:0_0_10px_rgba(203,172,249,0.8),0_0_20px_rgba(203,172,249,0.6),0_0_30px_rgba(203,172,249,0.4)]"
          />
          <TextCycling
            words="Software Engineer, Player, Developer, Tech Enthusiast"
            className="text-center md:text-left text-[30px] md:text-4xl lg:text-5xl mt-[-20px] md:mt-[-30px]"
          />

          <p className="text-center md:text-left md:tracking-wider mb-4 text-sm md:text-lg lg:text-2xl">
            A Tech-savvy Professional with deep love for Technology and Business Ideologies
          </p>

          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white md:text-left text-center mt-4">
            Connect with <span className="text-purple">Me</span>
          </h1>

          {/* Social Media Icons */}
          <div className="flex justify-center md:justify-start space-x-8 mt-4">
            <a
              href="https://github.com/YourUsername"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white transition-transform transform hover:scale-110"
            >
              <FaGithub className="text-4xl transition-all duration-300 text-white hover:text-purple hover:drop-shadow-[0_0_30px_rgba(128,0,255,1)]" />
            </a>
            <a
              href="https://linkedin.com/in/YourProfile"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white transition-transform transform hover:scale-110"
            >
              <FaLinkedin className="text-4xl transition-all duration-300 text-white hover:text-purple hover:drop-shadow-[0_0_30px_rgba(128,0,255,1)]" />
            </a>
            <a
              href="https://twitter.com/YourHandle"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white transition-transform transform hover:scale-110"
            >
              <FaTwitter className="text-4xl transition-all duration-300 text-white hover:text-purple hover:drop-shadow-[0_0_30px_rgba(128,0,255,1)]" />
            </a>
            <a
              href="https://instagram.com/YourHandle"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white transition-transform transform hover:scale-110"
            >
              <FaInstagram className="text-4xl transition-all duration-300 text-white hover:text-purple hover:drop-shadow-[0_0_30px_rgba(128,0,255,1)]" />
            </a>
          </div>

          {/* AVIF Images for Mobile */}
          <div className="mt-12 md:hidden flex flex-col items-center space-y-4 relative">
            <Image
              src="/tol1.avif"
              alt="Yogeshwaran"
              width={128} // Matches w-32 (32rem * 4px/rem = 128px)
              height={128} // Matches h-32
              className={`w-32 h-32 rounded-full object-cover shadow-md animate-bounce-slow transition-transform duration-1000 ${inView ? 'translate-x-0' : '-translate-x-full'}`}
            />
            <Image
              src="/tol2.avif"
              alt="Additional Top Left"
              width={64} // Matches w-16 (16rem * 4px/rem = 64px)
              height={64} // Square aspect ratio
              className={`absolute top-[-20px] left-[-40px] w-16 rounded-full shadow-md animate-bounce-slow transition-transform duration-1000 ${inView ? 'translate-x-0' : '-translate-x-full'}`}
            />
            <Image
              src="/tol3.avif"
              alt="Additional Bottom Right"
              width={64} // Matches w-16
              height={64} // Square aspect ratio
              className={`absolute bottom-[-10px] right-[-30px] w-16 rounded-full shadow-md animate-bounce-slow transition-transform duration-1000 ${inView ? 'translate-x-0' : 'translate-x-full'}`}
            />
          </div>

          {/* Magic Button */}
          <div ref={aboutSectionRef} id="about" className="hidden" />
          <a
            className="block mt-12 md:mt-12"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection(aboutSectionRef);
            }}
          >
            <MagicButton
              title="Explore me"
              icon={<FaLocationArrow />}
              position="right"
              otherClasses="mt-0"
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Hero;