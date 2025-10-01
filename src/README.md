# Source Code Organization

This directory contains the main source code for the Guided Safety website.

## Folder Structure

```
src/
├── app/                    # Next.js App Router pages and layouts
│   ├── (routes)/          # Route groups for better organization
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # Reusable React components
│   ├── base/             # Basic UI components (buttons, inputs, etc.)
│   ├── application/      # Complex application components
│   ├── marketing/        # Marketing-specific components
│   ├── foundations/      # Brand and design system components
│   └── shared-assets/    # Illustrations, patterns, and shared assets
├── lib/                  # Third-party library configurations and utilities
│   ├── api.ts           # API utilities and data fetching
│   └── mdx.ts           # MDX processing utilities
├── utils/               # Utility functions and helpers
│   ├── formatting.ts    # Date, number, and text formatting
│   ├── validation.ts    # Form and data validation
│   └── cx.ts           # Class name utilities
├── types/               # TypeScript type definitions
├── constants/           # Application constants and configuration
├── hooks/               # Custom React hooks
├── providers/           # React context providers
├── styles/              # Global styles and CSS
└── content/             # Static content (blog posts, etc.)
```

## Import Conventions

### Components
```typescript
// Use barrel exports for cleaner imports
import { Button, Input, Modal } from '@/components';
```

### Utilities
```typescript
// Import from the utils index
import { formatDate, isValidEmail, cx } from '@/utils';
```

### Types
```typescript
// Import types from the types directory
import type { BlogPost, CaseStudy } from '@/types';
```

### Constants
```typescript
// Import constants from the constants directory
import { SITE_CONFIG, NAVIGATION } from '@/constants';
```

## Component Organization

### Base Components
- **Location**: `components/base/`
- **Purpose**: Fundamental UI components that are used throughout the application
- **Examples**: Button, Input, Select, Checkbox, etc.

### Application Components
- **Location**: `components/application/`
- **Purpose**: Complex components specific to the application's functionality
- **Examples**: Navigation, Modals, Tables, Date Pickers, etc.

### Marketing Components
- **Location**: `components/marketing/`
- **Purpose**: Components used specifically for marketing pages
- **Examples**: Headers, Hero sections, Feature showcases, etc.

### Foundation Components
- **Location**: `components/foundations/`
- **Purpose**: Brand-specific components and design system elements
- **Examples**: Logos, Icons, Social media components, etc.

## Best Practices

1. **Use TypeScript**: All new code should be written in TypeScript
2. **Follow naming conventions**: Use kebab-case for files and folders, PascalCase for components
3. **Create barrel exports**: Use index files to export multiple items from a directory
4. **Keep components focused**: Each component should have a single responsibility
5. **Use proper imports**: Import from the appropriate barrel exports rather than individual files
6. **Document complex logic**: Add comments for complex business logic
7. **Use constants**: Define reusable values in the constants directory

## Adding New Components

1. Create the component in the appropriate directory
2. Add proper TypeScript types
3. Export from the relevant index file
4. Update this README if adding new directories or patterns 