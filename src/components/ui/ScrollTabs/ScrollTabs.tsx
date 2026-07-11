import React, { useRef, useEffect, useState } from "react";

export interface ScrollTabsProps {
  tabs: string[];
  activeTab: string;
  onChange: (tab: string) => void;
  variant?: "capsule" | "pills";
  className?: string;
}

export const ScrollTabs: React.FC<ScrollTabsProps> = ({
  tabs,
  activeTab,
  onChange,
  variant = "capsule",
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showLeftFade, setShowLeftFade] = useState(false);
  const [showRightFade, setShowRightFade] = useState(false);

  // Check scroll position to dynamically show/hide fading gradients at the edges
  const checkScroll = () => {
    const container = containerRef.current;
    if (container) {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      // Show left fade if we've scrolled right
      setShowLeftFade(scrollLeft > 2);
      // Show right fade if there is more content to scroll to the right
      setShowRightFade(scrollLeft < scrollWidth - clientWidth - 2);
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      checkScroll();
      container.addEventListener("scroll", checkScroll);
      window.addEventListener("resize", checkScroll);

      // Set up a ResizeObserver to handle child layout changes
      const resizeObserver = new ResizeObserver(() => checkScroll());
      resizeObserver.observe(container);

      return () => {
        container.removeEventListener("scroll", checkScroll);
        window.removeEventListener("resize", checkScroll);
        resizeObserver.disconnect();
      };
    }
  }, [tabs]);

  // Scroll active tab to center of container when activeTab changes
  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      const activeEl = container.querySelector("[data-active='true']") as HTMLElement;
      if (activeEl) {
        const containerWidth = container.clientWidth;
        const activeLeft = activeEl.offsetLeft;
        const activeWidth = activeEl.clientWidth;

        const targetScrollLeft = activeLeft - containerWidth / 2 + activeWidth / 2;
        container.scrollTo({
          left: targetScrollLeft,
          behavior: "smooth",
        });
      }
    }
  }, [activeTab]);

  const handleTabClick = (tab: string) => {
    onChange(tab);
  };

  // Generate background-agnostic fading mask style using CSS linear-gradients
  const getMaskStyle = (): React.CSSProperties => {
    const maskStr =
      showLeftFade && showRightFade
        ? "linear-gradient(to right, transparent, black 24px, black calc(100% - 24px), transparent)"
        : showLeftFade
        ? "linear-gradient(to right, transparent, black 24px, black 100%)"
        : showRightFade
        ? "linear-gradient(to right, black 0%, black calc(100% - 24px), transparent)"
        : "none";

    return {
      maskImage: maskStr,
      WebkitMaskImage: maskStr,
    };
  };

  // Predefined container and tab classes based on variants
  const containerClasses =
    variant === "capsule"
      ? "bg-white rounded-full shadow-sm flex gap-0.5 p-1 overflow-x-auto hide-scrollbar text-md font-semibold text-gray-500"
      : "flex gap-2 overflow-x-auto hide-scrollbar text-md font-semibold text-gray-500 py-1";

  const getTabClasses = (isActive: boolean) => {
    if (variant === "capsule") {
      return `px-4 py-1.5 rounded-full whitespace-nowrap cursor-pointer transition-colors ${
        isActive ? "bg-blue-light text-blue" : "hover:text-gray-700 text-gray-400"
      }`;
    } else {
      return `px-3.5 py-1.5 rounded-full transition-all whitespace-nowrap cursor-pointer ${
        isActive ? "bg-blue-light text-blue" : "hover:bg-gray-100 text-gray-500"
      }`;
    }
  };

  return (
    <div className={`relative w-full ${className}`}>
      <div
        ref={containerRef}
        className={containerClasses}
        style={getMaskStyle()}
      >
        {tabs.map((tab) => {
          const isActive = tab === activeTab;
          return (
            <button
              key={tab}
              data-active={isActive}
              onClick={() => handleTabClick(tab)}
              className={getTabClasses(isActive)}
            >
              {tab}
            </button>
          );
        })}
      </div>
    </div>
  );
};
