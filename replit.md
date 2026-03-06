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
