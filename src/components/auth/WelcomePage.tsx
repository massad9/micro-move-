import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Activity, Play, Building2, UserCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface WelcomePageProps {
    onSelectRole: (role: 'admin' | 'employee') => void;
}

export const WelcomePage: React.FC<WelcomePageProps> = ({ onSelectRole }) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="min-h-screen bg-[#0A0A0A] text-white flex flex-col relative overflow-hidden font-sans selection:bg-primary/30">
            {/* Dynamic Background */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary/20 blur-[120px] rounded-full mix-blend-screen" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-blue-500/10 blur-[150px] rounded-full mix-blend-screen" />
                <div className="absolute top-[40%] left-[50%] translate-x-[-50%] w-[100%] h-[20%] bg-purple-500/5 blur-[100px] rounded-full mix-blend-screen" />

                {/* Noise overlay for texture */}
                <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>
            </div>

            {/* Navigation / Header */}
            <header className="relative z-10 px-8 py-6 w-full flex justify-between items-center max-w-7xl mx-auto">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary/50 flex items-center justify-center shadow-[0_0_15px_rgba(var(--primary-rgb),0.5)]">
                        <Activity className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-bold text-xl tracking-tight">Micro Move</span>
                </div>
                <div className="flex gap-4">
                    <Button variant="ghost" className="text-slate-300 hover:text-white hover:bg-white/5" onClick={() => onSelectRole('employee')}>
                        Log In
                    </Button>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 relative z-10 flex flex-col items-center justify-center px-4 pt-12 pb-24 max-w-6xl mx-auto w-full">

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full">

                    {/* Left Column: Copy */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="flex flex-col gap-8"
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium w-fit">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                            </span>
                            The Sitting Disease is Real
                        </div>

                        <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[1.1] text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/60">
                            Cure Burnout with <br />
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-[#ffb938] to-primary bg-[length:200%_auto] animate-gradient">
                                Vibe Engineering
                            </span>
                        </h1>

                        <p className="text-lg md:text-xl text-slate-400 leading-relaxed max-w-xl font-light">
                            Don't let prolonged sitting drain your team's energy and productivity.
                            Micro Move uses AI-driven, context-aware nudges to re-energize your workforce seamlessly throughout the day.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => onSelectRole('admin')}
                                className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-black font-bold rounded-full overflow-hidden transition-all hover:shadow-[0_0_40px_rgba(255,255,255,0.2)]"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-white via-white to-slate-200 opacity-0 group-hover:opacity-100 transition-opacity" />
                                <Building2 className="w-5 h-5 relative z-10" />
                                <span className="relative z-10">Create Company Workspace</span>
                                <Sparkles className="w-4 h-4 text-primary relative z-10" />
                            </motion.button>

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => onSelectRole('employee')}
                                className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-white/5 border border-white/10 text-white font-semibold rounded-full hover:bg-white/10 transition-colors"
                            >
                                <UserCircle className="w-5 h-5" />
                                <span>Employee Login</span>
                            </motion.button>
                        </div>
                    </motion.div>

                    {/* Right Column: Visual / Abstract UI Representation */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="relative lg:h-[600px] flex items-center justify-center perspective-[2000px]"
                    >
                        {/* 3D-ish Card Stacks */}
                        <div className="relative w-full max-w-md" style={{ transformStyle: 'preserve-3d', transform: 'rotateY(-10deg) rotateX(10deg)' }}>

                            {/* Back Card (Stat) */}
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute -top-12 -right-12 w-64 p-6 bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl skew-x-[-2deg]"
                                style={{ transform: 'translateZ(-50px)' }}
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
                                        <Activity className="w-5 h-5 text-red-400" />
                                    </div>
                                    <span className="text-xs font-semibold px-2 py-1 bg-white/5 rounded-full text-white/60">Risk High</span>
                                </div>
                                <h3 className="text-white/80 font-medium mb-1">Sitting Time</h3>
                                <p className="text-3xl font-bold text-white">4h 12m <span className="text-sm font-normal text-red-400">avg</span></p>
                            </motion.div>

                            {/* Front Card (Nudge) */}
                            <motion.div
                                animate={{ y: [0, 10, 0] }}
                                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                                className="relative z-10 w-full bg-[#111] backdrop-blur-2xl border border-white/10 rounded-[2rem] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col gap-6 transform-gpu"
                            >
                                <div className="flex items-center gap-4 border-b border-white/5 pb-6">
                                    <div className="relative">
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-primary to-purple-500 flex items-center justify-center shadow-[0_0_20px_rgba(var(--primary-rgb),0.4)]">
                                            <Sparkles className="w-6 h-6 text-white" />
                                        </div>
                                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-[#111]"></div>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-white tracking-tight">AI Nudge</h3>
                                        <p className="text-sm text-slate-400">Context-Aware Interruption</p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <p className="text-[1.05rem] leading-relaxed text-slate-300">
                                        "<span className="text-white font-medium">Great work on that 90-min meeting!</span> Your posture might need a break. Let's do a 2-min neck stretch to recharge."
                                    </p>

                                    <div className="flex items-center gap-3 pt-4">
                                        <button className="flex-1 bg-primary text-white font-semibold py-3 px-4 rounded-xl flex justify-center items-center gap-2 hover:bg-primary/90 transition-colors">
                                            <Play className="w-4 h-4 fill-current" /> Accept (+20 Pt)
                                        </button>
                                        <button className="py-3 px-4 bg-white/5 text-slate-400 font-medium rounded-xl hover:bg-white/10 hover:text-white transition-colors">
                                            Skip
                                        </button>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Decorative elements */}
                            <div className="absolute top-[20%] -left-16 w-32 h-32 bg-primary/30 blur-[60px] rounded-full mix-blend-screen -z-10" />
                        </div>
                    </motion.div>

                </div>
            </main>

            {/* Adding a global style for the gradient animation just for this page */}
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
