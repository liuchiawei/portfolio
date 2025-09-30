# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server with Turbopack (Next.js 15 with App Router)
- `npm run build` - Build production version
- `npm start` - Start production server
- `npm run lint` - Run ESLint checks

## Project Architecture

This is a Next.js 15 portfolio website for an illustrator/frontend engineer built with the App Router and TypeScript. The architecture follows modern React patterns with server components and client-side interactivity.

### Key Technologies
- **Framework**: Next.js 15 with App Router and Turbopack
- **Styling**: Tailwind CSS v4 with shadcn/ui components
- **Animation**: Framer Motion for page transitions and UI animations
- **Theme**: next-themes for dark/light mode switching
- **Analytics**: Vercel Analytics integration
- **Type Safety**: Full TypeScript with strict mode enabled

### Project Structure
```
src/
├── app/                    # App Router pages and API routes
│   ├── api/works/          # API endpoint for portfolio works pagination
│   ├── contact/            # Contact page
│   ├── profile/            # Profile/about page
│   └── works/              # Portfolio works listing and detail pages
├── components/             # React components
│   ├── ui/                 # shadcn/ui components (WorksGrid, etc.)
│   └── [custom components] # Custom UI components with animations
├── data/                   # Static JSON data files
│   ├── works.json          # Portfolio works data
│   ├── skillset.json       # Skills/abilities data
│   └── timeline.json       # Timeline/experience data
├── hooks/                  # Custom React hooks
└── lib/                    # Utilities and type definitions
```

### Data Architecture
- **Portfolio Works**: Stored in `src/data/works.json` with pagination API at `/api/works`
- **Static Assets**: Organized in `public/images/works/` with detail images in subdirectories
- **Type Definitions**: Centralized in `src/lib/props.ts` for WorksProps and other interfaces

### UI Architecture
- Uses shadcn/ui components with "new-york" style variant
- Custom animated components built with Framer Motion
- Responsive grid layouts for portfolio items
- Dark/light theme support with next-themes
- Japanese and English language support (primary: Japanese)

### Component Patterns
- Server Components by default with selective client components for interactivity
- Custom hooks for responsive behavior (useMobile)
- Reusable UI components following shadcn/ui patterns
- Animation variants defined with Framer Motion

### Configuration Notes
- Path aliases configured: `@/*` maps to `src/*`
- ESLint extends Next.js core-web-vitals and TypeScript rules
- Tailwind CSS v4 with custom configuration
- TypeScript strict mode enabled with ES2017 target

### Future Database Migration
The API route includes a TODO comment indicating plans to migrate from JSON files to Prisma/database storage for portfolio works data.