import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { HeroSection } from '@/components/landing/HeroSection';
import { SocialProofSection } from '@/components/landing/SocialProofSection';
import { BenefitsSection } from '@/components/landing/BenefitsSection';
import { HowItWorksSection } from '@/components/landing/HowItWorksSection';
import { PricingSection } from '@/components/landing/PricingSection';
import { FaqSection } from '@/components/landing/FaqSection';
import { CtaSection } from '@/components/landing/CtaSection';
export const WelcomePage = ({ onSelectRole, onSetupWorkspace }) => {
    return (_jsxs("div", { className: "min-h-screen bg-[#0A0A0A] text-white flex flex-col relative overflow-x-hidden font-sans selection:bg-primary/30", children: [_jsxs("div", { className: "absolute inset-0 z-0", children: [_jsx("div", { className: "absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-primary/20 blur-[120px] rounded-full mix-blend-screen" }), _jsx("div", { className: "absolute bottom-[-20%] left-[-10%] w-[60%] h-[60%] bg-orange-400/10 blur-[150px] rounded-full mix-blend-screen" }), _jsx("div", { className: "absolute top-[40%] left-[50%] translate-x-[-50%] w-[100%] h-[20%] bg-amber-500/5 blur-[100px] rounded-full mix-blend-screen" }), _jsx("div", { className: "absolute inset-0 opacity-[0.03] mix-blend-overlay", style: { backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' } })] }), _jsxs("div", { className: "relative z-10", children: [_jsx(HeroSection, { onSelectRole: onSelectRole, onSetupWorkspace: onSetupWorkspace }), _jsx(SocialProofSection, {}), _jsx(BenefitsSection, {}), _jsx(HowItWorksSection, {}), _jsx(PricingSection, {}), _jsx(FaqSection, {}), _jsx(CtaSection, { onSelectRole: onSelectRole, onSetupWorkspace: onSetupWorkspace })] }), _jsx("footer", { className: "relative z-10 border-t border-white/5 py-12 px-8", children: _jsx("div", { className: "max-w-6xl mx-auto", children: _jsxs("div", { className: "flex flex-col md:flex-row justify-between items-center gap-8", children: [_jsx("div", { className: "flex items-center gap-2", children: _jsx("img", { src: "/logo.png", alt: "Micro Move", className: "h-6 brightness-0 invert" }) }), _jsxs("div", { className: "flex flex-wrap items-center justify-center gap-6 text-sm text-slate-500", children: [_jsx("button", { onClick: () => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' }), className: "hover:text-white transition-colors", children: "\u0627\u0644\u0623\u0633\u0639\u0627\u0631" }), _jsx("button", { onClick: () => window.scrollTo({ top: 0, behavior: 'smooth' }), className: "hover:text-white transition-colors", children: "\u0627\u0644\u0631\u0626\u064A\u0633\u064A\u0629" })] }), _jsx("p", { className: "text-sm text-slate-500", children: "\u00A9 \u0662\u0660\u0662\u0665 \u0645\u0627\u064A\u0643\u0631\u0648 \u0645\u0648\u0641. \u062C\u0645\u064A\u0639 \u0627\u0644\u062D\u0642\u0648\u0642 \u0645\u062D\u0641\u0648\u0638\u0629." })] }) }) }), _jsx("style", { dangerouslySetInnerHTML: {
                    __html: `
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          animation: gradient 8s ease infinite;
        }
      `
                } })] }));
};
