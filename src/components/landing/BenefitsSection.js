import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Gamepad2, BarChart3, HeartPulse, Bell, Shield } from 'lucide-react';
const benefits = [
    {
        icon: Brain,
        title: 'تنبيهات ذكية بالذكاء الاصطناعي',
        description: 'تنبيهات مخصصة تراعي سياق العمل وجدول الاجتماعات لكل موظف.',
        gradient: 'from-orange-500/20 to-amber-500/20',
        iconColor: 'text-orange-400',
    },
    {
        icon: Gamepad2,
        title: 'تحديات تفاعلية ومكافآت',
        description: 'نظام نقاط ومكافآت يحوّل الحركة إلى تجربة ممتعة ومحفّزة.',
        gradient: 'from-violet-500/20 to-purple-500/20',
        iconColor: 'text-violet-400',
    },
    {
        icon: BarChart3,
        title: 'تحليلات متقدمة',
        description: 'لوحة تحكم شاملة تعرض بيانات النشاط والإنتاجية لفريقك بالكامل.',
        gradient: 'from-blue-500/20 to-cyan-500/20',
        iconColor: 'text-blue-400',
    },
    {
        icon: HeartPulse,
        title: 'صحة الفريق',
        description: 'مراقبة مؤشرات صحة الفريق وتقليل مخاطر الجلوس المطوّل.',
        gradient: 'from-rose-500/20 to-pink-500/20',
        iconColor: 'text-rose-400',
    },
    {
        icon: Bell,
        title: 'تنبيهات واعية بالسياق',
        description: 'لا تقاطع اجتماعاتك المهمة — التنبيهات تأتي في الوقت المناسب فقط.',
        gradient: 'from-emerald-500/20 to-green-500/20',
        iconColor: 'text-emerald-400',
    },
    {
        icon: Shield,
        title: 'خصوصية وأمان',
        description: 'بيانات الموظفين محمية بالكامل مع التزام صارم بمعايير الأمان.',
        gradient: 'from-slate-500/20 to-gray-500/20',
        iconColor: 'text-slate-300',
    },
];
export const BenefitsSection = () => {
    return (_jsx("section", { className: "relative z-10 py-24 px-4", children: _jsxs("div", { className: "max-w-6xl mx-auto", children: [_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: "-100px" }, transition: { duration: 0.6 }, className: "text-center mb-16", children: [_jsx("span", { className: "inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-semibold mb-6", children: "\u0627\u0644\u0645\u0632\u0627\u064A\u0627 \u0648\u0627\u0644\u062E\u0635\u0627\u0626\u0635" }), _jsx("h2", { className: "text-4xl md:text-5xl font-black text-white mb-4 tracking-tight", children: "\u0645\u0645\u064A\u0632\u0627\u062A \u0635\u064F\u0645\u0645\u062A \u0644\u0628\u064A\u0626\u0629 \u0639\u0645\u0644\u0643" }), _jsx("p", { className: "text-lg text-slate-400 max-w-2xl mx-auto font-light", children: "\u0646\u0638\u0627\u0645 \u0645\u062A\u0643\u0627\u0645\u0644 \u064A\u062C\u0645\u0639 \u0628\u064A\u0646 \u0630\u0643\u0627\u0621 \u0627\u0644\u062A\u0646\u0628\u064A\u0647\u0627\u062A \u0648\u0645\u062A\u0639\u0629 \u0627\u0644\u062A\u062D\u062F\u064A\u0627\u062A\u060C \u0644\u064A\u062C\u0639\u0644 \u0645\u0646 \u0628\u064A\u0626\u0629 \u0627\u0644\u0639\u0645\u0644 \u0645\u0633\u0627\u062D\u0629 \u0623\u0643\u062B\u0631 \u062D\u064A\u0648\u064A\u0629\u060C \u0635\u062D\u0629\u060C \u0648\u0643\u0641\u0627\u0621\u0629." })] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: benefits.map((benefit, i) => (_jsxs(motion.div, { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.5, delay: i * 0.08 }, className: "group relative p-8 rounded-3xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm hover:bg-white/[0.06] hover:border-white/[0.1] transition-colors duration-300", children: [_jsx("div", { className: `w-14 h-14 rounded-2xl bg-gradient-to-br ${benefit.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`, children: _jsx(benefit.icon, { className: `w-7 h-7 ${benefit.iconColor}` }) }), _jsx("h3", { className: "text-xl font-bold text-white mb-3", children: benefit.title }), _jsx("p", { className: "text-slate-400 leading-relaxed", children: benefit.description })] }, i))) })] }) }));
};
