"use client";

import { projects } from "@/data";
import { useEffect, useRef } from "react";
import { FaLocationArrow } from "react-icons/fa6";
import { PinContainer } from "./ui/Pin";

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

    const images = section.querySelectorAll<HTMLDivElement>(".animated-image");

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          images.forEach((image) => {
            image.classList.add("animate-fly-in");
          });
        } else {
          images.forEach((image) => {
            image.classList.remove("animate-fly-in");
          });
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={sectionRef} className="relative py-20">
      <h1 className="heading">
        A small selection of my{" "}
        <span className="text-purple">potential projects</span>
      </h1>

      {/* Animated Avif Image - Left */}
      <div className="absolute left-[-3%] top-1/2 animated-image opacity-0">
        <img
          src="/shape5.avif"
          alt="Floating decoration"
          className="w-40 h-40 md:w-60 md:h-60"
        />
      </div>

      {/* Animated Avif Image - Right - Top */}
      <div className="absolute right-[-3%] top-[28%] animated-image opacity-0">
        <img
          src="/shape7.avif"
          alt="Floating decoration"
          className="w-40 h-40 md:w-60 md:h-60"
        />
      </div>

      {/* Animated Avif Image - Right - Bottom */}
      <div className="absolute right-[-3%] top-[75%] animated-image opacity-0">
        <img
          src="/shape6.avif"
          alt="Floating decoration"
          className="w-40 h-40 md:w-60 md:h-60"
        />
      </div>

      {/* Projects Section */}
      <div className="flex flex-wrap items-center justify-center p-4 gap-16 mt-10">
  {projects.map((item) => (
    <div
      className="h-[25rem] flex items-center justify-center sm:w-96 w-[80vw] lg:min-h-[32.5rem] max-w-md"
      key={item.id}
    >
      <div onClick={() => handleRedirect(item.link)} className="cursor-pointer">
        <PinContainer title={item.link}>
          {/* Image & Background */}
          <div className="relative flex items-center justify-center sm:w-96 w-[80vw] h-[20vh] lg:h-[30vh] overflow-hidden mb-10 rounded-3xl">
            <div
              className="absolute inset-0 w-full h-full rounded-3xl"
              style={{ backgroundColor: "#0b0e22" }}
            >
              <img src="/bg.png" alt="bgimg" className="object-cover w-full h-full" />
            </div>
            <img
              src={item.img}
              alt="cover"
              className="z-10 absolute bottom-0 max-w-full h-auto"
            />
          </div>

          {/* Title */}
          <h1 className="font-bold text-base md:text-xl lg:text-2xl line-clamp-1 text-center">
            {item.title}
          </h1>

          {/* Description */}
          <p
            className="text-sm lg:text-xl font-light lg:font-normal line-clamp-2 text-center"
            style={{ color: "#BEC1DD", margin: "1vh 0" }}
          >
            {item.des}
          </p>

          {/* Tech Icons & GitHub Link */}
         <div className="flex items-center justify-between mt-7 mb-3">
  {/* Tech Stack Icons */}
  <div className="flex items-center">
    {item.iconLists.map((icon, index) => (
      <div
        key={index}
        className="border border-white/20 rounded-full bg-black w-12 h-12 lg:w-14 lg:h-14 flex justify-center items-center"
        style={{ transform: `translateX(-${6 * index + 3}px)` }} // Slight adjustment
      >
        <img src={icon} alt="icon" className="p-2 w-7 h-7 lg:w-9 lg:h-9" />
      </div>
    ))}
  </div>


            {/* GitHub Link */}
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex justify-center items-center text-purple"
            >
              <p className="text-sm md:text-xs lg:text-xl flex">Visit GitHub</p>
              <FaLocationArrow className="ms-3 text-purple-400" />
            </a>
          </div>
        </PinContainer>
      </div>
    </div>
  ))}
</div>

    </div>
  );
};

export default RecentProjects;
