import React from 'react';
import { motion } from 'framer-motion';
import { Settings, Brain, Zap, BarChart3 } from 'lucide-react';

const steps = [
    {
        number: '٠١',
        icon: Settings,
        title: 'إعداد سريع',
        description: 'أنشئ مساحة عمل شركتك وأضف فريقك في دقائق معدودة. لا حاجة لإعدادات معقدة.',
        color: 'from-blue-500 to-cyan-500',
        glowColor: 'rgba(59,130,246,0.3)',
    },
    {
        number: '٠٢',
        icon: Brain,
        title: 'تنبيهات ذكية',
        description: 'الذكاء الاصطناعي يحلل نمط عمل كل موظف ويرسل تنبيهات مخصصة في الأوقات المثالية.',
        color: 'from-primary to-amber-500',
        glowColor: 'rgba(249,115,22,0.3)',
    },
    {
        number: '٠٣',
        icon: Zap,
        title: 'الموظفون يتحركون',
        description: 'تمارين سريعة ومتنوعة مدتها ١-٣ دقائق يقبلها الموظفون ويكسبون نقاطًا ومكافآت.',
        color: 'from-emerald-500 to-green-500',
        glowColor: 'rgba(16,185,129,0.3)',
    },
    {
        number: '٠٤',
        icon: BarChart3,
        title: 'تتبّع النتائج',
        description: 'لوحة تحكم متقدمة تعرض تحسّن صحة الفريق وزيادة الإنتاجية بأرقام واضحة.',
        color: 'from-violet-500 to-purple-500',
        glowColor: 'rgba(139,92,246,0.3)',
    },
];

export const HowItWorksSection: React.FC = () => {
    return (
        <section className="relative z-10 py-24 px-4">
            <div className="max-w-5xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-20"
                >
                    <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-semibold mb-6">
                        كيف يعمل
                    </span>
                    <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
                        أربع خطوات نحو فريق أكثر صحة
                    </h2>
                    <p className="text-lg text-slate-400 max-w-2xl mx-auto font-light">
                        من الإعداد إلى النتائج في أقل من ١٠ دقائق.
                    </p>
                </motion.div>

                <div className="relative">
                    <div className="absolute top-0 bottom-0 right-[39px] md:right-auto md:left-1/2 md:-translate-x-px w-[2px] bg-gradient-to-b from-white/10 via-white/5 to-transparent hidden md:block" />

                    <div className="flex flex-col gap-16">
                        {steps.map((step, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: i % 2 === 0 ? 40 : -40 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: i * 0.15 }}
                                className={`relative flex flex-col md:flex-row items-center gap-8 ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                            >
                                <div className="flex-1 w-full">
                                    <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm hover:bg-white/[0.05] transition-colors duration-300">
                                        <div className="flex items-center gap-4 mb-4">
                                            <div
                                                className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center`}
                                                style={{ boxShadow: `0 0 30px ${step.glowColor}` }}
                                            >
                                                <step.icon className="w-6 h-6 text-white" />
                                            </div>
                                            <span className="text-3xl font-black text-white/10">{step.number}</span>
                                        </div>
                                        <h3 className="text-2xl font-bold text-white mb-3">{step.title}</h3>
                                        <p className="text-slate-400 leading-relaxed text-[1.05rem]">{step.description}</p>
                                    </div>
                                </div>

                                <div className="hidden md:flex w-10 h-10 rounded-full bg-[#0A0A0A] border-2 border-white/10 items-center justify-center shrink-0 z-10">
                                    <div className={`w-3 h-3 rounded-full bg-gradient-to-br ${step.color}`} />
                                </div>

                                <div className="flex-1 hidden md:block" />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
