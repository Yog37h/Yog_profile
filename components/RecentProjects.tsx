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
    <div ref={sectionRef} className="relative py-20 px-6 md:px-12">
      <h1 className="heading text-center">
        A small selection of my <span className="text-purple">potential projects</span>
      </h1>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-10 place-items-center">
  {projects.map((item) => (
    <div
      key={item.id}
      className="w-full max-w-[1000px] h-[430px] flex flex-col items-center bg-[#0b0e22] p-8 rounded-2xl shadow-lg"
    >
      <div onClick={() => handleRedirect(item.link)} className="cursor-pointer w-full">
        <PinContainer title={item.link}>
          <div className="relative w-[500px] h-[180px] overflow-hidden rounded-2xl mb-6">
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

          <h1 className="font-bold text-lg md:text-xl line-clamp-1 text-white">
            {item.title}
          </h1>

          <p className="text-sm md:text-base text-gray-400 mt-2 line-clamp-2">
            {item.des}
          </p>

          <div className="flex items-center justify-between mt-5 w-full">
            <div className="flex space-x-3">
              {item.iconLists.map((icon, index) => (
                <div
                  key={index}
                  className="border border-white/[.2] rounded-full bg-black w-12 h-12 flex justify-center items-center"
                >
                  <img src={icon} alt="icon" className="p-3" />
                </div>
              ))}
            </div>

            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-purple text-sm md:text-base"
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
  );
};

export default RecentProjects;
