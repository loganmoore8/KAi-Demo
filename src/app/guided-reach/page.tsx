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
    const [playingAudio, setPlayingAudio] = useState<string | null>(null);
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);
    const carouselRef = useRef<HTMLDivElement>(null);
    const featuresSectionRef = useRef<HTMLDivElement>(null);
    const lastWheelTime = useRef<number>(0);
    const lastScrollY = useRef<number>(0);
    const isScrolling = useRef<boolean>(false);
    const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

    // Audio handling function
    const handleAudioPlay = (audioFile: string) => {
        if (playingAudio === audioFile) {
            // If this audio is playing, pause it
            const audio = document.getElementById(audioFile) as HTMLAudioElement;
            if (audio) {
                audio.pause();
                setPlayingAudio(null);
            }
        } else {
            // Stop any currently playing audio
            if (playingAudio) {
                const currentAudio = document.getElementById(playingAudio) as HTMLAudioElement;
                if (currentAudio) {
                    currentAudio.pause();
                }
            }
            
            // Play the new audio
            const audio = document.getElementById(audioFile) as HTMLAudioElement;
            if (audio) {
                audio.play();
                setPlayingAudio(audioFile);
            }
        }
    };

    // Video handling function
    const handleVideoPlay = () => {
        const video = document.getElementById('hero-video') as HTMLVideoElement;
        if (video) {
            if (isVideoPlaying) {
                video.pause();
                setIsVideoPlaying(false);
            } else {
                video.play();
                setIsVideoPlaying(true);
            }
        }
    };

    // Social proof card data
    const socialProofCards = [
        { name: "Sarah", message: "I need to reschedule my appointment", avatar: "/healthcare-demo.png" },
        { name: "Michael", message: "Can you help me with my billing question?", avatar: "/banking-demo.png" },
        { name: "Emma", message: "I'd like to update my account information", avatar: "/customer-service-demo.png" },
        { name: "David", message: "What are your business hours?", avatar: "/healthcare-demo.png" }
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

    // Robust scroll hijacking for features section
    useEffect(() => {
        const FEATURES_COUNT = 4;
        let isHijacking = false;
        let lastScrollTime = 0;
        let scrollTimeout: NodeJS.Timeout | null = null;
        let savedScrollPosition = 0;
        let lastScrollY = window.pageYOffset;

        const isSectionCentered = () => {
            if (!featuresSectionRef.current) return false;
            
            const rect = featuresSectionRef.current.getBoundingClientRect();
            const viewportHeight = window.innerHeight;
            const viewportCenter = viewportHeight / 2;
            
            const sectionTop = rect.top;
            const sectionBottom = rect.bottom;
            const sectionHeight = rect.height;
            const sectionCenter = sectionTop + (sectionHeight / 2);
            
            // Determine scroll direction
            const currentScrollY = window.pageYOffset;
            const isScrollingDown = currentScrollY > lastScrollY;
            lastScrollY = currentScrollY;
            
            // Adjust tolerance based on scroll direction
            // When scrolling down, require more precise centering
            const tolerance = isScrollingDown ? 20 : 50;
            const centerDistance = Math.abs(sectionCenter - viewportCenter);
            const isCentered = centerDistance < tolerance;
            
            // Debug logging
            console.log('Scroll direction:', isScrollingDown ? 'down' : 'up', 'Section center:', sectionCenter, 'Viewport center:', viewportCenter, 'Distance:', centerDistance, 'Tolerance:', tolerance, 'Is centered:', isCentered);
            
            return isCentered;
        };

        const handleWheel = (e: WheelEvent) => {
            const now = Date.now();
            
            // Only process if section is centered and we're not in a rapid scroll sequence
            if (!isSectionCentered() || now - lastScrollTime < 100) {
                return;
            }

            // If we're not currently hijacking, start hijacking
            if (!isHijacking) {
                isHijacking = true;
                setIsFeaturesSectionActive(true);
                // Save the current scroll position when hijacking starts
                savedScrollPosition = window.pageYOffset;
                console.log('Starting hijacking at scroll position:', savedScrollPosition);
            }

            // Only prevent default if we're actually hijacking
            if (isHijacking) {
                e.preventDefault();
                e.stopPropagation();
            }
            
            lastScrollTime = now;

            const delta = e.deltaY;
            const isScrollingDown = delta > 0;
            
            setFeaturesActiveIndex(prev => {
                let newIndex = prev;
                
                if (isScrollingDown) {
                    newIndex = Math.min(prev + 1, FEATURES_COUNT - 1);
                    
                    // If at last feature and trying to scroll down, exit hijacking
                    if (newIndex === FEATURES_COUNT - 1 && prev === FEATURES_COUNT - 1) {
                        exitHijacking('down');
                        return prev;
                    }
                } else {
                    newIndex = Math.max(prev - 1, 0);
                    
                    // If at first feature and trying to scroll up, exit hijacking
                    if (newIndex === 0 && prev === 0) {
                        exitHijacking('up');
                        return prev;
                    }
                }
                
                return newIndex;
            });
        };

        const handleScroll = (e: Event) => {
            // If we're hijacking, prevent scroll movement but avoid jitter
            if (isHijacking && !scrollTimeout) {
                e.preventDefault();
                // Use requestAnimationFrame to avoid jitter
                requestAnimationFrame(() => {
                    if (isHijacking) {
                        window.scrollTo(0, savedScrollPosition);
                    }
                });
                return;
            }
            
            // Don't interfere if we're in the exit timeout period
            if (scrollTimeout) return;
            
            const centered = isSectionCentered();
            
            // If section becomes centered and we're not hijacking, start hijacking
            if (centered && !isHijacking) {
                isHijacking = true;
                setIsFeaturesSectionActive(true);
                // Save the current scroll position when hijacking starts
                savedScrollPosition = window.pageYOffset;
                console.log('Starting hijacking via scroll detection at position:', savedScrollPosition);
                
                // Set initial index based on scroll position
                const rect = featuresSectionRef.current?.getBoundingClientRect();
                if (rect) {
                    const sectionTop = rect.top;
                    const sectionHeight = rect.height;
                    const viewportCenter = window.innerHeight / 2;
                    
                    const sectionProgress = Math.max(0, Math.min(1, 
                        (viewportCenter - sectionTop) / sectionHeight
                    ));
                    
                    const initialIndex = Math.floor(sectionProgress * FEATURES_COUNT);
                    setFeaturesActiveIndex(Math.max(0, Math.min(initialIndex, FEATURES_COUNT - 1)));
                }
            }
            // If section is no longer centered and we're hijacking, stop hijacking
            else if (!centered && isHijacking) {
                isHijacking = false;
                setIsFeaturesSectionActive(false);
            }
        };

        const exitHijacking = (direction: 'up' | 'down') => {
            isHijacking = false;
            setIsFeaturesSectionActive(false);
            
            // Clear any existing timeout
            if (scrollTimeout) {
                clearTimeout(scrollTimeout);
            }
            
            // Scroll in the appropriate direction
            const scrollAmount = direction === 'down' ? 400 : -400;
            window.scrollBy({ 
                top: scrollAmount, 
                behavior: 'smooth' 
            });
            
            // Prevent re-hijacking for a short period
            scrollTimeout = setTimeout(() => {
                scrollTimeout = null;
            }, 1000);
        };

        // Add event listeners
        document.addEventListener('wheel', handleWheel, { passive: false });
        window.addEventListener('scroll', handleScroll, { passive: false });
        
        return () => {
            document.removeEventListener('wheel', handleWheel);
            window.removeEventListener('scroll', handleScroll);
            if (scrollTimeout) {
                clearTimeout(scrollTimeout);
            }
        };
    }, []);
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
											Voice automation that works like magic.
										</div>
										<div className="w-full max-w-[768px] text-center text-[#ba3a14] text-[20px] leading-[30px]">
											KAi brings human-like AI to every call—cutting costs, speeding responses, and elevating customer experiences.
										</div>
								</div>
								{/* Actions */}
								<div className="flex gap-[12px] items-start">
											<Button
												color="primary"
												size="lg"
												href="/pricing"
											>
												Talk to sales
											</Button>
								</div>
							</div>

						{/* Social proof chat items with edge fade */}
						<div className="w-full px-0 pb-[30px] mb-[64px] relative">
							<div className="mx-auto max-w-[1280px] px-[32px] relative">
								<div className="flex w-full justify-center gap-[24px] relative overflow-hidden min-h-[150px] items-center">
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
														<div className="pointer-events-none relative rounded-[9999px] shrink-0 size-[40px] overflow-hidden">
															<img 
																src={cardData.avatar} 
																alt={cardData.name}
																className="w-full h-full object-cover object-[50%_30%] scale-110"
															/>
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
						<div className="aspect-[560/315] max-h-[540px] max-w-[960px] relative rounded-[12px] shrink-0 w-full group">
							<video 
								id="hero-video"
								className="absolute inset-0 max-w-none object-cover rounded-[12px] size-full" 
								controls
								preload="metadata"
								onPlay={() => setIsVideoPlaying(true)}
								onPause={() => setIsVideoPlaying(false)}
								onEnded={() => setIsVideoPlaying(false)}
							>
								<source src="/KAi ad v1.mp4" type="video/mp4" />
								Your browser does not support the video tag.
							</video>
							{!isVideoPlaying && (
								<button 
									onClick={handleVideoPlay}
									className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors rounded-[12px] z-10"
								>
									<div className="size-20 rounded-full bg-brand-solid flex items-center justify-center shadow-lg hover:bg-brand-solid_hover transition-colors">
										<svg className="size-10 text-white" viewBox="0 0 24 24" fill="currentColor">
											<path d="M8 5v14l11-7z"/>
										</svg>
									</div>
								</button>
							)}
							<div aria-hidden className="absolute border-[0.5px] border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[12px] shadow-[0px_32px_64px_-12px_rgba(10,13,18,0.14),0px_5px_5px_-2.5px_rgba(10,13,18,0.04)]" />
						</div>
                    </div>
                </div>
            </section>


            {/* Features with phone mockup */}
            <section ref={featuresSectionRef} className="bg-primary px-0 pt-48 pb-24">
                <div className="mx-auto max-w-container px-8">
                    <div className="flex flex-col max-w-[768px]">
                        <div className="flex flex-col gap-2 md:gap-3">
                            <h2 className="text-[60px] font-semibold text-primary tracking-[-1.2px] leading-[72px] relative">
                                Voice automation that customers
                                <span className="relative text-[#e04f16]">
                                    {" "}love
                                    <img 
                                        src="/Accent_02.svg" 
                                        alt="" 
                                        className="absolute -top-2 -right-8 w-[38px] h-[42px]"
                                        style={{ filter: 'brightness(0) saturate(100%) invert(27%) sepia(51%) saturate(2878%) hue-rotate(346deg) brightness(104%) contrast(97%)' }}
                                    />
                                </span>
                            </h2>
                        </div>
                    </div>

                    <div className="mt-16 grid grid-cols-1 gap-16 md:grid-cols-2 md:items-center md:min-h-[560px]">
                        <div className="flex flex-col max-w-[560px]">
                            <div className={`pl-6 pr-0 py-4 border-l-4 ${featuresActiveIndex === 0 ? "border-brand" : "border-tertiary"} transition-colors duration-200 ease-out`}>
                                <div className="flex flex-col gap-1">
                                    <div className="text-[24px] font-semibold text-primary leading-[32px]">Conversations that feel human</div>
                                    <div className="text-[20px] text-tertiary leading-[30px]">Natural speech, interruptions, memory, and guardrails. No scripts.</div>
                                </div>
                                <div className={`transition-all duration-200 ease-out ${featuresActiveIndex === 0 ? "mt-2 opacity-100 translate-y-0" : "mt-0 h-0 opacity-0 -translate-y-1 pointer-events-none overflow-hidden"}`}>
                                    <Button color="link-color" size="lg" iconTrailing={ArrowRight} className="text-[20px]" href="/pricing">Learn more</Button>
                                </div>
                            </div>
                            <div className={`pl-6 pr-0 py-4 border-l-4 ${featuresActiveIndex === 1 ? "border-brand" : "border-tertiary"} transition-colors duration-200 ease-out`}>
                                <div className="flex flex-col gap-1">
                                    <div className="text-[24px] font-semibold text-primary leading-[32px]">Trained on your knowledge</div>
                                    <div className="text-[20px] text-tertiary leading-[30px]">Sync help centers, docs, and past transcripts. Always up to date.</div>
                                </div>
                                <div className={`transition-all duration-200 ease-out ${featuresActiveIndex === 1 ? "mt-2 opacity-100 translate-y-0" : "mt-0 h-0 opacity-0 -translate-y-1 pointer-events-none overflow-hidden"}`}>
                                    <Button color="link-color" size="lg" iconTrailing={ArrowRight} className="text-[20px]" href="/pricing">Learn more</Button>
                                </div>
                            </div>
                            <div className={`pl-6 pr-0 py-4 border-l-4 ${featuresActiveIndex === 2 ? "border-brand" : "border-tertiary"} transition-colors duration-200 ease-out`}>
                                <div className="flex flex-col gap-1">
                                    <div className="text-[24px] font-semibold text-primary leading-[32px]">Smart handoffs</div>
                                    <div className="text-[20px] text-tertiary leading-[30px]">Warm-transfer to agents with full context and intent.</div>
                                </div>
                                <div className={`transition-all duration-200 ease-out ${featuresActiveIndex === 2 ? "mt-2 opacity-100 translate-y-0" : "mt-0 h-0 opacity-0 -translate-y-1 pointer-events-none overflow-hidden"}`}>
                                    <Button color="link-color" size="lg" iconTrailing={ArrowRight} className="text-[20px]" href="/pricing">Learn more</Button>
                                </div>
                            </div>
                            <div className={`pl-6 pr-0 py-4 border-l-4 ${featuresActiveIndex === 3 ? "border-brand" : "border-tertiary"} transition-colors duration-200 ease-out`}>
                                <div className="flex flex-col gap-1">
                                    <div className="text-[24px] font-semibold text-primary leading-[32px]">Works on your stack</div>
                                    <div className="text-[20px] text-tertiary leading-[30px]">Connect to any telephony or contact center platform. Keep your tools.</div>
                                </div>
                                <div className={`transition-all duration-200 ease-out ${featuresActiveIndex === 3 ? "mt-2 opacity-100 translate-y-0" : "mt-0 h-0 opacity-0 -translate-y-1 pointer-events-none overflow-hidden"}`}>
                                    <Button color="link-color" size="lg" iconTrailing={ArrowRight} className="text-[20px]" href="/pricing">Learn more</Button>
                                </div>
                            </div>
                        </div>

                        <div className="relative ml-auto h-[560px] w-[560px]">
                            {/* Brand gradient square behind the phone */}
                            <div className="absolute inset-0 [background:linear-gradient(26.5deg,#772917,#772917)]" />
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

            {/* Hear KAi in Action section */}
            <section className="bg-gradient-to-b from-white via-white to-[#fef6ee] px-0 py-[120px]">
                <div className="mx-auto max-w-[1280px] px-[32px] relative z-10">
                    <div className="flex flex-col gap-[32px] items-center">
                        <div className="flex flex-col gap-[20px] items-center max-w-[768px]">
                            <div className="flex flex-col gap-[12px] items-center w-full">
                                <div className="relative">
                                    <h2 className="text-[60px] font-semibold text-[#181d27] tracking-[-1.2px] leading-[72px] text-center w-full">
                                        Hear <span className="text-[#e04f16]">KAi</span> in action
                                    </h2>
                                    <div className="absolute -top-2 -right-8">
                                        <svg width="38" height="42" viewBox="0 0 51 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M34.1806 51.7952C38.9806 50.4482 44.006 49.7687 48.881 49.1462C49.931 49.0157 50.9058 49.744 50.9808 50.77C51.1308 51.7967 50.3804 52.7357 49.4054 52.8662C44.6804 53.4655 39.8059 54.1067 35.2309 55.4035C34.2559 55.6847 33.2054 55.1057 32.9054 54.1097C32.6054 53.1145 33.2056 52.0772 34.1806 51.7952Z" fill="#E04F16"/>
                                            <path fillRule="evenodd" clipRule="evenodd" d="M19.6312 32.698C27.3562 24.8147 36.0562 17.9462 43.6312 9.85147C44.3062 9.09547 45.5062 9.05497 46.2562 9.76072C47.0062 10.4672 47.0809 11.6552 46.3309 12.4112C38.7559 20.5292 30.0559 27.4202 22.3309 35.3267C21.5809 36.0647 20.3812 36.0752 19.6312 35.3492C18.9562 34.624 18.8812 33.436 19.6312 32.698Z" fill="#E04F16"/>
                                            <path fillRule="evenodd" clipRule="evenodd" d="M5.15443 2.37623C4.92943 6.88823 4.70487 11.4002 4.47987 15.913C4.47987 16.9465 3.57943 17.7445 2.52943 17.6942C1.47943 17.6432 0.729874 16.7635 0.729874 15.7292C0.954874 11.2097 1.17943 6.69098 1.40443 2.17223C1.47943 1.13873 2.37958 0.345982 3.42958 0.402232C4.40458 0.458482 5.22943 1.34348 5.15443 2.37623Z" fill="#E04F16"/>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <p className="text-[24px] text-[#535862] leading-[150%] text-center w-full">
                                Seamless conversations, built for every real-world moment
                            </p>
                        </div>
                        
                        {/* Demo Cards */}
                        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
                            {/* Banking Mobile Experience Card */}
                            <div className="bg-secondary border border-secondary rounded-xl p-6 flex flex-col h-full">
                                <div className="aspect-[5/4] bg-gradient-to-br from-brand-50 to-brand-100 rounded-lg mb-8 flex items-center justify-center relative overflow-hidden group">
                                    <img 
                                        src="/banking-demo.png" 
                                        alt="Banking mobile experience demo" 
                                        className="absolute inset-0 w-full h-full object-cover object-top rounded-lg"
                                    />
                                    <button 
                                        onClick={() => handleAudioPlay('banking-demo')}
                                        className="size-14 rounded-full bg-brand-solid flex items-center justify-center shadow-sm hover:bg-brand-solid_hover transition-colors relative z-10 opacity-75 group-hover:opacity-100"
                                    >
                                        {playingAudio === 'banking-demo' ? (
                                            <svg className="size-7 text-white" viewBox="0 0 24 24" fill="currentColor">
                                                <rect x="6" y="4" width="4" height="16"/>
                                                <rect x="14" y="4" width="4" height="16"/>
                                            </svg>
                                        ) : (
                                            <svg className="size-7 text-white" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M8 5v14l11-7z"/>
                                            </svg>
                                        )}
                                    </button>
                                </div>
                                <h3 className="text-[24px] font-semibold text-primary mb-2 leading-[32px]">Banking mobile experience</h3>
                                <p className="text-[20px] text-tertiary leading-[30px]">
                                    See how KAi handles account inquiries, balance checks, and transaction support with natural conversation flow.
                                </p>
                                <audio 
                                    id="banking-demo" 
                                    src="/banking-demo.wav" 
                                    onEnded={() => setPlayingAudio(null)}
                                />
                            </div>

                            {/* Healthcare Appointments Card */}
                            <div className="bg-secondary border border-secondary rounded-xl p-6 flex flex-col h-full">
                                <div className="aspect-[5/4] bg-gradient-to-br from-brand-50 to-brand-100 rounded-lg mb-8 flex items-center justify-center relative overflow-hidden group">
                                    <img 
                                        src="/healthcare-demo.png" 
                                        alt="Healthcare appointments demo" 
                                        className="absolute inset-0 w-full h-full object-cover object-top rounded-lg"
                                    />
                                    <button 
                                        onClick={() => handleAudioPlay('retail-demo')}
                                        className="size-14 rounded-full bg-brand-solid flex items-center justify-center shadow-sm hover:bg-brand-solid_hover transition-colors relative z-10 opacity-75 group-hover:opacity-100"
                                    >
                                        {playingAudio === 'retail-demo' ? (
                                            <svg className="size-7 text-white" viewBox="0 0 24 24" fill="currentColor">
                                                <rect x="6" y="4" width="4" height="16"/>
                                                <rect x="14" y="4" width="4" height="16"/>
                                            </svg>
                                        ) : (
                                            <svg className="size-7 text-white" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M8 5v14l11-7z"/>
                                            </svg>
                                        )}
                                    </button>
                                </div>
                                <h3 className="text-[24px] font-semibold text-primary mb-2 leading-[32px]">Healthcare appointments</h3>
                                <p className="text-[20px] text-tertiary leading-[30px]">
                                    Experience seamless appointment scheduling, rescheduling, and patient support with intelligent handoffs.
                                </p>
                                <audio 
                                    id="retail-demo" 
                                    src="/retail-demo.wav" 
                                    onEnded={() => setPlayingAudio(null)}
                                />
                            </div>

                            {/* Customer Service Card */}
                            <div className="bg-secondary border border-secondary rounded-xl p-6 flex flex-col h-full">
                                <div className="aspect-[5/4] bg-gradient-to-br from-brand-50 to-brand-100 rounded-lg mb-8 flex items-center justify-center relative overflow-hidden group">
                                    <img 
                                        src="/customer-service-demo.png" 
                                        alt="Customer service demo" 
                                        className="absolute inset-0 w-full h-full object-cover object-top rounded-lg"
                                    />
                                    <button 
                                        onClick={() => handleAudioPlay('customer-service-demo')}
                                        className="size-14 rounded-full bg-brand-solid flex items-center justify-center shadow-sm hover:bg-brand-solid_hover transition-colors relative z-10 opacity-75 group-hover:opacity-100"
                                    >
                                        {playingAudio === 'customer-service-demo' ? (
                                            <svg className="size-7 text-white" viewBox="0 0 24 24" fill="currentColor">
                                                <rect x="6" y="4" width="4" height="16"/>
                                                <rect x="14" y="4" width="4" height="16"/>
                                            </svg>
                                        ) : (
                                            <svg className="size-7 text-white" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M8 5v14l11-7z"/>
                                            </svg>
                                        )}
                                    </button>
                                </div>
                                <h3 className="text-[24px] font-semibold text-primary mb-2 leading-[32px]">Customer service</h3>
                                <p className="text-[20px] text-tertiary leading-[30px]">
                                    Watch KAi resolve complex customer issues with context awareness and smooth agent handoffs.
                                </p>
                                <audio 
                                    id="customer-service-demo" 
                                    src="/customer-service-demo.wav" 
                                    onEnded={() => setPlayingAudio(null)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section - "Designed to make a difference" */}
            <section className="px-0 py-[120px] [background:linear-gradient(26.5deg,#772917,#772917)]">
                <div className="mx-auto max-w-[1280px] px-8">
                    <div className="flex flex-col gap-12 items-center mb-16">
                        <div className="flex flex-col gap-5 items-center max-w-[768px] text-center">
                              <h2 className="text-[60px] font-semibold text-white tracking-[-1.2px] leading-[72px]">
                                  Made to elevate every
                                  <span className="relative">
                                      {" "}experience
                                      <div className="absolute -bottom-4 left-0 w-full h-[12px] z-10">
                                          <img 
                                              src="/Underline_01.svg" 
                                              alt="" 
                                              className="w-full h-full object-contain"
                                          />
                                      </div>
                                  </span>
                              </h2>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-12 items-start">
                        <div className="flex flex-col gap-4 items-center min-w-[320px] flex-1">
                            <div className="bg-brand-solid relative rounded-full size-12 shadow-sm">
                                <div className="absolute inset-3">
                                    <svg className="size-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <circle cx="12" cy="12" r="10"/>
                                        <circle cx="12" cy="12" r="6"/>
                                        <circle cx="12" cy="12" r="2"/>
                                    </svg>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2 items-center text-center">
                                <h3 className="text-[24px] font-semibold text-white leading-[32px]">
                                    Increase Revenue
                                </h3>
                                <p className="text-[20px] text-white/80 leading-[30px]">
                                    Boost growth as happy customers become repeat buyers and brand advocates.
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col gap-4 items-center min-w-[320px] flex-1">
                            <div className="bg-brand-solid relative rounded-full size-12 shadow-sm">
                                <div className="absolute inset-3">
                                    <svg className="size-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                                        <polyline points="22,4 12,14.01 9,11.01"/>
                                    </svg>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2 items-center text-center">
                                <h3 className="text-[24px] font-semibold text-white leading-[32px]">
                                    Enhance Satisfaction
                                </h3>
                                <p className="text-[20px] text-white/80 leading-[30px]">
                                    Exceed expectations and deliver consistently positive experiences.
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col gap-4 items-center min-w-[320px] flex-1">
                            <div className="bg-brand-solid relative rounded-full size-12 shadow-sm">
                                <div className="absolute inset-3">
                                    <svg className="size-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                                    </svg>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2 items-center text-center">
                                <h3 className="text-[24px] font-semibold text-white leading-[32px]">
                                    Reduce Costs
                                </h3>
                                <p className="text-[20px] text-white/80 leading-[30px]">
                                    Free up resources by automating routine tasks.
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col gap-4 items-center min-w-[320px] flex-1">
                            <div className="bg-brand-solid relative rounded-full size-12 shadow-sm">
                                <div className="absolute inset-3">
                                    <svg className="size-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <circle cx="12" cy="12" r="10"/>
                                        <polyline points="12,6 12,12 16,14"/>
                                    </svg>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2 items-center text-center">
                                <h3 className="text-[24px] font-semibold text-white leading-[32px]">
                                    Accelerate Response
                                </h3>
                                <p className="text-[20px] text-white/80 leading-[30px]">
                                    Earn trust with instant, reliable solutions.
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col gap-4 items-center min-w-[320px] flex-1">
                            <div className="bg-brand-solid relative rounded-full size-12 shadow-sm">
                                <div className="absolute inset-3">
                                    <svg className="size-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M3 3v18h18"/>
                                        <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3"/>
                                    </svg>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2 items-center text-center">
                                <h3 className="text-[24px] font-semibold text-white leading-[32px]">
                                    Scale Seamlessly
                                </h3>
                                <p className="text-[20px] text-white/80 leading-[30px]">
                                    Expand with ease, confident your systems adapt to demand.
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col gap-4 items-center min-w-[320px] flex-1">
                            <div className="bg-brand-solid relative rounded-full size-12 shadow-sm">
                                <div className="absolute inset-3">
                                    <svg className="size-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                                    </svg>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2 items-center text-center">
                                <h3 className="text-[24px] font-semibold text-white leading-[32px]">
                                    Build Loyalty
                                </h3>
                                <p className="text-[20px] text-white/80 leading-[30px]">
                                    Keep customers coming back with experiences that last.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why companies choose KAi section */}
            <section className="bg-primary px-0 py-[120px]">
                <div className="mx-auto max-w-[1280px] px-[32px]">
                    <div className="flex flex-col gap-16 md:flex-row md:items-start">
                        {/* Left side - Heading and supporting text */}
                        <div className="flex flex-col gap-5 max-w-[450px]">
                            <div className="flex flex-col gap-5">
                                 <h2 className="text-[60px] font-semibold text-primary tracking-[-1.2px] leading-[72px]">
                                     Why companies choose <span className="text-[#e04f16]">KAi</span>
                                 </h2>
                            </div>
                            <p className="text-[24px] text-tertiary leading-[150%]">
                                Built on telephony know-how, powered by AI precision.
                            </p>
                            <div className="flex gap-3">
                                <Button
                                    color="primary" 
                                    size="lg"
                                    iconTrailing={ArrowRight}
                                    href="/pricing"
                                >
                                    Talk to sales
                                </Button>
                            </div>
                        </div>

                        {/* Right side - Features */}
                        <div className="flex flex-col gap-12 flex-1">
                            {/* Feature 1: Rely on experts */}
                            <div className="relative">
                            <div className="flex gap-4 items-start">
                                <div className="flex-shrink-0">
                                        <Users01 className="size-[26px] text-black" />
                                </div>
                                    <div className="flex flex-col gap-4">
                                    <h3 className="text-[24px] font-semibold text-primary leading-[32px]">
                                        Trusted Expertise
                                    </h3>
                                    </div>
                                </div>
                                 <p className="text-[20px] text-tertiary leading-[30px] mt-4">
                                     Work with a team experienced in building and deploying large-scale contact center and telephony solutions for decades.
                                 </p>
                            </div>

                            {/* Feature 2: Data security */}
                            <div className="relative">
                            <div className="flex gap-4 items-start">
                                <div className="flex-shrink-0">
                                        <Lock02 className="size-[26px] text-black" />
                                </div>
                                    <div className="flex flex-col gap-4">
                                    <h3 className="text-[24px] font-semibold text-primary leading-[32px]">
                                        Data Security
                                    </h3>
                                    </div>
                                </div>
                                 <p className="text-[20px] text-tertiary leading-[30px] mt-4">
                                     Your data stays protected with enterprise-grade safeguards. KAi is GDPR and SOC 2 compliant, ensuring peace of mind.
                                 </p>
                            </div>

                            {/* Feature 3: Guaranteed accuracy */}
                            <div className="relative">
                            <div className="flex gap-4 items-start">
                                <div className="flex-shrink-0">
                                        <Check className="size-[26px] text-black" />
                                </div>
                                    <div className="flex flex-col gap-4">
                                    <h3 className="text-[24px] font-semibold text-primary leading-[32px]">
                                        Proven Accuracy
                                    </h3>
                                    </div>
                                </div>
                                 <p className="text-[20px] text-tertiary leading-[30px] mt-4">
                                     AI that sounds human but executes with precision—aligned to your workflows for consistent results.
                                 </p>
                            </div>

                            {/* Feature 4: Full control */}
                            <div className="relative">
                            <div className="flex gap-4 items-start">
                                <div className="flex-shrink-0">
                                        <Settings01 className="size-[26px] text-black" />
                                    </div>
                                    <div className="flex flex-col gap-4">
                                        <h3 className="text-[24px] font-semibold text-primary leading-[32px]">
                                            Complete Control
                                        </h3>
                                    </div>
                                </div>
                                 <p className="text-[20px] text-tertiary leading-[30px] mt-4">
                                     Maintain full visibility and oversight with clear reporting and the ability to monitor and adjust anytime.
                                 </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>







            {/* Blog Section */}
            <section className="bg-white px-0 py-24">
                <div className="mx-auto max-w-[1280px] px-8">
                    <div className="flex flex-col gap-8 items-start mb-16">
                        <div className="flex flex-col gap-5 items-start max-w-[768px]">
                            <h2 className="text-[60px] font-semibold text-primary tracking-[-1.2px] leading-[72px]">
                                The latest from <span className="text-[#e04f16]">KAi</span>
                            </h2>
                            <p className="text-[24px] text-tertiary leading-[150%]">
                                Interviews, tips, guides, industry best practices, and news.
                            </p>
                        </div>
                    </div>
                    
                    <div className="flex flex-col gap-8">
                        <div className="flex gap-8 items-start">
                            {/* Blog Post 1 */}
                            <div className="flex flex-col gap-4 items-start flex-1 min-w-0">
                                <div className="aspect-[384/256] relative w-full">
                                    <img 
                                        alt="The Complete Guide to Voice Automation for Business" 
                                        className="absolute inset-0 w-full h-full object-cover rounded-lg" 
                                        src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=640&h=640&fit=crop" 
                                    />
                                </div>
                                <div className="flex flex-col gap-4 items-start w-full">
                                    <div className="flex flex-col gap-4 items-start w-full">
                                        <h3 className="text-[24px] font-semibold text-primary leading-[32px]">
                                            The Complete Guide to Voice Automation for Business
                                        </h3>
                                        <p className="text-[20px] text-tertiary leading-[30px] line-clamp-2">
                                            How AI-powered voice assistants are transforming customer service and reducing costs
                                        </p>
                                    </div>
                                    <Button color="primary" size="lg" href="/blog-post/voice-automation-guide">
                                        Read more
                                    </Button>
                                </div>
                            </div>

                            {/* Blog Post 2 */}
                            <div className="flex flex-col gap-4 items-start flex-1 min-w-0">
                                <div className="aspect-[384/256] relative w-full">
                                    <img 
                                        alt="AI Customer Service Trends: What to Expect in 2025" 
                                        className="absolute inset-0 w-full h-full object-cover rounded-lg" 
                                        src="https://images.unsplash.com/photo-1677442136019-21780ecad995?w=640&h=640&fit=crop" 
                                    />
                                </div>
                                <div className="flex flex-col gap-4 items-start w-full">
                                    <div className="flex flex-col gap-4 items-start w-full">
                                        <h3 className="text-[24px] font-semibold text-primary leading-[32px]">
                                            AI Customer Service Trends: What to Expect in 2025
                                        </h3>
                                        <p className="text-[20px] text-tertiary leading-[30px] line-clamp-2">
                                            The future of customer support is conversational, intelligent, and automated
                                        </p>
                                    </div>
                                    <Button color="primary" size="lg" href="/blog-post/ai-customer-service-trends">
                                        Read more
                                    </Button>
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
                             <h2 className="font-semibold relative shrink-0 text-primary text-[60px] tracking-[-1.2px] w-full leading-[72px]">
                                Every call, answered better.
                            </h2>
                            <p className="font-normal relative shrink-0 text-tertiary text-[20px] w-full leading-[30px]">
                                Start scaling smarter with KAi.
                            </p>
                        </div>

                        <div className="flex flex-row gap-3 items-start justify-start p-0 relative shrink-0">
                            <Button
                                color="secondary" 
                                size="lg"
                                iconTrailing={ArrowRight}
                                href="/pricing"
                            >
                                See pricing
                            </Button>
                            <Button
                                color="primary" 
                                size="lg"
                                iconTrailing={ArrowRight}
                                href="/pricing"
                            >
                                Contact sales
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Spacer between CTA and Footer */}
            <div className="py-16"></div>





        </div>
    );
}


