import { NextResponse } from 'next/server';
import { getAllBlogPosts } from '@/lib/mdx';

export async function GET() {
  try {
    const blogPosts = await getAllBlogPosts();
    return NextResponse.json(blogPosts);
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog posts' },
      { status: 500 }
    );
  }
} 