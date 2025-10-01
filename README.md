# Guided Safety Website

A modern, responsive website for Guided Safety - a secure, AI-powered platform that unifies crisis intake, case management, and analytics for mission-driven organizations.

## About Guided Safety

Guided Safety helps more than 50 nonprofits process 500,000+ critical interactions every year. Our platform provides:

- **Crisis Intake**: Secure, AI-powered intake forms
- **Case Management**: Unified workspace for managing cases
- **Analytics**: Data-driven insights for better outcomes
- **Team Collaboration**: Real-time coordination tools

## Tech Stack

- **Framework**: Next.js 15 with React 19
- **Styling**: Tailwind CSS v4.1
- **Language**: TypeScript 5.8
- **UI Components**: Untitled UI React components
- **Icons**: Untitled UI Icons
- **Content**: Markdown-based blog system

## Getting Started

First, install dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── about/             # About page
│   ├── blog/              # Blog listing page
│   ├── blog-post/         # Dynamic blog post pages
│   ├── case-study/        # Case study page
│   └── home-screen.tsx    # Home page
├── components/            # Reusable UI components
│   ├── base/             # Base components (buttons, inputs, etc.)
│   ├── foundations/      # Foundation components (logos, icons)
│   └── marketing/        # Marketing-specific components
├── content/              # Content files
│   └── blog/             # Markdown blog posts
├── lib/                  # Utility functions
└── styles/               # Global styles
```

## Features

- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Dark Theme**: Consistent dark theme throughout
- **Blog System**: Dynamic blog posts with markdown support
- **Case Studies**: Detailed case study pages
- **Component Library**: Reusable UI components
- **Performance**: Optimized with Next.js 15

## Content Management

Blog posts are written in Markdown format and stored in `src/content/blog/`. Each post includes:

- Frontmatter with metadata (title, author, date, etc.)
- Markdown content
- Automatic styling with custom Tailwind classes

## License

This project is proprietary to Guided Safety. All rights reserved.

## Contact

For questions about Guided Safety, visit our website or contact our team.
