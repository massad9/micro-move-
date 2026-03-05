import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, Play, Coffee, Flame } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const ContextNudgeModal: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);

    // Simulate the nudge appearing after 5 seconds on the dashboard
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 5000);
        return () => clearTimeout(timer);
    }, []);

    if (!isVisible) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 font-sans">
                {/* Backdrop */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setIsVisible(false)}
                    className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                />

                {/* Modal */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                    className="relative w-full max-w-lg bg-white rounded-[2rem] shadow-2xl border border-slate-200 overflow-hidden"
                >
                    {/* Decorative Header Background */}
                    <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-br from-primary/20 via-primary/5 to-transparent pointer-events-none" />

                    <button
                        onClick={() => setIsVisible(false)}
                        className="absolute top-6 right-6 p-2 bg-white/50 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-600 transition-colors z-10"
                    >
                        <X className="w-5 h-5" />
                    </button>

                    <div className="p-8 relative z-10 flex flex-col items-center text-center mt-4">
                        <div className="relative mb-6">
                            <div className="absolute inset-0 bg-primary/20 scale-150 blur-xl rounded-full" />
                            <div className="w-16 h-16 bg-white border border-slate-200 shadow-sm rounded-full flex items-center justify-center relative z-10">
                                <Sparkles className="w-8 h-8 text-primary" />
                            </div>
                            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-amber-100 border-2 border-white rounded-full flex items-center justify-center shadow-sm z-20">
                                <Flame className="w-4 h-4 text-amber-500" />
                            </div>
                        </div>

                        <span className="text-xs font-bold uppercase tracking-widest text-primary mb-2 bg-primary/10 px-3 py-1 rounded-full">Automated AI Nudge</span>
                        <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-3">
                            Great work on that long meeting!
                        </h2>
                        <p className="text-slate-500 text-[15px] leading-relaxed max-w-sm mb-8">
                            Your calendar shows you've been sitting for 90 minutes.
                            How about a quick <b>2-minute Box Breathing</b> session to recharge?
                        </p>

                        <div className="w-full flex items-center gap-3">
                            <Button
                                onClick={() => setIsVisible(false)}
                                variant="outline"
                                className="flex-1 h-14 rounded-xl text-slate-600 font-bold border-slate-200 hover:bg-slate-50"
                            >
                                <Coffee className="w-4 h-4 mr-2" />
                                Snooze (15m)
                            </Button>
                            <Button
                                onClick={() => setIsVisible(false)}
                                className="flex-[2] h-14 rounded-xl bg-slate-900 text-white font-bold hover:bg-slate-800 shadow-md hover:shadow-xl transition-all hover:-translate-y-0.5"
                            >
                                <Play className="w-4 h-4 mr-2 fill-current" />
                                Accept (+40 pts)
                            </Button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};
