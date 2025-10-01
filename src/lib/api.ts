// API utilities and data fetching functions

export interface ApiResponse<T> {
  data: T;
  error?: string;
  status: number;
}

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public data?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export async function fetchApi<T>(
  endpoint: string,
  options?: RequestInit
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`/api${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new ApiError(data.message || 'API request failed', response.status, data);
    }

    return {
      data,
      status: response.status,
    };
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError('Network error', 500);
  }
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  const response = await fetchApi<BlogPost[]>('/blog');
  return response.data;
}

export async function getBlogPost(slug: string): Promise<BlogPost> {
  const response = await fetchApi<BlogPost>(`/blog/${slug}`);
  return response.data;
}

export async function getCaseStudies(): Promise<CaseStudy[]> {
  const response = await fetchApi<CaseStudy[]>('/case-studies');
  return response.data;
}

export async function getCaseStudy(id: string): Promise<CaseStudy> {
  const response = await fetchApi<CaseStudy>(`/case-studies/${id}`);
  return response.data;
}

// Import types
import type { BlogPost, CaseStudy } from '@/types'; 