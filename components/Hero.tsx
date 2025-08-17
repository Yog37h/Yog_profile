"use client";

import Image from "next/image"; // Import Image component
import { useEffect, useRef, useState } from "react";
import { FaCalendarCheck, FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaLocationArrow, FaXTwitter } from "react-icons/fa6";
import MagicButton from "./MagicButton";
import { Spotlight } from "./ui/Spotlight";
import { TextCycling } from "./ui/TextCycling";
import { TextGenerateEffect } from "./ui/TextGenerateEffect";

const Hero: React.FC = () => {
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const scrollToAboutSection = () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      const navbarHeight = document.getElementById("floating-nav")?.offsetHeight || 0;
      const offsetPosition = aboutSection.getBoundingClientRect().top + window.pageYOffset - navbarHeight - 20;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
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
  }, []);

  return (
    <div className="min-h-screen pb-20 pt-20 relative flex items-center" ref={sectionRef}>
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
      <div className="hero-container relative z-10 flex flex-col md:flex-row md:items-center md:justify-between w-full">
        {/* Main AVIF Image for Desktop */}
        <div className="hidden md:block relative w-1/2 lg:w-1/2 animate-bounce-slow">
          <Image
            src="/tol1.avif"
            alt="Yogeshwaran"
            width={600}
            height={600}
            className={`rounded-full object-cover w-full lg:w-[150%] transition-transform duration-1000 ${inView ? "translate-x-0" : "-translate-x-full"}`}
          />
          <Image
            src="/tol2.avif"
            alt="Additional Top Left"
            width={100}
            height={100}
            className={`absolute top-[-20px] left-[5%] w-[25%] max-w-[100px] rounded-full shadow-md transition-transform duration-1000 ${inView ? "translate-x-0" : "-translate-x-full"}`}
            style={{ transform: inView ? "translateY(-10px)" : "translateY(-10px) translateX(-50%)" }}
          />
          <Image
            src="/tol3.avif"
            alt="Additional Bottom Right"
            width={120}
            height={120}
            className={`absolute bottom-[-40px] right-[-40px] w-[30%] rounded-full shadow-md transition-transform duration-1000 ${inView ? "translate-x-0" : "translate-x-full"}`}
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
            words="Software Engineer, Developer, AI Freak, Hackathon winner, Mentor, Freelancer, Designer"
            className="text-center md:text-left text-[30px] md:text-4xl lg:text-5xl mt-[-20px] md:mt-[-30px] text-purple"
          />

          <p className="hero-text-critical text-center md:text-left md:tracking-wider mb-4 text-sm md:text-lg lg:text-2xl font-medium">
            A Tech-savvy Professional with deep love for Technology and Business Ideologies
          </p>

          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white md:text-left text-center mt-4">
            Connect with <span className="text-purple">Me</span>
          </h1>

          {/* Social Media Icons - Aligned in a single row with uniform size */}
          <div className="flex justify-center md:justify-start items-center space-x-8 mt-6">
            <a
              href="https://github.com/Yog37h"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white transition-transform transform hover:scale-110"
            >
              <FaGithub className="text-3xl transition-all duration-300 text-white hover:text-purple hover:drop-shadow-[0_0_30px_rgba(128,0,255,1)]" />
            </a>
            <a
              href="https://www.linkedin.com/in/yogeshwaran-s-3809b7274/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white transition-transform transform hover:scale-110"
            >
              <FaLinkedin className="text-3xl transition-all duration-300 text-white hover:text-purple hover:drop-shadow-[0_0_30px_rgba(128,0,255,1)]" />
            </a>
            <a
              href="https://x.com/YogeshKi157219"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white transition-transform transform hover:scale-110"
            >
              <FaXTwitter className="text-3xl transition-all duration-300 text-white hover:text-purple hover:drop-shadow-[0_0_30px_rgba(128,0,255,1)]" />
            </a>
            <a
              href="https://www.instagram.com/yogx._01_/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white transition-transform transform hover:scale-110"
            >
              <FaInstagram className="text-3xl transition-all duration-300 text-white hover:text-purple hover:drop-shadow-[0_0_30px_rgba(128,0,255,1)]" />
            </a>
            <a
              href="https://topmate.io/yogeshwaran01"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white transition-transform transform hover:scale-110"
            >
              <FaCalendarCheck className="text-2xl transition-all duration-300 text-white hover:text-purple hover:drop-shadow-[0_0_30px_rgba(128,0,255,1)]" />
            </a>
          </div>

          {/* AVIF Images for Mobile */}
          <div className="mt-12 md:hidden flex flex-col items-center space-y-4 relative">
            <Image
              src="/tol1.avif"
              alt="Yogeshwaran"
              width={128}
              height={128}
              className={`w-32 h-32 rounded-full object-cover shadow-md animate-bounce-slow transition-transform duration-1000 ${inView ? "translate-x-0" : "-translate-x-full"}`}
            />
            <Image
              src="/tol2.avif"
              alt="Additional Top Left"
              width={64}
              height={64}
              className={`absolute top-[-20px] left-[-40px] w-16 rounded-full shadow-md animate-bounce-slow transition-transform duration-1000 ${inView ? "translate-x-0" : "-translate-x-full"}`}
            />
            <Image
              src="/tol3.avif"
              alt="Additional Bottom Right"
              width={64}
              height={64}
              className={`absolute bottom-[-10px] right-[-30px] w-16 rounded-full shadow-md animate-bounce-slow transition-transform duration-1000 ${inView ? "translate-x-0" : "translate-x-full"}`}
            />
          </div>

          {/* Magic Button */}
          <div className="block mt-12 md:mt-6">
            <MagicButton
              title="Explore me"
              icon={<FaLocationArrow />}
              position="right"
              handleClick={scrollToAboutSection}
              otherClasses="mt-0"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;