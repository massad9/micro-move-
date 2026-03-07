# Micro Move

A wellness platform for corporate environments that encourages employees to engage in short, office-friendly physical and mental activities ("Micro Moves") to boost energy and reduce burnout.

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite 7
- **Styling**: Tailwind CSS v4 (CSS-first `@theme` configuration)
- **UI Components**: Radix UI primitives, Lucide React icons
- **Animations**: Framer Motion
- **State Management**: Zustand
- **AI Integration**: OpenRouter API (Llama 3 / Google Gemma)
- **Notifications**: Sonner (dark theme)

## Project Structure

```
src/
├── components/
│   ├── admin/       # Admin dashboard and management tools
│   ├── auth/        # Login, onboarding, and landing pages (WelcomePage composes landing sections)
│   ├── employee/    # Employee activity feeds and rewards
│   ├── landing/     # Landing page section components
│   │   ├── HeroSection.tsx
│   │   ├── SocialProofSection.tsx
│   │   ├── BenefitsSection.tsx
│   │   ├── HowItWorksSection.tsx
│   │   ├── PricingSection.tsx
│   │   ├── FaqSection.tsx
│   │   └── CtaSection.tsx
│   ├── skeletons/   # Loading state UI components
│   └── ui/          # Reusable UI primitives
├── lib/             # Utility functions and OpenRouter API integration
├── store/           # Zustand global state (microMoveStore.ts)
├── App.tsx          # Main app with state-driven routing
└── main.tsx         # Entry point
```

## Key Features

- Dual role system: Admin/HR and Employee workflows
- Gamification: points, leaderboards, rewards shop
- AI-generated wellness activities via OpenRouter API
- RTL layout support (Arabic-language targeting)
- Local fallback when AI is unavailable

## Design System — Linear-inspired Dark SaaS

### Visual Identity
- **Aesthetic**: Dark, minimal, premium — inspired by Linear.app
- **Theme**: Dark-first (no light mode toggle). Deep black backgrounds with layered surfaces.
- **Typography**: IBM Plex Sans Arabic. Confident headings, clean body text, muted secondary text.
- **Border radius**: Tighter (`rounded-lg`, `rounded-xl`, `rounded-2xl`) — no bubbly shapes
- **Motion**: Subtle fade-in-up transitions via Framer Motion, minimal micro-interactions

### Color Tokens (in `@theme` block, `src/index.css`)
- **Background**: `#09090b` (near-black)
- **Surfaces**: `surface-1` (#111113), `surface-2` (#1c1c22), `surface-3` (#27272a) — layered elevation
- **Text hierarchy**: `text-primary` (#fafafa), `text-secondary` (#a1a1aa), `text-tertiary` (#71717a), `text-quaternary` (#52525b)
- **Primary accent**: Violet (#8b5cf6) — buttons, links, active states
- **Energy accent**: Orange (#f97316) — activity-related, gamification
- **Borders**: `rgba(255,255,255,0.06)` — very subtle white transparency
- **Destructive**: Red (#ef4444) — error states, danger zones
- **Activity categories**: emerald (physical), rose (mindfulness), violet (social), blue (hydration)

### Shadows & Glows
- `shadow-soft`, `shadow-soft-md`, `shadow-soft-lg` — dark shadows with higher opacity
- `shadow-glow-sm`, `shadow-glow-md` — violet glow effects for emphasis
- `shadow-glow-accent` — orange glow for activity contexts

### Utility Classes
- `.glass` — glass-morphism effect (blur + semi-transparent bg + thin border)
- `.glass-subtle` — lighter glass effect
- `.glow-primary` / `.glow-accent` — box-shadow glow effects
- `.gradient-text` — white-to-gray text gradient
- `.gradient-text-primary` — violet text gradient
- `.gradient-text-accent` — orange text gradient
- `.line-border-b` / `.line-border-t` — thin border lines

### Component Architecture
- **Variants**: `cva` (class-variance-authority) in `src/lib/variants.ts` — `buttonVariants` (7 variants: default/destructive/outline/secondary/ghost/link/accent), `badgeVariants` (6 variants: default/secondary/destructive/outline/success/warning)
- **Class merging**: `cn()` utility via `clsx` + `tailwind-merge` in `src/lib/utils.ts`
- **Build pipeline**: `@tailwindcss/vite` plugin + `@tailwindcss/postcss` in PostCSS config

### Component Styling Patterns
- **Cards**: `bg-surface-1 border border-border rounded-xl`
- **Inputs**: `bg-surface-2 border border-border text-text-primary placeholder:text-text-quaternary rounded-lg focus:border-primary/50`
- **Buttons**: Use `buttonVariants` — primary (violet), accent (orange), secondary (surface-2), ghost, outline
- **Nav items**: `text-text-tertiary hover:text-text-primary hover:bg-surface-2`, active: `bg-surface-2 text-text-primary`
- **Admin sidebar**: `bg-surface-1`, active items with violet accent bar
- **Bottom nav**: `bg-surface-1/90 backdrop-blur`, active: `text-primary`

## Accessibility & Performance

- **prefers-reduced-motion**: Global CSS media query disables animations/transitions
- **Focus management**: `focus-visible:outline-none` with ring states on interactive elements
- **Icon buttons**: All icon-only buttons have `aria-label` attributes; decorative icons use `aria-hidden="true"`
- **Form labels**: Connected via `htmlFor`/`id` pairs
- **Touch targets**: Mobile elements meet 44x44px minimum
- **Cursor pointer**: All clickable elements show pointer cursor
- **Color contrast**: Meets WCAG AA ratios in dark theme (text-secondary on background)
- **Skeleton loading**: Dark skeleton states for initial loads
- **SVG icons**: Lucide icons for categories (PersonStanding, Brain, Coffee, Droplets)
- **Keyboard accessibility**: role="button", tabIndex, onKeyDown on non-native interactive elements

## Development

```bash
npm install
npm run dev   # Runs on port 5000
```

## Deployment

Configured as a static site deployment:
- Build command: `npm run build`
- Public directory: `dist`

## Environment Variables

- OpenRouter API key may be required for AI activity generation (used in `src/lib/gemini.ts`)
