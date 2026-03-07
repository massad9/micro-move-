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
            if (isAdmin && isOnboarding) {
                setUser({
                    id: '456',
                    name: 'سارة الفهد',
                    email: 'sara@company.com',
                    role: 'admin',
                    points: 0,
                    department: 'الموارد البشرية',
                    completedToday: 0,
                    dailyGoal: 0
                });
                onLogin();
                toast.success('تم إنشاء بيئة العمل بنجاح!');
                return;
            }

            if (isAdmin) {
                setUser({
                    id: '456',
                    name: 'سارة الفهد',
                    email: 'sara@company.com',
                    role: 'admin',
                    points: 0,
                    department: 'الموارد البشرية',
                    completedToday: 0,
                    dailyGoal: 0
                });
                onLogin();
            } else {
                setUser({
                    id: '123',
                    name: 'خالد اليوسف',
                    email: 'khalid@company.com',
                    role: 'employee',
                    points: 840,
                    department: 'التصميم',
                    completedToday: 2,
                    dailyGoal: 5
                });
                onLogin();
            }
        }, 1000);
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
        }, 800);
    };

    return (
        <div className="min-h-screen bg-background flex flex-col p-6 md:p-12 relative overflow-hidden font-sans text-text-primary">
            <div className="absolute inset-0 pointer-events-none z-0">
                <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/8 rounded-full blur-[120px]" />
                <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-[120px]" />
            </div>

            <motion.button
                onClick={onBack}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                className="relative z-10 flex items-center gap-2 text-text-secondary hover:text-text-primary font-medium text-sm transition-colors w-max bg-surface-2 px-4 py-2 rounded-lg border border-border"
            >
                <ArrowRight className="w-4 h-4" />
                العودة للترحيب
            </motion.button>

            <div className="flex-1 flex items-center justify-center relative z-10 w-full mb-12">
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, type: 'spring', damping: 25 }}
                    className="w-full max-w-md glass p-8 md:p-10 rounded-xl"
                >
                    <div className="flex flex-col items-center text-center mb-8">
                        <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-5 border border-border ${isAdmin ? 'bg-surface-2' : 'bg-primary/15'}`}>
                            {isAdmin ? <ShieldAlert className="w-7 h-7 text-text-secondary" /> : <Zap className="w-7 h-7 text-primary" />}
                        </div>
                        <h1 className="text-2xl font-bold text-text-primary tracking-tight mb-1.5">
                            {isAdmin ? (isOnboarding ? 'إنشاء مساحة العمل' : 'بوابة الإدارة') : 'بوابة الموظفين'}
                        </h1>
                        <p className="text-text-tertiary text-sm">
                            {isAdmin
                                ? (isOnboarding ? 'سجّل لبدء إعداد شركتك.' : 'سجّل الدخول للوصول إلى لوحة التحكم.')
                                : 'ادخل إلى لوحتك بسهولة.'}
                        </p>
                    </div>

                    {!isAdmin && (
                        <div className="space-y-2.5 mb-6">
                            <button onClick={() => handleSSO('microsoft')} className="w-full flex justify-center items-center gap-3 bg-surface-2 hover:bg-surface-3 text-text-primary py-2.5 border border-border rounded-lg transition-colors font-medium text-sm">
                                <svg className="w-5 h-5" viewBox="0 0 21 21" fill="none"><rect x="1" y="1" width="9" height="9" fill="#F25022" /><rect x="11" y="1" width="9" height="9" fill="#7FBA00" /><rect x="1" y="11" width="9" height="9" fill="#00A4EF" /><rect x="11" y="11" width="9" height="9" fill="#FFB900" /></svg>
                                المتابعة عبر مايكروسوفت
                            </button>
                            <button onClick={() => handleSSO('google')} className="w-full flex justify-center items-center gap-3 bg-surface-2 hover:bg-surface-3 text-text-primary py-2.5 border border-border rounded-lg transition-colors font-medium text-sm">
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" /></svg>
                                المتابعة عبر جوجل
                            </button>

                            <div className="relative flex items-center py-2">
                                <div className="flex-grow border-t border-border"></div>
                                <span className="flex-shrink-0 mx-4 text-text-quaternary text-xs">أو بالبريد الإلكتروني</span>
                                <div className="flex-grow border-t border-border"></div>
                            </div>
                        </div>
                    )}

                    <form onSubmit={handleLogin} className="space-y-4">
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-text-secondary mr-1" htmlFor="email">
                                {isAdmin ? 'البريد الإلكتروني للعمل' : 'البريد الإلكتروني للشركة'}
                            </label>
                            <input
                                id="email"
                                type="email"
                                required
                                className="w-full bg-surface-2 border border-border text-text-primary placeholder:text-text-quaternary rounded-lg h-10 px-3 focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-colors focus-visible:outline-none text-right text-sm"
                                placeholder={isAdmin ? "admin@micromove.sa" : "employee@company.com"}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        {!(!isAdmin && email === '') && (
                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="space-y-1.5">
                                <label className="text-sm font-medium text-text-secondary mr-1" htmlFor="password">
                                    {isOnboarding ? 'إنشاء كلمة المرور' : 'كلمة المرور'}
                                </label>
                                <input
                                    id="password"
                                    type="password"
                                    required={!(!isAdmin && email === '')}
                                    className="w-full bg-surface-2 border border-border text-text-primary placeholder:text-text-quaternary rounded-lg h-10 px-3 focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-colors focus-visible:outline-none text-right text-sm"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </motion.div>
                        )}

                        <div className="pt-2">
                            <button
                                type="submit"
                                className={`w-full ${isAdmin ? 'bg-surface-2 text-text-primary border border-border hover:bg-surface-3' : 'bg-primary text-primary-foreground hover:bg-primary/90'} h-10 rounded-lg font-medium text-sm transition-colors active:scale-[0.98]`}
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        {isOnboarding ? 'جاري إنشاء بيئة العمل...' : 'جاري التحقق...'}
                                    </span>
                                ) : (
                                    isAdmin ? (isOnboarding ? 'إنشاء بيئة العمل' : 'الدخول إلى لوحة التحكم') : (email ? 'تسجيل الدخول بالبريد' : 'إرسال رابط سحري')
                                )}
                            </button>
                        </div>
                    </form>

                    {isAdmin && (
                        <div className="mt-6 text-center text-sm">
                            <span className="text-text-tertiary">
                                {isOnboarding ? 'لديك بيئة عمل بالفعل؟ ' : 'جديد على مايكرو موف؟ '}
                            </span>
                            <button
                                onClick={() => setIsOnboarding(!isOnboarding)}
                                className="text-primary hover:text-primary/80 font-medium underline-offset-4 hover:underline transition-colors"
                            >
                                {isOnboarding ? 'سجّل الدخول' : 'أنشئ واحدة'}
                            </button>
                        </div>
                    )}
                </motion.div>
            </div>
        </div>
    );
};
