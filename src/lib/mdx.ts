import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';

const blogDirectory = path.join(process.cwd(), 'src/content/blog');

export interface BlogPost {
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

export function getBlogPostSlugs(): string[] {
  if (!fs.existsSync(blogDirectory)) {
    return [];
  }
  
  return fs.readdirSync(blogDirectory)
    .filter(file => file.endsWith('.mdx'))
    .map(file => file.replace(/\.mdx$/, ''));
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const fullPath = path.join(blogDirectory, `${slug}.mdx`);
    
    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug,
      title: data.title || '',
      subtitle: data.subtitle || '',
      date: data.date || '',
      author: {
        name: data.author?.name || '',
        role: data.author?.role || '',
        avatar: data.author?.avatar || '',
      },
      badge: {
        type: data.badge?.type || 'Blog post',
        readTime: data.badge?.readTime || '5 min read',
      },
      heroImage: data.heroImage || '',
      tableOfContents: data.tableOfContents || [],
      content: await marked(content),
      excerpt: data.excerpt || '',
    };
  } catch (error) {
    console.error(`Error reading blog post ${slug}:`, error);
    return null;
  }
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const slugs = getBlogPostSlugs();
  const posts = await Promise.all(
    slugs.map(slug => getBlogPostBySlug(slug))
  );
  
  return posts
    .filter((post): post is BlogPost => post !== null)
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
} 