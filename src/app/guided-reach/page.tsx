"use client";

import { Header } from "@/components/marketing/header-navigation/components/header";
import { Button } from "@/components/base/buttons/button";
import { Avatar } from "@/components";
import { VideoModal } from "@/components/application/modals/video-modal";
import { ArrowRight, PlayCircle, Globe02, Tag03, GraduationHat02, MedicalCross, MessageChatCircle, Zap, ChartBreakoutSquare, MessageSmileCircle, Command, MessageHeartCircle, Users01, Lock02, Check, Settings01 } from "@untitledui/icons";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icons";
import { useState, useEffect, useRef } from "react";

export default function GuidedReachPage() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [scrollPosition, setScrollPosition] = useState(0);
    const [featuresActiveIndex, setFeaturesActiveIndex] = useState(0);
    const [isFeaturesSectionActive, setIsFeaturesSectionActive] = useState(false);
    const carouselRef = useRef<HTMLDivElement>(null);
    const featuresSectionRef = useRef<HTMLDivElement>(null);
    const lastWheelTime = useRef<number>(0);
    const lastScrollY = useRef<number>(0);

    // Social proof card data
    const socialProofCards = [
        { name: "Sarah", message: "I need to reschedule my appointment" },
        { name: "Michael", message: "Can you help me with my billing question?" },
        { name: "Emma", message: "I'd like to update my account information" },
        { name: "David", message: "What are your business hours?" }
    ];

    // Smooth continuous carousel animation
    useEffect(() => {
        const startTime = performance.now();
        const duration = 40000; // 40 seconds for full cycle (half the speed)
        const cardWidth = 368 + 24; // card width + gap
        
        const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = (elapsed % duration) / duration;
            const totalWidth = cardWidth * 4; // 4 cards
            const currentPosition = progress * totalWidth;
            setScrollPosition(currentPosition);
            requestAnimationFrame(animate);
        };
        
        requestAnimationFrame(animate);
    }, []);

    // Features section scroll hijacking effect
    useEffect(() => {
        const handleWheel = (e: WheelEvent) => {
            if (!featuresSectionRef.current) return;

            const rect = featuresSectionRef.current.getBoundingClientRect();
            const viewportHeight = window.innerHeight;
            const sectionCenter = rect.top + (rect.height / 2);
            const viewportCenter = viewportHeight / 2;
            const isCentered = Math.abs(sectionCenter - viewportCenter) < 100;
            
            if (!isCentered) return;

            e.preventDefault();
            e.stopPropagation();
            
            // Debounce rapid scroll events
            const now = Date.now();
            if (now - lastWheelTime.current < 150) {
                return; // Ignore events that are too close together
            }
            lastWheelTime.current = now;
            
            const delta = e.deltaY;
            const featuresCount = 4; // Number of features in the first section
            
            if (delta > 0) {
                // Scrolling down - move to next feature
                setFeaturesActiveIndex(prev => {
                    const nextIndex = prev + 1;
                    if (nextIndex >= featuresCount) {
                        // Reached the end, allow one more scroll to continue
                        setTimeout(() => {
                            window.scrollBy(0, 100);
                        }, 50);
                        return prev;
                    }
                    return nextIndex;
                });
            } else {
                // Scrolling up - move to previous feature
                setFeaturesActiveIndex(prev => {
                    const prevIndex = prev - 1;
                    if (prevIndex < 0) {
                        // At the beginning, allow one more scroll to continue
                        setTimeout(() => {
                            window.scrollBy(0, -100);
                        }, 50);
                        return prev;
                    }
                    return prevIndex;
                });
            }
        };

        const handleScroll = () => {
            if (!featuresSectionRef.current) return;

            const rect = featuresSectionRef.current.getBoundingClientRect();
            const viewportHeight = window.innerHeight;
            const sectionCenter = rect.top + (rect.height / 2);
            const viewportCenter = viewportHeight / 2;
            const isCentered = Math.abs(sectionCenter - viewportCenter) < 100;
            
            const currentScrollY = window.scrollY;
            const scrollDirection = currentScrollY > lastScrollY.current ? 'down' : 'up';
            lastScrollY.current = currentScrollY;
            
            if (isCentered && !isFeaturesSectionActive) {
                setIsFeaturesSectionActive(true);
                // Set appropriate starting index based on scroll direction
                if (scrollDirection === 'up') {
                    setFeaturesActiveIndex(3); // Start from the last feature when scrolling up
                } else {
                    setFeaturesActiveIndex(0); // Start from the first feature when scrolling down
                }
            } else if (!isCentered && isFeaturesSectionActive) {
                setIsFeaturesSectionActive(false);
            }
        };

        document.addEventListener('wheel', handleWheel, { passive: false });
        window.addEventListener('scroll', handleScroll);
        
        return () => {
            document.removeEventListener('wheel', handleWheel);
            window.removeEventListener('scroll', handleScroll);
        };
    }, [isFeaturesSectionActive]);
    return (
        <div className="flex min-h-screen flex-col bg-primary">
            <Header />

			{/* Hero - replicated from Figma */}
			<section className="bg-[#fef6ee] w-full relative">
				<div className="mx-auto w-full max-w-[1280px] px-[32px] pt-[96px] pb-0 relative z-[1]">
					<div className="flex flex-col gap-[32px] items-center w-full">
						<div className="flex flex-col gap-[48px] items-center w-full">
							{/* Heading and supporting text */}
							<div className="flex flex-col gap-[24px] items-center max-w-[1024px] w-full">
								<div className="flex flex-col gap-[16px] items-center w-full">
									<div className="w-full text-center text-[#772917] text-[60px] leading-[72px] tracking-[-1.2px] font-semibold">
										High-performing remote teams.
										<br />
										The future of work.
									</div>
									<div className="w-full max-w-[768px] text-center text-[#ba3a14] text-[20px] leading-[30px]">
										Powerful, self-serve team engagement tools and analytics. Supercharge your managers & keep employees engaged from anywhere.
									</div>
								</div>
								{/* Actions */}
								<div className="flex gap-[12px] items-start">
									<button className="relative rounded-[8px] bg-[#e04f16]">
										<div className="flex items-center justify-center gap-[6px] overflow-clip px-[18px] py-[12px]">
											<span className="text-white text-[16px] leading-[24px] font-semibold">Talk to sales</span>
										</div>
										<div className="pointer-events-none absolute inset-0 shadow-[0px_0px_0px_1px_inset_rgba(10,13,18,0.18),0px_-2px_0px_0px_inset_rgba(10,13,18,0.05)]" />
										<div aria-hidden className="pointer-events-none absolute inset-0 rounded-[8px] border-2 border-[rgba(255,255,255,0.12)] shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)]" />
									</button>
								</div>
							</div>

						{/* Social proof chat items with edge fade */}
						<div className="w-full px-0 py-[38px] mb-[64px] relative">
							<div className="mx-auto max-w-[1280px] px-[32px] relative">
								<div className="flex w-full justify-center gap-[24px] relative overflow-hidden">
									{/* Gradient masks */}
									<div className="absolute inset-y-0 left-0 w-[15%] bg-gradient-to-r from-[#fef6ee] to-transparent pointer-events-none z-10" />
									<div className="absolute inset-y-0 right-0 w-[15%] bg-gradient-to-l from-[#fef6ee] to-transparent pointer-events-none z-10" />
									<div 
										ref={carouselRef}
										className="flex gap-[24px]"
										style={{ 
											transform: `translateX(-${scrollPosition}px)`,
											transition: 'none',
											willChange: 'transform'
										}}
									>
										{/* Duplicate cards for seamless infinite loop */}
										{[0,1,2,3,0,1,2,3,0,1,2,3].map((i, idx) => {
											const cardData = socialProofCards[i];
											return (
												<div 
													key={`${i}-${idx}`} 
													className="backdrop-blur backdrop-filter bg-[rgba(255,255,255,0.9)] box-border content-stretch flex gap-[4px] items-start p-[16px] relative rounded-[12px] w-[368px] h-[96px] flex-shrink-0 shadow-lg"
												>
													<div aria-hidden className="absolute border border-[rgba(0,0,0,0.08)] border-solid inset-[-1px] pointer-events-none rounded-[13px]" />
													<div className="basis-0 content-stretch flex gap-[12px] grow h-[64px] items-center min-h-px min-w-px relative shrink-0">
														<div className="pointer-events-none relative rounded-[9999px] shrink-0 size-[40px]">
															<Avatar size="md" />
														</div>
														<div className="basis-0 content-stretch flex flex-col gap-[4px] grow items-start min-h-px min-w-px relative shrink-0">
															<div className="content-stretch flex flex-col gap-[2px] items-start relative shrink-0 w-full">
																<div className="font-['Inter:Medium',_sans-serif] font-medium leading-[0] not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#535862] text-[14px] text-nowrap w-full">
																	<p className="[white-space-collapse:collapse] leading-[20px] overflow-ellipsis overflow-hidden">{cardData.name}</p>
																</div>
																<div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full">
																	<div className="font-['Inter:Regular',_sans-serif] font-normal leading-[0] not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#181d27] text-[14px] text-nowrap">
																		<p className="leading-[20px] overflow-ellipsis overflow-hidden whitespace-pre">{cardData.message}</p>
																	</div>
																</div>
															</div>
														</div>
													</div>
													
													{/* SOLVED WITH KAi Badge */}
													<div className="absolute bottom-[-8px] right-[-8px] bg-black rounded-full px-3 py-1.5 flex items-center gap-1.5 shadow-lg z-10">
														<div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
															<Check className="w-2.5 h-2.5 text-white" />
														</div>
														<span className="text-white text-xs font-medium whitespace-nowrap">
															SOLVED WITH KAi
														</span>
													</div>
												</div>
											);
										})}
									</div>
								</div>
							</div>
						</div>
					</div>
					</div>
					{/* Background pattern stripe below hero (absolute, full-bleed) */}
					<div className="pointer-events-none absolute inset-x-0 bottom-0 h-[64px] z-[-1]" aria-hidden>
						<div className="absolute top-0 bottom-[-571.54%] left-[-33.33%] right-[-33.33%]">
							<img src="/misc/Background%20pattern.svg" alt="pattern" className="block max-w-none w-full h-full" />
						</div>
					</div>
                            </div>
			</section>

			{/* Video Section - exactly as shown in Figma */}
			<section className="box-border flex flex-col items-center px-0 py-0 relative shrink-0 w-full z-10">
				<div className="box-border flex flex-col items-start max-w-[1280px] px-[32px] py-0 relative shrink-0 w-full">
					<div className="flex flex-col items-center relative shrink-0 w-full">
						<button className="aspect-[560/315] cursor-pointer max-h-[540px] max-w-[960px] relative rounded-[12px] shrink-0 w-full">
							<img 
								alt="" 
								className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[12px] size-full" 
								src="/images/mockup-placeholder.svg" 
							/>
							<div className="aspect-[560/315] overflow-clip relative size-full">
								<div className="absolute bg-gradient-to-b bottom-0 box-border content-stretch flex flex-col from-[rgba(0,0,0,0)] items-start left-0 pb-[24px] pt-[48px] px-[32px] right-0 to-[rgba(0,0,0,0.3)]">
									{/* Video controls overlay */}
                            </div>
                        </div>
							<div aria-hidden className="absolute border-[0.5px] border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[12px] shadow-[0px_32px_64px_-12px_rgba(10,13,18,0.14),0px_5px_5px_-2.5px_rgba(10,13,18,0.04)]" />
						</button>
                    </div>
                </div>
            </section>


            {/* Features with phone mockup */}
            <section ref={featuresSectionRef} className="bg-primary px-0 pt-48 pb-24">
                <div className="mx-auto max-w-container px-8">
                    <div className="flex flex-col max-w-[768px]">
                        <div className="flex flex-col gap-2 md:gap-3">
                            <h2 className="text-display-md font-semibold text-primary tracking-tight">Voice automation that customers love</h2>
                        </div>
                        <p className="text-xl text-tertiary mt-3 md:mt-4">
                            Human-like calls with memory, live knowledge sync, and context-rich handoffs—on your stack, no rip-and-replace.
                        </p>
                    </div>

                    <div className="mt-16 grid grid-cols-1 gap-16 md:grid-cols-2 md:items-center md:min-h-[560px]">
                        <div className="flex flex-col max-w-[560px]">
                            <div className={`pl-6 pr-0 py-4 border-l-4 ${featuresActiveIndex === 0 ? "border-brand" : "border-tertiary"} transition-colors duration-200 ease-out`}>
                                <div className="flex flex-col gap-1">
                                    <div className="text-xl font-semibold text-primary">Conversations that feel human</div>
                                    <div className="text-md text-tertiary">Natural speech, interruptions, memory, and guardrails. No scripts.</div>
                                </div>
                                <div className={`transition-all duration-200 ease-out ${featuresActiveIndex === 0 ? "mt-2 opacity-100 translate-y-0" : "mt-0 h-0 opacity-0 -translate-y-1 pointer-events-none overflow-hidden"}`}>
                                    <Button color="link-color" size="lg" iconTrailing={ArrowRight}>Learn more</Button>
                                </div>
                            </div>
                            <div className={`pl-6 pr-0 py-4 border-l-4 ${featuresActiveIndex === 1 ? "border-brand" : "border-tertiary"} transition-colors duration-200 ease-out`}>
                                <div className="flex flex-col gap-1">
                                    <div className="text-xl font-semibold text-primary">Trained on your knowledge</div>
                                    <div className="text-md text-tertiary">Sync help centers, docs, and past transcripts. Always up to date.</div>
                                </div>
                                <div className={`transition-all duration-200 ease-out ${featuresActiveIndex === 1 ? "mt-2 opacity-100 translate-y-0" : "mt-0 h-0 opacity-0 -translate-y-1 pointer-events-none overflow-hidden"}`}>
                                    <Button color="link-color" size="lg" iconTrailing={ArrowRight}>Learn more</Button>
                                </div>
                            </div>
                            <div className={`pl-6 pr-0 py-4 border-l-4 ${featuresActiveIndex === 2 ? "border-brand" : "border-tertiary"} transition-colors duration-200 ease-out`}>
                                <div className="flex flex-col gap-1">
                                    <div className="text-xl font-semibold text-primary">Smart handoffs</div>
                                    <div className="text-md text-tertiary">Warm-transfer to agents with full context and intent.</div>
                                </div>
                                <div className={`transition-all duration-200 ease-out ${featuresActiveIndex === 2 ? "mt-2 opacity-100 translate-y-0" : "mt-0 h-0 opacity-0 -translate-y-1 pointer-events-none overflow-hidden"}`}>
                                    <Button color="link-color" size="lg" iconTrailing={ArrowRight}>Learn more</Button>
                                </div>
                            </div>
                            <div className={`pl-6 pr-0 py-4 border-l-4 ${featuresActiveIndex === 3 ? "border-brand" : "border-tertiary"} transition-colors duration-200 ease-out`}>
                                <div className="flex flex-col gap-1">
                                    <div className="text-xl font-semibold text-primary">Works on your stack</div>
                                    <div className="text-md text-tertiary">Connect to any telephony or contact center platform. Keep your tools.</div>
                                </div>
                                <div className={`transition-all duration-200 ease-out ${featuresActiveIndex === 3 ? "mt-2 opacity-100 translate-y-0" : "mt-0 h-0 opacity-0 -translate-y-1 pointer-events-none overflow-hidden"}`}>
                                    <Button color="link-color" size="lg" iconTrailing={ArrowRight}>Learn more</Button>
                                </div>
                            </div>
                        </div>

                        <div className="relative ml-auto h-[560px] w-[560px]">
                            {/* Brand gradient square behind the phone */}
                            <div className="absolute inset-0 [background:linear-gradient(26.5deg,var(--color-brand-800),var(--color-brand-700))]" />
                            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 h-[400.206px] w-[429.398px]">
                                <img src="/images/conversations.png" alt="Conversations"
                                     className={`absolute inset-0 h-full w-full object-contain transition-opacity duration-300 ease-out ${featuresActiveIndex === 0 ? "opacity-100" : "opacity-0"}`} />
                                <img src="/images/knowledge.png" alt="Knowledge"
                                     className={`absolute inset-0 h-full w-full object-contain transition-opacity duration-300 ease-out ${featuresActiveIndex === 1 ? "opacity-100" : "opacity-0"}`} />
                                <img src="/images/handoff.png" alt="Handoff"
                                     className={`absolute inset-0 h-full w-full object-contain transition-opacity duration-300 ease-out ${featuresActiveIndex === 2 ? "opacity-100" : "opacity-0"}`} />
                                <img src="/images/stack.png" alt="Stack"
                                     className={`absolute inset-0 h-full w-full object-contain transition-opacity duration-300 ease-out ${featuresActiveIndex === 3 ? "opacity-100" : "opacity-0"}`} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Hear Kai in Action section */}
            <section className="bg-gradient-to-b from-white via-brand-50/80 to-white px-0 py-48">
                <div className="mx-auto max-w-[1280px] px-[32px] relative z-10">
                    <div className="flex flex-col gap-[32px] items-center">
                        <div className="flex flex-col gap-[20px] items-center max-w-[768px]">
                            <div className="flex flex-col gap-[12px] items-center w-full">
                                <h2 className="text-[36px] font-semibold text-[#181d27] tracking-[-0.72px] leading-[44px] text-center w-full">
                                    Hear Kai in action
                                </h2>
                            </div>
                            <p className="text-[20px] text-[#535862] leading-[30px] text-center w-full">
                                Experience flawless interactions across real-world scenarios.
                            </p>
                        </div>
                        
                        {/* Demo Cards */}
                        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
                            {/* Banking Mobile Experience Card */}
                            <div className="bg-secondary border border-secondary rounded-xl p-6 flex flex-col h-full">
                                <div className="aspect-video bg-gradient-to-br from-brand-50 to-brand-100 rounded-lg mb-4 flex items-center justify-center">
                                    <div className="size-14 rounded-full bg-brand-solid flex items-center justify-center shadow-sm">
                                        <svg className="size-7 text-white" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M8 5v14l11-7z"/>
                                        </svg>
                                    </div>
                                </div>
                                <h3 className="text-lg font-semibold text-primary mb-2">Banking mobile experience</h3>
                                <p className="text-md text-tertiary">
                                    See how Kai handles account inquiries, balance checks, and transaction support with natural conversation flow.
                                </p>
                            </div>

                            {/* Healthcare Appointments Card */}
                            <div className="bg-secondary border border-secondary rounded-xl p-6 flex flex-col h-full">
                                <div className="aspect-video bg-gradient-to-br from-brand-50 to-brand-100 rounded-lg mb-4 flex items-center justify-center">
                                    <div className="size-14 rounded-full bg-brand-solid flex items-center justify-center shadow-sm">
                                        <svg className="size-7 text-white" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M8 5v14l11-7z"/>
                                        </svg>
                                    </div>
                                </div>
                                <h3 className="text-lg font-semibold text-primary mb-2">Healthcare appointments</h3>
                                <p className="text-md text-tertiary">
                                    Experience seamless appointment scheduling, rescheduling, and patient support with intelligent handoffs.
                                </p>
                            </div>

                            {/* Customer Service Card */}
                            <div className="bg-secondary border border-secondary rounded-xl p-6 flex flex-col h-full">
                                <div className="aspect-video bg-gradient-to-br from-brand-50 to-brand-100 rounded-lg mb-4 flex items-center justify-center">
                                    <div className="size-14 rounded-full bg-brand-solid flex items-center justify-center shadow-sm">
                                        <svg className="size-7 text-white" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M8 5v14l11-7z"/>
                                        </svg>
                                    </div>
                                </div>
                                <h3 className="text-lg font-semibold text-primary mb-2">Customer service</h3>
                                <p className="text-md text-tertiary">
                                    Watch Kai resolve complex customer issues with context awareness and smooth agent handoffs.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section - "Designed to make a difference" */}
            <section className="bg-gradient-to-b from-white via-brand-50/80 to-white px-0 py-24">
                <div className="mx-auto max-w-[1280px] px-8">
                    <div className="flex flex-col gap-12 items-center mb-16">
                        <div className="flex flex-col gap-5 items-center max-w-[768px] text-center">
                            <h2 className="text-[36px] font-semibold text-primary tracking-[-0.72px] leading-[44px]">
                                Designed to make a difference
                            </h2>
                            <p className="text-[20px] text-tertiary leading-[30px]">
                                We pride ourselves on our ability to challenge core assumptions, unpick legacy behaviors, and streamline complex processes.
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-8 items-start">
                        <div className="flex flex-col gap-4 items-center min-w-[320px] flex-1">
                            <div className="bg-white relative rounded-[10px] size-12 border border-secondary shadow-sm">
                                <div className="absolute inset-3">
                                    <svg className="size-6 text-quaternary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                                    </svg>
                                </div>
                            </div>
                            <div className="flex flex-col gap-1 items-center text-center">
                                <h3 className="text-[20px] font-semibold text-primary leading-[30px]">
                                    Increase revenue
                                </h3>
                                <p className="text-[18px] text-tertiary leading-[28px]">
                                    Grow your revenue as satisfied customers become loyal advocates.
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col gap-4 items-center min-w-[320px] flex-1">
                            <div className="bg-white relative rounded-[10px] size-12 border border-secondary shadow-sm">
                                <div className="absolute inset-3">
                                    <svg className="size-6 text-quaternary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <polygon points="13,2 3,14 12,14 11,22 21,10 12,10 13,2"/>
                                    </svg>
                                </div>
                            </div>
                            <div className="flex flex-col gap-1 items-center text-center">
                                <h3 className="text-[20px] font-semibold text-primary leading-[30px]">
                                    Enhance customer satisfaction
                                </h3>
                                <p className="text-[18px] text-tertiary leading-[28px]">
                                    Feel the satisfaction of exceeding customer expectations consistently.
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col gap-4 items-center min-w-[320px] flex-1">
                            <div className="bg-white relative rounded-[10px] size-12 border border-secondary shadow-sm">
                                <div className="absolute inset-3">
                                    <svg className="size-6 text-quaternary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M3 3v18h18"/>
                                        <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3"/>
                                    </svg>
                                </div>
                            </div>
                            <div className="flex flex-col gap-1 items-center text-center">
                                <h3 className="text-[20px] font-semibold text-primary leading-[30px]">
                                    Reduce costs
                                </h3>
                                <p className="text-[18px] text-tertiary leading-[28px]">
                                    Imagine reallocating resources to what truly matters as routine tasks handle themselves.
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col gap-4 items-center min-w-[320px] flex-1">
                            <div className="bg-white relative rounded-[10px] size-12 border border-secondary shadow-sm">
                                <div className="absolute inset-3">
                                    <svg className="size-6 text-quaternary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <circle cx="12" cy="12" r="10"/>
                                        <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
                                        <line x1="9" y1="9" x2="9.01" y2="9"/>
                                        <line x1="15" y1="9" x2="15.01" y2="9"/>
                                    </svg>
                                </div>
                            </div>
                            <div className="flex flex-col gap-1 items-center text-center">
                                <h3 className="text-[20px] font-semibold text-primary leading-[30px]">
                                    Reduce response time
                                </h3>
                                <p className="text-[18px] text-tertiary leading-[28px]">
                                    Delight customers with instant solutions, enhancing their trust in your brand.
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col gap-4 items-center min-w-[320px] flex-1">
                            <div className="bg-white relative rounded-[10px] size-12 border border-secondary shadow-sm">
                                <div className="absolute inset-3">
                                    <svg className="size-6 text-quaternary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                                        <line x1="9" y1="9" x2="15" y2="15"/>
                                        <line x1="15" y1="9" x2="9" y2="15"/>
                                    </svg>
                                </div>
                            </div>
                            <div className="flex flex-col gap-1 items-center text-center">
                                <h3 className="text-[20px] font-semibold text-primary leading-[30px]">
                                    Scale seamlessly
                                </h3>
                                <p className="text-[18px] text-tertiary leading-[28px]">
                                    Grow confidently, knowing your business scales effortlessly with demand.
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col gap-4 items-center min-w-[320px] flex-1">
                            <div className="bg-white relative rounded-[10px] size-12 border border-secondary shadow-sm">
                                <div className="absolute inset-3">
                                    <svg className="size-6 text-quaternary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                                    </svg>
                                </div>
                            </div>
                            <div className="flex flex-col gap-1 items-center text-center">
                                <h3 className="text-[20px] font-semibold text-primary leading-[30px]">
                                    Build customer loyalty
                                </h3>
                                <p className="text-[18px] text-tertiary leading-[28px]">
                                    Experience the rewards of customers returning time and again.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why companies choose KAi section */}
            <section className="bg-primary px-0 py-24">
                <div className="mx-auto max-w-[1280px] px-[32px]">
                    <div className="flex flex-col gap-16 md:flex-row md:items-start">
                        {/* Left side - Heading and supporting text */}
                        <div className="flex flex-col gap-5 max-w-[360px]">
                            <div className="flex flex-col gap-5">
                                <h2 className="text-[48px] font-semibold text-primary tracking-[-0.96px] leading-[60px]">
                                    Why companies choose KAi
                                </h2>
                            </div>
                            <p className="text-[20px] text-tertiary leading-[30px]">
                                Powerful, self-serve product and growth analytics to help you convert, engage, and retain more users.
                            </p>
                            <div className="flex gap-3">
                                <Button
                                    color="secondary" 
                                    size="lg"
                                    iconTrailing={ArrowRight}
                                >
                                    Talk to sales
                                </Button>
                            </div>
                        </div>

                        {/* Right side - Features */}
                        <div className="flex flex-col gap-16 flex-1">
                            {/* Feature 1: Rely on experts */}
                            <div className="flex gap-4 items-start">
                                <div className="flex-shrink-0">
                                    <FeaturedIcon 
                                        size="lg" 
                                        theme="light" 
                                        color="gray"
                                        icon={Users01}
                                    />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <h3 className="text-[24px] font-semibold text-primary leading-[32px]">
                                        Rely on experts
                                    </h3>
                                    <p className="text-[16px] text-tertiary leading-[24px]">
                                        Work alongside our dedicated team who've helped over 500 brands embrace AI successfully.
                                    </p>
                                </div>
                            </div>

                            {/* Feature 2: Data security */}
                            <div className="flex gap-4 items-start">
                                <div className="flex-shrink-0">
                                    <FeaturedIcon 
                                        size="lg" 
                                        theme="light" 
                                        color="gray"
                                        icon={Lock02}
                                    />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <h3 className="text-[24px] font-semibold text-primary leading-[32px]">
                                        Data security
                                    </h3>
                                    <p className="text-[16px] text-tertiary leading-[24px]">
                                        Keep your data safe with strong, enterprise-level protection. KAi is GDPR and SOC 2 compliant. You can trust that your information is secure, giving you peace of mind.
                                    </p>
                                </div>
                            </div>

                            {/* Feature 3: Guaranteed accuracy */}
                            <div className="flex gap-4 items-start">
                                <div className="flex-shrink-0">
                                    <FeaturedIcon 
                                        size="lg" 
                                        theme="light" 
                                        color="gray"
                                        icon={Check}
                                    />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <h3 className="text-[24px] font-semibold text-primary leading-[32px]">
                                        Guaranteed accuracy
                                    </h3>
                                    <p className="text-[16px] text-tertiary leading-[24px]">
                                        Experience AI that speaks like a human but acts with the precision of your best agent, following your workflows exactly to deliver accurate results every time.
                                    </p>
                                </div>
                            </div>

                            {/* Feature 4: Full control */}
                            <div className="flex gap-4 items-start">
                                <div className="flex-shrink-0">
                                    <FeaturedIcon 
                                        size="lg" 
                                        theme="light" 
                                        color="gray"
                                        icon={Settings01}
                                    />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <h3 className="text-[24px] font-semibold text-primary leading-[32px]">
                                        Full control
                                    </h3>
                                    <p className="text-[16px] text-tertiary leading-[24px]">
                                        Take charge of your AI with complete visibility into its actions. You can monitor, adjust, and understand everything it does, with clear reports to keep you informed.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Industry grid */}
            <section className="bg-primary px-0 py-24">
                <div className="mx-auto max-w-container px-8">
                    <div className="flex flex-col max-w-[768px]">
                        <div className="flex flex-col gap-2 md:gap-3">
                            <h2 className="text-display-md font-semibold text-primary tracking-tight">Support for every use case</h2>
                        </div>
                        <p className="text-xl text-tertiary mt-3 md:mt-4">Automate high-volume calls across sectors. Launch fast. Scale safely with analytics, guardrails, and multilingual support.</p>
                    </div>

                    <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
                        <div className="bg-secondary border border-secondary rounded-lg p-6 flex h-full min-h-[280px] flex-col text-left">
                            <div className="size-12 rounded-[10px] bg-brand-solid flex items-center justify-center mb-16">
                                <MedicalCross className="size-6 text-white" />
                            </div>
                            <div className="text-lg font-semibold text-primary mb-2">Healthcare</div>
                            <div className="text-md text-tertiary mb-4">Book and change appointments, refills, directions, and triage. HIPAA-ready with BAA.</div>
                            <Button color="link-color" size="lg" iconTrailing={ArrowRight} className="mt-auto">Learn more</Button>
                        </div>

                        <div className="bg-secondary border border-secondary rounded-lg p-6 flex h-full min-h-[280px] flex-col text-left">
                            <div className="size-12 rounded-[10px] bg-brand-solid flex items-center justify-center mb-16">
                                <GraduationHat02 className="size-6 text-white" />
                            </div>
                            <div className="text-lg font-semibold text-primary mb-2">Education</div>
                            <div className="text-md text-tertiary mb-4">Answer admissions and aid questions, route to departments, and handle IT help desk. Multilingual.</div>
                            <Button color="link-color" size="lg" iconTrailing={ArrowRight} className="mt-auto">Learn more</Button>
                        </div>

                        <div className="bg-secondary border border-secondary rounded-lg p-6 flex h-full min-h-[280px] flex-col text-left">
                            <div className="size-12 rounded-[10px] bg-brand-solid flex items-center justify-center mb-16">
                                <Globe02 className="size-6 text-white" />
                            </div>
                            <div className="text-lg font-semibold text-primary mb-2">Public sector</div>
                            <div className="text-md text-tertiary mb-4">Automate benefits, permits, 311/211 hotlines, and appointments—secure and multilingual.</div>
                            <Button color="link-color" size="lg" iconTrailing={ArrowRight} className="mt-auto">Learn more</Button>
                        </div>

                        <div className="bg-secondary border border-secondary rounded-lg p-6 flex h-full min-h-[280px] flex-col text-left">
                            <div className="size-12 rounded-[10px] bg-brand-solid flex items-center justify-center mb-16">
                                <Tag03 className="size-6 text-white" />
                            </div>
                            <div className="text-lg font-semibold text-primary mb-2">Customer service</div>
                            <div className="text-md text-tertiary mb-4">Track orders, returns, and store info. Capture leads and schedule follow-ups when agents are busy.</div>
                            <Button color="link-color" size="lg" iconTrailing={ArrowRight} className="mt-auto">Learn more</Button>
                        </div>
                    </div>
                </div>
            </section>


            {/* Integrations section */}
            <section className="bg-primary px-0 py-24 overflow-clip">
                <div className="mx-auto max-w-container px-8">
                    <div className="flex flex-col gap-8 items-center">
                        {/* Header */}
                        <div className="flex flex-col gap-5 items-center text-center max-w-[768px]">
                            <div className="flex flex-col gap-3 items-center w-full">
                                <div className="text-secondary text-md font-semibold w-full">
                                    Integrations
                                </div>
                                <h2 className="text-display-md font-semibold text-primary tracking-tight w-full">
                                    Get more value from your tools
                                </h2>
                            </div>
                            <p className="text-xl text-tertiary font-normal">
                                Connect your tools, connect your teams. With over 100 apps already available in our directory, your team's favourite tools are just a click away.
                            </p>
                        </div>
                    </div>
                    
                    {/* Integration cards grid */}
                    <div className="mt-16 flex flex-wrap gap-8 items-start w-full">
                        {/* Outlook integration */}
                        <div className="basis-0 grow min-w-80 pt-6">
                            <div className="bg-secondary rounded-2xl pt-[52px] pb-8 px-6 relative">
                                <div className="absolute left-1/2 top-[-32px] transform -translate-x-1/2 bg-white p-1 rounded-xl border border-primary shadow-xs">
                                    <div className="w-14 h-14 overflow-clip relative">
                                        <div className="absolute inset-[6.25%]">
                                            <img className="w-full h-full object-contain" src="/integration-logos/outlook.svg" alt="Outlook" />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-4 items-center text-center w-[336px]">
                                    <div className="flex flex-col gap-1 items-center w-full">
                                        <h3 className="text-lg font-semibold text-primary">
                                            Outlook integration
                                        </h3>
                                        <p className="text-md text-tertiary font-normal">
                                            Work faster and smarter by integrating directly with Notion, right in the app.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Slack integration */}
                        <div className="basis-0 grow min-w-80 pt-6">
                            <div className="bg-secondary rounded-2xl pt-[52px] pb-8 px-6 relative">
                                <div className="absolute left-1/2 top-[-32px] transform -translate-x-1/2 bg-white p-1 rounded-xl border border-primary shadow-xs">
                                    <div className="w-14 h-14 overflow-clip relative">
                                        <div className="absolute inset-[9.375%]">
                                            <img className="w-full h-full object-contain" src="/integration-logos/slack.svg" alt="Slack" />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-4 items-center text-center w-[336px]">
                                    <div className="flex flex-col gap-1 items-center w-full">
                                        <h3 className="text-lg font-semibold text-primary">
                                            Slack integration
                                        </h3>
                                        <p className="text-md text-tertiary font-normal">
                                            Work faster and smarter by integrating directly with Slack, right in the app.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Google Drive integration */}
                        <div className="basis-0 grow min-w-80 pt-6">
                            <div className="bg-secondary rounded-2xl pt-[52px] pb-8 px-6 relative">
                                <div className="absolute left-1/2 top-[-32px] transform -translate-x-1/2 bg-white p-1 rounded-xl border border-primary shadow-xs">
                                    <div className="w-14 h-14 overflow-clip relative">
                                        <div className="absolute inset-[6.25%]">
                                            <img className="w-full h-full object-contain" src="/integration-logos/g-calendar.svg" alt="Google Calendar" />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-4 items-center text-center w-[336px]">
                                    <div className="flex flex-col gap-1 items-center w-full">
                                        <h3 className="text-lg font-semibold text-primary">
                                            Google Calendar integration
                                        </h3>
                                        <p className="text-md text-tertiary font-normal">
                                            Work faster and smarter by integrating directly with Google Calendar, right in the app.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Microsoft Teams integration */}
                        <div className="basis-0 grow min-w-80 pt-6">
                            <div className="bg-secondary rounded-2xl pt-[52px] pb-8 px-6 relative">
                                <div className="absolute left-1/2 top-[-32px] transform -translate-x-1/2 bg-white p-1 rounded-xl border border-primary shadow-xs">
                                    <div className="w-14 h-14 overflow-clip relative">
                                        <div className="absolute bottom-[6.25%] left-0 right-0 top-0">
                                            <img className="w-full h-full object-contain" src="/integration-logos/teams.svg" alt="Microsoft Teams" />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-4 items-center text-center w-[336px]">
                                    <div className="flex flex-col gap-1 items-center w-full">
                                        <h3 className="text-lg font-semibold text-primary">
                                            Microsoft Teams integration
                                        </h3>
                                        <p className="text-md text-tertiary font-normal">
                                            Work faster and smarter by integrating directly with Intercom, right in the app.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Twilio integration */}
                        <div className="basis-0 grow min-w-80 pt-6">
                            <div className="bg-secondary rounded-2xl pt-[52px] pb-8 px-6 relative">
                                <div className="absolute left-1/2 top-[-32px] transform -translate-x-1/2 bg-white p-1 rounded-xl border border-primary shadow-xs">
                                    <div className="w-14 h-14 overflow-clip relative">
                                        <div className="absolute inset-[6.25%]">
                                            <img className="w-full h-full object-contain" src="/integration-logos/twilio.svg" alt="Twilio" />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-4 items-center text-center w-[336px]">
                                    <div className="flex flex-col gap-1 items-center w-full">
                                        <h3 className="text-lg font-semibold text-primary">
                                            Twilio integration
                                        </h3>
                                        <p className="text-md text-tertiary font-normal">
                                            Work faster and smarter by integrating directly with Twilio, right in the app.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Dropbox integration */}
                        <div className="basis-0 grow min-w-80 pt-6">
                            <div className="bg-secondary rounded-2xl pt-[52px] pb-8 px-6 relative">
                                <div className="absolute left-1/2 top-[-32px] transform -translate-x-1/2 bg-white p-1 rounded-xl border border-primary shadow-xs">
                                    <div className="w-14 h-14 overflow-clip relative shadow-sm">
                                        <div className="absolute inset-[6.25%]">
                                            <div className="w-full h-full bg-[#0061ff] rounded-lg flex items-center justify-center">
                                                <span className="text-white font-bold text-xl">D</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-4 items-center text-center w-[336px]">
                                    <div className="flex flex-col gap-1 items-center w-full">
                                        <h3 className="text-lg font-semibold text-primary">
                                            Dropbox integration
                                        </h3>
                                        <p className="text-md text-tertiary font-normal">
                                            Work faster and smarter by integrating directly with Dropbox, right in the app.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            {/* Features Section - "Designed to make a difference" */}
            <section className="bg-[#fafafa] py-24">
                <div className="mx-auto max-w-[1280px] px-8">
                    <div className="flex flex-col gap-12 items-start w-full">
                        <div className="flex flex-col gap-5 items-start max-w-[768px] w-full">
                            <div className="flex flex-col gap-3 items-start w-[808px]">
                                <h2 className="text-[36px] font-semibold text-[#181d27] tracking-[-0.72px] leading-[44px] w-full">
                                    Designed to make a difference
                                </h2>
                                <div className="flex justify-end w-full">
                                    <img src="/misc/Hand-drawn pen scribble.svg" alt="Scribble" className="block" style={{ filter: 'none' }} />
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="mt-16 flex flex-wrap gap-8 items-start w-full">
                        {/* Feature 1: Increase revenue */}
                        <div className="flex flex-col gap-4 items-start min-w-[320px] flex-1">
                            <FeaturedIcon 
                                size="lg" 
                                theme="modern" 
                                color="gray"
                                icon={MessageChatCircle}
                            />
                            <div className="flex flex-col gap-1 items-start w-full">
                                <h3 className="text-lg font-semibold text-[#181d27] leading-[28px] w-full">
                                    Increase revenue
                                </h3>
                                <p className="text-md text-[#535862] leading-[24px] w-full">
                                    Grow your revenue as satisfied customers become loyal advocates.
                                </p>
                            </div>
                        </div>

                        {/* Feature 2: Enhance customer satisfaction */}
                        <div className="flex flex-col gap-4 items-start min-w-[320px] flex-1">
                            <FeaturedIcon 
                                size="lg" 
                                theme="modern" 
                                color="gray"
                                icon={Zap}
                            />
                            <div className="flex flex-col gap-1 items-start w-full">
                                <h3 className="text-lg font-semibold text-[#181d27] leading-[28px] w-full">
                                    Enhance customer satisfaction
                                </h3>
                                <p className="text-md text-[#535862] leading-[24px] w-full">
                                    Feel the satisfaction of exceeding customer expectations consistently.
                                </p>
                            </div>
                        </div>

                        {/* Feature 3: Reduce costs */}
                        <div className="flex flex-col gap-4 items-start min-w-[320px] flex-1">
                            <FeaturedIcon 
                                size="lg" 
                                theme="modern" 
                                color="gray"
                                icon={ChartBreakoutSquare}
                            />
                            <div className="flex flex-col gap-1 items-start w-full">
                                <h3 className="text-lg font-semibold text-[#181d27] leading-[28px] w-full">
                                    Reduce costs
                                </h3>
                                <p className="text-md text-[#535862] leading-[24px] w-full">
                                    Imagine reallocating resources to what truly matters as routine tasks handle themselves.
                                </p>
                            </div>
                        </div>

                        {/* Feature 4: Reduce response time */}
                        <div className="flex flex-col gap-4 items-start min-w-[320px] flex-1">
                            <FeaturedIcon 
                                size="lg" 
                                theme="modern" 
                                color="gray"
                                icon={MessageSmileCircle}
                            />
                            <div className="flex flex-col gap-1 items-start w-full">
                                <h3 className="text-lg font-semibold text-[#181d27] leading-[28px] w-full">
                                    Reduce response time
                                </h3>
                                <p className="text-md text-[#535862] leading-[24px] w-full">
                                    Delight customers with instant solutions, enhancing their trust in your brand.
                                </p>
                            </div>
                        </div>

                        {/* Feature 5: Scale seamlessly */}
                        <div className="flex flex-col gap-4 items-start min-w-[320px] flex-1">
                            <FeaturedIcon 
                                size="lg" 
                                theme="modern" 
                                color="gray"
                                icon={Command}
                            />
                            <div className="flex flex-col gap-1 items-start w-full">
                                <h3 className="text-lg font-semibold text-[#181d27] leading-[28px] w-full">
                                    Scale seamlessly
                                </h3>
                                <p className="text-md text-[#535862] leading-[24px] w-full">
                                    Grow confidently, knowing your business scales effortlessly with demand.
                                </p>
                            </div>
                        </div>

                        {/* Feature 6: Build customer loyalty */}
                        <div className="flex flex-col gap-4 items-start min-w-[320px] flex-1">
                            <FeaturedIcon 
                                size="lg" 
                                theme="modern" 
                                color="gray"
                                icon={MessageHeartCircle}
                            />
                            <div className="flex flex-col gap-1 items-start w-full">
                                <h3 className="text-lg font-semibold text-[#181d27] leading-[28px] w-full">
                                    Build customer loyalty
                                </h3>
                                <p className="text-md text-[#535862] leading-[24px] w-full">
                                    Experience the rewards of customers returning time and again, thanks to the service you provide.
                                </p>
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


