"use client";

import { cx } from "@/utils/cx";

interface ScreenMockupContainerProps {
  imageUrl?: string;
  className?: string;
  width?: number;
  height?: number;
  showPattern?: boolean;
  patternPosition?: 'left' | 'right';
}



interface ScreenMockup32Props {
  shadow?: boolean;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
  imageUrl?: string;
}

function ScreenMockup32({ shadow = true, size = "xs", imageUrl }: ScreenMockup32Props) {
  if (size === "sm") {
    return (
      <div
        className="relative rounded-md size-full"
        data-name="Size=sm"
        id="node-1296_1005"
      >
        <div
          aria-hidden="true"
          className="absolute border-4 border-[#373a41] border-solid inset-[-4px] pointer-events-none rounded-[10px]"
        />
        {shadow && (
          <div
            className="absolute bg-[#000000] bottom-0 left-5 right-5 shadow-[0px_24px_48px_-12px_rgba(10,13,18,0.18),0px_4px_4px_-2px_rgba(10,13,18,0.04)] top-0"
            data-name="Mockup shadow"
            id="node-1296_1006"
          />
        )}
        <div
          className="absolute aspect-[480/320] left-0 right-0 rounded-md top-1/2 translate-y-[-50%] overflow-hidden"
          data-name="Screen mockup (REPLACE FILL)"
          id="node-6132_222103"
        >
          {imageUrl ? (
            <img
              src={imageUrl}
              alt="App screen mockup"
              className="w-full h-full object-cover"
              draggable={false}
            />
          ) : (
            <svg viewBox="0 0 640 426" className="w-full h-full" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <defs>
                <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#1F2937"/>
                  <stop offset="1" stopColor="#111827"/>
                </linearGradient>
              </defs>
              <rect width="640" height="426" rx="16" fill="url(#g)"/>
              <g opacity="0.2">
                <circle cx="96" cy="80" r="48" fill="#4B5563"/>
                <rect x="184" y="54" width="240" height="16" rx="8" fill="#9CA3AF"/>
                <rect x="184" y="82" width="280" height="12" rx="6" fill="#6B7280"/>
              </g>
              <rect x="48" y="144" width="544" height="234" rx="12" fill="#0B1220" stroke="#374151"/>
            </svg>
          )}
        </div>
      </div>
    );
  }
}

export const ScreenMockupContainer = ({ 
  imageUrl,
  className,
  width = 480,
  height = 320,
  showPattern = true,
  patternPosition = 'left'
}: ScreenMockupContainerProps) => {
  return (
    <div
      className={cx(
        "bg-tertiary relative aspect-[3/2] w-full",
        className
      )}
      data-name="Content"
      id="node-1327_178322"
    >
      {/* SVG Line Pattern - matches Figma placement */}
      {showPattern && (
        <img
          src="/images/Line%20pattern.svg"
          alt="Line Pattern"
          className={cx(
            "absolute w-[298px] h-[408px] opacity-100 pointer-events-none select-none",
            patternPosition === 'left' 
              ? "left-[-96px] bottom-[-96px]" 
              : "right-[-96px] bottom-[-96px]"
          )}
          draggable={false}
          aria-hidden="true"
        />
      )}
      {/* Screen Mockup */}
      <div
        className="absolute h-80 right-[39px] rounded-md top-1/2 translate-y-[-50%] w-[480px]"
        data-name="Screen mockup 3:2"
        id="node-1327_178324"
      >
        <ScreenMockup32 shadow={false} size="sm" imageUrl={imageUrl} />
      </div>
    </div>
  );
}; 