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
        <section className="relative z-10 py-16 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            className="linear-glass p-8 flex flex-col items-center gap-4 text-center border-border/20"
                        >
                            <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center border border-border/40">
                                <stat.icon className="w-5 h-5 text-primary" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-3xl font-bold text-foreground tracking-tighter">{stat.value}</span>
                                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{stat.label}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="text-center pt-10 border-t border-border/10">
                    <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-[0.3em] mb-10 opacity-60">الشركات التي تصنع مستقبل العمل معنا</p>
                    <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
                        {companyNames.map((name, i) => (
                            <span
                                key={i}
                                className="text-xl font-bold text-foreground/20 hover:text-foreground/50 transition-colors duration-500 cursor-default"
                            >
                                {name}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
