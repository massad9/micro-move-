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

export const SocialProofSection: React.FC = () => {
    return (
        <section className="relative z-10 py-20 px-4">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-16"
                >
                    {stats.map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.08 }}
                            className="flex flex-col items-center gap-3 p-6 rounded-xl bg-surface-1 border border-border shadow-soft"
                        >
                            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                <stat.icon className="w-5 h-5 text-primary" />
                            </div>
                            <span className="text-3xl md:text-4xl font-bold text-text-primary tracking-tight">{stat.value}</span>
                            <span className="text-sm text-text-tertiary">{stat.label}</span>
                        </motion.div>
                    ))}
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="text-center"
                >
                    <p className="text-sm text-text-quaternary font-medium mb-8 tracking-wide">موثوق من قبل أفضل الشركات في المنطقة</p>
                    <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
                        {companyNames.map((name, i) => (
                            <span
                                key={i}
                                className="text-lg md:text-xl font-semibold text-text-quaternary hover:text-text-tertiary transition-colors duration-300 select-none"
                            >
                                {name}
                            </span>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
