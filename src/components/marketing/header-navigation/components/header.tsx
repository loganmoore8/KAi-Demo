"use client";

import type { ReactNode } from "react";
import { useRef, useState } from "react";
import { ChevronDown, ArrowRight } from "@untitledui/icons";
import { Button as AriaButton, Dialog as AriaDialog, DialogTrigger as AriaDialogTrigger, Popover as AriaPopover } from "react-aria-components";
import { Button } from "@/components/base/buttons/button";
import { GuidedReachLogo } from "@/components/foundations/logo/guided-safety-logo";
import { GuidedReachLogoMinimal } from "@/components/foundations/logo/guided-safety-logo-minimal";
import { ResourcesDropdownMenu } from "@/components/marketing/header-navigation/dropdown-header-navigation";
import { cx } from "@/utils/cx";

type HeaderNavItem = {
    label: string;
    href?: string;
    menu?: ReactNode;
};

const headerNavItems: HeaderNavItem[] = [
    { label: "Resources", menu: <ResourcesDropdownMenu /> },
    { label: "Pricing", href: "/pricing" },
    { label: "About", href: "/about" },
];

const footerNavItems = [
    { label: "About us", href: "/" },
    { label: "Press", href: "/products" },
    { label: "Careers", href: "/resources" },
    { label: "Legal", href: "/pricing" },
    { label: "Support", href: "/pricing" },
    { label: "Contact", href: "/pricing" },
    { label: "Sitemap", href: "/pricing" },
    { label: "Cookie settings", href: "/pricing" },
];

const MobileNavItem = (props: { className?: string; label: string; href?: string; children?: ReactNode }) => {
    const [isOpen, setIsOpen] = useState(false);

    if (props.href) {
        return (
            <li>
                <a href={props.href} className="flex items-center justify-between px-4 py-3 text-md font-semibold text-primary hover:bg-primary_hover">
                    {props.label}
                </a>
            </li>
        );
    }

    return (
        <li className="flex flex-col gap-0.5">
            <button
                aria-expanded={isOpen}
                onClick={() => setIsOpen(!isOpen)}
                className="flex w-full items-center justify-between px-4 py-3 text-md font-semibold text-primary hover:bg-primary_hover"
            >
                {props.label}{" "}
                <ChevronDown
                    className={cx("size-4 stroke-[2.625px] text-fg-quaternary transition duration-100 ease-linear", isOpen ? "-rotate-180" : "rotate-0")}
                />
            </button>
            {isOpen && <div>{props.children}</div>}
        </li>
    );
};

const MobileFooter = () => {
    return (
        <div className="flex flex-col gap-8 border-t border-secondary px-4 py-6">
            <div>
                <ul className="grid grid-flow-col grid-cols-2 grid-rows-4 gap-x-6 gap-y-3">
                    {footerNavItems.map((navItem) => (
                        <li key={navItem.label}>
                            <Button color="link-gray" size="lg" href={navItem.href}>
                                {navItem.label}
                            </Button>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="flex flex-col gap-3">
                <Button size="lg" color="primary" href="/about#contact" iconTrailing={ArrowRight}>
                    Contact sales
                </Button>
                <Button color="secondary" size="lg">
                    Log in
                </Button>
            </div>
        </div>
    );
};

interface HeaderProps {
    items?: HeaderNavItem[];
    isFullWidth?: boolean;
    isFloating?: boolean;
    className?: string;
}

export const Header = ({ items = headerNavItems, isFullWidth, isFloating, className }: HeaderProps) => {
    const headerRef = useRef<HTMLElement>(null);

    return (
        <header
            ref={headerRef}
            className={cx(
                "relative flex h-20 w-full items-center justify-center bg-[#fef6ee]",
                className,
            )}
        >
            <div className="flex size-full max-w-[1280px] flex-1 items-center px-8">
                <div className="flex w-full justify-between items-center">
                    {/* Left side - Logo and Navigation */}
                    <div className="flex items-center gap-5">
                            <a href="/" className="hover:opacity-80 transition-opacity">
                                <GuidedReachLogo className="h-8" style={{ filter: 'brightness(0) saturate(100%) invert(27%) sepia(51%) saturate(2878%) hue-rotate(346deg) brightness(91%) contrast(97%)' }} />
                            </a>

                        {/* Desktop navigation */}
                        <nav className="max-md:hidden">
                            <ul className="flex items-center gap-2">
                                {items.map((navItem) => (
                                    <li key={navItem.label}>
                                        {navItem.menu ? (
                                            <AriaDialogTrigger>
                                                <AriaButton className="flex items-center gap-2 px-2 py-1 rounded-lg hover:bg-white/50 transition-colors text-[#772917] text-base font-semibold">
                                                    <span>{navItem.label}</span>
                                                    <ChevronDown className="size-4" />
                                                </AriaButton>

                                                <AriaPopover
                                                    className={({ isEntering, isExiting }) =>
                                                        cx(
                                                            "hidden origin-top will-change-transform md:block",
                                                            isEntering && "duration-200 ease-out animate-in fade-in slide-in-from-top-1",
                                                            isExiting && "duration-150 ease-in animate-out fade-out slide-out-to-top-1",
                                                        )
                                                    }
                                                    offset={8}
                                                    containerPadding={0}
                                                >
                                                    {({ isEntering, isExiting }) => (
                                                        <AriaDialog
                                                            className={cx(
                                                                "mx-auto origin-top outline-hidden",
                                                                isEntering && "duration-200 ease-out animate-in zoom-in-95",
                                                                isExiting && "duration-150 ease-in animate-out zoom-out-95",
                                                            )}
                                                        >
                                                            {navItem.menu}
                                                        </AriaDialog>
                                                    )}
                                                </AriaPopover>
                                            </AriaDialogTrigger>
                                        ) : (
                                            <a
                                                href={navItem.href}
                                                className="flex items-center gap-2 px-2 py-1 rounded-lg hover:bg-white/50 transition-colors text-[#772917] text-base font-semibold"
                                            >
                                                <span>{navItem.label}</span>
                                            </a>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </div>

                    {/* Right side - Action buttons */}
                    <div className="flex items-center gap-4">
                        <Button 
                            color="secondary" 
                            size="sm"
                            className="text-[#ba3a14] hover:bg-white/50"
                        >
                            Log in
                        </Button>
                        <Button 
                            color="primary" 
                            size="sm"
                            className="bg-[#e04f16] hover:bg-[#d04515] shadow-[0px_0px_0px_1px_inset_rgba(10,13,18,0.18),0px_-2px_0px_0px_inset_rgba(10,13,18,0.05)]"
                        >
                            Talk to sales
                        </Button>
                    </div>
                </div>
            </div>
        </header>
    );
};
