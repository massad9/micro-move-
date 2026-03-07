import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Users, Star, TrendingUp } from 'lucide-react';
const stats = [
    { icon: Building2, value: '٥٠٠+', label: 'شركة تثق بنا' },
    { icon: Users, value: '٥٠,٠٠٠+', label: 'موظف نشط' },
    { icon: Star, value: '٩٨٪', label: 'نسبة الرضا' },
    { icon: TrendingUp, value: '٣٥٪', label: 'زيادة في الإنتاجية' },
];
const companyNames = [
    'أرامكو', 'stc', 'نيوم', 'الراجحي', 'سابك', 'أكوا باور', 'مرسول', 'جاهز',
];
export const SocialProofSection = () => {
    return (_jsx("section", { className: "relative z-10 py-20 px-4", children: _jsxs("div", { className: "max-w-6xl mx-auto", children: [_jsx(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: "-100px" }, transition: { duration: 0.6 }, className: "grid grid-cols-2 md:grid-cols-4 gap-8 mb-16", children: stats.map((stat, i) => (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.5, delay: i * 0.1 }, className: "flex flex-col items-center gap-3 p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm", children: [_jsx("div", { className: "w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center", children: _jsx(stat.icon, { className: "w-6 h-6 text-primary" }) }), _jsx("span", { className: "text-3xl md:text-4xl font-black text-white", children: stat.value }), _jsx("span", { className: "text-sm text-slate-400 font-medium", children: stat.label })] }, i))) }), _jsxs(motion.div, { initial: { opacity: 0 }, whileInView: { opacity: 1 }, viewport: { once: true }, transition: { duration: 0.8, delay: 0.3 }, className: "text-center", children: [_jsx("p", { className: "text-sm text-slate-500 font-medium mb-8 tracking-wide", children: "\u0645\u0648\u062B\u0648\u0642 \u0645\u0646 \u0642\u0628\u0644 \u0623\u0641\u0636\u0644 \u0627\u0644\u0634\u0631\u0643\u0627\u062A \u0641\u064A \u0627\u0644\u0645\u0646\u0637\u0642\u0629" }), _jsx("div", { className: "flex flex-wrap items-center justify-center gap-x-10 gap-y-4", children: companyNames.map((name, i) => (_jsx("span", { className: "text-lg md:text-xl font-bold text-white/20 hover:text-white/40 transition-colors duration-300 select-none", children: name }, i))) })] })] }) }));
};
