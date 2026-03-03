import React from 'react';
import { Button } from '@/components/ui/button';
import { Sparkles, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export const HeroBanner: React.FC = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative overflow-hidden bg-indigo-600 rounded-3xl p-8 md:p-12 mb-8 text-white shadow-lg shadow-indigo-600/20"
        >
            {/* Abstract Decorative Elements mimicking the screenshot */}
            <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob" />
            <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000" />

            {/* Star Icons */}
            <Sparkles className="absolute top-8 right-32 w-24 h-24 text-indigo-400/30 -rotate-12" />
            <Sparkles className="absolute bottom-8 right-16 w-32 h-32 text-indigo-400/20 rotate-12" />

            <div className="relative z-10 max-w-xl">
                <span className="inline-block px-3 py-1 mb-4 text-xs font-bold tracking-widest text-indigo-200 uppercase bg-indigo-800/50 rounded-full backdrop-blur-sm">
                    MICRO MOVE
                </span>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 leading-tight">
                    Sharpen Your Focus with <br /> Micro Movements
                </h1>
                <p className="text-indigo-100 text-lg mb-8 max-w-md leading-relaxed">
                    Unlock your potential today. Stay engaged, earn points, and build momentum towards your daily goals.
                </p>

                <Button
                    className="bg-slate-900 hover:bg-slate-800 text-white rounded-full px-8 py-6 h-auto text-base font-semibold group flex items-center gap-2 transition-all shadow-xl hover:shadow-slate-900/20 border-0"
                >
                    Start Moving
                    <div className="bg-white text-slate-900 rounded-full p-1 group-hover:translate-x-1 transition-transform">
                        <ArrowRight className="w-4 h-4" />
                    </div>
                </Button>
            </div>
        </motion.div>
    );
};
