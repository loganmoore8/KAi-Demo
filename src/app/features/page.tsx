"use client";

import { ArrowRight } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { Badge } from "@/components/base/badges/badges";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icons";
import { Header } from "@/components/marketing/header-navigation/components/header";
import { GuidedReachLogo } from "@/components/foundations/logo/guided-safety-logo";
import { ScreenMockupContainer } from "@/components/marketing/screen-mockup-container";

// Import icons for the features section
import { 
    CheckCircle, 
    Send01, 
    Shield01 
} from "@untitledui/icons";

export default function FeaturesPage() {
    return (
        <div className="flex min-h-screen flex-col bg-primary">
            {/* Header Navigation */}
            <Header 
                items={[
                    { label: "Features", href: "/features" },
                    { label: "Blog", href: "/blog" },
                    { label: "About", href: "/about" }
                ]}
            />

            {/* Hero Section */}
            <section className="relative flex flex-col-reverse items-center justify-start overflow-hidden w-full">
                {/* Content Container */}
                <div className="flex flex-col gap-16 items-center justify-start order-2 pb-0 pt-24 px-0 relative shrink-0 w-full">
                    <div className="flex flex-col gap-8 items-center justify-start max-w-[1280px] px-8 py-0 relative shrink-0 w-full">
                        <div className="flex flex-col gap-12 items-center justify-start p-0 relative shrink-0 w-full">
                            {/* Heading and Supporting Text */}
                            <div className="flex flex-col gap-6 items-center justify-start max-w-[768px] p-0 relative shrink-0 text-center w-full">
                                <div className="flex flex-col gap-3 items-center justify-center p-0 relative shrink-0 w-full">
                                    <Badge 
                                        type="pill-color" 
                                        color="brand" 
                                        size="md"
                                    >
                                        Features
                                    </Badge>
                                    <h1 className="font-semibold min-w-full not-italic relative shrink-0 text-primary text-[48px] text-center tracking-[-0.96px] leading-[60px]">
                                        Protect more people in less time.
                                    </h1>
                                </div>
                                
                                <p className="font-normal relative shrink-0 text-tertiary text-xl w-full leading-[30px]">
                                    Guided Safety unifies case management, mapping, and outreach to cut response cycles by up to 60%.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="bg-primary flex flex-col items-center justify-start overflow-clip px-0 py-24 relative shrink-0 w-full">
                {/* Feature 1: Simplify casework */}
                <div className="block md:flex md:flex-row gap-20 md:gap-24 md:items-center justify-start max-w-[1280px] px-4 md:px-8 py-0 mb-36 md:mb-48 relative shrink-0 w-full">
                    <div className="basis-0 flex flex-col gap-12 md:gap-8 grow items-start justify-start min-h-px min-w-px p-0 relative shrink-0 w-full">
                        <div className="flex flex-col gap-5 items-start justify-start p-0 relative shrink-0 w-full">
                            <FeaturedIcon 
                                size="lg" 
                                theme="light" 
                                color="brand"
                                icon={CheckCircle}
                                className="bg-utility-brand-50 dark:bg-brand-secondary"
                            />
                            <div className="flex flex-col gap-2 md:gap-4 items-start justify-start leading-[0] not-italic p-0 relative shrink-0 text-left w-full">
                                <h2 className="font-semibold relative shrink-0 text-primary text-[24px] md:text-[30px] w-full leading-[32px] md:leading-[38px]">
                                    Simplify casework
                                </h2>
                                <p className="font-normal relative shrink-0 text-tertiary text-md md:text-lg w-full leading-[24px] md:leading-[28px]">
                                    A live caseboard keeps every responder in sync—no spreadsheets, no guesswork.
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-4 md:gap-5 items-start justify-start pl-2 md:pl-4 pr-0 py-0 relative shrink-0 w-full">
                            <div className="flex flex-row gap-3 items-start justify-start p-0 relative shrink-0 w-full">
                                <div className="overflow-clip relative rounded-full shrink-0 size-7">
                                    <CheckCircle className="size-7 text-brand-600" />
                                </div>
                                <div className="basis-0 flex flex-col grow items-start justify-start min-h-px min-w-px pb-0 pt-0.5 px-0 relative shrink-0">
                                    <p className="font-normal leading-[0] not-italic relative shrink-0 text-tertiary text-md md:text-lg text-left w-full leading-[24px] md:leading-[28px]">
                                        Alerts case manager the moment help is requested.
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-row gap-3 items-start justify-start p-0 relative shrink-0 w-full">
                                <div className="overflow-clip relative rounded-full shrink-0 size-7">
                                    <CheckCircle className="size-7 text-brand-600" />
                                </div>
                                <div className="basis-0 flex flex-col grow items-start justify-start min-h-px min-w-px pb-0 pt-0.5 px-0 relative shrink-0">
                                    <p className="font-normal leading-[0] not-italic relative shrink-0 text-tertiary text-md md:text-lg text-left w-full leading-[24px] md:leading-[28px]">
                                        Live maps cluster victim locations for precise deployment.
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-row gap-3 items-start justify-start p-0 relative shrink-0 w-full">
                                <div className="overflow-clip relative rounded-full shrink-0 size-7">
                                    <CheckCircle className="size-7 text-brand-600" />
                                </div>
                                <div className="basis-0 flex flex-col grow items-start justify-start min-h-px min-w-px pb-0 pt-0.5 px-0 relative shrink-0">
                                    <p className="font-normal leading-[0] not-italic relative shrink-0 text-tertiary text-md md:text-lg text-left w-full leading-[24px] md:leading-[28px]">
                                        AI flags urgency and auto-assigns the right responder.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="hidden md:block basis-0 grow h-[200px] md:h-[400px] min-h-px min-w-px relative shrink-0 w-full">
                        <ScreenMockupContainer 
                            width={338}
                            height={226}
                            className="w-full h-full"
                            patternPosition="right"
                        />
                    </div>
                </div>

                {/* Feature 2: Instant outreach tools */}
                <div className="block md:flex md:flex-row gap-20 md:gap-24 md:items-center justify-start max-w-[1280px] px-4 md:px-8 py-0 mb-36 md:mb-48 relative shrink-0 w-full">
                    <div className="hidden md:block basis-0 grow h-[200px] md:h-[400px] min-h-px min-w-px relative shrink-0 w-full order-2 md:order-1">
                        <ScreenMockupContainer 
                            width={338}
                            height={226}
                            className="w-full h-full"
                            patternPosition="left"
                        />
                    </div>
                    <div className="basis-0 flex flex-col gap-12 md:gap-8 grow items-start justify-start min-h-px min-w-px p-0 relative shrink-0 w-full order-1 md:order-2">
                        <div className="flex flex-col gap-5 items-start justify-start p-0 relative shrink-0 w-full">
                            <FeaturedIcon 
                                size="lg" 
                                theme="light" 
                                color="brand"
                                icon={Send01}
                                className="bg-utility-brand-50 dark:bg-brand-secondary"
                            />
                            <div className="flex flex-col gap-2 md:gap-4 items-start justify-start leading-[0] not-italic p-0 relative shrink-0 text-left w-full">
                                <h2 className="font-semibold relative shrink-0 text-primary text-[24px] md:text-[30px] w-full leading-[32px] md:leading-[38px]">
                                    Instant outreach tools
                                </h2>
                                <p className="font-normal relative shrink-0 text-tertiary text-md md:text-lg w-full leading-[24px] md:leading-[28px]">
                                    Built‑in channels shrink the gap between detection and assistance.
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-4 md:gap-5 items-start justify-start pl-2 md:pl-4 pr-0 py-0 relative shrink-0 w-full">
                            <div className="flex flex-row gap-3 items-start justify-start p-0 relative shrink-0 w-full">
                                <div className="overflow-clip relative rounded-full shrink-0 size-7">
                                    <CheckCircle className="size-7 text-brand-600" />
                                </div>
                                <div className="basis-0 flex flex-col grow items-start justify-start min-h-px min-w-px pb-0 pt-0.5 px-0 relative shrink-0">
                                    <p className="font-normal leading-[0] not-italic relative shrink-0 text-tertiary text-md md:text-lg text-left w-full leading-[24px] md:leading-[28px]">
                                        Victims send a short text code to ask for help quietly.
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-row gap-3 items-start justify-start p-0 relative shrink-0 w-full">
                                <div className="overflow-clip relative rounded-full shrink-0 size-7">
                                    <CheckCircle className="size-7 text-brand-600" />
                                </div>
                                <div className="basis-0 flex flex-col grow items-start justify-start min-h-px min-w-px pb-0 pt-0.5 px-0 relative shrink-0">
                                    <p className="font-normal leading-[0] not-italic relative shrink-0 text-tertiary text-md md:text-lg text-left w-full leading-[24px] md:leading-[28px]">
                                        Pinpoints the victim's location the moment they reach out.
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-row gap-3 items-start justify-start p-0 relative shrink-0 w-full">
                                <div className="overflow-clip relative rounded-full shrink-0 size-7">
                                    <CheckCircle className="size-7 text-brand-600" />
                                </div>
                                <div className="basis-0 flex flex-col grow items-start justify-start min-h-px min-w-px pb-0 pt-0.5 px-0 relative shrink-0">
                                    <p className="font-normal leading-[0] not-italic relative shrink-0 text-tertiary text-md md:text-lg text-left w-full leading-[24px] md:leading-[28px]">
                                        Connects victims to the right responder in seconds.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Feature 3: Security that never slows you */}
                <div className="block md:flex md:flex-row gap-20 md:gap-24 md:items-center justify-start max-w-[1280px] px-4 md:px-8 py-0 relative shrink-0 w-full">
                    <div className="basis-0 flex flex-col gap-12 md:gap-8 grow items-start justify-start min-h-px min-w-px p-0 relative shrink-0 w-full">
                        <div className="flex flex-col gap-5 items-start justify-start p-0 relative shrink-0 w-full">
                            <FeaturedIcon 
                                size="lg" 
                                theme="light" 
                                color="brand"
                                icon={Shield01}
                                className="bg-utility-brand-50 dark:bg-brand-secondary"
                            />
                            <div className="flex flex-col gap-2 md:gap-4 items-start justify-start leading-[0] not-italic p-0 relative shrink-0 text-left w-full">
                                <h2 className="font-semibold relative shrink-0 text-primary text-[24px] md:text-[30px] w-full leading-[32px] md:leading-[38px]">
                                    Security that never slows you
                                </h2>
                                <p className="font-normal relative shrink-0 text-tertiary text-md md:text-lg w-full leading-[24px] md:leading-[28px]">
                                    Zero‑Trust guardrails keep data safe while you move at mission pace.
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-4 md:gap-5 items-start justify-start pl-2 md:pl-4 pr-0 py-0 relative shrink-0 w-full">
                            <div className="flex flex-row gap-3 items-start justify-start p-0 relative shrink-0 w-full">
                                <div className="overflow-clip relative rounded-full shrink-0 size-7">
                                    <CheckCircle className="size-7 text-brand-600" />
                                </div>
                                <div className="basis-0 flex flex-col grow items-start justify-start min-h-px min-w-px pb-0 pt-0.5 px-0 relative shrink-0">
                                    <p className="font-normal leading-[0] not-italic relative shrink-0 text-tertiary text-md md:text-lg text-left w-full leading-[24px] md:leading-[28px]">
                                        Securely isolates and locks each victim's data
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-row gap-3 items-start justify-start p-0 relative shrink-0 w-full">
                                <div className="overflow-clip relative rounded-full shrink-0 size-7">
                                    <CheckCircle className="size-7 text-brand-600" />
                                </div>
                                <div className="basis-0 flex flex-col grow items-start justify-start min-h-px min-w-px pb-0 pt-0.5 px-0 relative shrink-0">
                                    <p className="font-normal leading-[0] not-italic relative shrink-0 text-tertiary text-md md:text-lg text-left w-full leading-[24px] md:leading-[28px]">
                                        Only vetted responders can view case details
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-row gap-3 items-start justify-start p-0 relative shrink-0 w-full">
                                <div className="overflow-clip relative rounded-full shrink-0 size-7">
                                    <CheckCircle className="size-7 text-brand-600" />
                                </div>
                                <div className="basis-0 flex flex-col grow items-start justify-start min-h-px min-w-px pb-0 pt-0.5 px-0 relative shrink-0">
                                    <p className="font-normal leading-[0] not-italic relative shrink-0 text-tertiary text-md md:text-lg text-left w-full leading-[24px] md:leading-[28px]">
                                        Victims connect via web links—no downloads, no risk.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="hidden md:block basis-0 grow h-[200px] md:h-[400px] min-h-px min-w-px relative shrink-0 w-full">
                        <ScreenMockupContainer 
                            width={338}
                            height={226}
                            className="w-full h-full"
                            patternPosition="right"
                        />
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-primary flex flex-col gap-16 items-center justify-start px-0 pt-36 md:pt-48 pb-24 relative shrink-0 w-full">
                <div className="flex flex-col gap-8 items-start justify-start max-w-[1280px] px-8 py-0 relative shrink-0 w-full">
                    <div className="flex flex-col gap-8 items-center justify-start p-0 relative shrink-0 w-full">
                        <div className="flex flex-col gap-5 items-center justify-start leading-[0] max-w-[768px] not-italic p-0 relative shrink-0 text-center w-full">
                            <h2 className="font-semibold relative shrink-0 text-primary text-[36px] tracking-[-0.72px] w-full leading-[44px]">
                                Lead every response with confidence.
                            </h2>
                            <p className="font-normal relative shrink-0 text-tertiary text-xl w-full leading-[30px]">
                                Experience faster, smarter case management that powers real-world impact.
                            </p>
                        </div>

                        <div className="flex flex-row gap-3 items-start justify-start p-0 relative shrink-0">
                            <Button
                                color="secondary" 
                                size="lg"
                                iconTrailing={ArrowRight}
                            >
                                Schedule a demo
                            </Button>
                            <Button
                                color="primary" 
                                size="lg"
                                iconTrailing={ArrowRight}
                                href="/about#contact"
                            >
                                Contact us
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-secondary px-8 py-16">
                <div className="mx-auto max-w-7xl">
                    <div className="flex flex-col gap-12">
                        <div className="flex flex-wrap items-start justify-between gap-12">
                            <div className="flex flex-col gap-8 min-w-[560px]">
                                <div className="flex items-center gap-2">
                                    <a href="/" className="hover:opacity-80 transition-opacity">
                                        <GuidedReachLogo className="h-8" />
                                    </a>
                                </div>
                                
                                <div className="flex items-center gap-8">
                                    <Button color="link-gray" size="lg" href="/features">Features</Button>
                                    <Button color="link-gray" size="lg" href="/blog">Blog</Button>
                                    <Button color="link-gray" size="lg" href="/about">About</Button>
                                    <Button color="link-gray" size="lg" href="/help">Help</Button>
                                    <Button color="link-gray" size="lg" href="/privacy">Privacy</Button>
                                </div>
                            </div>
                            
                            <div className="flex flex-col gap-4 w-[360px]">
                                <div className="text-sm font-semibold text-primary">
                                    Stay up to date
                                </div>
                                <div className="flex gap-4">
                                    <input 
                                        type="email" 
                                        placeholder="Enter your email"
                                        className="flex-1 px-3.5 py-2.5 rounded-lg border border-primary bg-primary text-md text-tertiary placeholder:text-placeholder"
                                    />
                                    <Button color="primary" size="lg">
                                        Subscribe
                                    </Button>
                                </div>
                            </div>
                        </div>
                        
                        <div className="flex items-center justify-between pt-8 border-t border-secondary">
                            <div className="text-md text-quaternary">
                                © 2025 Guided Safety. All rights reserved.
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
} 