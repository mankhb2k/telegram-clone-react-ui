import React from "react";
import { Share2 } from "lucide-react";

// Custom SVGs for Telegram UI icons to match 100% pixel-perfection
export const DoubleCheck = ({ className = "text-[#4ec163]" }) => (
  <svg
    className={`w-[15px] h-[15px] inline-block ${className}`}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M2 12l5.25 5 10.75-10.5M8 12l3.25 3 6.75-6.5" />
  </svg>
);

export const SingleCheck = ({ className = "text-gray-400" }) => (
  <svg
    className={`w-[15px] h-[15px] inline-block ${className}`}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 6L9 17l-5-5" />
  </svg>
);

// Phone Icon to match Telegram style
export const PhoneIcon = () => (
  <svg
    className="w-5 h-5 text-gray-400"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
    <line x1="12" y1="18" x2="12.01" y2="18" />
  </svg>
);

// DisableShareIcon matches Telegram's slash-through share icon
export const DisableShareIcon = ({ className = "w-5 h-5 text-gray-500" }) => (
  <div className="relative w-5 h-5 flex items-center justify-center">
    <Share2 className={className} />
    <div className="absolute w-[1.5px] h-6 bg-gray-500 rotate-45 transform origin-center"></div>
  </div>
);
