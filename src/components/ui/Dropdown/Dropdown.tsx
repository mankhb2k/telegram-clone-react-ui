import React from "react";

export interface DropdownContentProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  align?: "left" | "right";
  className?: string;
}

export const DropdownContent: React.FC<DropdownContentProps> = ({
  isOpen,
  onClose,
  children,
  align = "right",
  className = "",
}) => {
  if (!isOpen) return null;
  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-transparent cursor-default"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
      ></div>
      <div
        onClick={(e) => e.stopPropagation()}
        className={`absolute top-[calc(100%+6px)] ${
          align === "right" ? "right-0 origin-top-right" : "left-0 origin-top-left"
        } z-50 w-[220px] bg-white/95 backdrop-blur-md rounded-[14px] shadow-[0_4px_24px_rgba(0,0,0,0.12)] border border-gray-100/30 p-[4px] text-[14px] text-gray-700 text-left font-medium animate-in fade-in zoom-in-95 duration-100 select-none ${className}`}
      >
        {children}
      </div>
    </>
  );
};

export interface DropdownItemProps {
  icon?: React.ReactNode;
  label: React.ReactNode;
  onClick?: () => void;
  className?: string;
  danger?: boolean;
}

export const DropdownItem: React.FC<DropdownItemProps> = ({
  icon,
  label,
  onClick,
  className = "",
  danger = false,
}) => {
  return (
    <button
      onClick={onClick}
      className={`w-full px-3 py-2 flex items-center gap-3.5 rounded-[10px] transition-all cursor-pointer border-none bg-transparent text-left font-medium ${
        danger
          ? "hover:bg-red-50 active:bg-red-100 text-red-500"
          : "hover:bg-black/5 active:bg-black/10 text-gray-700"
      } ${className}`}
    >
      {icon && (
        <span className={`${danger ? "text-red-500" : "text-gray-500"} [&>svg]:stroke-[2]`}>
          {icon}
        </span>
      )}
      <span className="flex-1">{label}</span>
    </button>
  );
};

export const DropdownSeparator = () => (
  <div className="h-px bg-gray-100 my-1.5 mx-1"></div>
);
