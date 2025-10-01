"use client";

import { ArrowRight, ChevronLeft, ChevronRight } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { Badge } from "@/components/base/badges/badges";
import { Header } from "@/components/marketing/header-navigation/components/header";
import { Input } from "@/components/base/input/input";
import { TextArea } from "@/components/base/textarea/textarea";
import { Checkbox } from "@/components/base/checkbox/checkbox";
import { GuidedReachLogo } from "@/components/foundations/logo/guided-safety-logo";
import { cx } from "@/utils/cx";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";

export const AboutScreen = () => {
  const testimonialCarouselRef = useRef<HTMLDivElement>(null);
  const teamCarouselRef = useRef<HTMLDivElement>(null);

  const scrollCarousel = (ref: React.RefObject<HTMLDivElement | null>, direction: 'left' | 'right') => {
    if (ref.current) {
      const container = ref.current;
      const firstChild = container.firstElementChild as HTMLElement | null;
      // Calculate one-card scroll: card width + gap (fallback to 416px)
      const cardWidth = firstChild?.getBoundingClientRect().width ?? 384;
      const gapPx = parseFloat(getComputedStyle(container).gap || '32');
      const scrollAmount = cardWidth + (Number.isFinite(gapPx) ? gapPx : 32);

      const currentScroll = container.scrollLeft;
      const target = direction === 'left' ? currentScroll - scrollAmount : currentScroll + scrollAmount;
      container.scrollTo({ left: target, behavior: 'smooth' });
    }
  };

  // Testimonial data with company logos
  const testimonials = [
    {
      company: "TechCorp",
      logo: "/placeholders/Company=Cooperative, Style=Default, Dark mode=True.svg",
      quote: "Kai has transformed our customer service operations — we've reduced costs by 60% while improving response times.",
      bgColor: "bg-[#e04f16]",
      logoSize: "w-40 h-16", // 219x48 aspect ratio
      slug: "voice-automation-guide",
      summary: "Cut customer service costs by 60% while reducing average response time from 5 minutes to 30 seconds."
    },
    {
      company: "RetailMax", 
      logo: "/placeholders/Company=Goodwell, Style=Default, Dark mode=True.svg",
      quote: "Our customers love the instant, accurate responses. Kai handles 80% of inquiries without human intervention.",
      bgColor: "bg-[#079455]",
      logoSize: "w-32 h-16", // 149x48 aspect ratio - smaller width to match visual size
      slug: "ai-customer-service-trends",
      summary: "Automated 80% of customer inquiries, improving satisfaction scores by 35% and reducing wait times."
    },
    {
      company: "FinancePro",
      logo: "/placeholders/Company=Visionwork, Style=Default, Dark mode=True.svg", 
      quote: "Kai's voice AI handles complex financial queries with accuracy. Our agents now focus on high-value interactions.",
      bgColor: "bg-[#1570ef]",
      logoSize: "w-40 h-16", // 204x48 aspect ratio
      slug: "implementing-voice-ai",
      summary: "Reduced call center costs by 45% while maintaining 95% customer satisfaction with AI-powered support."
    },
    {
      company: "HealthCare Plus",
      logo: "/placeholders/Company=Watchtower, Style=Default, Dark mode=True.svg",
      quote: "Kai's 24/7 availability has been crucial for our patients. Appointment scheduling is now seamless and instant.",
      bgColor: "bg-[#444ce7]",
      logoSize: "w-40 h-16", // Assuming similar aspect ratio
      slug: "voice-automation-guide",
      summary: "Improved patient experience with 24/7 AI support, reducing appointment scheduling time by 70%."
    }
  ];

  return (
    <div className="flex min-h-screen flex-col bg-primary">
      <Header />

      {/* Hero Section */}
      <section className="relative px-0 py-24">
        <div className="absolute inset-0 bg-gradient-to-b from-[#fef6ee] to-white -mb-24"></div>
        <div className="relative z-10">
          <div className="mx-auto max-w-[1280px] px-8">
            <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
              <h1 className="text-[48px] font-semibold text-[#772917] tracking-[-0.96px] leading-[56px] mb-6">
                Our mission is to make voice automation accessible to every business
              </h1>
              <p className="text-[20px] text-[#ba3a14] leading-[30px] mb-8">
                Kai empowers businesses to automate customer interactions with intelligent voice AI—reducing costs, improving response times, and delivering exceptional customer experiences.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section Divider */}
      <div className="mx-auto w-full max-w-7xl px-8">
        <hr className="border-secondary" />
      </div>

      {/* Team Section */}
      <section className="flex flex-col gap-16 items-center justify-start px-0 py-24 relative w-full">
        <div className="flex flex-col gap-8 items-start justify-start max-w-[1280px] px-8 py-0 relative w-full">
          <div className="flex gap-8 items-start justify-between p-0 relative w-full">
            <div className="flex flex-col gap-5 grow items-start justify-start leading-[0] max-w-[768px] min-w-[480px] not-italic p-0 relative text-left">
              <div className="relative text-primary text-[36px] tracking-[-0.72px] w-full font-semibold">
                <p className="block leading-[44px]">We're led by AI and automation experts</p>
              </div>
              <div className="font-normal relative text-tertiary text-[20px] w-full">
                <p className="block leading-[30px]">Decades of experience in voice technology, AI, and customer experience innovation power everything we build.</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col gap-8 items-start justify-start max-w-[1280px] px-8 py-0 relative w-full">
          <div className="flex flex-col gap-8 items-start justify-start p-0 relative">
            <div className="relative overflow-hidden max-w-[1280px] w-full">
              
              <div ref={teamCarouselRef} className="flex gap-8 items-start justify-start p-0 relative overflow-x-auto scrollbar-hide">
                 {/* Team Member Cards */}
              {[
                {
                  name: "Donald Rich Jr.",
                  role: "Head of Product",
                  description: "Product leader with 15+ years building customer-facing AI solutions. Former Amazon Connect product manager who scaled voice automation for enterprise customers.",
                  image: "/images/donald-rich.png",
                  scale: 1.12,
                  objectPosition: "top",
                  href: "https://www.linkedin.com/in/donaldrichjr/"
                },
                {
                  name: "Tim Gabriel",
                  role: "VP of Engineering",
                  description: "25-year tech veteran who built Amazon Connect's Public Sector at AWS. Leads our secure, AI-powered voice automation platform architecture.",
                  image: "/images/tim-gabriel.png",
                  scale: 1.08,
                  objectPosition: "top",
                   offsetY: 0,
                  href: "https://www.linkedin.com/in/timgabriel/"
                },
                {
                  name: "Logan Moore",
                  role: "Customer Success Director",
                  description: "Customer experience expert who helps businesses implement voice AI solutions. Specializes in onboarding, training, and optimizing AI performance for maximum ROI.",
                  image: "/images/logan-moore.png",
                  scale: 1.12,
                  objectPosition: "top",
                  offsetY: 0
                }
              ].map((member, index) => (
                <div
                  key={index}
                  className="aspect-[360/480] relative shrink-0 w-96 overflow-hidden"
                  onClick={() => {
                    const href = (member as any).href as string | undefined;
                    if (href) {
                      window.open(href, '_blank', 'noopener,noreferrer');
                    }
                  }}
                  role={(member as any).href ? 'link' : undefined}
                  tabIndex={(member as any).href ? 0 : -1}
                  onKeyDown={(e) => {
                    const href = (member as any).href as string | undefined;
                    if (!href) return;
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      window.open(href, '_blank', 'noopener,noreferrer');
                    }
                  }}
                >
                  <img
                    src={member.image}
                    alt={member.name}
                    className="absolute inset-0 size-full object-cover"
                    style={{
                      objectPosition: (member as any).objectPosition || "top",
                      transform: `translateY(${(member as any).offsetY || 0}px) scale(${(member as any).scale || 1})`,
                      transformOrigin: "top center",
                    }}
                    draggable={false}
                  />
                  <div className="absolute bg-gradient-to-b bottom-0 flex flex-col from-transparent items-center justify-center left-0 pb-0 pt-24 px-0 right-0 to-[rgba(0,0,0,0.4)]">
                    <div className="backdrop-blur-md bg-[rgba(12,14,18,0.3)] flex flex-col gap-4 items-start justify-start pb-6 pt-5 px-5 relative w-full">
                      <div className="flex flex-col gap-2 items-start justify-start p-0 relative w-full">
                        <div className="flex gap-4 items-start justify-start p-0 relative w-full">
                          <div className="grow leading-[0] min-w-px not-italic relative text-white text-[20px] text-left">
                            <p className="block leading-[30px]">{member.name}</p>
                          </div>
                          <div className="flex flex-col items-start justify-start pb-0 pt-1.5 px-0 relative">
                            <ArrowRight className="size-6 text-white" />
                          </div>
                        </div>
                        <div className="flex flex-col gap-0.5 items-start justify-start leading-[0] not-italic p-0 relative text-white text-[16px] text-left w-full">
                          <div className="font-semibold relative w-full">
                            <p className="block leading-[24px]">{member.role}</p>
                          </div>
                          <div className="font-normal relative w-full">
                            <p className="block leading-[24px]">{member.description}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
               </div>
             </div>
             
             {/* Navigation Arrows */}
            <div className="flex gap-8 items-start justify-start p-0 relative">
              <button 
                onClick={() => scrollCarousel(teamCarouselRef, 'left')}
                className="flex gap-3 items-center justify-center p-0 relative rounded-full size-14 border border-secondary hover:bg-secondary transition-colors"
              >
                <ChevronLeft className="size-6 text-quaternary" />
              </button>
              <button 
                onClick={() => scrollCarousel(teamCarouselRef, 'right')}
                className="flex gap-3 items-center justify-center p-0 relative rounded-full size-14 border border-secondary hover:bg-secondary transition-colors"
              >
                <ChevronRight className="size-6 text-quaternary" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="bg-secondary flex flex-col gap-16 items-center justify-start px-0 py-24 relative w-full">
                  <div className="flex flex-col gap-16 items-start justify-start max-w-[1280px] px-8 py-0 relative w-full">
            <div className="flex gap-8 items-start justify-between p-0 relative w-full">
              <div className="flex flex-col gap-5 grow items-start justify-start leading-[0] max-w-[768px] min-w-[480px] not-italic p-0 relative text-left">
              <div className="relative text-primary text-[36px] tracking-[-0.72px] w-full font-semibold">
                <p className="block leading-[44px]">We're proud of our results</p>
              </div>
              <div className="font-normal relative text-tertiary text-[20px] w-full">
                <p className="block leading-[30px]">Success stories from businesses using Kai to transform their customer service operations.</p>
              </div>
              </div>
            </div>
            
            <div className="flex flex-col gap-8 items-start justify-start p-0 relative">
              <div className="relative max-w-[1216px] w-full overflow-visible">
                
                <div ref={testimonialCarouselRef} className="flex gap-8 items-start justify-start p-0 relative overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory">
                 {/* Case Study Cards */}
                 {testimonials.map((testimonial, index) => (
                   <div key={index} className={`${testimonial.bgColor} flex flex-col gap-6 h-[504px] items-start justify-between p-[20px] relative w-96 flex-shrink-0 snap-start`}>
                     {/* Company Logo */}
                     <div className="flex items-center justify-start w-full">
                       <div className={`relative ${testimonial.logoSize}`}>
                         <Image
                           src={testimonial.logo}
                           alt={`${testimonial.company} logo`}
                           fill
                           className="object-contain"
                         />
                       </div>
                     </div>
                     
                      <Link href={`/blog-post/${testimonial.slug}`} className="backdrop-blur-md bg-[rgba(12,14,18,0.3)] flex flex-col gap-6 items-start justify-start px-6 py-8 relative w-full hover:bg-[rgba(12,14,18,0.36)] transition-colors" aria-label={`Read ${testimonial.company} case study`}>
                        <div className="flex flex-col gap-3 items-start justify-start leading-[0] not-italic p-0 relative text-white text-left w-full">
                          <div className="font-medium relative text-[18px] w-full">
                            <p className="block leading-[28px]">{testimonial.summary}</p>
                          </div>
                        </div>
                        <div className="flex gap-1.5 items-center justify-center p-0 relative">
                          <span className="font-semibold text-white text-[16px]">Read case study</span>
                          <ArrowRight className="size-5 text-white" />
                        </div>
                      </Link>
                   </div>
                 ))}
               </div>
             </div>
             
             {/* Navigation Arrows */}
            <div className="flex gap-8 items-start justify-start p-0 relative">
              <button 
                onClick={() => scrollCarousel(testimonialCarouselRef, 'left')}
                className="flex gap-3 items-center justify-center p-0 relative rounded-full size-14 border border-secondary hover:bg-secondary transition-colors"
              >
                <ChevronLeft className="size-6 text-quaternary" />
              </button>
              <button 
                onClick={() => scrollCarousel(testimonialCarouselRef, 'right')}
                className="flex gap-3 items-center justify-center p-0 relative rounded-full size-14 border border-secondary hover:bg-secondary transition-colors"
              >
                <ChevronRight className="size-6 text-quaternary" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="flex flex-col gap-16 items-center justify-start px-0 py-24 relative w-full">
        <div className="flex flex-col gap-8 items-start justify-start max-w-[1280px] px-8 py-0 relative w-full">
          <div className="flex flex-col gap-8 items-center justify-start p-0 relative w-full">
            <div className="flex flex-col gap-5 items-center justify-start leading-[0] max-w-[768px] not-italic p-0 relative text-center w-full">
              <div className="flex flex-col gap-3 items-start justify-start p-0 relative w-full">
                <div className="relative text-secondary text-[16px] w-full">
                  <p className="block leading-[24px]">Contact us</p>
                </div>
                <div className="relative text-primary text-[36px] tracking-[-0.72px] w-full font-semibold">
                  <p className="block leading-[44px]">Ready to get started?</p>
                </div>
              </div>
              <div className="font-normal relative text-tertiary text-[20px] w-full">
                <p className="block leading-[30px]">Let's discuss how Kai can transform your customer service operations.</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col gap-16 items-start justify-start max-w-[1280px] px-8 py-0 relative w-full">
          <div className="flex flex-col gap-16 items-center justify-start p-0 relative w-full">
            <div className="flex flex-col gap-8 items-start justify-start max-w-[480px] p-0 relative w-full">
              <div className="flex flex-col gap-6 items-start justify-start p-0 relative w-full">
                {/* Name Fields */}
                <div className="flex gap-8 items-start justify-start p-0 relative w-full">
                  <div className="grow">
                                         <Input 
                       label="First name"
                       placeholder="First name"
                       isRequired
                     />
                  </div>
                  <div className="grow">
                                         <Input 
                       label="Last name"
                       placeholder="Last name"
                       isRequired
                     />
                  </div>
                </div>
                
                {/* Email Field */}
                                 <Input 
                   label="Email"
                   placeholder="you@company.com"
                   type="email"
                   isRequired
                 />
                
                {/* Phone Field */}
                <Input 
                  label="Phone number"
                  placeholder="+1 (555) 000-0000"
                  type="tel"
                />
                
                {/* Message Field */}
                                 <TextArea 
                   label="Message"
                   placeholder="Leave us a message..."
                   rows={6}
                   isRequired
                 />
                
                {/* Privacy Checkbox */}
                <div className="flex gap-3 items-start justify-start p-0 relative w-full">
                  <Checkbox />
                  <div className="grow">
                    <p className="text-tertiary text-[16px] leading-[24px]">
                      You agree to our friendly{" "}
                      <span className="underline">privacy policy</span>.
                    </p>
                  </div>
                </div>
                
                {/* Submit Button */}
                <div className="flex flex-col gap-4 items-start justify-start p-0 relative w-full">
                  <Button color="primary" size="lg" className="w-full">
                    Send message
                  </Button>
                </div>
              </div>
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