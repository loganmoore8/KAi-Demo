"use client";

import { Header } from "@/components/marketing/header-navigation/components/header";
import { Button } from "@/components/base/buttons/button";
import { Badge } from "@/components/base/badges/badges";
import { Settings01, Zap, BarChart03, ArrowRight } from "@untitledui/icons";

// Check mark icon from Figma
const img1 = "http://localhost:3845/assets/7644c2c278d637528f71f05a1b65c8eba584ca5a.svg";
const img6 = "http://localhost:3845/assets/31b2d169a2fa0ea3b85312054ef82d7fbd1269a6.svg";

export default function HowItWorksPage() {
    return (
        <div className="flex min-h-screen flex-col bg-primary">
            <Header
                items={[
                    { label: "How it works", href: "/how-it-works" },
                    { label: "Pricing", href: "/pricing" },
                ]}
            />

            {/* Features Section from Figma */}
            <section className="bg-primary px-0 py-24">
                <div className="mx-auto max-w-container px-8">
                    <div className="flex flex-col gap-16 items-center justify-start">
                        {/* Header */}
                        <div className="flex flex-col gap-8 items-center justify-start max-w-[768px] text-center">
                        <div className="flex flex-col gap-5 items-center justify-start">
                            <Badge type="pill-color" color="brand" size="md">Features</Badge>
                            <h1 className="text-display-md font-semibold text-primary tracking-tight">
                                AI agents that scale your contact center
                            </h1>
                        </div>
                        <p className="text-xl text-tertiary font-normal">
                            Guided Bot automates calls and chats so you resolve issues faster, cut costs, and keep customers satisfied. Trusted by enterprises running on AWS.
                        </p>
                        </div>

                        {/* Feature 1: Smarter automation, better experiences */}
                        <div className="flex gap-24 items-center justify-start max-w-container w-full">
                            <div className="flex-1 flex flex-col gap-8 items-start justify-start">
                                <div className="flex flex-col gap-5 items-start justify-start">
                                    <div className="bg-brand-secondary overflow-clip relative rounded-full w-12 h-12 flex items-center justify-center">
                                        <Settings01 className="w-6 h-6 text-brand-primary" />
                                    </div>
                                    <div className="flex flex-col gap-4 items-start justify-start">
                                        <h2 className="text-display-sm font-semibold text-primary">
                                            Smarter automation, better experiences
                                        </h2>
                                        <p className="text-lg text-tertiary font-normal">
                                            AI voice and chat agents built for contact centers. Resolve issues faster, lower costs, and free up human agents.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-5 items-start justify-start pl-4">
                                    <div className="flex gap-3 items-start justify-start">
                                        <div className="bg-[#fef6ee] overflow-clip relative rounded-[9999px] shrink-0 size-[28px]">
                                            <div className="absolute inset-[29.65%_23.56%_26.58%_26.46%]">
                                                <img alt="check-circle" className="block max-w-none size-full" src={img6}/>
                                            </div>
                                        </div>
                                        <p className="text-lg text-tertiary font-normal">
                                            Automate high-volume calls and chats with natural language
                                        </p>
                                    </div>
                                    <div className="flex gap-3 items-start justify-start">
                                        <div className="bg-[#fef6ee] overflow-clip relative rounded-[9999px] shrink-0 size-[28px]">
                                            <div className="absolute inset-[29.65%_23.56%_26.58%_26.46%]">
                                                <img alt="check-circle" className="block max-w-none size-full" src={img6}/>
                                            </div>
                                        </div>
                                        <p className="text-lg text-tertiary font-normal">
                                            Route complex issues to the right human instantly
                                        </p>
                                    </div>
                                    <div className="flex gap-3 items-start justify-start">
                                        <div className="bg-[#fef6ee] overflow-clip relative rounded-[9999px] shrink-0 size-[28px]">
                                            <div className="absolute inset-[29.65%_23.56%_26.58%_26.46%]">
                                                <img alt="check-circle" className="block max-w-none size-full" src={img6}/>
                                            </div>
                                        </div>
                                        <p className="text-lg text-tertiary font-normal">
                                            Reduce wait times without sacrificing quality
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex-1 h-[512px] relative">
                                <div className="absolute bg-tertiary bottom-0 left-0 overflow-clip top-0 w-full rounded-lg">
                                </div>
                            </div>
                        </div>

                        {/* Feature 2: Instant answers, 24/7 */}
                        <div className="flex gap-24 items-center justify-start max-w-container w-full">
                            <div className="flex-1 h-[512px] relative">
                                <div className="absolute bg-tertiary bottom-0 overflow-clip right-0 top-0 w-full rounded-lg">
                                </div>
                            </div>
                            <div className="flex-1 flex flex-col gap-8 items-start justify-start">
                                <div className="flex flex-col gap-5 items-start justify-start">
                                    <div className="bg-blue-50 overflow-clip relative rounded-full w-12 h-12 flex items-center justify-center">
                                        <Zap className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <div className="flex flex-col gap-4 items-start justify-start">
                                        <h2 className="text-display-sm font-semibold text-primary">
                                            Instant answers, 24/7
                                        </h2>
                                        <p className="text-lg text-tertiary font-normal">
                                            Deliver real-time support without making customers wait. Guided Bot learns from your data and responds in seconds.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-5 items-start justify-start pl-4">
                                    <div className="flex gap-3 items-start justify-start">
                                        <div className="bg-[#fef6ee] overflow-clip relative rounded-[9999px] shrink-0 size-[28px]">
                                            <div className="absolute inset-[29.65%_23.56%_26.58%_26.46%]">
                                                <img alt="check-circle" className="block max-w-none size-full" src={img6}/>
                                            </div>
                                        </div>
                                        <p className="text-lg text-tertiary font-normal">
                                            Answer FAQs instantly with AI-driven accuracy
                                        </p>
                                    </div>
                                    <div className="flex gap-3 items-start justify-start">
                                        <div className="bg-[#fef6ee] overflow-clip relative rounded-[9999px] shrink-0 size-[28px]">
                                            <div className="absolute inset-[29.65%_23.56%_26.58%_26.46%]">
                                                <img alt="check-circle" className="block max-w-none size-full" src={img6}/>
                                            </div>
                                        </div>
                                        <p className="text-lg text-tertiary font-normal">
                                            Escalate only when human judgment is required
                                        </p>
                                    </div>
                                    <div className="flex gap-3 items-start justify-start">
                                        <div className="bg-[#fef6ee] overflow-clip relative rounded-[9999px] shrink-0 size-[28px]">
                                            <div className="absolute inset-[29.65%_23.56%_26.58%_26.46%]">
                                                <img alt="check-circle" className="block max-w-none size-full" src={img6}/>
                                            </div>
                                        </div>
                                        <p className="text-lg text-tertiary font-normal">
                                            Blend automation with empathy for a human-like feel
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Feature 3: Reports that drive performance */}
                        <div className="flex gap-24 items-center justify-start max-w-container w-full">
                            <div className="flex-1 flex flex-col gap-8 items-start justify-start">
                                <div className="flex flex-col gap-5 items-start justify-start">
                                    <div className="bg-green-50 overflow-clip relative rounded-full w-12 h-12 flex items-center justify-center">
                                        <BarChart03 className="w-6 h-6 text-green-600" />
                                    </div>
                                    <div className="flex flex-col gap-4 items-start justify-start">
                                        <h2 className="text-display-sm font-semibold text-primary">
                                            Reports that drive performance
                                        </h2>
                                        <p className="text-lg text-tertiary font-normal">
                                            See what's working—and what's not—in one place. Track efficiency, cost savings, and customer satisfaction.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-5 items-start justify-start pl-4">
                                    <div className="flex gap-3 items-start justify-start">
                                        <div className="bg-[#fef6ee] overflow-clip relative rounded-[9999px] shrink-0 size-[28px]">
                                            <div className="absolute inset-[29.65%_23.56%_26.58%_26.46%]">
                                                <img alt="check-circle" className="block max-w-none size-full" src={img6}/>
                                            </div>
                                        </div>
                                        <p className="text-lg text-tertiary font-normal">
                                            Monitor call resolution times and CSAT at a glance
                                        </p>
                                    </div>
                                    <div className="flex gap-3 items-start justify-start">
                                        <div className="bg-[#fef6ee] overflow-clip relative rounded-[9999px] shrink-0 size-[28px]">
                                            <div className="absolute inset-[29.65%_23.56%_26.58%_26.46%]">
                                                <img alt="check-circle" className="block max-w-none size-full" src={img6}/>
                                            </div>
                                        </div>
                                        <p className="text-lg text-tertiary font-normal">
                                            Schedule and share reports automatically
                                        </p>
                                    </div>
                                    <div className="flex gap-3 items-start justify-start">
                                        <div className="bg-[#fef6ee] overflow-clip relative rounded-[9999px] shrink-0 size-[28px]">
                                            <div className="absolute inset-[29.65%_23.56%_26.58%_26.46%]">
                                                <img alt="check-circle" className="block max-w-none size-full" src={img6}/>
                                            </div>
                                        </div>
                                        <p className="text-lg text-tertiary font-normal">
                                            Connect with AWS, Salesforce, Zendesk, and more
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex-1 h-[512px] relative">
                                <div className="absolute bg-tertiary bottom-0 left-0 overflow-clip top-0 w-full rounded-lg">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-primary flex flex-col gap-16 items-center justify-start overflow-hidden pb-0 pt-24 px-0 relative shrink-0 w-full">
                <div className="flex flex-col gap-8 items-start justify-start max-w-[1280px] px-8 py-0 relative shrink-0 w-full">
                    <div className="flex flex-col gap-8 items-center justify-start p-0 relative shrink-0 w-full">
                        <div className="flex flex-col gap-5 items-center justify-start leading-[0] max-w-[768px] not-italic p-0 relative shrink-0 text-center w-full">
                            <h2 className="font-semibold relative shrink-0 text-primary text-[36px] tracking-[-0.72px] w-full leading-[44px]">
                                Modernize your customer experience
                            </h2>
                            <p className="font-normal relative shrink-0 text-tertiary text-[20px] w-full leading-[30px]">
                                Experience faster, smarter case management that powers real-world impact.
                            </p>
                        </div>

                        <div className="flex flex-row gap-3 items-start justify-start p-0 relative shrink-0">
                            <Button
                                color="secondary" 
                                size="xl"
                                iconTrailing={ArrowRight}
                            >
                                Schedule a demo
                            </Button>
                            <Button
                                color="primary" 
                                size="xl"
                                iconTrailing={ArrowRight}
                                href="/about#contact"
                            >
                                Contact sales
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Spacer between CTA and Footer */}
            <div className="py-16"></div>

            {/* Footer - reuse site footer styles */}
            <footer className="bg-secondary px-8 py-16">
                <div className="mx-auto max-w-7xl">
                    <div className="flex flex-col gap-12">
                        <div className="flex flex-wrap items-start justify-between gap-12">
                            <div className="flex flex-col gap-8 min-w-[560px]">
                                <div className="flex items-center gap-2">
                                    <a href="/" className="hover:opacity-80 transition-opacity">
                                        {/* Logo from site foundations */}
                                        <span className="text-lg font-semibold text-primary">Guided Bot</span>
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
                                <div className="text-sm font-semibold text-primary">Stay up to date</div>
                                <div className="flex gap-4">
                                    <input
                                        type="email"
                                        placeholder="Enter your email"
                                        className="flex-1 px-3.5 py-2.5 rounded-lg border border-primary bg-primary text-md text-tertiary placeholder:text-placeholder"
                                    />
                                    <Button color="primary" size="lg">Subscribe</Button>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center justify-between pt-8 border-t border-secondary">
                            <div className="text-md text-quaternary">© 2025 Guided Reach. All rights reserved.</div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
