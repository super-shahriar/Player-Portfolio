# 🎯 Volleyball Portfolio Frontend

A modern, responsive React + Next.js web application for showcasing volleyball players' profiles, statistics, and career highlights. Built with cutting-edge technologies including TypeScript, Tailwind CSS, and shadcn/ui components.

---

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Component Architecture](#component-architecture)
- [Pages & Routes](#pages--routes)
- [UI Components](#ui-components)
- [Styling](#styling)
- [Development Workflow](#development-workflow)
- [Performance Considerations](#performance-considerations)
- [Contributing](#contributing)

---

## ✨ Features

### Player Profiles
- **Comprehensive Player Cards**: Display player information with custom styling
- **Player Directory**: Browse all players with advanced filtering
- **Detailed Player Pages**: In-depth profiles with stats, bio, and highlights

### Filtering & Discovery
- **By Country**: Filter players by nationality
- **By Division**: Filter by competition level
- **By School/University**: View alma mater affiliations
- **By Position/Role**: Find players by specialty
- **Highlight Reels**: Curated collections of best moments

### UI/UX Features
- **Responsive Design**: Mobile-first approach working seamlessly on all devices
- **Dark Mode Support**: Theme provider with light/dark mode toggle
- **Interactive Components**: Smooth animations and transitions
- **Performance Radar**: Visual representation of player statistics
- **Bio Trivia**: Interesting facts about players
- **Statistics Cards**: Key performance indicators at a glance

### Navigation
- **Sidebar Navigation**: Persistent navigation panel
- **Breadcrumb Navigation**: Easy path tracking
- **Search Functionality**: Quick player lookup

---

## 🛠 Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Framework** | Next.js 16.1.6 | React framework with SSR capabilities |
| **Language** | TypeScript 5.7.3 | Type-safe JavaScript development |
| **Styling** | Tailwind CSS 3.4.17 | Utility-first CSS framework |
| **UI Components** | shadcn/ui | High-quality, accessible components |
| **Forms** | React Hook Form 7.54.1 | Efficient form state management |
| **Validation** | Zod 3.24.1 | TypeScript-first schema validation |
| **Charts** | Recharts 2.15.0 | Data visualization for stats |
| **Carousels** | Embla Carousel 8.5.1 | Performant carousel component |
| **Themes** | next-themes 0.4.6 | Next.js dark mode support |
| **Notifications** | Sonner 1.7.1 | Toast notifications |
| **Icons** | Lucide React 0.544.0 | Beautiful SVG icons |
| **Animations** | Tailwindcss-animate 1.0.7 | CSS animations via Tailwind |
| **Utilities** | Classnames / tailwind-merge | CSS class management |

---

## 📁 Project Structure

```
frontend/
├── README.md                 # This file
├── package.json             # Dependencies & scripts
├── tsconfig.json            # TypeScript configuration
├── tailwind.config.ts       # Tailwind CSS customization
├── postcss.config.mjs       # PostCSS configuration
├── next.config.mjs          # Next.js configuration
├── components.json          # shadcn/ui configuration
│
├── app/                      # Next.js App Router
│   ├── layout.tsx           # Root layout wrapper
│   ├── page.tsx             # Home page (/)
│   ├── globals.css          # Global styles
│   │
│   ├── player/
│   │   └── [id]/
│   │       └── page.tsx     # Individual player detail page
│   │
│   └── players/             # Players listing pages
│       ├── page.tsx         # All players view
│       ├── country/
│       │   └── page.tsx     # Filter by country
│       ├── division/
│       │   └── page.tsx     # Filter by division
│       ├── highlights/
│       │   └── page.tsx     # Player highlights/reels
│       ├── school/
│       │   └── page.tsx     # Filter by school
│       └── university/
│           └── page.tsx     # Filter by university
│
├── components/              # React Components
│   ├── athlete-portrait.tsx    # Player profile picture display
│   ├── bio-trivia.tsx          # Interesting facts about player
│   ├── performance-radar.tsx   # Radar chart for stats visualization
│   ├── player-card.tsx         # Reusable player card component
│   ├── sidebar-navbar.tsx      # Main navigation sidebar
│   ├── stats-cards.tsx         # Key statistics display
│   ├── theme-provider.tsx      # Dark/light mode provider
│   │
│   └── ui/                     # shadcn/ui Components Library (40+ components)
│       ├── accordion.tsx
│       ├── alert-dialog.tsx
│       ├── avatar.tsx
│       ├── badge.tsx
│       ├── breadcrumb.tsx
│       ├── button.tsx
│       ├── card.tsx
│       ├── carousel.tsx
│       ├── chart.tsx
│       ├── checkbox.tsx
│       ├── dialog.tsx
│       ├── dropdown-menu.tsx
│       ├── form.tsx
│       ├── input.tsx
│       ├── label.tsx
│       ├── pagination.tsx
│       ├── popover.tsx
│       ├── progress.tsx
│       ├── select.tsx
│       ├── sidebar.tsx
│       ├── skeleton.tsx
│       ├── table.tsx
│       ├── tabs.tsx
│       ├── textarea.tsx
│       ├── toast.tsx
│       ├── toaster.tsx
│       ├── tooltip.tsx
│       └── ... (and 15+ more)
│
├── hooks/                   # Custom React Hooks
│   ├── use-mobile.tsx       # Detect mobile viewport
│   └── use-toast.ts         # Toast notification hook
│
├── lib/                     # Utility Functions
│   ├── player-data.ts       # Player data fetching/formatting
│   └── utils.ts             # General utility functions
│
├── public/                  # Static assets
│   └── [images, icons, etc.]
│
├── styles/                  # Global styles
│   └── globals.css
│
└── .vscode/
    └── settings.json        # VS Code workspace settings

```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** 18.0 or higher
- **npm** 9.0+ or **pnpm** 8.0+

### Installation

1. **Navigate to the frontend directory**:
   ```bash
   cd frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install --legacy-peer-deps
   # or
   pnpm install
   ```

3. **Set up environment variables** (if needed):
   ```bash
   cp .env.example .env.local
   ```
   Edit `.env.local` with your API endpoints and configuration.

4. **Start the development server**:
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

5. **Open in browser**:
   - Local: [http://localhost:3000](http://localhost:3000)
   - Network: [http://192.168.1.108:3000](http://192.168.1.108:3000) (or your local IP)

---

## 📜 Available Scripts

```bash
# Development
npm run dev          # Start dev server with hot reload (Turbopack)

# Production
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint for code quality

# Clear cache
npm run clean        # Remove .next and node_modules
```

---

## 🏗️ Component Architecture

### Smart Components (Pages)
- **app/page.tsx**: Home page with featured players
- **app/players/page.tsx**: Full player directory
- **app/player/[id]/page.tsx**: Individual player detail view
- **Filter pages**: Dynamic routing for different filter criteria

### Presentational Components

#### Layout Components
- `sidebar-navbar.tsx` - Main navigation
- Custom layout structure with responsive design

#### Data Display Components
- `player-card.tsx` - Showcase individual players
- `athlete-portrait.tsx` - Player profile images
- `stats-cards.tsx` - Key metrics display
- `performance-radar.tsx` - Visual stats representation
- `bio-trivia.tsx` - Player facts and trivia

#### UI Component System
All components from shadcn/ui library providing:
- Keyboard accessibility (WCAG 2.1 compliant)
- Consistent design patterns
- Full TypeScript support
- Customizable styling via CSS classes

### Custom Hooks
- `use-mobile` - Responsive breakpoint detection
- `use-toast` - Toast notification system

---

## 📍 Pages & Routes

| Route | Component | Purpose |
|-------|-----------|---------|
| `/` | `page.tsx` | Home page |
| `/players` | `players/page.tsx` | All players listing |
| `/player/[id]` | `player/[id]/page.tsx` | Individual player profile |
| `/players/country` | `players/country/page.tsx` | Filter by nationality |
| `/players/division` | `players/division/page.tsx` | Filter by competition level |
| `/players/school` | `players/school/page.tsx` | Filter by school |
| `/players/university` | `players/university/page.tsx` | Filter by university |
| `/players/highlights` | `players/highlights/page.tsx` | Curated highlights |

---

## 🎨 UI Components

The project includes 40+ pre-built shadcn/ui components:

**Form Components**: `input`, `textarea`, `select`, `checkbox`, `radio-group`, `switch`, `form`

**Display Components**: `card`, `badge`, `avatar`, `progress`, `skeleton`

**Navigation**: `breadcrumb`, `pagination`, `navigation-menu`, `sidebar`

**Dialogs & Modals**: `dialog`, `alert-dialog`, `drawer`, `popover`, `hover-card`

**Details**: `accordion`, `tabs`, `collapsible`, `carousel`

**Tables & Lists**: `table`, `dropdown-menu`, `context-menu`

**Charts**: `chart` (Recharts integration)

**Feedback**: `toast`, `alert`, `tooltip`

All components are customizable and support dark mode.

---

## 🎨 Styling

### Tailwind CSS
- **Version**: 3.4.17 (upgraded to PostCSS 4 compatible)
- **Features**:
  - Responsive design system
  - Dark mode support via `next-themes`
  - Custom animations via `tailwindcss-animate`
  - Utility-first approach for rapid development

### CSS Architecture
```
globals.css          # Global styles and resets
component styles     # Scoped via Tailwind classes
dark mode support    # Via data-[mode] selectors
```

### Typography & Colors
- Consistent color palette throughout
- Semantic color naming
- Accessible contrast ratios

---

## 💻 Development Workflow

### TypeScript Best Practices
- Strict mode enabled in `tsconfig.json`
- All components fully typed
- Type-safe API calls and data handling

### Code Organization
```
// Imports (in order)
import React from 'react'
import { Component } from '@/components'
import { useHook } from '@/hooks'
import { utility } from '@/lib'

// Component definition
export default function MyComponent() {
  // ...
}
```

### Component Template
```tsx
import React from 'react'

interface MyComponentProps {
  title: string
  children?: React.ReactNode
}

export const MyComponent: React.FC<MyComponentProps> = ({ 
  title, 
  children 
}) => {
  return (
    <div className="...">
      <h1>{title}</h1>
      {children}
    </div>
  )
}
```

---

## ⚡ Performance Considerations

### Optimizations
- **Image Optimization**: Next.js `Image` component for automatic optimization
- **Code Splitting**: Automatic per-route code splitting
- **Lazy Loading**: Dynamic imports for heavy components
- **Caching**: Next.js built-in caching strategies
- **Turbopack**: Next.js's fast Rust-based bundler

### Best Practices
1. Use `dynamic()` imports for non-critical components
2. Memoize expensive computations with `useMemo`
3. Use `useCallback` for event handlers
4. Avoid inline functions in renders
5. Leverage Next.js Image for all images

### Bundle Analysis
```bash
npm run build
# Check .next folder for bundle size insights
```

---

## 🔗 Integration with Backend

The frontend connects to the FastAPI backend at:
- **Development**: `http://localhost:8000`
- **Production**: Configure in environment variables

### API Communication
- RESTful endpoints
- JSON request/response format
- Error handling via try-catch
- Loading states for async operations

---

## 📱 Responsive Design

### Breakpoints (Tailwind)
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

### Mobile-First Approach
- Base styles for mobile
- Progressive enhancement for larger screens
- Touch-friendly interactive elements
- Readable font sizes on all devices

---

## 🧪 Testing & Quality

### ESLint
- Automatic code quality checks
- Configured for Next.js best practices

### Recommended Testing Libraries
- **vitest** - Fast unit testing
- **React Testing Library** - Component testing
- **Cypress** - E2E testing

---

## 🤝 Contributing

1. Create a feature branch: `git checkout -b feature/amazing-feature`
2. Commit changes: `git commit -m 'Add amazing feature'`
3. Push to branch: `git push origin feature/amazing-feature`
4. Open a Pull Request

### Code Standards
- Follow ESLint configuration
- Use TypeScript strictly
- Write meaningful commit messages
- Add comments for complex logic

---

## 📝 License

This project is part of the Volleyball Portfolio application.

---

## 🙋 Support & Questions

For issues, questions, or suggestions:
1. Check existing documentation
2. Review component examples
3. Open an issue on GitHub
4. Reach out to the development team

---

## 🚀 Future Enhancements

- [ ] Real-time player statistics updates
- [ ] Advanced search and filtering
- [ ] Player comparison tool
- [ ] Social sharing features
- [ ] Video uploads and streaming
- [ ] Analytics dashboard
- [ ] PWA support

---

**Happy coding! 🎉**
