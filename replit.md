# Micro Move

A wellness platform for corporate environments that encourages employees to engage in short, office-friendly physical and mental activities ("Micro Moves") to boost energy and reduce burnout.

## Tech Stack

- **Frontend**: React 19 + TypeScript
- **Build Tool**: Vite 7
- **Styling**: Tailwind CSS + PostCSS
- **UI Components**: Radix UI primitives, Lucide React icons
- **Animations**: Framer Motion
- **State Management**: Zustand
- **AI Integration**: OpenRouter API (Llama 3 / Google Gemma)
- **Notifications**: Sonner

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
├── App.tsx          # Main app with hash-based routing
└── main.tsx         # Entry point
```

## Key Features

- Dual role system: Admin/HR and Employee workflows
- Gamification: points, leaderboards, rewards shop
- AI-generated wellness activities via OpenRouter API
- RTL layout support (Arabic-language targeting)
- Local fallback when AI is unavailable

## Admin Dashboard Design System

- **Background**: #F9FAFB (light gray)
- **Cards**: White (#FFFFFF) with 1px border (#E5E7EB)
- **Primary headings**: #111827, **Secondary text**: #6B7280
- **Sidebar**: Light theme with 1.5px vertical border, active items use #FFF7ED bg + orange accent
- **Shadows**: Soft layered (`shadow-soft`, `shadow-soft-md`, `shadow-soft-lg`)
- **Icons**: Consistent 1.5px stroke weight (strokeWidth={1.5})
- **Search bars**: Inner shadow on focus (`focus:shadow-inner-soft`)
- **AI button**: Mesh gradient background (multi-layer radial gradients)
- **Heatmap cells**: `rounded` corners with `gap-1` spacing
- **Empty states**: `PackageOpen` icon illustration with descriptive text

## Accessibility & Performance

- **prefers-reduced-motion**: Global CSS media query disables animations/transitions for users who prefer reduced motion
- **Transitions**: All `transition-all` replaced with specific properties (`transition-colors`, `transition-shadow`, `transition-[width]`, etc.) for better performance
- **Focus management**: `outline-none` replaced with `focus-visible:outline-none` across all inputs, preserving keyboard focus indicators
- **Icon buttons**: All icon-only buttons have `aria-label` attributes; decorative icons use `aria-hidden="true"`
- **Form labels**: All form labels connected to inputs via `htmlFor`/`id` pairs (RewardsManager, AdminSettings, HrOnboarding, LoginForm, WorkspaceSetup)
- **Search inputs**: Include `name` and `autocomplete="off"` attributes

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
