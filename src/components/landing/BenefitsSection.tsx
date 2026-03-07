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

export const BenefitsSection: React.FC = () => {
    return (
        <section className="relative z-10 py-32 px-6">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col gap-6 mb-20"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 text-[10px] font-bold tracking-[0.2em] uppercase text-primary bg-primary/10 rounded-full border border-primary/20 w-fit">
                        المزايا والخصائص
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight">
                        مميزات صُممت لنظام <br /> عمل عصري
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-2xl font-medium opacity-80">
                        نظام متكامل يجمع بين ذكاء التنبيهات ومتعة التحديات، ليجعل من بيئة العمل مساحة أكثر حيوية، صحة، وكفاءة.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {benefits.map((benefit, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.08 }}
                            className="linear-card p-10 group hover:border-primary/20 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500"
                        >
                            <div className={`w-12 h-12 rounded-xl bg-secondary border border-border/40 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500`}>
                                <benefit.icon className={`w-5 h-5 ${benefit.iconColor}`} />
                            </div>
                            <h3 className="text-lg font-bold text-foreground mb-4 tracking-tight">{benefit.title}</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed font-medium opacity-80">{benefit.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
