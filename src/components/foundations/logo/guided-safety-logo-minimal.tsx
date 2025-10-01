"use client";

import type { HTMLAttributes } from "react";
import { cx } from "@/utils/cx";

export const GuidedReachLogoMinimal = (props: HTMLAttributes<HTMLOrSVGElement>) => {
    return (
        <img 
            src="/logo/Logo.svg" 
            alt="Guided Reach" 
            {...props} 
            className={cx("h-8 w-auto", props.className)} 
        />
    );
}; 