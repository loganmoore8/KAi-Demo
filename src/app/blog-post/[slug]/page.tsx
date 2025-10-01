import { notFound } from 'next/navigation';
import { getBlogPostBySlug, getBlogPostSlugs } from '@/lib/mdx';
import { BlogPostScreen } from './blog-post-screen';

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export const dynamic = 'force-dynamic';

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const blogPost = await getBlogPostBySlug(slug);

  if (!blogPost) {
    notFound();
  }

  return <BlogPostScreen blogPost={blogPost} />;
} 