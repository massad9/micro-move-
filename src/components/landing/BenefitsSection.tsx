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
        <section className="relative z-10 py-24 px-4">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-semibold mb-6">
                        المزايا والخصائص
                    </span>
                    <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
                        مميزات صُممت لبيئة عملك
                    </h2>
                    <p className="text-lg text-slate-400 max-w-2xl mx-auto font-light">
                        نظام متكامل يجمع بين ذكاء التنبيهات ومتعة التحديات، ليجعل من بيئة العمل مساحة أكثر حيوية، صحة، وكفاءة.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {benefits.map((benefit, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.08 }}
                            className="group relative p-8 rounded-3xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm hover:bg-white/[0.06] hover:border-white/[0.1] transition-colors duration-300"
                        >
                            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${benefit.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                <benefit.icon className={`w-7 h-7 ${benefit.iconColor}`} />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">{benefit.title}</h3>
                            <p className="text-slate-400 leading-relaxed">{benefit.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
