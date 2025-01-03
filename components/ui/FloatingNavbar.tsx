import Link from "next/link";
import { useEffect, useState } from "react";

export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: { name: string; link: string; icon?: JSX.Element }[];
  className?: string;
}) => {
  // State for active section and scroll direction
  const [activeSection, setActiveSection] = useState<string>("");
  const [scrollDirection, setScrollDirection] = useState<string>("up");
  const [visible, setVisible] = useState<boolean>(true);

  let lastScrollY = typeof window !== "undefined" ? window.scrollY : 0;

  // Handle active section based on scroll position
  const handleScroll = () => {
    const sections = navItems.map((item) => document.querySelector(item.link));

    // Scroll direction check
    if (typeof window !== "undefined") {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY) {
        setScrollDirection("down");
      } else {
        setScrollDirection("up");
      }
      lastScrollY = currentScrollY <= 0 ? 0 : currentScrollY;

      // Handle navbar visibility based on scroll direction
      if (scrollDirection === "down") {
        setVisible(false);
      } else {
        setVisible(true);
      }
    }

    // Set active section based on scroll position
    sections.forEach((section) => {
      const rect = section?.getBoundingClientRect();
      if (rect && rect.top <= 0 && rect.bottom >= 0) {
        setActiveSection(section?.id || "");
      }
    });
  };

  // Add scroll event listener
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollDirection]);

  // Function to handle smooth scroll to section with offset
  const scrollToSection = (link: string) => {
    const section = document.querySelector(link);
    if (section) {
      const navbarHeight = document.getElementById("floating-nav")?.offsetHeight || 0;
      const offsetPosition = section.getBoundingClientRect().top + window.pageYOffset - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <div
      className={`flex max-w-fit md:min-w-[70vw] lg:min-w-fit fixed z-[5000] top-10 inset-x-0 mx-auto px-10 py-5 rounded-lg border border-black/.1 shadow-lg items-center justify-center space-x-4 ${className}`}
      style={{
        backdropFilter: "blur(16px) saturate(180%)",
        backgroundColor: "rgba(17, 25, 40, 0.75)",
        transition: "top 0.3s ease-in-out",
        top: visible ? "40px" : "-80px", // Hide navbar when scrolling down
      }}
    >
      {navItems.map((navItem, idx) => (
        <Link
          key={`link=${idx}`}
          href={navItem.link}
          scroll={false} // Prevent page reload on internal links
        >
          <button
            onClick={() => scrollToSection(navItem.link)}
            className={`relative ${
              activeSection === navItem.link.slice(1)
                ? "text-gray-500"
                : "text-white-600"
            } dark:hover:text-neutral-300 hover:text-neutral-500`}
          >
            <span className="block sm:hidden">{navItem.icon}</span>
            <span className="text-sm">{navItem.name}</span>
          </button>
        </Link>
      ))}
    </div>
  );
};
