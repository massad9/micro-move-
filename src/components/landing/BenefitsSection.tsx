import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Gamepad2, BarChart3, HeartPulse, Bell, Shield } from 'lucide-react';

const benefits = [
    {
        icon: Brain,
        title: 'تنبيهات ذكية بالذكاء الاصطناعي',
        description: 'تنبيهات مخصصة تراعي سياق العمل وجدول الاجتماعات لكل موظف.',
        iconColor: 'text-accent',
    },
    {
        icon: Gamepad2,
        title: 'تحديات تفاعلية ومكافآت',
        description: 'نظام نقاط ومكافآت يحوّل الحركة إلى تجربة ممتعة ومحفّزة.',
        iconColor: 'text-primary',
    },
    {
        icon: BarChart3,
        title: 'تحليلات متقدمة',
        description: 'لوحة تحكم شاملة تعرض بيانات النشاط والإنتاجية لفريقك بالكامل.',
        iconColor: 'text-energy-hydration',
    },
    {
        icon: HeartPulse,
        title: 'صحة الفريق',
        description: 'مراقبة مؤشرات صحة الفريق وتقليل مخاطر الجلوس المطوّل.',
        iconColor: 'text-energy-mindfulness',
    },
    {
        icon: Bell,
        title: 'تنبيهات واعية بالسياق',
        description: 'لا تقاطع اجتماعاتك المهمة — التنبيهات تأتي في الوقت المناسب فقط.',
        iconColor: 'text-energy-physical',
    },
    {
        icon: Shield,
        title: 'خصوصية وأمان',
        description: 'بيانات الموظفين محمية بالكامل مع التزام صارم بمعايير الأمان.',
        iconColor: 'text-text-secondary',
    },
];

export const BenefitsSection: React.FC = () => {
    return (
        <section className="relative z-10 py-24 px-4">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="inline-block px-3 py-1 rounded-lg bg-surface-2 border border-border text-primary text-xs font-medium mb-6 tracking-wide uppercase">
                        المزايا والخصائص
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4 tracking-tight">
                        مميزات صُممت لبيئة عملك
                    </h2>
                    <p className="text-base text-text-secondary max-w-2xl mx-auto">
                        نظام متكامل يجمع بين ذكاء التنبيهات ومتعة التحديات، ليجعل من بيئة العمل مساحة أكثر حيوية، صحة، وكفاءة.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {benefits.map((benefit, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: i * 0.06 }}
                            className="group p-6 rounded-xl bg-surface-1 border border-border hover:border-primary/20 transition-colors duration-200"
                        >
                            <div className="w-10 h-10 rounded-lg bg-surface-2 border border-border flex items-center justify-center mb-4">
                                <benefit.icon className={`w-5 h-5 ${benefit.iconColor}`} />
                            </div>
                            <h3 className="text-base font-semibold text-text-primary mb-2">{benefit.title}</h3>
                            <p className="text-sm text-text-secondary leading-relaxed">{benefit.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
