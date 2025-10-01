"use client";

import type { HTMLAttributes } from "react";
import { cx } from "@/utils/cx";

interface ScreenMockupProps extends HTMLAttributes<HTMLDivElement> {
    imageUrl?: string;
    width?: number;
    height?: number;
}

export const ScreenMockup = ({ 
    imageUrl = "/images/mockup-placeholder.svg", 
    width = 1200, 
    height = 800, 
    className,
    ...props 
}: ScreenMockupProps) => {
    // Determine if this is mobile based on width
    const isMobile = width <= 400;
    
    return (
        <div
            className={cx(
                "bg-white box-border content-stretch flex flex-col items-start justify-start relative rounded-[32px] size-full",
                isMobile ? "p-[1.128px]" : "p-1",
                className
            )}
            {...props}
        >
            {/* Outer shadow and border */}
            <div className={cx(
                "absolute border border-[rgba(0,0,0,0.01)] border-solid inset-[-1px] pointer-events-none rounded-[33px]",
                isMobile 
                    ? "shadow-[0px_3.385px_4.513px_-4px_rgba(10,13,18,0.08),0px_1.128px_1.692px_-2px_rgba(10,13,18,0.03),0px_0.564px_0.564px_-1px_rgba(10,13,18,0.04)]"
                    : "shadow-[0px_12px_16px_-4px_rgba(10,13,18,0.08),0px_4px_6px_-2px_rgba(10,13,18,0.03),0px_2px_2px_-1px_rgba(10,13,18,0.04)]"
            )} />
            
            {/* Inner container with shadow */}
            <div className={cx(
                "bg-white box-border content-stretch flex flex-col items-start justify-start overflow-clip relative rounded-[28px] shrink-0",
                isMobile ? "p-[1.128px]" : "p-1"
            )}>
                {/* Mockup wrapper */}
                <div className="bg-neutral-50 relative rounded-3xl shrink-0">
                    <div className="box-border content-stretch flex flex-col items-start justify-start overflow-clip p-0 relative">
                        {/* Screen content */}
                        <div 
                            className="bg-center bg-cover bg-no-repeat shrink-0"
                            style={{
                                width: `${width}px`,
                                height: `${height}px`,
                                backgroundImage: `url('${imageUrl}')`,
                            }}
                        />
                    </div>
                    
                    {/* Inner border */}
                    <div className={cx(
                        "absolute border-solid inset-0 pointer-events-none rounded-3xl",
                        isMobile 
                            ? "border-[#e9eaeb] border-[0.564px]"
                            : "border-2 border-[#e9eaeb]"
                    )} />
                </div>
                
                {/* Inner shadow */}
                <div className={cx(
                    "absolute inset-0 pointer-events-none",
                    isMobile
                        ? "shadow-[0px_0px_1.692px_2px_inset_rgba(10,13,18,0.08),0px_0px_1.128px_2px_inset_rgba(10,13,18,0.03)]"
                        : "shadow-[0px_0px_6px_2px_inset_rgba(10,13,18,0.08),0px_0px_4px_2px_inset_rgba(10,13,18,0.03)]"
                )} />
            </div>
        </div>
    );
}; 