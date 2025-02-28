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
            className="lg:min-h-[32.5rem] h-[25rem] flex items-center justify-center sm:w-96 w-[80vw]"
            key={item.id}
          >
            <div
              onClick={() => handleRedirect(item.link)}
              className="cursor-pointer"
            >
              <PinContainer title={item.link}>
                <div className="relative flex items-center justify-center sm:w-96 w-[80vw] overflow-hidden h-[20vh] lg:h-[30vh] mb-10">
                  <div
                    className="relative w-full h-full overflow-hidden lg:rounded-3xl"
                    style={{ backgroundColor: "#0b0e22" }}
                  >
                    <img src="/bg.png" alt="bgimg" />
                  </div>
                  <img
                    src={item.img}
                    alt="cover"
                    className="z-10 absolute bottom-0"
                  />
                </div>

                <h1 className="font-bold lg:text-2xl md:text-xl text-base line-clamp-1">
                  {item.title}
                </h1>

                <p
                  className="lg:text-xl lg:font-normal font-light text-sm line-clamp-2"
                  style={{
                    color: "#BEC1DD",
                    margin: "1vh 0",
                  }}
                >
                  {item.des}
                </p>

                <div className="flex items-center justify-between mt-7 mb-3">
                  <div className="flex items-center">
                    {item.iconLists.map((icon, index) => (
                      <div
                        key={index}
                        className="border border-white/[.2] rounded-full bg-black lg:w-10 lg:h-10 w-8 h-8 flex justify-center items-center"
                        style={{
                          transform: `translateX(-${5 * index + 2}px)`,
                        }}
                      >
                        <img src={icon} alt="icon" className="p-2" />
                      </div>
                    ))}
                  </div>

                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex justify-center items-center text-purple"
                  >
                    <p className="flex lg:text-xl md:text-xs text-sm">Visit GitHub</p>
                    <FaLocationArrow className="ms-3" color="#CBACF9" />
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
