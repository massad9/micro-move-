import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Building2, Users, Mail, Lock, ArrowRight, ChevronLeft, Loader2, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useMicroMoveStore } from '@/store/microMoveStore';
import { toast } from 'sonner';
export const WorkspaceSetup = ({ onComplete, onBack }) => {
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
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!canProceedStep2)
            return;
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
    return (_jsxs("div", { className: "min-h-screen bg-[#050505] flex flex-col relative overflow-hidden font-sans text-white", children: [_jsxs("div", { className: "absolute inset-0 pointer-events-none z-0", children: [_jsx("div", { className: "absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/15 rounded-full blur-[120px]" }), _jsx("div", { className: "absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-orange-400/8 rounded-full blur-[150px]" })] }), _jsxs("header", { className: "relative z-10 px-8 py-6 w-full flex justify-between items-center max-w-7xl mx-auto", children: [_jsx("div", { className: "flex items-center gap-2", children: _jsx("img", { src: "/logo.png", alt: "Micro Move", className: "h-8 brightness-0 invert" }) }), _jsxs(motion.button, { onClick: onBack, initial: { opacity: 0, x: 20 }, animate: { opacity: 1, x: 0 }, className: "flex items-center gap-2 text-slate-400 hover:text-white font-medium text-sm transition-colors bg-white/5 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/10", children: [_jsx(ArrowRight, { className: "w-4 h-4" }), "\u0627\u0644\u0639\u0648\u062F\u0629"] })] }), _jsx("div", { className: "flex-1 flex items-center justify-center relative z-10 px-4 pb-12", children: _jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }, className: "w-full max-w-lg", children: [_jsx("div", { className: "flex items-center gap-3 mb-8", children: [1, 2].map(s => (_jsx("div", { className: "flex-1 h-1.5 rounded-full bg-white/10 overflow-hidden", children: _jsx(motion.div, { className: "h-full bg-primary rounded-full", initial: { width: "0%" }, animate: { width: step >= s ? "100%" : "0%" }, transition: { duration: 0.4 } }) }, s))) }), _jsx("div", { className: "bg-[#111] p-8 md:p-10 rounded-[2rem] border border-white/10 shadow-2xl", children: _jsxs(AnimatePresence, { mode: "wait", children: [step === 1 && (_jsxs(motion.div, { initial: { opacity: 0, x: -20 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: 20 }, transition: { duration: 0.3 }, children: [_jsxs("div", { className: "flex flex-col items-center text-center mb-8", children: [_jsx("div", { className: "w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center mb-5 border border-primary/20", children: _jsx(Building2, { className: "w-8 h-8 text-primary" }) }), _jsx("h1", { className: "text-2xl md:text-3xl font-bold text-white tracking-tight mb-2", children: "\u0625\u0639\u062F\u0627\u062F \u0645\u0633\u0627\u062D\u0629 \u0627\u0644\u0639\u0645\u0644" }), _jsx("p", { className: "text-slate-400 text-sm", children: "\u0623\u062E\u0628\u0631\u0646\u0627 \u0639\u0646 \u0634\u0631\u0643\u062A\u0643 \u0644\u0646\u062E\u0635\u0635 \u0627\u0644\u062A\u062C\u0631\u0628\u0629 \u0644\u0643" })] }), _jsxs("div", { className: "space-y-5", children: [_jsxs("div", { className: "space-y-2", children: [_jsx("label", { className: "text-sm font-semibold text-slate-300", htmlFor: "companyName", children: "\u0627\u0633\u0645 \u0627\u0644\u0634\u0631\u0643\u0629" }), _jsxs("div", { className: "relative", children: [_jsx(Building2, { className: "absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" }), _jsx("input", { id: "companyName", type: "text", value: companyName, onChange: e => setCompanyName(e.target.value), className: "w-full pr-12 pl-4 py-3.5 bg-[#1A1A1A] border border-white/10 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none font-medium text-white placeholder:text-slate-500 text-right", placeholder: "\u0645\u062B\u0627\u0644: \u0634\u0631\u0643\u0629 \u0623\u0643\u0645\u064A" })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx("label", { className: "text-sm font-semibold text-slate-300", children: "\u062D\u062C\u0645 \u0627\u0644\u0634\u0631\u0643\u0629" }), _jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 gap-2", children: companySizes.map(size => (_jsx("button", { type: "button", onClick: () => setCompanySize(size.value), className: `px-4 py-3 rounded-xl text-sm font-medium transition-all border ${companySize === size.value
                                                                        ? 'bg-primary/15 border-primary/40 text-primary'
                                                                        : 'bg-[#1A1A1A] border-white/10 text-slate-400 hover:bg-white/5 hover:text-white'}`, children: size.label }, size.value))) })] }), _jsx("div", { className: "pt-3", children: _jsxs("button", { type: "button", onClick: handleNext, disabled: !canProceedStep1, className: "w-full bg-white text-black py-3.5 rounded-xl font-bold transition-all duration-200 active:scale-[0.98] shadow-lg disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-[0_0_30px_rgba(255,255,255,0.15)] flex items-center justify-center gap-2", children: [_jsx("span", { children: "\u0627\u0644\u062A\u0627\u0644\u064A" }), _jsx(ChevronLeft, { className: "w-4 h-4" })] }) })] })] }, "step1")), step === 2 && (_jsxs(motion.div, { initial: { opacity: 0, x: -20 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: 20 }, transition: { duration: 0.3 }, children: [_jsxs("div", { className: "flex flex-col items-center text-center mb-8", children: [_jsx("div", { className: "w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center mb-5 border border-primary/20", children: _jsx(Users, { className: "w-8 h-8 text-primary" }) }), _jsx("h1", { className: "text-2xl md:text-3xl font-bold text-white tracking-tight mb-2", children: "\u0625\u0646\u0634\u0627\u0621 \u062D\u0633\u0627\u0628 \u0627\u0644\u0645\u062F\u064A\u0631" }), _jsxs("p", { className: "text-slate-400 text-sm", children: ["\u0623\u062F\u062E\u0644 \u0628\u064A\u0627\u0646\u0627\u062A\u0643 \u0644\u0625\u062F\u0627\u0631\u0629 \u0645\u0633\u0627\u062D\u0629 \u0639\u0645\u0644 ", _jsx("span", { className: "text-white font-medium", children: companyName })] })] }), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-5", children: [_jsxs("div", { className: "space-y-2", children: [_jsx("label", { className: "text-sm font-semibold text-slate-300", htmlFor: "email", children: "\u0627\u0644\u0628\u0631\u064A\u062F \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A" }), _jsxs("div", { className: "relative", children: [_jsx(Mail, { className: "absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" }), _jsx("input", { id: "email", type: "email", required: true, value: email, onChange: e => setEmail(e.target.value), className: "w-full pr-12 pl-4 py-3.5 bg-[#1A1A1A] border border-white/10 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none font-medium text-white placeholder:text-slate-500 text-right", placeholder: "admin@company.com" })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx("label", { className: "text-sm font-semibold text-slate-300", htmlFor: "password", children: "\u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631" }), _jsxs("div", { className: "relative", children: [_jsx(Lock, { className: "absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" }), _jsx("input", { id: "password", type: "password", required: true, value: password, onChange: e => setPassword(e.target.value), className: "w-full pr-12 pl-4 py-3.5 bg-[#1A1A1A] border border-white/10 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none font-medium text-white placeholder:text-slate-500 text-right", placeholder: "\u0666 \u0623\u062D\u0631\u0641 \u0639\u0644\u0649 \u0627\u0644\u0623\u0642\u0644", minLength: 6 })] }), password.length > 0 && password.length < 6 && (_jsx("p", { className: "text-xs text-red-400", children: "\u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631 \u064A\u062C\u0628 \u0623\u0646 \u062A\u0643\u0648\u0646 \u0666 \u0623\u062D\u0631\u0641 \u0639\u0644\u0649 \u0627\u0644\u0623\u0642\u0644" }))] }), _jsxs("div", { className: "flex gap-3 pt-3", children: [_jsx("button", { type: "button", onClick: () => setStep(1), className: "px-6 py-3.5 bg-white/5 border border-white/10 text-white font-semibold rounded-xl hover:bg-white/10 transition-colors", children: "\u0627\u0644\u0633\u0627\u0628\u0642" }), _jsx("button", { type: "submit", disabled: !canProceedStep2 || isLoading, className: "flex-1 bg-primary text-white py-3.5 rounded-xl font-bold transition-all duration-200 active:scale-[0.98] shadow-lg disabled:opacity-40 disabled:cursor-not-allowed hover:bg-primary/90 flex items-center justify-center gap-2", children: isLoading ? (_jsxs(_Fragment, { children: [_jsx(Loader2, { className: "w-5 h-5 animate-spin" }), "\u062C\u0627\u0631\u064A \u0625\u0646\u0634\u0627\u0621 \u0645\u0633\u0627\u062D\u0629 \u0627\u0644\u0639\u0645\u0644..."] })) : ('إنشاء مساحة العمل') })] })] })] }, "step2"))] }) })] }) })] }));
};
