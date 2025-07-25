import animationData from "@/data/confetti.json";
import { cn } from "@/lib/utils";
import Image from "next/image"; // Import Image component
import { useState } from "react";
import { IoCopyOutline } from "react-icons/io5";
import Lottie from "react-lottie";
import MagicButton from "../MagicButton";
import { BackgroundGradientAnimation } from "./GradientBg";
import GridGlobe from "./GridGlobe";
import { JavaScriptIcon, PythonIcon, TypeScriptIcon } from "./InlineSVGs";



export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-6 lg:grid-cols-5 md:grid-row-7 gap-4 lg:gap-8 mx-auto",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  id,
  title,
  description,
  img,
  imgClassName,
  titleClassName,
  spareImg,
}: {
  className?: string;
  id: number;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  img?: string;
  imgClassName?: string;
  titleClassName?: string;
  spareImg?: string;
}) => {
  const leftLists = [""];
  const rightLists = [""];

  const [copied, setCopied] = useState(false);

  const defaultOptions = {
    loop: copied,
    autoplay: copied,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const driveLink = "https://drive.google.com/file/d/1xjMViu9CyKkF2K_gG-sOoFU166vY2VVh/view?usp=sharing";

  const handleClick = () => {
    setCopied(true);

    // Open the CV link after 3 seconds
    setTimeout(() => {
      window.open(driveLink, "_blank");
    }, 2500); // 3 seconds delay
  };

  return (
    <div
      className={cn(
        "row-span-1 relative overflow-hidden rounded-3xl border border-white/[0.1] group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none justify-between flex flex-col space-y-4",
        className
      )}
      style={{
        background: "rgb(4,7,29)",
        animation: "gradientFlow 8s infinite",
        backgroundSize: "200% 200%",
      }}
    >
      <div
        className="h-full relative"
        style={{
          overflow: "hidden",
        }}
      >
        <div className="absolute inset-0 w-full h-full z-0">
          {img && (
            <Image
              src={img}
              alt={title as string}
              width={400}
              height={300}
              loading={id === 1 || id === 5 ? "eager" : "lazy"} // Prioritize m2.avif and ach2.avif (above-the-fold)
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className={cn(
                imgClassName,
                "object-cover object-center w-full h-full transform group-hover/bento:scale-110 transition-transform duration-500"
              )}
            />
          )}
        </div>
        <div
          className={`absolute right-15 -bottom-5 ${
            id === 5 && "w-full opacity-100"
          }`}
        >
          {spareImg && (
            <Image
              src={spareImg}
              alt="Spare Image"
              width={id === 5 ? 400 : 160}
              height={id === 5 ? 300 : 160}
              loading="lazy" // Spare images can load later
              sizes={id === 5 ? "(max-width: 768px) 100vw, 400px" : "160px"}
              className={`object-cover object-center ${
                id === 5
                  ? "w-full h-full top-0 bottom-0 right-0 left-0"
                  : "w-40 h-40 right-30 left-50"
              }`}
            />
          )}
        </div>

        {id === 6 && (
          <BackgroundGradientAnimation>
            <div className="absolute z-50 inset-0 flex items-center justify-center text-white font-bold px-4 pointer-events-none text-3xl text-center md:text-center lg:text-7xl"></div>
          </BackgroundGradientAnimation>
        )}

        <div
          className={cn(
            titleClassName,
            "group-hover/bento:translate-x-2 transition duration-200 relative md:h-full min-h-40 flex flex-col px-5 p-5 lg:p-10 z-10"
          )}
        >
          <div className="font-sans font-extralight md:max-w-20 md:text-xs lg:text-base text-sm text-[#C1C2D3] z-10">
            {description}
          </div>
          <div
            className="font-sans text-lg lg:text-3xl max-w-96 font-bold z-10"
          >
            {title}
          </div>

          {id === 2 && <GridGlobe />}
          {id === 3 && (
            <div className="flex gap-1 lg:gap-5 w-auto absolute left-55 right-3 lg:left-60">
              <div className="flex flex-col gap-3 md:gap-3 lg:gap-8 overflow-hidden h-10 lg:h-140 w-35"></div>
              <div className="icon-container" style={{ animation: "roll-down 25s linear infinite" }}>
                {[
                  "djangoproject-ar21.svg",
                  "reactjs-ar21.svg",
                  "express-svgrepo-com.svg",
                  "nodejs.svg",
                  "nextjs.svg",      
                  "nestjs.svg",
                  "springio-ar21.svg",
                  "mongodb-ar21.svg",
                  "vuejs.svg",
                  "flutter.svg",
                  "angular.svg",
                  "nodejs.svg",
                  "nextjs.svg",
                  "flutter.svg",
                  "angular.svg",
                  "gitlab.svg",
                  "djangoproject-ar21.svg",
                  "reactjs-ar21.svg",
                  "express-svgrepo-com.svg",
                  "nodejs.svg",
                  "nextjs.svg",
                  "nestjs.svg",
                  "springio-ar21.svg",
                  "mongodb-ar21.svg",
                  "vuejs.svg",
                  "flutter.svg",
                  "angular.svg",
                  "nodejs.svg",
                  "nextjs.svg",
                  "flutter.svg",
                  "angular.svg",
                  "gitlab.svg",
                  
                ].map((img, index) => (
                  <Image
                    key={index}
                    src={img}
                    alt={`Technology Icon ${index + 1}`} // More descriptive alt
                    width={150} // Matches icon-container width
                    height={90} // Matches icon-container height
                    className="icon"
                  />
                ))}
              </div>
            </div>
          )}
          {id === 4 && (
            <div className="flex justify-center items-center w-full p-4">
              <div className="flex flex-wrap gap-6 justify-center">
                {/* Use inline SVGs for common icons to reduce HTTP requests */}
                <PythonIcon className="h-10 w-10 lg:h-9 lg:w-9 object-contain transition-transform duration-300 hover:scale-110 hover:drop-shadow-[0_0_10px_rgba(0,191,255,0.7)]" />
                <Image
                  src="java.svg"
                  alt="Java"
                  width={36}
                  height={36}
                  loading="lazy"
                  sizes="36px"
                  className="h-10 w-10 lg:h-9 lg:w-9 object-contain transition-transform duration-300 hover:scale-110 hover:drop-shadow-[0_0_10px_rgba(0,191,255,0.7)]"
                />
                <Image
                  src="c++.svg"
                  alt="C"
                  width={36}
                  height={36}
                  loading="lazy"
                  sizes="36px"
                  className="h-15 w-15 lg:h-9 lg:w-9 object-contain transition-transform duration-300hover:scale-110 hover:drop-shadow-[0_0_10px_rgba(0,191,255,0.7)]"
                />
                <TypeScriptIcon className="h-10 w-10 lg:h-9 lg:w-9 object-contain transition-transform duration-300 hover:scale-110 hover:drop-shadow-[0_0_10px_rgba(0,191,255,0.7)]" />
                <JavaScriptIcon className="h-10 w-10 lg:h-9 lg:w-9 object-contain transition-transform duration-300 hover:scale-110 hover:drop-shadow-[0_0_10px_rgba(0,191,255,0.7)]" />
                {["mysqlfis.svg","git.svg", "docker.svg", "figma.svg", "aws1.svg", "gcp.svg", "jenkinsww.svg"].map((img, index) => (
                  <Image
                    key={index}
                    src={img}
                    alt={`Technology Icon ${index + 6}`}
                    width={36}
                    height={36}
                    loading="lazy"
                    sizes="36px"
                    className="h-10 w-10 lg:h-9 lg:w-9 object-contain transition-transform duration-300 hover:scale-110 hover:drop-shadow-[0_0_10px_rgba(0,191,255,0.7)]"
                  />
                ))}
              </div>
            </div>
          )}
          {id === 6 && (
            <div className="mt-5 relative">
              <div
                className={`absolute -bottom-5 right-0 ${
                  copied ? "block" : "block"
                }`}
              >
                <Lottie options={defaultOptions} height={200} width={400} />
              </div>
              <MagicButton
                title={copied ? "Thanks for the hi-fi dude !" : "Open my CV"}
                icon={<IoCopyOutline />}
                position="center"
                handleClick={handleClick}
                otherClasses="!bg-[#161A31]"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

