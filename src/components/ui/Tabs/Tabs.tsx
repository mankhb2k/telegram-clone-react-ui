import React, { createContext, useContext, useRef, useEffect } from "react";

interface TabsContextProps {
  value: string;
  onValueChange: (value: string) => void;
  variant?: "capsule" | "pills";
}

const TabsContext = createContext<TabsContextProps | undefined>(undefined);

export const useTabs = () => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error("Tabs components must be rendered within a <Tabs /> provider");
  }
  return context;
};

export interface TabsProps {
  value: string;
  onValueChange: (value: string) => void;
  variant?: "capsule" | "pills";
  children: React.ReactNode;
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({
  value,
  onValueChange,
  variant = "capsule",
  children,
  className = "",
}) => {
  return (
    <TabsContext.Provider value={{ value, onValueChange, variant }}>
      <div className={`w-full ${className}`}>{children}</div>
    </TabsContext.Provider>
  );
};

export interface TabsListProps {
  children: React.ReactNode;
  className?: string;
}

export const TabsList: React.FC<TabsListProps> = ({
  children,
  className = "",
}) => {
  const { value, variant } = useTabs();
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll active tab to center of container when value changes
  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      const activeEl = container.querySelector("[data-state='active']") as HTMLElement;
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
  }, [value]);

  const containerClasses =
    variant === "capsule"
      ? "flex gap-0.5 p-1 overflow-x-auto hide-scrollbar text-md font-semibold text-gray-500"
      : "flex gap-2 overflow-x-auto hide-scrollbar text-md font-semibold text-gray-500 py-1";

  const wrapperClasses =
    variant === "capsule"
      ? "relative bg-white rounded-full shadow-sm overflow-hidden"
      : "relative";

  return (
    <div className={wrapperClasses}>
      <div
        ref={containerRef}
        className={`${containerClasses} ${className}`}
      >
        {children}
      </div>
    </div>
  );
};

export interface TabsTriggerProps {
  value: string;
  children: React.ReactNode;
  className?: string;
}

export const TabsTrigger: React.FC<TabsTriggerProps> = ({
  value: triggerValue,
  children,
  className = "",
}) => {
  const { value, onValueChange, variant } = useTabs();
  const isActive = value === triggerValue;

  const getTriggerClasses = () => {
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
    <button
      type="button"
      data-state={isActive ? "active" : "inactive"}
      onClick={() => onValueChange(triggerValue)}
      className={`${getTriggerClasses()} ${className}`}
    >
      {children}
    </button>
  );
};

export interface TabsContentProps {
  value: string;
  children: React.ReactNode;
  className?: string;
}

export const TabsContent: React.FC<TabsContentProps> = ({
  value: contentValue,
  children,
  className = "",
}) => {
  const { value } = useTabs();
  if (value !== contentValue) return null;
  return <div className={className}>{children}</div>;
};
