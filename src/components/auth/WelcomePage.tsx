import React from 'react';
import { HeroSection } from '@/components/landing/HeroSection';
import { SocialProofSection } from '@/components/landing/SocialProofSection';
import { BenefitsSection } from '@/components/landing/BenefitsSection';
import { HowItWorksSection } from '@/components/landing/HowItWorksSection';
import { PricingSection } from '@/components/landing/PricingSection';
import { FaqSection } from '@/components/landing/FaqSection';
import { CtaSection } from '@/components/landing/CtaSection';

interface WelcomePageProps {
    onSelectRole: (role: 'admin' | 'employee') => void;
    onSetupWorkspace?: () => void;
}

export const WelcomePage: React.FC<WelcomePageProps> = ({ onSelectRole, onSetupWorkspace }) => {
    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col relative overflow-x-hidden font-sans">
            <div className="absolute inset-0 z-0 overflow-hidden bg-[#030712]">
                <div className="absolute top-[-20%] right-[-10%] w-[60vw] h-[60vh] bg-primary/30 blur-[160px] rounded-full animate-mesh-1 mix-blend-screen" />
                <div className="absolute bottom-[-10%] left-[-20%] w-[50vw] h-[50vh] bg-indigo-600/20 blur-[150px] rounded-full animate-mesh-2 mix-blend-screen" />
                <div className="absolute top-[30%] left-[20%] w-[50vw] h-[50vh] bg-amber-500/15 blur-[140px] rounded-full animate-mesh-3 mix-blend-screen" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#030712_120%)] opacity-90" />
                <div className="noise-overlay" />
            </div>

            <div className="relative z-10">
                <HeroSection onSelectRole={onSelectRole} onSetupWorkspace={onSetupWorkspace} />
                <SocialProofSection />
                <BenefitsSection />
                <HowItWorksSection />
                <PricingSection />
                <FaqSection />
                <CtaSection onSetupWorkspace={onSetupWorkspace} />
            </div>

            <footer className="relative z-10 border-t border-border py-8 px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="flex items-center gap-2">
                            <img src="/logo.png" alt="Micro Move" className="h-5 brightness-0 invert opacity-60" />
                        </div>

                        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-text-quaternary">
                            <button onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-text-secondary transition-colors cursor-pointer">الأسعار</button>
                            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-text-secondary transition-colors cursor-pointer">الرئيسية</button>
                        </div>

                        <p className="text-xs text-text-quaternary">© ٢٠٢٥ مايكرو موف. جميع الحقوق محفوظة.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};
