import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Loader2, Zap, ShieldAlert } from 'lucide-react';
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
    const [isOnboarding, setIsOnboarding] = useState(false);

    const isAdmin = role === 'admin';
    const setUser = useMicroMoveStore(state => state.setUser);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            const userData = isAdmin ? {
                id: '456',
                name: 'سارة الفهد',
                email: email || 'sara@company.com',
                role: 'admin' as const,
                points: 0,
                department: 'الموارد البشرية',
                completedToday: 0,
                dailyGoal: 0
            } : {
                id: '123',
                name: 'خالد اليوسف',
                email: email || 'khalid@company.com',
                role: 'employee' as const,
                points: 840,
                department: 'التصميم',
                completedToday: 2,
                dailyGoal: 5
            };
            setUser(userData);
            onLogin();
            if (isOnboarding) toast.success('تم إنشاء بيئة العمل بنجاح!');
        }, 1200);
    };

    const handleSSO = (provider: string) => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            setUser({
                id: '123',
                name: 'خالد اليوسف',
                email: `employee@${provider}.com`,
                role: 'employee',
                points: 840,
                department: 'التصميم',
                completedToday: 2,
                dailyGoal: 5
            });
            onLogin();
            toast.success(`تم تسجيل الدخول عبر ${provider} بنجاح!`);
        }, 1000);
    };

    return (
        <div className="min-h-screen bg-background flex flex-col p-6 relative overflow-hidden font-sans">
            {/* Ambient Background Glow */}
            <div className="absolute inset-0 pointer-events-none -z-10">
                <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-primary/5 blur-[120px] rounded-full" />
                <div className="absolute bottom-0 left-0 w-[30%] h-[30%] bg-primary/10 blur-[100px] rounded-full" />
            </div>

            <header className="max-w-7xl mx-auto w-full py-8">
                <motion.button
                    onClick={onBack}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground transition-all group"
                >
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    العودة للرئيسية
                </motion.button>
            </header>

            <div className="flex-1 flex items-center justify-center py-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full max-w-md linear-card p-12 relative"
                >
                    <div className="flex flex-col items-center text-center mb-12">
                        <div className="w-16 h-16 rounded-2xl bg-secondary border border-border/40 flex items-center justify-center mb-8 group hover:border-primary/40 transition-all">
                            {isAdmin ? <ShieldAlert className="w-8 h-8 text-primary" /> : <Zap className="w-8 h-8 text-primary" />}
                        </div>
                        <h1 className="text-3xl font-bold text-foreground tracking-tight mb-3">
                            {isAdmin ? (isOnboarding ? 'إنشاء مساحة العمل' : 'بوابة الإدارة') : 'بوابة الموظفين'}
                        </h1>
                        <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold opacity-70">
                            {isAdmin
                                ? (isOnboarding ? 'سجّل لبدء إعداد شركتك اليوم' : 'سجّل الدخول لإدارة فريقك')
                                : 'ادخل إلى مساحتك الخاصة للبدء بالنشاط'}
                        </p>
                    </div>

                    {!isAdmin && (
                        <div className="space-y-4 mb-10">
                            <button onClick={() => handleSSO('microsoft')} className="w-full h-12 flex justify-center items-center gap-3 bg-secondary/50 hover:bg-secondary border border-border/40 rounded-xl transition-all text-[11px] font-bold uppercase tracking-widest text-foreground">
                                <svg className="w-4 h-4" viewBox="0 0 21 21" fill="none"><rect x="1" y="1" width="9" height="9" fill="#F25022" /><rect x="11" y="1" width="9" height="9" fill="#7FBA00" /><rect x="1" y="11" width="9" height="9" fill="#00A4EF" /><rect x="11" y="11" width="9" height="9" fill="#FFB900" /></svg>
                                المتابعة عبر Microsoft
                            </button>
                            <button onClick={() => handleSSO('google')} className="w-full h-12 flex justify-center items-center gap-3 bg-secondary/50 hover:bg-secondary border border-border/40 rounded-xl transition-all text-[11px] font-bold uppercase tracking-widest text-foreground">
                                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" /></svg>
                                المتابعة عبر Google
                            </button>

                            <div className="relative flex items-center py-4">
                                <div className="flex-grow border-t border-border/20"></div>
                                <span className="flex-shrink-0 mx-4 text-muted-foreground text-[10px] font-bold uppercase tracking-widest opacity-50">أو بالبريد</span>
                                <div className="flex-grow border-t border-border/20"></div>
                            </div>
                        </div>
                    )}

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground" htmlFor="email">
                                {isAdmin ? 'البريد المؤسسي' : 'بريد الموظف'}
                            </label>
                            <input
                                id="email"
                                type="email"
                                required
                                className="w-full px-4 h-12 bg-secondary/30 border border-border/40 rounded-xl focus:ring-1 focus:ring-primary focus:border-primary transition-all outline-none font-medium text-foreground placeholder:text-muted-foreground/30 text-right"
                                placeholder={isAdmin ? "admin@company.com" : "name@company.com"}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground" htmlFor="password">
                                {isOnboarding ? 'إنشاء كلمة المرور' : 'كلمة المرور'}
                            </label>
                            <input
                                id="password"
                                type="password"
                                required
                                className="w-full px-4 h-12 bg-secondary/30 border border-border/40 rounded-xl focus:ring-1 focus:ring-primary focus:border-primary transition-all outline-none font-medium text-foreground placeholder:text-muted-foreground/30 text-right"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <div className="pt-4">
                            <button
                                type="submit"
                                className={`w-full h-14 ${isAdmin ? 'bg-foreground text-background' : 'bg-primary text-primary-foreground'} rounded-xl font-bold transition-all active:scale-[0.98] shadow-lg shadow-black/20 text-xs uppercase tracking-widest`}
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <span className="flex items-center justify-center gap-3">
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        جاري الدخول...
                                    </span>
                                ) : (
                                    isAdmin ? (isOnboarding ? 'إنشاء مساحة العمل' : 'دخول لوحة التحكم') : 'بدء النشاط الآن'
                                )}
                            </button>
                        </div>
                    </form>

                    {isAdmin && (
                        <div className="mt-10 text-center text-[10px] font-bold uppercase tracking-widest">
                            <span className="text-muted-foreground">
                                {isOnboarding ? 'لديك حساب بالفعل؟ ' : 'جديد على مايكرو موف؟ '}
                            </span>
                            <button
                                onClick={() => setIsOnboarding(!isOnboarding)}
                                className="text-primary hover:text-foreground transition-all"
                            >
                                {isOnboarding ? 'سجّل الدخول' : 'أنشئ حساباً جديداً'}
                            </button>
                        </div>
                    )}
                </motion.div>
            </div>
        </div>
    );
};
