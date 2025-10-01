"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/base/buttons/button';
import { Input } from '@/components/base/input/input';
import { Header } from '@/components/marketing/header-navigation/components/header';
import { GuidedReachLogo } from '@/components/foundations/logo/guided-safety-logo';
import { PaginationPageDefault } from '@/components/application/pagination/pagination';
import { SearchLg } from '@untitledui/icons';
import { formatDate } from '@/utils/formatting';
import { BadgeGroup } from '@/components/base/badges/badge-groups';
import { Badge } from '@/components/base/badges/badges';
import { Circle } from '@/components/shared-assets/background-patterns/circle';
import { LoadingIndicator } from '@/components/application/loading-indicator/loading-indicator';

// Import the BlogPost type
interface BlogPost {
  slug: string;
  title: string;
  subtitle: string;
  date: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  badge: {
    type: string;
    readTime: string;
  };
  heroImage: string;
  tableOfContents: string[];
  content: string;
  excerpt?: string;
}

export default function BlogPage() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadBlogPosts = async () => {
      setIsLoading(true);
      try {
        setError(null);
        const response = await fetch('/api/blog');
        if (!response.ok) {
          throw new Error('Failed to fetch blog posts');
        }
        const posts = await response.json();
        if (Array.isArray(posts)) {
          setBlogPosts(posts);
        } else {
          console.error('Invalid response format:', posts);
          setBlogPosts([]);
          setError('Invalid response format');
        }
      } catch (error) {
        console.error('Error loading blog posts:', error);
        setBlogPosts([]);
        setError('Failed to load blog posts');
      } finally {
        setIsLoading(false);
      }
    };
    loadBlogPosts();
  }, []);

  // Filter blog posts based on search query
  const filteredPosts = blogPosts.filter(post => 
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.badge.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.author.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination logic
  const postsPerPage = 10;
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const currentPosts = filteredPosts.slice(startIndex, endIndex);

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
      <section className="relative px-0 py-24">
        <div className="absolute inset-0 bg-gradient-to-b from-[#fef6ee] to-white -mb-24"></div>
        <div className="relative z-10">
          <div className="mx-auto max-w-[1280px] px-8">
            <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
              <h1 className="text-[48px] font-semibold text-[#772917] tracking-[-0.96px] leading-[56px] mb-6">
                The latest writings from our team
              </h1>
              <p className="text-[20px] text-[#ba3a14] leading-[30px] mb-8">
                The latest case studies, technologies, and resources.
              </p>
              
              {/* Search Bar */}
              <div className="max-w-[320px] w-full">
                <Input
                  placeholder="Search"
                  icon={SearchLg}
                  size="md"
                  className="w-full bg-primary rounded-lg"
                  value={searchQuery}
                  onChange={(value) => setSearchQuery(value)}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Section */}
      <section className="flex flex-col gap-16 items-center justify-start pb-24 pt-6 relative w-full">
        <div className="flex flex-col gap-16 items-center justify-start max-w-[1280px] px-8 py-0 relative w-full">
          <div className={`flex flex-col gap-12 ${isLoading ? 'items-center justify-center' : 'items-start justify-start'} max-w-[768px] p-0 relative w-full`}>
            {isLoading ? (
              <div className="flex flex-col gap-4 items-center justify-center py-12 text-center w-full">
                <LoadingIndicator 
                  type="line-simple" 
                  size="lg"
                />
              </div>
            ) : error ? (
              <div className="flex flex-col gap-4 items-center justify-center py-12 text-center">
                <p className="text-error-600 text-lg font-medium">
                  {error}
                </p>
                <p className="text-tertiary text-md">
                  Please try refreshing the page.
                </p>
              </div>
            ) : currentPosts.length > 0 ? (
              currentPosts.map((post) => (
                <Link key={post.slug} href={`/blog-post/${post.slug}`} className="group w-full">
                  <article className="[flex-flow:wrap] box-border content-start flex gap-4 items-start justify-start p-0 relative size-full">
                    {/* Image */}
                    <div className="aspect-[336/224] basis-0 bg-center bg-cover bg-no-repeat grow min-h-[213.333px] min-w-80 rounded-2xl shrink-0" 
                         style={{ backgroundImage: `url('${post.heroImage}')` }}>
                    </div>
                    
                    {/* Content */}
                    <div className="basis-0 box-border content-stretch flex flex-col gap-5 grow items-start justify-start min-h-px min-w-[200px] p-0 relative shrink-0">
                      <div className="box-border content-stretch flex flex-col gap-2 items-start justify-start p-0 relative shrink-0 w-full">
                        {/* Category Badge */}
                        <div className="font-semibold leading-[0] not-italic relative shrink-0 text-brand-secondary text-sm text-left w-full">
                          <p className="block leading-[20px]">{post.badge.type}</p>
                        </div>
                        
                        {/* Title and Description */}
                        <div className="box-border content-stretch flex flex-col gap-1 items-start justify-start leading-[0] not-italic p-0 relative shrink-0 text-left w-full">
                          <div className="font-semibold relative shrink-0 text-primary text-lg w-full">
                            <p className="block leading-[28px]">{post.title}</p>
                          </div>
                          <div className="-webkit-box css-x0abiy font-normal overflow-ellipsis overflow-hidden relative shrink-0 text-tertiary text-md w-full">
                            <p className="block leading-[24px] line-clamp-3">
                              {post.subtitle}
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      {/* Author */}
                      <div className="box-border content-stretch flex flex-row gap-2 items-center justify-start p-0 relative shrink-0">
                        <div className="bg-avatar-bg bg-[position:50%_0%,_0%_0%] bg-size-[cover,auto] relative rounded-full shrink-0 size-10" 
                             style={{ backgroundImage: `url('${post.author.avatar}')` }}>
                          <div className="absolute border border-avatar-contrast-border border-solid inset-0 pointer-events-none rounded-full"></div>
                        </div>
                        <div className="box-border content-stretch flex flex-col items-start justify-start leading-[0] not-italic p-0 relative shrink-0 text-sm text-left text-nowrap">
                          <div className="font-semibold relative shrink-0 text-primary">
                            <p className="block leading-[20px] text-nowrap whitespace-pre">{post.author.name}</p>
                          </div>
                          <div className="font-normal relative shrink-0 text-tertiary">
                            <p className="block leading-[20px] text-nowrap whitespace-pre">
                              {formatDate(post.date, { year: 'numeric', month: 'short', day: 'numeric' })}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                </Link>
              ))
            ) : (
              <div className="flex flex-col gap-4 items-center justify-center py-12 text-center">
                <p className="text-tertiary text-lg font-medium">
                  No blog posts found matching "{searchQuery}"
                </p>
                <p className="text-tertiary text-md">
                  Try adjusting your search terms or browse all posts.
                </p>
              </div>
            )}
          </div>
          
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex flex-row gap-5 items-center justify-center pb-0 pt-5 px-0 relative w-full">
              <PaginationPageDefault 
                page={currentPage} 
                total={totalPages} 
                onPageChange={setCurrentPage}
              />
            </div>
          )}
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