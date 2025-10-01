// Application constants and configuration

export const SITE_CONFIG = {
  name: "Guided Safety",
  description: "Case Management for Impact Response Teams",
  url: "https://guided-safety.com",
  ogImage: "/og-image.jpg",
  links: {
    twitter: "https://twitter.com/guidedsafety",
    github: "https://github.com/guided-safety",
    linkedin: "https://linkedin.com/company/guided-safety",
  },
} as const;

export const NAVIGATION = {
  main: [
    { name: "Features", href: "/features" },
    { name: "Case Studies", href: "/case-study" },
    { name: "Blog", href: "/blog" },
    { name: "About", href: "/about" },
  ],
  footer: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Contact", href: "/contact" },
  ],
} as const;

export const FEATURES = [
  {
    id: "case-management",
    title: "Case Management",
    description: "Streamlined case tracking and management for response teams",
    benefits: ["Real-time updates", "Team collaboration", "Automated workflows"],
  },
  {
    id: "response-tracking",
    title: "Response Tracking",
    description: "Monitor and optimize response times for critical incidents",
    benefits: ["Performance metrics", "Analytics dashboard", "Historical data"],
  },
  {
    id: "mission-readiness",
    title: "Mission Readiness",
    description: "Ensure your team is always prepared for any situation",
    benefits: ["Training modules", "Equipment tracking", "Readiness assessments"],
  },
] as const;

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const; 