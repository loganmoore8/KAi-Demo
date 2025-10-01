# Public Assets

This folder contains all static assets served by the website.

## Structure

```
public/
├── favicon.ico          # Website favicon
├── images/              # Image assets
│   └── Line pattern.svg # Background pattern used in mockups
├── videos/              # Video assets
│   └── demo_placeholder.mp4 # Demo video for modals (80MB)
└── placeholders/        # Company logo placeholders
    ├── Company=Cooperative, Style=Default, Dark mode=True.svg
    ├── Company=Goodwell, Style=Default, Dark mode=True.svg
    ├── Company=Visionwork, Style=Default, Dark mode=True.svg
    └── Company=Watchtower, Style=Default, Dark mode=True.svg
```

## Usage

- **favicon.ico**: Automatically served as the website favicon
- **images/**: Contains SVG patterns and other image assets
- **videos/**: Contains video files for modals and demonstrations
- **placeholders/**: Contains company logos used in testimonials

## File Sizes

- `demo_placeholder.mp4`: 80MB - Consider optimizing or replacing with a smaller file for production
- All other files are under 20KB and optimized

## Notes

- All paths in the code reference these files from the root `/` (e.g., `/images/line pattern.svg`)
- The `demo_placeholder.mp4` file is quite large and should be optimized for production use 