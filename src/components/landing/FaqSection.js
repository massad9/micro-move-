import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
const faqs = [
    {
        question: 'ما هو مايكرو موف؟',
        answer: 'مايكرو موف هو منصة ذكية تستخدم الذكاء الاصطناعي لتقديم تنبيهات حركية مخصصة للموظفين أثناء ساعات العمل. الهدف هو مكافحة أضرار الجلوس المطوّل وتحسين صحة وإنتاجية الفريق.',
    },
    {
        question: 'كيف يعمل نظام التنبيهات الذكية؟',
        answer: 'يحلل الذكاء الاصطناعي جدول الموظف واجتماعاته وأنماط عمله ليقدم تنبيهات في الأوقات المناسبة. التنبيهات تكون واعية بالسياق — لن تقاطعك أثناء اجتماع مهم، بل تنتظر اللحظة المثالية.',
    },
    {
        question: 'هل يمكن تخصيص التمارين والأنشطة؟',
        answer: 'نعم! يمكن للمسؤولين إضافة وتعديل الأنشطة والتمارين بما يتناسب مع بيئة العمل. كما يتعلم النظام تفضيلات كل موظف مع مرور الوقت ليقدم اقتراحات أكثر ملاءمة.',
    },
    {
        question: 'كيف يعمل نظام النقاط والمكافآت؟',
        answer: 'يكسب الموظفون نقاطاً عند إتمام التمارين والأنشطة. يمكن استبدال هذه النقاط بمكافآت يحددها المسؤول مثل إجازات إضافية أو قسائم شرائية أو هدايا. النظام يشمل أيضاً لوحة متصدرين وتحديات جماعية.',
    },
    {
        question: 'هل مايكرو موف آمن وخاص؟',
        answer: 'بالتأكيد. نلتزم بأعلى معايير الأمان والخصوصية. البيانات مشفرة بالكامل ولا نشارك أي معلومات شخصية مع أطراف ثالثة. كل موظف يتحكم في إعدادات خصوصيته.',
    },
    {
        question: 'هل يتكامل مع أنظمتنا الحالية؟',
        answer: 'في خطة المؤسسات، نوفر تكاملاً مع أنظمة الموارد البشرية الشائعة وتقويمات العمل (Google Calendar، Microsoft Teams) وأدوات التواصل المختلفة.',
    },
];
const FaqItem = ({ question, answer, isOpen, onToggle, index }) => (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.4, delay: index * 0.05 }, className: `border border-white/10 rounded-2xl overflow-hidden transition-colors ${isOpen ? 'bg-white/[0.03]' : 'bg-transparent hover:bg-white/[0.02]'}`, children: [_jsxs("button", { onClick: onToggle, "aria-expanded": isOpen, "aria-controls": `faq-panel-${index}`, id: `faq-trigger-${index}`, className: "w-full flex items-center justify-between gap-4 p-6 text-right cursor-pointer", children: [_jsx("span", { className: "text-white font-semibold text-base md:text-lg flex-1", children: question }), _jsx(motion.div, { animate: { rotate: isOpen ? 180 : 0 }, transition: { duration: 0.3 }, className: "flex-shrink-0", children: _jsx(ChevronDown, { className: `w-5 h-5 transition-colors ${isOpen ? 'text-primary' : 'text-slate-500'}` }) })] }), _jsx(AnimatePresence, { initial: false, children: isOpen && (_jsx(motion.div, { id: `faq-panel-${index}`, role: "region", "aria-labelledby": `faq-trigger-${index}`, initial: { height: 0, opacity: 0 }, animate: { height: 'auto', opacity: 1 }, exit: { height: 0, opacity: 0 }, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] }, className: "overflow-hidden", children: _jsx("p", { className: "px-6 pb-6 text-slate-400 leading-relaxed text-sm md:text-base", children: answer }) })) })] }));
export const FaqSection = () => {
    const [openIndex, setOpenIndex] = useState(0);
    return (_jsx("section", { className: "relative py-24 md:py-32 px-4", children: _jsxs("div", { className: "max-w-3xl mx-auto", children: [_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.6 }, className: "text-center mb-16", children: [_jsx("span", { className: "inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6", children: "\u0627\u0644\u0623\u0633\u0626\u0644\u0629 \u0627\u0644\u0634\u0627\u0626\u0639\u0629" }), _jsx("h2", { className: "text-4xl md:text-5xl font-black tracking-tighter text-white mb-4", children: "\u0643\u0644 \u0645\u0627 \u062A\u062D\u062A\u0627\u062C \u0645\u0639\u0631\u0641\u062A\u0647" }), _jsx("p", { className: "text-lg text-slate-400", children: "\u0625\u062C\u0627\u0628\u0627\u062A \u0639\u0644\u0649 \u0623\u0643\u062B\u0631 \u0627\u0644\u0623\u0633\u0626\u0644\u0629 \u0634\u064A\u0648\u0639\u0627\u064B \u062D\u0648\u0644 \u0645\u0627\u064A\u0643\u0631\u0648 \u0645\u0648\u0641" })] }), _jsx("div", { className: "space-y-3", children: faqs.map((faq, index) => (_jsx(FaqItem, { question: faq.question, answer: faq.answer, isOpen: openIndex === index, onToggle: () => setOpenIndex(openIndex === index ? null : index), index: index }, index))) })] }) }));
};
