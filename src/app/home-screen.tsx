"use client";

import { ArrowRight, PlayCircle } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { BadgeWithDot } from "@/components/base/badges/badges";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icons";
import { Header } from "@/components/marketing/header-navigation/components/header";
import { GuidedReachLogo } from "@/components/foundations/logo/guided-safety-logo";
import { ScreenMockup } from "@/components/marketing/screen-mockup";
import { GridCheck } from "@/components/shared-assets/background-patterns/grid-check";
import { VideoModal } from "@/components/application/modals/video-modal";
import { useEffect, useMemo, useState, useRef } from "react";

// Import icons for the features section
import { 
    Briefcase01, 
    Users01, 
    AlarmClock, 
    NotificationMessage, 
    Database01, 
    Lock02 
} from "@untitledui/icons";

export const HomeScreen = () => {
    const rotatingWords = ["smarter", "faster", "safer"] as const;
    const [currentIndex, setCurrentIndex] = useState(0);
    const [underlineProgress, setUnderlineProgress] = useState(0);
    const [wordWidth, setWordWidth] = useState(0);
    const wordRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        // Measure the current word width
        if (wordRef.current) {
            setWordWidth(wordRef.current.offsetWidth);
        }
    }, [currentIndex]);

    useEffect(() => {
        let animationId: number;
        let startTime: number;
        const duration = 3500; // 3.5 seconds per word

        const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime;
            const elapsed = currentTime - startTime;
            const progress = Math.min((elapsed / duration) * 100, 100);
            
            setUnderlineProgress(progress);
            
            if (progress >= 100) {
                // Move to next word
                setCurrentIndex((i) => (i + 1) % rotatingWords.length);
                setUnderlineProgress(0);
                startTime = currentTime;
            }
            
            animationId = requestAnimationFrame(animate);
        };

        animationId = requestAnimationFrame(animate);

        return () => {
            if (animationId) {
                cancelAnimationFrame(animationId);
            }
        };
    }, [rotatingWords.length]);
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
                {/* Background Pattern */}
                <div className="absolute h-[1440px] left-1/2 top-0 -translate-x-1/2 w-[1920px] overflow-hidden">
                    <div className="absolute left-1/2 size-[1440px] top-0 -translate-x-1/2">
                        <div className="absolute left-1/2 size-[1440px] top-0 -translate-x-1/2 opacity-25 dark:opacity-5">
                            <GridCheck size="md" className="w-full h-full text-gray-400 dark:text-gray-700" />
                        </div>
                    </div>
                </div>

                {/* Content Container */}
                <div className="flex flex-col gap-16 items-center justify-start order-2 pb-0 pt-24 px-0 relative shrink-0 w-full">
                    <div className="flex flex-col gap-8 items-center justify-start max-w-[1280px] px-8 py-0 relative shrink-0 w-full">
                        <div className="flex flex-col gap-12 items-center justify-start p-0 relative shrink-0 w-full">
                            {/* Heading and Supporting Text */}
                            <div className="flex flex-col gap-6 items-center justify-start max-w-[1024px] p-0 relative shrink-0 w-full">
                                <div className="flex flex-col gap-4 items-center justify-start p-0 relative shrink-0 w-full">
                                    <h1 className="font-semibold min-w-full not-italic relative shrink-0 text-primary text-[60px] text-center tracking-[-1.2px] leading-[72px]">
                                        <span className="inline">Resolve cases</span>{" "}
                                        <span className="inline relative w-32">
                                            <span className="invisible">smarter</span>
                                            <span className="absolute inset-0 flex items-center justify-start">
                                                {rotatingWords[currentIndex]}
                                            </span>
                                            <span 
                                                className="absolute bottom-0 left-0 h-1.5 bg-orange-500 rounded-sm z-10"
                                                style={{ 
                                                    width: `${(wordWidth * underlineProgress) / 100}px`,
                                                    transform: 'translateY(4px)'
                                                }}
                                            />
                                        </span>
                                        {/* Hidden measurement element */}
                                        <span ref={wordRef} className="absolute -left-[9999px] text-[60px] font-semibold tracking-[-1.2px] leading-[72px]">
                                            {rotatingWords[currentIndex]}
                                        </span>
                                    </h1>
                                </div>
                                
                                <p className="font-normal max-w-[768px] not-italic relative shrink-0 text-tertiary text-[20px] text-center w-full leading-[30px]">
                                    One place for your team to manage cases, track response times, and stay mission-ready when every second counts.
                                </p>
                            </div>
                            
                            {/* Actions */}
                            <div className="flex flex-row gap-3 items-start justify-start p-0 relative shrink-0">
                                                                <VideoModal 
                                    videoUrl=""
                                    title="Guided Safety Product Demo"
                                >
                                    <div className="inline-flex items-center gap-1.5 rounded-lg px-4 py-2.5 text-md font-semibold bg-primary text-secondary shadow-xs-skeumorphic ring-1 ring-primary ring-inset hover:bg-primary_hover hover:text-secondary_hover cursor-pointer">
                                        <PlayCircle className="size-5" />
                                        Demo
                                    </div>
                                </VideoModal>
                                <Button 
                                    color="primary" 
                                    size="lg"
                                    href="/about#contact"
                                    iconTrailing={ArrowRight}
                                >
                                    Contact sales
                                </Button>
                            </div>
                        </div>
                    </div>
                    
                    {/* Screen Mockup Container */}
                    <div className="flex flex-col gap-8 items-center justify-start max-w-[1280px] px-8 py-0 relative shrink-0 w-full">
                        <div className="h-[496px] relative shrink-0 w-full">
                            <div className="absolute bg-primary box-border content-stretch flex flex-col items-start justify-start left-1/2 p-[4px] rounded-[32px] top-0 -translate-x-1/2">
                                <ScreenMockup 
                                    width={1200}
                                    height={800}
                                    className="shadow-2xl"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section Divider */}
            <div className="mx-auto w-full max-w-7xl px-8">
                <hr className="border-secondary" />
            </div>

            {/* Metrics Section */}
            <section className="bg-secondary px-8 py-24">
                <div className="mx-auto max-w-7xl">
                    <div className="flex flex-col items-center gap-16">
                        <div className="text-center">
                            <h2 className="text-display-md font-semibold text-primary tracking-tight mb-5">
                                Built for critical moments
                            </h2>
                            <p className="text-xl text-tertiary max-w-2xl">
                                Always on, always secure, always fast — because your team can't afford anything less.
                            </p>
                        </div>
                        
                        <div className="bg-primary rounded-2xl p-16 w-full">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                <div className="text-center">
                                    <div className="text-display-xl font-semibold text-brand-solid mb-4">
                                        &lt;5 min
                                    </div>
                                    <div className="text-lg font-semibold text-brand-secondary">
                                        Avg. response time
                                    </div>
                                </div>
                                <div className="text-center">
                                    <div className="text-display-xl font-semibold text-brand-solid mb-4">
                                        100%
                                    </div>
                                    <div className="text-lg font-semibold text-brand-secondary">
                                        Data security
                                    </div>
                                </div>
                                <div className="text-center">
                                    <div className="text-display-xl font-semibold text-brand-solid mb-4">
                                        24/7
                                    </div>
                                    <div className="text-lg font-semibold text-brand-secondary">
                                        Round-the-clock support
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="bg-primary px-8 py-24">
                <div className="mx-auto max-w-7xl">
                    <div className="flex flex-col items-center gap-16">
                        <div className="text-center">
                            <div className="text-[#e04f16] text-md mb-3">
                                Features
                            </div>
                            <h2 className="text-display-md font-semibold text-primary tracking-tight mb-5">
                                Everything impact response teams need,<br />
                                All in One Place.
                            </h2>
                            <p className="text-xl text-tertiary max-w-2xl">
                                Guided Safety brings together secure case management, real-time collaboration, and performance tracking — so your team can focus on what matters most.
                            </p>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
                            <div className="flex flex-col items-center text-center gap-4">
                                <FeaturedIcon 
                                    size="lg" 
                                    theme="modern" 
                                    color="gray"
                                    icon={Briefcase01}
                                />
                                <div>
                                    <h3 className="text-lg font-semibold text-primary mb-1">
                                        Secure case management
                                    </h3>
                                    <p className="text-md text-tertiary">
                                        Handle sensitive cases with end-to-end encryption, role-based access, and full audit trails.
                                    </p>
                                </div>
                </div>

                            <div className="flex flex-col items-center text-center gap-4">
                                <FeaturedIcon 
                                    size="lg" 
                                    theme="modern" 
                                    color="gray"
                                    icon={Users01}
                                />
                                <div>
                                    <h3 className="text-lg font-semibold text-primary mb-1">
                                        Real-time collaboration
                                    </h3>
                                    <p className="text-md text-tertiary">
                                        Keep your team connected with live updates, task assignments, and built-in messaging.
                                    </p>
                                </div>
                            </div>
                            
                            <div className="flex flex-col items-center text-center gap-4">
                                <FeaturedIcon 
                                    size="lg" 
                                    theme="modern" 
                                    color="gray"
                                    icon={AlarmClock}
                                />
                                <div>
                                    <h3 className="text-lg font-semibold text-primary mb-1">
                                        Response time tracking
                                    </h3>
                                    <p className="text-md text-tertiary">
                                        Monitor every response, track SLAs, and optimize team performance with actionable data.
                                    </p>
                                </div>
                            </div>
                            
                            <div className="flex flex-col items-center text-center gap-4">
                                <FeaturedIcon 
                                    size="lg" 
                                    theme="modern" 
                                    color="gray"
                                    icon={NotificationMessage}
                                />
                                <div>
                                    <h3 className="text-lg font-semibold text-primary mb-1">
                                        Smart notifications
                                    </h3>
                                    <p className="text-md text-tertiary">
                                        Stay on top of every case with intelligent alerts, custom notifications, and follow-up reminders.
                                    </p>
                                </div>
                            </div>
                            
                            <div className="flex flex-col items-center text-center gap-4">
                                <FeaturedIcon 
                                    size="lg" 
                                    theme="modern" 
                                    color="gray"
                                    icon={Database01}
                                />
                                <div>
                                    <h3 className="text-lg font-semibold text-primary mb-1">
                                        Performance analytics
                                    </h3>
                                    <p className="text-md text-tertiary">
                                        Turn data into insight with response metrics and performance dashboards built for impact teams.
                                    </p>
                                </div>
                            </div>
                            
                            <div className="flex flex-col items-center text-center gap-4">
                                <FeaturedIcon 
                                    size="lg" 
                                    theme="modern" 
                                    color="gray"
                                    icon={Lock02}
                                />
                                <div>
                                    <h3 className="text-lg font-semibold text-primary mb-1">
                                        24/7 Support & Reliability
                                    </h3>
                                    <p className="text-md text-tertiary">
                                        Round-the-clock support, guaranteed data security, and a platform your team can trust.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonial Section */}
            <section className="bg-secondary px-8 py-24">
                <div className="mx-auto max-w-7xl">
                    <div className="flex flex-col items-center gap-10">
                        <div className="flex items-center gap-2 mb-8">
                            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                                <span className="text-lg font-semibold text-primary">GRS</span>
                            </div>
                            <div className="text-2xl font-semibold text-primary">SDTPC</div>
                        </div>

                        <blockquote className="text-display-lg font-medium text-primary text-center max-w-4xl leading-tight">
                            Guided Safety keeps our team aligned, secure, and ready to respond — we wouldn't operate without it.
                        </blockquote>
                        
                        <div className="flex flex-col items-center gap-4">
                            <div className="w-16 h-16 bg-tertiary rounded-full flex items-center justify-center">
                                <span className="text-2xl">👤</span>
                            </div>
                            <div className="text-center">
                                <div className="text-lg font-semibold text-primary">
                                    John Doe
                                </div>
                                <div className="text-md text-tertiary">
                                    Case Manager, SDTPC
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
                                Lead every response with confidence.
                            </h2>
                            <p className="font-normal relative shrink-0 text-tertiary text-[20px] w-full leading-[30px]">
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
                                Contact sales
                            </Button>
                        </div>
                    </div>
                </div>
                
                <div className="flex flex-col gap-8 items-start justify-start max-w-[1280px] px-8 py-0 relative shrink-0 w-full">
                    <div className="h-[400px] relative shrink-0 w-[1216px]">
                        <div className="absolute bg-primary box-border content-stretch flex flex-col items-start justify-start left-0 p-[4px] rounded-[32px] top-0">
                            <ScreenMockup 
                                width={1200}
                                height={400}
                                className="shadow-2xl"
                            />
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
};
