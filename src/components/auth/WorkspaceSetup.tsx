import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Building2, Users, Mail, Lock, ArrowRight, ChevronLeft, Loader2 } from 'lucide-react';
import { useMicroMoveStore } from '@/store/microMoveStore';
import { toast } from 'sonner';

interface WorkspaceSetupProps {
    onComplete: () => void;
    onBack: () => void;
}

export const WorkspaceSetup: React.FC<WorkspaceSetupProps> = ({ onComplete, onBack }) => {
    const [step, setStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    const [companyName, setCompanyName] = useState('');
    const [companySize, setCompanySize] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const setUser = useMicroMoveStore(state => state.setUser);
    const setCompanyAdmin = useMicroMoveStore(state => state.setCompanyAdmin);

    const companySizes = [
        { value: '1-10', label: '١-١٠ موظفين' },
        { value: '11-50', label: '١١-٥٠ موظف' },
        { value: '51-200', label: '٥١-٢٠٠ موظف' },
        { value: '201-500', label: '٢٠١-٥٠٠ موظف' },
        { value: '500+', label: '+٥٠٠ موظف' },
    ];

    const canProceedStep1 = companyName.trim().length > 0 && companySize.length > 0;
    const canProceedStep2 = email.trim().length > 0 && password.length >= 6;

    const handleNext = () => {
        if (step === 1 && canProceedStep1) {
            setStep(2);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!canProceedStep2) return;

        setIsLoading(true);
        setTimeout(() => {
            setCompanyAdmin({
                companyName,
                departments: ['الهندسة', 'التسويق', 'المبيعات'],
                vibeScore: 88,
                burnoutRisk: []
            });
            setUser({
                id: '456',
                name: companyName,
                email: email,
                role: 'admin',
                points: 0,
                department: 'الإدارة',
                completedToday: 0,
                dailyGoal: 0
            });
            setIsLoading(false);
            toast.success('تم إنشاء مساحة العمل بنجاح!');
            onComplete();
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-background flex flex-col relative overflow-hidden font-sans text-text-primary">
            <div className="absolute inset-0 pointer-events-none z-0">
                <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/8 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-accent/5 rounded-full blur-[150px]" />
            </div>

            <header className="relative z-10 px-8 py-6 w-full flex justify-between items-center max-w-7xl mx-auto">
                <div className="flex items-center gap-2">
                    <img src="/logo.png" alt="Micro Move" className="h-8 brightness-0 invert" />
                </div>
                <motion.button
                    onClick={onBack}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-2 text-text-secondary hover:text-text-primary font-medium text-sm transition-colors bg-surface-2 px-4 py-2 rounded-lg border border-border"
                >
                    <ArrowRight className="w-4 h-4" />
                    العودة
                </motion.button>
            </header>

            <div className="flex-1 flex items-center justify-center relative z-10 px-4 pb-12">
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full max-w-lg"
                >
                    <div className="flex items-center gap-3 mb-8">
                        {[1, 2].map(s => (
                            <div key={s} className="flex-1 h-1 rounded-full bg-surface-2 overflow-hidden">
                                <motion.div
                                    className="h-full bg-primary rounded-full"
                                    initial={{ width: "0%" }}
                                    animate={{ width: step >= s ? "100%" : "0%" }}
                                    transition={{ duration: 0.4 }}
                                />
                            </div>
                        ))}
                    </div>

                    <div className="bg-surface-1 p-8 md:p-10 rounded-xl border border-border">
                        <AnimatePresence mode="wait">
                            {step === 1 && (
                                <motion.div
                                    key="step1"
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 10 }}
                                    transition={{ duration: 0.25 }}
                                >
                                    <div className="flex flex-col items-center text-center mb-8">
                                        <div className="w-14 h-14 rounded-xl bg-primary/15 flex items-center justify-center mb-5 border border-border">
                                            <Building2 className="w-7 h-7 text-primary" />
                                        </div>
                                        <h1 className="text-2xl font-bold text-text-primary tracking-tight mb-1.5">
                                            إعداد مساحة العمل
                                        </h1>
                                        <p className="text-text-tertiary text-sm">
                                            أخبرنا عن شركتك لنخصص التجربة لك
                                        </p>
                                    </div>

                                    <div className="space-y-5">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-text-secondary" htmlFor="companyName">
                                                اسم الشركة
                                            </label>
                                            <div className="relative">
                                                <Building2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-quaternary" />
                                                <input
                                                    id="companyName"
                                                    type="text"
                                                    value={companyName}
                                                    onChange={e => setCompanyName(e.target.value)}
                                                    className="w-full pr-10 pl-3 bg-surface-2 border border-border text-text-primary placeholder:text-text-quaternary rounded-lg h-10 focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-colors focus-visible:outline-none text-right text-sm"
                                                    placeholder="مثال: شركة أكمي"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-text-secondary">
                                                حجم الشركة
                                            </label>
                                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                                                {companySizes.map(size => (
                                                    <button
                                                        key={size.value}
                                                        type="button"
                                                        onClick={() => setCompanySize(size.value)}
                                                        className={`px-3 py-2.5 rounded-lg text-sm font-medium transition-colors border ${
                                                            companySize === size.value
                                                                ? 'bg-primary/15 border-primary/30 text-primary'
                                                                : 'bg-surface-2 border-border text-text-tertiary hover:bg-surface-3 hover:text-text-secondary'
                                                        }`}
                                                    >
                                                        {size.label}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="pt-3">
                                            <button
                                                type="button"
                                                onClick={handleNext}
                                                disabled={!canProceedStep1}
                                                className="w-full bg-primary text-primary-foreground h-10 rounded-lg font-medium text-sm transition-colors active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-primary/90 flex items-center justify-center gap-2"
                                            >
                                                <span>التالي</span>
                                                <ChevronLeft className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {step === 2 && (
                                <motion.div
                                    key="step2"
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 10 }}
                                    transition={{ duration: 0.25 }}
                                >
                                    <div className="flex flex-col items-center text-center mb-8">
                                        <div className="w-14 h-14 rounded-xl bg-primary/15 flex items-center justify-center mb-5 border border-border">
                                            <Users className="w-7 h-7 text-primary" />
                                        </div>
                                        <h1 className="text-2xl font-bold text-text-primary tracking-tight mb-1.5">
                                            إنشاء حساب المدير
                                        </h1>
                                        <p className="text-text-tertiary text-sm">
                                            أدخل بياناتك لإدارة مساحة عمل <span className="text-text-primary font-medium">{companyName}</span>
                                        </p>
                                    </div>

                                    <form onSubmit={handleSubmit} className="space-y-5">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-text-secondary" htmlFor="email">
                                                البريد الإلكتروني
                                            </label>
                                            <div className="relative">
                                                <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-quaternary" />
                                                <input
                                                    id="email"
                                                    type="email"
                                                    required
                                                    value={email}
                                                    onChange={e => setEmail(e.target.value)}
                                                    className="w-full pr-10 pl-3 bg-surface-2 border border-border text-text-primary placeholder:text-text-quaternary rounded-lg h-10 focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-colors focus-visible:outline-none text-right text-sm"
                                                    placeholder="admin@company.com"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-text-secondary" htmlFor="password">
                                                كلمة المرور
                                            </label>
                                            <div className="relative">
                                                <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-quaternary" />
                                                <input
                                                    id="password"
                                                    type="password"
                                                    required
                                                    value={password}
                                                    onChange={e => setPassword(e.target.value)}
                                                    className="w-full pr-10 pl-3 bg-surface-2 border border-border text-text-primary placeholder:text-text-quaternary rounded-lg h-10 focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-colors focus-visible:outline-none text-right text-sm"
                                                    placeholder="٦ أحرف على الأقل"
                                                    minLength={6}
                                                />
                                            </div>
                                            {password.length > 0 && password.length < 6 && (
                                                <p className="text-xs text-destructive">كلمة المرور يجب أن تكون ٦ أحرف على الأقل</p>
                                            )}
                                        </div>

                                        <div className="flex gap-3 pt-3">
                                            <button
                                                type="button"
                                                onClick={() => setStep(1)}
                                                className="px-5 h-10 bg-surface-2 border border-border text-text-secondary font-medium rounded-lg hover:bg-surface-3 hover:text-text-primary transition-colors text-sm"
                                            >
                                                السابق
                                            </button>
                                            <button
                                                type="submit"
                                                disabled={!canProceedStep2 || isLoading}
                                                className="flex-1 bg-primary text-primary-foreground h-10 rounded-lg font-medium text-sm transition-colors active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-primary/90 flex items-center justify-center gap-2"
                                            >
                                                {isLoading ? (
                                                    <>
                                                        <Loader2 className="w-4 h-4 animate-spin" />
                                                        جاري إنشاء مساحة العمل...
                                                    </>
                                                ) : (
                                                    'إنشاء مساحة العمل'
                                                )}
                                            </button>
                                        </div>
                                    </form>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};
