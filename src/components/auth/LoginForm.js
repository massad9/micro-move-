import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Loader2, Zap, ShieldAlert } from 'lucide-react';
import { useMicroMoveStore } from '@/store/microMoveStore';
import { toast } from 'sonner';
export const LoginForm = ({ role, onLogin, onBack }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isOnboarding, setIsOnboarding] = useState(false);
    const isAdmin = role === 'admin';
    const setUser = useMicroMoveStore(state => state.setUser);
    const handleLogin = (e) => {
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
            }
            else {
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
    const handleSSO = (provider) => {
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
    return (_jsxs("div", { className: "min-h-screen bg-[#050505] flex flex-col p-6 md:p-12 relative overflow-hidden font-sans text-white", children: [_jsxs("div", { className: "absolute inset-0 pointer-events-none z-0", children: [_jsx("div", { className: "absolute top-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[100px]" }), _jsx("div", { className: "absolute bottom-1/4 left-1/4 w-96 h-96 bg-orange-400/5 rounded-full blur-[100px]" })] }), _jsxs(motion.button, { onClick: onBack, initial: { opacity: 0, x: 20 }, animate: { opacity: 1, x: 0 }, className: "relative z-10 flex items-center gap-2 text-slate-400 hover:text-white font-medium text-sm transition-colors w-max bg-white/5 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/10 shadow-sm", children: [_jsx(ArrowRight, { className: "w-4 h-4" }), "\u0627\u0644\u0639\u0648\u062F\u0629 \u0644\u0644\u062A\u0631\u062D\u064A\u0628"] }), _jsx("div", { className: "flex-1 flex items-center justify-center relative z-10 w-full mb-12", children: _jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.4, type: 'spring', damping: 25 }, className: "w-full max-w-md bg-[#111] p-8 md:p-10 rounded-[2rem] shadow-2xl border border-white/10 relative", children: [_jsxs("div", { className: "flex flex-col items-center text-center mb-8", children: [_jsx("div", { className: `w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-white/10 ${isAdmin ? 'bg-slate-800' : 'bg-primary/20'}`, children: isAdmin ? _jsx(ShieldAlert, { className: "w-8 h-8 text-slate-300" }) : _jsx(Zap, { className: "w-8 h-8 text-primary" }) }), _jsx("h1", { className: "text-3xl font-bold text-white tracking-tight mb-2", children: isAdmin ? (isOnboarding ? 'إنشاء مساحة العمل' : 'بوابة الإدارة') : 'بوابة الموظفين' }), _jsx("p", { className: "text-slate-400 text-sm font-medium", children: isAdmin
                                        ? (isOnboarding ? 'سجّل لبدء إعداد شركتك.' : 'سجّل الدخول للوصول إلى لوحة التحكم.')
                                        : 'ادخل إلى لوحتك بسهولة.' })] }), !isAdmin && (_jsxs("div", { className: "space-y-3 mb-6", children: [_jsxs("button", { onClick: () => handleSSO('microsoft'), className: "w-full flex justify-center items-center gap-3 bg-[#2F2F2F] hover:bg-[#3F3F3F] text-white py-3 border border-white/5 rounded-xl transition-colors font-medium", children: [_jsxs("svg", { className: "w-5 h-5", viewBox: "0 0 21 21", fill: "none", children: [_jsx("rect", { x: "1", y: "1", width: "9", height: "9", fill: "#F25022" }), _jsx("rect", { x: "11", y: "1", width: "9", height: "9", fill: "#7FBA00" }), _jsx("rect", { x: "1", y: "11", width: "9", height: "9", fill: "#00A4EF" }), _jsx("rect", { x: "11", y: "11", width: "9", height: "9", fill: "#FFB900" })] }), "\u0627\u0644\u0645\u062A\u0627\u0628\u0639\u0629 \u0639\u0628\u0631 \u0645\u0627\u064A\u0643\u0631\u0648\u0633\u0648\u0641\u062A"] }), _jsxs("button", { onClick: () => handleSSO('google'), className: "w-full flex justify-center items-center gap-3 bg-[#2F2F2F] hover:bg-[#3F3F3F] text-white py-3 border border-white/5 rounded-xl transition-colors font-medium", children: [_jsxs("svg", { className: "w-5 h-5", viewBox: "0 0 24 24", fill: "none", children: [_jsx("path", { d: "M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z", fill: "#4285F4" }), _jsx("path", { d: "M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z", fill: "#34A853" }), _jsx("path", { d: "M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z", fill: "#FBBC05" }), _jsx("path", { d: "M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z", fill: "#EA4335" })] }), "\u0627\u0644\u0645\u062A\u0627\u0628\u0639\u0629 \u0639\u0628\u0631 \u062C\u0648\u062C\u0644"] }), _jsxs("div", { className: "relative flex items-center py-2", children: [_jsx("div", { className: "flex-grow border-t border-white/10" }), _jsx("span", { className: "flex-shrink-0 mx-4 text-slate-500 text-xs", children: "\u0623\u0648 \u0628\u0627\u0644\u0628\u0631\u064A\u062F \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A" }), _jsx("div", { className: "flex-grow border-t border-white/10" })] })] })), _jsxs("form", { onSubmit: handleLogin, className: "space-y-4", children: [_jsxs("div", { className: "space-y-1.5", children: [_jsx("label", { className: "text-sm font-semibold text-slate-300 mr-1", htmlFor: "email", children: isAdmin ? 'البريد الإلكتروني للعمل' : 'البريد الإلكتروني للشركة' }), _jsx("input", { id: "email", type: "email", required: true, className: "w-full px-4 py-3 bg-[#1A1A1A] border border-white/10 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors focus-visible:outline-none font-medium text-white placeholder:text-slate-500 text-right", placeholder: isAdmin ? "admin@micromove.sa" : "employee@company.com", value: email, onChange: (e) => setEmail(e.target.value) })] }), !(!isAdmin && email === '') && (_jsxs(motion.div, { initial: { height: 0, opacity: 0 }, animate: { height: 'auto', opacity: 1 }, className: "space-y-1.5", children: [_jsx("label", { className: "text-sm font-semibold text-slate-300 mr-1", htmlFor: "password", children: isOnboarding ? 'إنشاء كلمة المرور' : 'كلمة المرور' }), _jsx("input", { id: "password", type: "password", required: !(!isAdmin && email === ''), className: "w-full px-4 py-3 bg-[#1A1A1A] border border-white/10 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors focus-visible:outline-none font-medium text-white placeholder:text-slate-500 text-right", placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", value: password, onChange: (e) => setPassword(e.target.value) })] })), _jsx("div", { className: "pt-2", children: _jsx("button", { type: "submit", className: `w-full ${isAdmin ? 'bg-slate-200 text-slate-900 hover:bg-white' : 'bg-primary text-white hover:bg-primary/90'} py-3.5 rounded-xl font-bold transition-[color,background-color,box-shadow,transform] duration-200 active:scale-[0.98] shadow-lg`, disabled: isLoading, children: isLoading ? (_jsxs("span", { className: "flex items-center justify-center gap-2", children: [_jsx(Loader2, { className: "w-5 h-5 animate-spin" }), isOnboarding ? 'جاري إنشاء بيئة العمل...' : 'جاري التحقق...'] })) : (isAdmin ? (isOnboarding ? 'إنشاء بيئة العمل' : 'الدخول إلى لوحة التحكم') : (email ? 'تسجيل الدخول بالبريد' : 'إرسال رابط سحري')) }) })] }), isAdmin && (_jsxs("div", { className: "mt-6 text-center text-sm", children: [_jsx("span", { className: "text-slate-400", children: isOnboarding ? 'لديك بيئة عمل بالفعل؟ ' : 'جديد على مايكرو موف؟ ' }), _jsx("button", { onClick: () => setIsOnboarding(!isOnboarding), className: "text-primary hover:text-white font-semibold underline-offset-4 hover:underline transition-colors", children: isOnboarding ? 'سجّل الدخول' : 'أنشئ واحدة' })] }))] }) })] }));
};
