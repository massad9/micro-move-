import React from 'react';
import { motion } from 'framer-motion';
import { Settings, Brain, Zap, BarChart3 } from 'lucide-react';

const steps = [
    {
        number: '٠١',
        icon: Settings,
        title: 'إعداد سريع',
        description: 'أنشئ مساحة عمل شركتك وأضف فريقك في دقائق معدودة. لا حاجة لإعدادات معقدة.',
    },
    {
        number: '٠٢',
        icon: Brain,
        title: 'تنبيهات ذكية',
        description: 'الذكاء الاصطناعي يحلل نمط عمل كل موظف ويرسل تنبيهات مخصصة في الأوقات المثالية.',
    },
    {
        number: '٠٣',
        icon: Zap,
        title: 'الموظفون يتحركون',
        description: 'تمارين سريعة ومتنوعة مدتها ١-٣ دقائق يقبلها الموظفون ويكسبون نقاطًا ومكافآت.',
    },
    {
        number: '٠٤',
        icon: BarChart3,
        title: 'تتبّع النتائج',
        description: 'لوحة تحكم متقدمة تعرض تحسّن صحة الفريق وزيادة الإنتاجية بأرقام واضحة.',
    },
];

export const HowItWorksSection: React.FC = () => {
    return (
        <section className="relative z-10 py-24 px-4">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="inline-block px-3 py-1 rounded-lg bg-surface-2 border border-border text-primary text-xs font-medium mb-6 tracking-wide uppercase">
                        كيف يعمل
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4 tracking-tight">
                        أربع خطوات نحو فريق أكثر صحة
                    </h2>
                    <p className="text-base text-text-secondary max-w-2xl mx-auto">
                        من الإعداد إلى النتائج في أقل من ١٠ دقائق.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {steps.map((step, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: i * 0.08 }}
                            className="relative p-6 rounded-xl bg-surface-1 border border-border hover:border-primary/20 transition-colors duration-200"
                        >
                            <div className="flex items-start gap-4">
                                <div className="flex flex-col items-center gap-2">
                                    <span className="text-xs font-mono font-semibold text-text-quaternary">{step.number}</span>
                                    <div className="w-10 h-10 rounded-lg bg-surface-2 border border-border flex items-center justify-center">
                                        <step.icon className="w-5 h-5 text-primary" />
                                    </div>
                                </div>
                                <div className="flex-1 pt-4">
                                    <h3 className="text-base font-semibold text-text-primary mb-2">{step.title}</h3>
                                    <p className="text-sm text-text-secondary leading-relaxed">{step.description}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
