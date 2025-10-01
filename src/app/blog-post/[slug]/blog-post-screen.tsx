"use client";

import { ArrowRight, ChevronDown, Link01, Mail01, HelpCircle } from "@untitledui/icons";
import { LinkedIn } from "@/components/foundations/social-icons";
import { Button } from "@/components/base/buttons/button";
import { Badge } from "@/components/base/badges/badges";
import { Header } from "@/components/marketing/header-navigation/components/header";
import { Input } from "@/components/base/input/input";
import { GuidedReachLogo } from "@/components/foundations/logo/guided-safety-logo";
import { Avatar } from "@/components/base/avatar/avatar";
import { Dot } from "@/components/foundations/dot-icon";
import { cx } from "@/utils/cx";
import Image from "next/image";
import { BlogPost } from "@/lib/mdx";
import { useRef } from "react";


interface BlogPostScreenProps {
  blogPost: BlogPost;
}

export const BlogPostScreen = ({ blogPost }: BlogPostScreenProps) => {
  const contentRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (sectionText: string) => {
    if (contentRef.current) {
      const content = contentRef.current;
      const headings = content.querySelectorAll('h1, h2, h3, h4, h5, h6');
      
      for (const heading of headings) {
        if (heading.textContent?.toLowerCase().includes(sectionText.toLowerCase())) {
          heading.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
          });
          break;
        }
      }
    }
  };

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

      {/* Section Divider */}
      <div className="mx-auto w-full max-w-7xl px-8">
        <hr className="border-secondary" />
      </div>

      {/* Blog Post Header */}
      <section className="flex flex-col gap-16 items-center justify-center pb-24 pt-16 relative w-full">
        {/* Mobile Hero Image */}
        <div className="md:hidden h-60 w-full bg-center bg-cover bg-no-repeat" 
             style={{ backgroundImage: `url('${blogPost.heroImage}')` }}>
        </div>
        
        <div className="flex flex-col md:flex-row gap-8 items-center justify-center max-w-[1280px] px-4 md:px-8 py-0 relative w-full">
          {/* Content */}
          <div className="flex flex-col gap-8 md:gap-12 basis-0 grow items-start justify-start pl-0 md:pr-8 py-0 relative">
            <div className="flex flex-col gap-4 md:gap-6 items-start justify-start max-w-[768px] p-0 relative w-full">
              {/* Badge and Heading */}
              <div className="flex flex-col gap-4 items-start justify-start p-0 relative w-full">
                <div className="flex gap-2 items-center justify-start pl-1 pr-2 py-1 relative rounded-[10px] border border-primary bg-primary">
                  <div className="flex gap-1 items-center justify-start px-1.5 py-0.5 relative rounded-md border border-primary bg-primary">
                    <Dot className="size-2 text-brand" />
                    <span className="font-medium text-xs text-tertiary">{blogPost.badge.type}</span>
                  </div>
                  <span className="font-medium text-xs text-tertiary">{blogPost.badge.readTime}</span>
                </div>
                
                <h1 className="font-semibold min-w-full not-italic relative text-primary text-[36px] md:text-[48px] text-left tracking-[-0.72px] md:tracking-[-0.96px] leading-[44px] md:leading-[60px]">
                  {blogPost.title}
                </h1>
              </div>
              
              <p className="font-normal max-w-[480px] not-italic relative text-tertiary text-[18px] md:text-[20px] text-left w-full leading-[28px] md:leading-[30px]">
                {blogPost.subtitle}
              </p>
            </div>
          </div>
         
          {/* Desktop Hero Image */}
          <div className="hidden md:block basis-0 grow h-[640px] bg-center bg-cover bg-no-repeat relative" 
               style={{ backgroundImage: `url('${blogPost.heroImage}')` }}>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="flex flex-col gap-16 items-center justify-start pb-24 pt-0 relative w-full">
        <div className="flex flex-col gap-16 items-center justify-start max-w-[1280px] px-4 md:px-8 py-0 relative w-full">
          <div className="flex flex-col md:flex-row gap-12 md:gap-16 items-start justify-center p-0 relative w-full">
            {/* Sidebar - Hidden on mobile, shown on desktop */}
            <div className="hidden md:flex flex-col gap-8 items-start justify-start min-w-[280px] p-0 relative">
              {/* Table of Contents */}
              <div className="h-px bg-secondary relative w-full"></div>
              <div className="flex flex-col gap-4 items-start justify-start p-0 relative w-full">
                <h3 className="font-semibold not-italic relative text-tertiary text-[16px] text-left w-full leading-[24px]">
                  Table of contents
                </h3>
                <div className="flex flex-col gap-3 items-start justify-start p-0 relative w-full">
                  {blogPost.tableOfContents.map((item, index) => (
                    <button 
                      key={index} 
                      onClick={() => scrollToSection(item)}
                      className="font-semibold text-tertiary text-[16px] text-left hover:text-primary transition-colors cursor-pointer"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="h-px bg-secondary relative w-full"></div>
              
              {/* Contributors */}
              <div className="flex flex-col gap-6 items-start justify-start p-0 relative w-full">
                <h3 className="font-semibold not-italic relative text-tertiary text-[16px] text-left w-full leading-[24px]">
                  Contributors
                </h3>
                <div className="flex gap-3 items-center justify-start p-0 relative">
                  <div className="flex gap-3 items-center justify-start p-0 relative">
                    <div className="bg-top bg-cover bg-no-repeat relative rounded-[9999px] shrink-0 size-12" 
                         style={{ backgroundImage: `url('${blogPost.author.avatar}')` }}>
                    </div>
                    <div className="flex flex-col items-start justify-start leading-[0] not-italic p-0 relative shrink-0 text-[16px] text-left text-nowrap">
                      <div className="font-semibold relative shrink-0 text-primary">
                        <p className="block leading-[24px] text-nowrap whitespace-pre">{blogPost.author.name}</p>
                      </div>
                      <div className="font-normal relative shrink-0 text-tertiary">
                        <p className="block leading-[24px] text-nowrap whitespace-pre">{blogPost.author.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="h-px bg-secondary relative w-full"></div>
              
              {/* Newsletter */}
              <div className="flex flex-col gap-4 items-start justify-start p-0 relative w-full">
                <h3 className="font-semibold not-italic relative text-tertiary text-[16px] text-left w-full leading-[24px]">
                  Subscribe to our newsletter
                </h3>
                <div className="flex flex-col gap-4 items-start justify-start p-0 relative w-full">
                  <Input 
                    placeholder="Enter your email"
                    icon={Mail01}
                    iconClassName="size-5 text-quaternary"
                  />
                  <Button color="primary" size="lg" className="w-full">
                    Subscribe
                  </Button>
                </div>
              </div>
              
              <div className="h-px bg-secondary relative w-full"></div>
              
              {/* Social Links */}
              <div className="flex gap-3 items-start justify-start p-0 relative">
                <div className="bg-primary relative rounded-lg shrink-0 border border-primary shadow-xs">
                  <div className="flex items-center justify-center overflow-clip p-[10px] relative">
                    <LinkedIn className="size-5 text-quaternary" />
                  </div>
                </div>
                <div className="bg-primary relative rounded-lg shrink-0 border border-primary shadow-xs">
                  <div className="flex items-center justify-center overflow-clip p-[10px] relative">
                    <Link01 className="size-5 text-quaternary" />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Main Content */}
            <div className="flex flex-col grow items-start justify-start max-w-[720px] p-0 relative">
              <div 
                ref={contentRef}
                className="prose max-w-none [&>h1]:font-semibold [&>h1]:text-primary [&>h1]:text-[24px] md:text-[30px] [&>h1]:leading-[32px] md:leading-[38px] [&>h1]:mb-5 [&>h2]:font-semibold [&>h2]:text-primary [&>h2]:text-[20px] md:text-[30px] [&>h2]:leading-[30px] md:leading-[38px] [&>h2]:mt-10 [&>h2]:mb-5 [&>p]:text-tertiary [&>p]:text-[16px] md:text-[18px] [&>p]:leading-[24px] md:leading-[28px] [&>p]:mb-[18px] [&>blockquote]:text-primary [&>blockquote]:text-[20px] md:text-[18px] [&>blockquote]:leading-[30px] md:leading-[28px] [&>blockquote]:font-medium [&>blockquote]:italic [&>blockquote]:text-center [&>blockquote]:my-10 [&>ol]:text-tertiary [&>ol]:text-[16px] md:text-[18px] [&>ol]:leading-[24px] md:leading-[28px] [&>ol]:mb-[18px] [&>ol]:space-y-4 [&>ol]:pl-6 [&>li]:leading-[24px] md:leading-[28px] [&>li]:text-[16px] md:text-[18px] [&>strong]:font-semibold [&>ul]:text-tertiary [&>ul]:text-[16px] md:text-[18px] [&>ul]:leading-[24px] md:leading-[28px] [&>ul]:mb-[18px] [&>ul]:space-y-4 [&>ul]:pl-6 [&>code]:bg-secondary [&>code]:text-primary [&>code]:px-2 [&>code]:py-1 [&>code]:rounded [&>code]:text-sm [&>pre]:bg-secondary [&>pre]:text-primary [&>pre]:p-4 [&>pre]:rounded-lg [&>pre]:overflow-x-auto"
              >
                {/* The MDX content will be rendered here */}
                <div dangerouslySetInnerHTML={{ __html: blogPost.content }} />
              </div>
      
              {/* About Guided Safety */}
              <div className="flex flex-col items-start justify-start p-0 relative w-full">
                <div className="h-12"></div>
                <div className="bg-secondary flex flex-col items-start justify-start p-6 md:p-8 relative rounded-2xl w-full">
                  <div className="flex flex-col items-start justify-start p-0 relative w-full">
                    <h3 className="font-semibold not-italic relative text-primary text-[20px] md:text-[24px] text-left w-full leading-[30px] md:leading-[32px]">
                      About Guided Safety
                    </h3>
                    <div className="h-4"></div>
                  </div>
                  <div className="flex flex-col items-start justify-start p-0 relative w-full">
                    <p className="font-normal not-italic relative text-tertiary text-[16px] md:text-[18px] text-left w-full leading-[24px] md:leading-[28px]">
                      Guided Safety is a secure, AI‑powered platform that unifies crisis intake, case management, and analytics for mission‑driven organizations. More than 50 nonprofits rely on Guided Safety to process 500,000+ critical interactions every year.
                    </p>
                  </div>
                </div>
                <div className="h-12"></div>
              </div>
            </div>
            
            {/* Mobile Sidebar - Shown on mobile, hidden on desktop */}
            <div className="md:hidden flex flex-col gap-8 items-start justify-start w-full p-0 relative">
              {/* Table of Contents */}
              <div className="h-px bg-secondary relative w-full"></div>
              <div className="flex flex-col gap-4 items-start justify-start p-0 relative w-full">
                <h3 className="font-semibold not-italic relative text-tertiary text-[16px] text-left w-full leading-[24px]">
                  Table of contents
                </h3>
                <div className="flex flex-col gap-3 items-start justify-start p-0 relative w-full">
                  {blogPost.tableOfContents.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => scrollToSection(item)}
                      className="font-semibold text-tertiary text-[16px] text-left hover:text-primary transition-colors cursor-pointer"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="h-px bg-secondary relative w-full"></div>
              
              {/* Contributors */}
              <div className="flex flex-col gap-6 items-start justify-start p-0 relative w-full">
                <h3 className="font-semibold not-italic relative text-tertiary text-[16px] text-left w-full leading-[24px]">
                  Contributors
                </h3>
                <div className="flex gap-3 items-center justify-start p-0 relative">
                  <div className="flex gap-3 items-center justify-start p-0 relative">
                    <div className="bg-top bg-cover bg-no-repeat relative rounded-[9999px] shrink-0 size-12"
                         style={{ backgroundImage: `url('${blogPost.author.avatar}')` }}>
                    </div>
                    <div className="flex flex-col items-start justify-start leading-[0] not-italic p-0 relative shrink-0 text-[16px] text-left text-nowrap">
                      <div className="font-semibold relative shrink-0 text-primary">
                        <p className="block leading-[24px] text-nowrap whitespace-pre">{blogPost.author.name}</p>
                      </div>
                      <div className="font-normal relative shrink-0 text-tertiary">
                        <p className="block leading-[24px] text-nowrap whitespace-pre">{blogPost.author.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="h-px bg-secondary relative w-full"></div>
              
              {/* Newsletter */}
              <div className="flex flex-col gap-4 items-start justify-start p-0 relative w-full">
                <h3 className="font-semibold not-italic relative text-tertiary text-[16px] text-left w-full leading-[24px]">
                  Subscribe to our newsletter
                </h3>
                <div className="flex flex-col gap-4 items-start justify-start p-0 relative w-full">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    icon={Mail01}
                    iconClassName="size-5 text-quaternary"
                  />
                  <Button color="primary" size="lg" className="w-full">
                    Subscribe
                  </Button>
                </div>
              </div>
              
              <div className="h-px bg-secondary relative w-full"></div>
              
              {/* Social Links */}
              <div className="flex gap-3 items-start justify-start p-0 relative">
                <div className="bg-primary relative rounded-lg shrink-0 border border-primary shadow-xs">
                  <div className="flex items-center justify-center overflow-clip p-[10px] relative">
                    <LinkedIn className="size-5 text-quaternary" />
                  </div>
                </div>
                <div className="bg-primary relative rounded-lg shrink-0 border border-primary shadow-xs">
                  <div className="flex items-center justify-center overflow-clip p-[10px] relative">
                    <Link01 className="size-5 text-quaternary" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary px-4 md:px-8 py-12 md:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-8 md:gap-12">
            <div className="flex flex-col md:flex-row md:flex-wrap items-start justify-between gap-8 md:gap-12">
              <div className="flex flex-col gap-6 md:gap-8 min-w-0 md:min-w-[560px]">
                <div className="flex items-center gap-2">
                  <a href="/" className="hover:opacity-80 transition-opacity">
                    <GuidedReachLogo className="h-8" />
                  </a>
                </div>
                
                <div className="flex flex-wrap items-center gap-4 md:gap-8">
                  <Button color="link-gray" size="lg" href="/features">Features</Button>
                  <Button color="link-gray" size="lg" href="/blog">Blog</Button>
                  <Button color="link-gray" size="lg" href="/about">About</Button>
                  <Button color="link-gray" size="lg" href="/help">Help</Button>
                  <Button color="link-gray" size="lg" href="/privacy">Privacy</Button>
                </div>
              </div>
              
              <div className="flex flex-col gap-4 w-full md:w-[360px]">
                <div className="text-sm font-semibold text-primary">
                  Stay up to date
                </div>
                <div className="flex flex-col md:flex-row gap-4">
                  <input 
                    type="email" 
                    placeholder="Enter your email"
                    className="flex-1 px-3.5 py-2.5 rounded-lg border border-primary bg-primary text-md text-primary placeholder:text-placeholder"
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