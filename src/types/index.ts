// Global type definitions for the Guided Safety application

export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface NavigationItem {
  name: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
  current?: boolean;
}

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  content: string;
  tags?: string[];
}

export interface CaseStudy {
  id: string;
  title: string;
  description: string;
  company: string;
  industry: string;
  results: string[];
  content: string;
}

export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  benefits: string[];
} 