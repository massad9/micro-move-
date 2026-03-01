import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Loader2, Zap, ShieldAlert } from 'lucide-react';

interface LoginFormProps {
    role: 'admin' | 'employee';
    onLogin: () => void;
    onBack: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ role, onLogin, onBack }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const isAdmin = role === 'admin';

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate network request
        setTimeout(() => {
            setIsLoading(false);
            onLogin();
        }, 1200);
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col p-6 md:p-12 relative overflow-hidden font-sans">
            {/* Subtle background decoration */}
            <div className="absolute top-0 inset-x-0 h-64 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />

            <motion.button
                onClick={onBack}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="relative z-10 flex items-center gap-2 text-slate-600 hover:text-slate-900 font-medium text-sm transition-colors w-max bg-white/50 backdrop-blur-sm px-4 py-2 rounded-xl border border-slate-200 shadow-sm"
            >
                <ArrowLeft className="w-4 h-4" />
                Back to Welcome
            </motion.button>

            <div className="flex-1 flex items-center justify-center relative z-10 w-full mb-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, type: 'spring', damping: 25 }}
                    className="w-full max-w-md bg-white p-8 md:p-10 rounded-[2rem] shadow-sm border border-slate-200 relative"
                >
                    <div className="flex flex-col items-center text-center mb-8">
                        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-slate-100 ${isAdmin ? 'bg-slate-50' : 'bg-primary/10'}`}>
                            {isAdmin ? <ShieldAlert className="w-8 h-8 text-slate-700" /> : <Zap className="w-8 h-8 text-primary" />}
                        </div>
                        <h1 className="text-3xl font-bold text-slate-900 tracking-tight mb-2">
                            {isAdmin ? 'Admin Portal' : 'Employee Portal'}
                        </h1>
                        <p className="text-slate-500 text-sm font-medium">
                            {isAdmin ? 'Sign in to access system controls.' : 'Sign in to access your dashboard.'}
                        </p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-5">
                        <div className="space-y-1.5">
                            <label className="text-sm font-semibold text-slate-700 ml-1" htmlFor="email">
                                {isAdmin ? 'Clearance Identifier' : 'Employee ID'}
                            </label>
                            <input
                                id="email"
                                type="email"
                                required
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none font-medium text-slate-900 placeholder:text-slate-400"
                                placeholder={isAdmin ? "admin@micromove.sa" : "employee@micromove.sa"}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-sm font-semibold text-slate-700 ml-1" htmlFor="password">
                                {isAdmin ? 'Access Code' : 'Passkey'}
                            </label>
                            <input
                                id="password"
                                type="password"
                                required
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none font-medium text-slate-900 placeholder:text-slate-400"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <div className="pt-4">
                            <button
                                type="submit"
                                className="w-full bg-primary text-primary-foreground py-3.5 rounded-xl font-semibold hover:bg-primary/90 hover:shadow-md transition-all duration-200 active:scale-[0.98]"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        Authenticating...
                                    </span>
                                ) : (
                                    'Sign In'
                                )}
                            </button>
                        </div>
                    </form>

                    <div className="mt-8 text-center">
                        <a href="#" className="text-sm font-medium text-slate-500 hover:text-primary transition-colors">
                            Forgot your credentials?
                        </a>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};
