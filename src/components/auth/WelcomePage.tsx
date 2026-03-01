import React from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, Zap, ArrowRight } from 'lucide-react';

interface WelcomePageProps {
    onSelectRole: (role: 'admin' | 'employee') => void;
}

export const WelcomePage: React.FC<WelcomePageProps> = ({ onSelectRole }) => {
    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 relative overflow-hidden font-sans">
            {/* Subtle background decoration */}
            <div className="absolute top-0 inset-x-0 h-64 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="w-full max-w-4xl relative z-10"
            >
                <div className="text-center mb-12">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.1, duration: 0.5 }}
                        className="w-16 h-16 bg-white rounded-2xl shadow-sm border border-slate-200 flex items-center justify-center mx-auto mb-6"
                    >
                        <Zap className="w-8 h-8 text-primary" />
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight mb-4"
                    >
                        Welcome to Micro Move
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        className="text-lg text-slate-500 max-w-lg mx-auto"
                    >
                        Select your portal to continue. Experience a unified, intelligent approach to workplace movement.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                    {/* Employee Card */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                        whileHover={{ scale: 1.02, y: -4 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => onSelectRole('employee')}
                        className="bg-white rounded-2xl p-8 cursor-pointer border border-slate-200 shadow-sm hover:shadow-md transition-all group relative overflow-hidden flex flex-col items-center text-center h-full"
                    >
                        <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                            <Zap className="w-8 h-8 text-primary" />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900 mb-3">Employee Zone</h2>
                        <p className="text-slate-500 mb-8 flex-1">
                            Track movement, earn rewards, and stay active throughout your workday.
                        </p>
                        <div className="flex items-center text-primary font-semibold text-sm tracking-wide gap-2 group-hover:gap-3 transition-all">
                            ENTER PORTAL
                            <ArrowRight className="w-4 h-4" />
                        </div>
                    </motion.div>

                    {/* Admin Card */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                        whileHover={{ scale: 1.02, y: -4 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => onSelectRole('admin')}
                        className="bg-white rounded-2xl p-8 cursor-pointer border border-slate-200 shadow-sm hover:shadow-md transition-all group relative overflow-hidden flex flex-col items-center text-center h-full"
                    >
                        <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-slate-200 transition-colors">
                            <ShieldAlert className="w-8 h-8 text-slate-700" />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900 mb-3">Control Center</h2>
                        <p className="text-slate-500 mb-8 flex-1">
                            Monitor global engagement, configure activities, and access telemetry.
                        </p>
                        <div className="flex items-center text-slate-700 font-semibold text-sm tracking-wide gap-2 group-hover:gap-3 transition-all">
                            ENTER PORTAL
                            <ArrowRight className="w-4 h-4" />
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
};
