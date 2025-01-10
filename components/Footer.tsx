import { FaLocationArrow } from "react-icons/fa6";
import MagicButton from "./MagicButton";

const Footer = () => {
  return (
    <footer className="w-full pt-20 pb-10" id="contact">
      {/* background grid */}
      <div className="w-full absolute left-0 -bottom-72 min-h-96">
        <img
          src="/footer-grid.svg"
          alt="grid"
          className="w-full h-full opacity-50"
        />
      </div>

      <div className="flex flex-col md:flex-row w-full justify-between items-center">
        {/* Left content */}
        <div className="flex flex-col items-center md:items-start w-full md:w-1/2 px-10">
          <h1 className="heading text-4xl font-bold mb-6 text-center md:text-left">
            Crazy to take <span className="text-purple">our</span> digital
            convo to the next level?
          </h1>
          <p className="text-white-200 md:mt-10 my-5 text-center md:text-left text-xl">
            Reach out to me today and let&apos;s get connected.
          </p>
          <a href="mailto:kiyogesh80@gmail.com">
            <MagicButton
              title="Let's get in touch"
              icon={<FaLocationArrow />}
              position="right"
            />
          </a>
        </div>

        {/* Right content (AVIF image) */}
        <div className="w-full md:w-1/2 mt-10 md:mt-0">
          <img
            src="/tol1.avif"
            alt="AVIF Image"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
