import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Building2, Users, Mail, Lock, ArrowRight, ChevronLeft, Loader2, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
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
        <div className="min-h-screen bg-[#050505] flex flex-col relative overflow-hidden font-sans text-white">
            <div className="absolute inset-0 pointer-events-none z-0">
                <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/15 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-orange-400/8 rounded-full blur-[150px]" />
            </div>

            <header className="relative z-10 px-8 py-6 w-full flex justify-between items-center max-w-7xl mx-auto">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary/50 flex items-center justify-center shadow-[0_0_15px_rgba(249,115,22,0.5)]">
                        <Activity className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-bold text-xl tracking-tight">مايكرو موف</span>
                </div>
                <motion.button
                    onClick={onBack}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-2 text-slate-400 hover:text-white font-medium text-sm transition-colors bg-white/5 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/10"
                >
                    <ArrowRight className="w-4 h-4" />
                    العودة
                </motion.button>
            </header>

            <div className="flex-1 flex items-center justify-center relative z-10 px-4 pb-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full max-w-lg"
                >
                    <div className="flex items-center gap-3 mb-8">
                        {[1, 2].map(s => (
                            <div key={s} className="flex-1 h-1.5 rounded-full bg-white/10 overflow-hidden">
                                <motion.div
                                    className="h-full bg-primary rounded-full"
                                    initial={{ width: "0%" }}
                                    animate={{ width: step >= s ? "100%" : "0%" }}
                                    transition={{ duration: 0.4 }}
                                />
                            </div>
                        ))}
                    </div>

                    <div className="bg-[#111] p-8 md:p-10 rounded-[2rem] border border-white/10 shadow-2xl">
                        <AnimatePresence mode="wait">
                            {step === 1 && (
                                <motion.div
                                    key="step1"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <div className="flex flex-col items-center text-center mb-8">
                                        <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center mb-5 border border-primary/20">
                                            <Building2 className="w-8 h-8 text-primary" />
                                        </div>
                                        <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-2">
                                            إعداد مساحة العمل
                                        </h1>
                                        <p className="text-slate-400 text-sm">
                                            أخبرنا عن شركتك لنخصص التجربة لك
                                        </p>
                                    </div>

                                    <div className="space-y-5">
                                        <div className="space-y-2">
                                            <label className="text-sm font-semibold text-slate-300" htmlFor="companyName">
                                                اسم الشركة
                                            </label>
                                            <div className="relative">
                                                <Building2 className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                                                <input
                                                    id="companyName"
                                                    type="text"
                                                    value={companyName}
                                                    onChange={e => setCompanyName(e.target.value)}
                                                    className="w-full pr-12 pl-4 py-3.5 bg-[#1A1A1A] border border-white/10 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none font-medium text-white placeholder:text-slate-500 text-right"
                                                    placeholder="مثال: شركة أكمي"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-semibold text-slate-300">
                                                حجم الشركة
                                            </label>
                                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                                                {companySizes.map(size => (
                                                    <button
                                                        key={size.value}
                                                        type="button"
                                                        onClick={() => setCompanySize(size.value)}
                                                        className={`px-4 py-3 rounded-xl text-sm font-medium transition-all border ${
                                                            companySize === size.value
                                                                ? 'bg-primary/15 border-primary/40 text-primary'
                                                                : 'bg-[#1A1A1A] border-white/10 text-slate-400 hover:bg-white/5 hover:text-white'
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
                                                className="w-full bg-white text-black py-3.5 rounded-xl font-bold transition-all duration-200 active:scale-[0.98] shadow-lg disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-[0_0_30px_rgba(255,255,255,0.15)] flex items-center justify-center gap-2"
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
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <div className="flex flex-col items-center text-center mb-8">
                                        <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center mb-5 border border-primary/20">
                                            <Users className="w-8 h-8 text-primary" />
                                        </div>
                                        <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-2">
                                            إنشاء حساب المدير
                                        </h1>
                                        <p className="text-slate-400 text-sm">
                                            أدخل بياناتك لإدارة مساحة عمل <span className="text-white font-medium">{companyName}</span>
                                        </p>
                                    </div>

                                    <form onSubmit={handleSubmit} className="space-y-5">
                                        <div className="space-y-2">
                                            <label className="text-sm font-semibold text-slate-300" htmlFor="email">
                                                البريد الإلكتروني
                                            </label>
                                            <div className="relative">
                                                <Mail className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                                                <input
                                                    id="email"
                                                    type="email"
                                                    required
                                                    value={email}
                                                    onChange={e => setEmail(e.target.value)}
                                                    className="w-full pr-12 pl-4 py-3.5 bg-[#1A1A1A] border border-white/10 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none font-medium text-white placeholder:text-slate-500 text-right"
                                                    placeholder="admin@company.com"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-semibold text-slate-300" htmlFor="password">
                                                كلمة المرور
                                            </label>
                                            <div className="relative">
                                                <Lock className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                                                <input
                                                    id="password"
                                                    type="password"
                                                    required
                                                    value={password}
                                                    onChange={e => setPassword(e.target.value)}
                                                    className="w-full pr-12 pl-4 py-3.5 bg-[#1A1A1A] border border-white/10 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none font-medium text-white placeholder:text-slate-500 text-right"
                                                    placeholder="٦ أحرف على الأقل"
                                                    minLength={6}
                                                />
                                            </div>
                                            {password.length > 0 && password.length < 6 && (
                                                <p className="text-xs text-red-400">كلمة المرور يجب أن تكون ٦ أحرف على الأقل</p>
                                            )}
                                        </div>

                                        <div className="flex gap-3 pt-3">
                                            <button
                                                type="button"
                                                onClick={() => setStep(1)}
                                                className="px-6 py-3.5 bg-white/5 border border-white/10 text-white font-semibold rounded-xl hover:bg-white/10 transition-colors"
                                            >
                                                السابق
                                            </button>
                                            <button
                                                type="submit"
                                                disabled={!canProceedStep2 || isLoading}
                                                className="flex-1 bg-primary text-white py-3.5 rounded-xl font-bold transition-all duration-200 active:scale-[0.98] shadow-lg disabled:opacity-40 disabled:cursor-not-allowed hover:bg-primary/90 flex items-center justify-center gap-2"
                                            >
                                                {isLoading ? (
                                                    <>
                                                        <Loader2 className="w-5 h-5 animate-spin" />
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
