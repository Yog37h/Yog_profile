import { FaGithub, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import { FaLocationArrow } from "react-icons/fa6";

import MagicButton from "./MagicButton";
import { Spotlight } from "./ui/Spotlight";
import { TextCycling } from "./ui/TextCycling";
import { TextGenerateEffect } from "./ui/TextGenerateEffect";

const Hero = () => {
  return (
    <div className="pb-20 pt-36">
      {/**
       *  UI: Spotlights
       */}
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

      {/**
       *  UI: grid
       */}
      <div
        className="h-screen w-full dark:bg-black-100 bg-white dark:bg-grid-white/[0.03] bg-grid-black-100/[0.2]
       absolute top-0 left-0 flex items-center justify-center"
      >
        <div
          className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black-100
         bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"
        />
      </div>

      <div className="flex justify-center relative my-16 z-10">
        <div className="max-w-[89vw] md:max-w-2xl lg:max-w-[60vw] flex flex-col items-center justify-center">
          <p className="uppercase tracking-widest text-lg text-center text-blue-100 max-w-80 mb-[-10px]">
            Hello, This is me
          </p>

          <TextGenerateEffect
            words="YOGESHWARAN"
            className="text-center text-[40px] md:text-5xl lg:text-6xl"
          />
          <TextCycling
            words="Software Engineer, Player, Developer, Tech Enthusiast"
            className="text-center text-[100px] md:text-8xl lg:text-8xl mt-[-30px]"
          />

          <p className="text-center md:tracking-wider mb-4 text-sm md:text-lg lg:text-2xl ">
            A Tech-savvy Professional with deep love for Technology and
            Problem-solving with Business Ideologies
          </p>
          <h1 className="heading mt-[20px]">
            Connect with
            <span className="text-purple"> Me </span>
          </h1>

          {/* Social Media Icons */}
          <div className="flex justify-center space-x-8 mt-4">
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

          {/* Magic Button */}
          {/* Add spacing between "Show my work" button and the above content */}
          <a href="#about" className="block mt-12 md:mt-16">
            <MagicButton
              title="Explore me"
              icon={<FaLocationArrow />}
              position="right"
              otherClasses="mt-0" // Add more margin if needed for the button itself
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Hero;
