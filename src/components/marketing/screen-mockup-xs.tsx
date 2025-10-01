"use client";

import { cx } from "@/utils/cx";

interface ScreenMockupXsProps {
  imageUrl?: string;
  className?: string;
  width?: number;
  height?: number;
}

export const ScreenMockupXs = ({ 
  imageUrl = "/images/mockup-placeholder.svg",
  className,
  width = 342,
  height = 228
}: ScreenMockupXsProps) => {
  return (
    <div
      className={cx(
        "relative rounded size-full",
        className
      )}
      data-name="Size=xs"
      id="node-1296_1019"
    >
      {/* Border overlay */}
      <div
        aria-hidden="true"
        className="absolute border-4 border-[#373a41] border-solid inset-[-4px] pointer-events-none rounded-lg"
      />
      
      {/* Shadow */}
      <div
        className="absolute bg-[#000000] bottom-0 left-4 right-4 shadow-[0px_24px_48px_-12px_rgba(10,13,18,0.18),0px_4px_4px_-2px_rgba(10,13,18,0.04)] top-0"
        data-name="Mockup shadow"
        id="node-1296_1020"
      />
      
      {/* Screen content */}
      <div
        className="absolute aspect-[342/228] bg-center bg-cover bg-no-repeat left-0 right-0 rounded top-1/2 translate-y-[-50%]"
        data-name="Screen mockup (REPLACE FILL)"
        id="node-6132_222104"
        style={{ 
          backgroundImage: `url('${imageUrl}')`,
          width: `${width}px`,
          height: `${height}px`
        }}
      />
    </div>
  );
}; 