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
            <div className="absolute inset-0 z-0 overflow-hidden">
                <div className="absolute top-[-15%] right-[-5%] w-[40%] h-[40%] bg-primary/8 blur-[120px] rounded-full" />
                <div className="absolute bottom-[-15%] left-[-5%] w-[35%] h-[35%] bg-violet-500/5 blur-[120px] rounded-full" />
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
