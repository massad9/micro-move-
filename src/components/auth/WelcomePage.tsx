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
}

export const WelcomePage: React.FC<WelcomePageProps> = ({ onSelectRole }) => {
    return (
        <div className="min-h-screen bg-[#0A0A0A] text-white flex flex-col relative overflow-hidden font-sans selection:bg-primary/30">
            <div className="absolute inset-0 z-0">
                <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-primary/20 blur-[120px] rounded-full mix-blend-screen" />
                <div className="absolute bottom-[-20%] left-[-10%] w-[60%] h-[60%] bg-orange-400/10 blur-[150px] rounded-full mix-blend-screen" />
                <div className="absolute top-[40%] left-[50%] translate-x-[-50%] w-[100%] h-[20%] bg-amber-500/5 blur-[100px] rounded-full mix-blend-screen" />
                <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>
            </div>

            <div className="relative z-10">
                <HeroSection onSelectRole={onSelectRole} />
                <SocialProofSection />
                <BenefitsSection />
                <HowItWorksSection />
                <PricingSection />
                <FaqSection />
                <CtaSection onSelectRole={onSelectRole} />
            </div>

            <footer className="relative z-10 border-t border-white/5 py-12 px-8">
                <div className="max-w-6xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                        <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary to-primary/50 flex items-center justify-center">
                                <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></svg>
                            </div>
                            <span className="font-bold text-sm">مايكرو موف</span>
                        </div>

                        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-500">
                            <button onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-white transition-colors">الأسعار</button>
                            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-white transition-colors">الرئيسية</button>
                        </div>

                        <p className="text-sm text-slate-500">© ٢٠٢٥ مايكرو موف. جميع الحقوق محفوظة.</p>
                    </div>
                </div>
            </footer>

            <style dangerouslySetInnerHTML={{
                __html: `
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          animation: gradient 8s ease infinite;
        }
      `}} />
        </div>
    );
};
