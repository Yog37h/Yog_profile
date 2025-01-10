import React from "react";

/**
 * UI: border magic from tailwind CSS btns
 * Link: https://ui.aceternity.com/components/tailwindcss-buttons
 *
 * Updates:
 * - Changed border radius to rounded-lg
 * - Added margin of md:mt-10
 * - Removed focus:ring classes
 * - Adjusted padding and gap for icons
 */
const MagicButton = ({
  title,
  icon,
  position,
  type = "button", // default type to "button"
  handleClick,
  otherClasses = "",
  disabled = false, // added disabled prop
}: {
  title: string;
  icon: React.ReactNode;
  position: string;
  type?: "button" | "submit" | "reset"; // Restrict the type to valid HTML button types
  handleClick?: () => void;
  otherClasses?: string;
  disabled?: boolean; // added disabled prop
}) => {
  return (
    <button
      type={type} // Ensure the type is a valid HTML button type
      className={`relative inline-flex h-12 w-full md:w-60 md:mt-10 overflow-hidden rounded-lg p-[1px] focus:outline-none ${otherClasses}`}
      onClick={handleClick}
      disabled={disabled} // Disable the button if the disabled prop is true
    >
      {/* Animated background for the button */}
      <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />

      {/* Button content */}
      <span
        className={`inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-slate-950 px-7 text-sm font-medium text-white backdrop-blur-3xl gap-2`}
      >
        {position === "left" && icon} {/* Icon on the left */}
        {title}
        {position === "right" && icon} {/* Icon on the right */}
      </span>
    </button>
  );
};

export default MagicButton;
