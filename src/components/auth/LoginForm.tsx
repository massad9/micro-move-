import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Loader2, Zap, ShieldAlert } from 'lucide-react';
import { useMicroMoveStore } from '@/store/microMoveStore';
import { toast } from 'sonner';

interface LoginFormProps {
    role: 'admin' | 'employee';
    onLogin: () => void;
    onBack: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ role, onLogin, onBack }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isOnboarding, setIsOnboarding] = useState(false); // Simulated state for new admin

    const isAdmin = role === 'admin';

    const login = useMicroMoveStore(state => state.login);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate network request
        setTimeout(() => {
            setIsLoading(false);
            if (isAdmin && isOnboarding) {
                // For new admins creating a workspace, pretend the email is new and valid, then instantly login as admin
                login('admin@micromove.sa', 'admin');
                onLogin();
                toast.success('Workspace created successfully!');
                return;
            }

            const success = login(email, role);
            if (success) {
                onLogin();
            } else {
                toast.error('Invalid credentials. Please use admin@micromove.sa for admin access.');
            }
        }, 1000);
    };

    const handleSSO = (provider: string) => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            login(`employee @${provider}.com`, 'employee');
            onLogin();
            toast.success(`Logged in with ${provider} successfully!`);
        }, 800);
    };

    return (
        <div className="min-h-screen bg-[#050505] flex flex-col p-6 md:p-12 relative overflow-hidden font-sans text-white">
            {/* Dynamic minimal background */}
            <div className="absolute inset-0 pointer-events-none z-0">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[100px]" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-[100px]" />
            </div>

            <motion.button
                onClick={onBack}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="relative z-10 flex items-center gap-2 text-slate-400 hover:text-white font-medium text-sm transition-colors w-max bg-white/5 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/10 shadow-sm"
            >
                <ArrowLeft className="w-4 h-4" />
                Back to Welcome
            </motion.button>

            <div className="flex-1 flex items-center justify-center relative z-10 w-full mb-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, type: 'spring', damping: 25 }}
                    className="w-full max-w-md bg-[#111] p-8 md:p-10 rounded-[2rem] shadow-2xl border border-white/10 relative"
                >
                    <div className="flex flex-col items-center text-center mb-8">
                        <div className={`w - 16 h - 16 rounded - 2xl flex items - center justify - center mb - 6 shadow - sm border border - white / 10 ${isAdmin ? 'bg-slate-800' : 'bg-primary/20'} `}>
                            {isAdmin ? <ShieldAlert className="w-8 h-8 text-slate-300" /> : <Zap className="w-8 h-8 text-primary" />}
                        </div>
                        <h1 className="text-3xl font-bold text-white tracking-tight mb-2">
                            {isAdmin ? (isOnboarding ? 'Create Workspace' : 'Admin Portal') : 'Employee Portal'}
                        </h1>
                        <p className="text-slate-400 text-sm font-medium">
                            {isAdmin
                                ? (isOnboarding ? 'Sign up to start configuring your company.' : 'Sign in to access system controls.')
                                : 'Access your dashboard effortlessly.'}
                        </p>
                    </div>

                    {/* Employee SSO Options */}
                    {!isAdmin && (
                        <div className="space-y-3 mb-6">
                            <button onClick={() => handleSSO('microsoft')} className="w-full flex justify-center items-center gap-3 bg-[#2F2F2F] hover:bg-[#3F3F3F] text-white py-3 border border-white/5 rounded-xl transition-colors font-medium">
                                <svg className="w-5 h-5" viewBox="0 0 21 21" fill="none"><rect x="1" y="1" width="9" height="9" fill="#F25022" /><rect x="11" y="1" width="9" height="9" fill="#7FBA00" /><rect x="1" y="11" width="9" height="9" fill="#00A4EF" /><rect x="11" y="11" width="9" height="9" fill="#FFB900" /></svg>
                                Continue with Microsoft
                            </button>
                            <button onClick={() => handleSSO('google')} className="w-full flex justify-center items-center gap-3 bg-[#2F2F2F] hover:bg-[#3F3F3F] text-white py-3 border border-white/5 rounded-xl transition-colors font-medium">
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" /></svg>
                                Continue with Google
                            </button>

                            <div className="relative flex items-center py-2">
                                <div className="flex-grow border-t border-white/10"></div>
                                <span className="flex-shrink-0 mx-4 text-slate-500 text-xs">OR EMAIL</span>
                                <div className="flex-grow border-t border-white/10"></div>
                            </div>
                        </div>
                    )}

                    <form onSubmit={handleLogin} className="space-y-4">
                        <div className="space-y-1.5">
                            <label className="text-sm font-semibold text-slate-300 ml-1" htmlFor="email">
                                {isAdmin ? 'Work Email' : 'Company Email'}
                            </label>
                            <input
                                id="email"
                                type="email"
                                required
                                className="w-full px-4 py-3 bg-[#1A1A1A] border border-white/10 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none font-medium text-white placeholder:text-slate-500"
                                placeholder={isAdmin ? "admin@micromove.sa" : "employee@company.com"}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        {!(!isAdmin && email === '') && (
                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="space-y-1.5">
                                <label className="text-sm font-semibold text-slate-300 ml-1" htmlFor="password">
                                    {isOnboarding ? 'Create Password' : 'Password'}
                                </label>
                                <input
                                    id="password"
                                    type="password"
                                    required={!(!isAdmin && email === '')}
                                    className="w-full px-4 py-3 bg-[#1A1A1A] border border-white/10 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none font-medium text-white placeholder:text-slate-500"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </motion.div>
                        )}

                        <div className="pt-2">
                            <button
                                type="submit"
                                className={`w - full ${isAdmin ? 'bg-slate-200 text-slate-900 hover:bg-white' : 'bg-primary text-white hover:bg-primary/90'} py - 3.5 rounded - xl font - bold transition - all duration - 200 active: scale - [0.98] shadow - lg`}
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        {isOnboarding ? 'Creating Workspace...' : 'Authenticating...'}
                                    </span>
                                ) : (
                                    isAdmin ? (isOnboarding ? 'Create Workspace' : 'Enter Control Center') : (email ? 'Sign In with Email' : 'Send Magic Link')
                                )}
                            </button>
                        </div>
                    </form>

                    {isAdmin && (
                        <div className="mt-6 text-center text-sm">
                            <span className="text-slate-400">
                                {isOnboarding ? 'Already have a workspace? ' : 'New to Micro Move? '}
                            </span>
                            <button
                                onClick={() => setIsOnboarding(!isOnboarding)}
                                className="text-primary hover:text-white font-semibold underline-offset-4 hover:underline transition-all"
                            >
                                {isOnboarding ? 'Sign in' : 'Create one'}
                            </button>
                        </div>
                    )}
                </motion.div>
            </div>
        </div>
    );
};
