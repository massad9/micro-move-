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
        <section className="relative z-10 py-32 px-6">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col gap-6 mb-24"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 text-[10px] font-bold tracking-[0.2em] uppercase text-primary bg-primary/10 rounded-full border border-primary/20 w-fit">
                        كيف يعمل
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
                        أربع خطوات نحو فريق <br /> أكثر صحة
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-2xl font-medium opacity-80">
                        من الإعداد إلى النتائج في أقل من ١٠ دقائق.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
                    {/* Connection Line */}
                    <div className="absolute top-1/2 left-0 right-0 h-px bg-border/10 -translate-y-1/2 hidden lg:block" />
                    
                    {steps.map((step, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.15 }}
                            className="linear-card p-10 relative z-10 group hover:border-primary/20 transition-all duration-500"
                        >
                            <div className="flex items-center justify-between mb-8">
                                <div className="w-12 h-12 rounded-xl bg-secondary border border-border/40 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                                    <step.icon className="w-5 h-5 text-primary" />
                                </div>
                                <span className="text-3xl font-bold text-foreground/5 tracking-tighter group-hover:text-primary/10 transition-colors duration-500">{step.number}</span>
                            </div>
                            <h3 className="text-lg font-bold text-foreground mb-4 tracking-tight">{step.title}</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed font-medium opacity-80">{step.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
