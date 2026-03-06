import React from 'react';
import { motion } from 'framer-motion';
import { Check, Sparkles, Building2, Zap } from 'lucide-react';

const plans = [
  {
    name: 'مجاني',
    price: '٠',
    period: '/شهرياً',
    description: 'للفرق الصغيرة التي تريد البداية',
    icon: Zap,
    features: [
      'حتى ٥ موظفين',
      'تنبيهات حركة أساسية',
      'لوحة إحصائيات بسيطة',
      'تمارين محدودة',
      'دعم عبر البريد الإلكتروني',
    ],
    cta: 'ابدأ مجاناً',
    popular: false,
    gradient: 'from-slate-800 to-slate-900',
    borderColor: 'border-white/10',
  },
  {
    name: 'احترافي',
    price: '٤٩',
    period: 'ر.س/شهرياً',
    description: 'للشركات التي تهتم بصحة موظفيها',
    icon: Sparkles,
    features: [
      'حتى ٥٠ موظف',
      'تنبيهات ذكية بالذكاء الاصطناعي',
      'تحليلات متقدمة وتقارير',
      'نظام نقاط ومكافآت كامل',
      'لوحة متصدرين وتحديات',
      'تمارين متنوعة غير محدودة',
      'دعم فني أولوية',
    ],
    cta: 'ابدأ تجربة مجانية',
    popular: true,
    gradient: 'from-primary/20 to-amber-600/20',
    borderColor: 'border-primary/40',
  },
  {
    name: 'المؤسسات',
    price: 'مخصص',
    period: '',
    description: 'حلول مخصصة للمؤسسات الكبرى',
    icon: Building2,
    features: [
      'عدد موظفين غير محدود',
      'تكامل مع أنظمة الموارد البشرية',
      'تخصيص كامل للعلامة التجارية',
      'API متقدم',
      'مدير حساب مخصص',
      'تقارير تنفيذية',
      'اتفاقية مستوى خدمة SLA',
      'تدريب وتأهيل مخصص',
    ],
    cta: 'تواصل معنا',
    popular: false,
    gradient: 'from-slate-800 to-slate-900',
    borderColor: 'border-white/10',
  },
];

export const PricingSection: React.FC = () => {
  return (
    <section id="pricing" className="relative py-24 md:py-32 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
            خطط الأسعار
          </span>
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-white mb-4">
            خطة مناسبة لكل فريق
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            اختر الخطة التي تناسب حجم فريقك واحتياجاتك. يمكنك الترقية أو التغيير في أي وقت.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative flex flex-col rounded-3xl border ${plan.borderColor} bg-gradient-to-b ${plan.gradient} p-8 ${
                plan.popular ? 'md:-mt-4 md:mb-0 md:pb-12 shadow-[0_0_60px_rgba(249,115,22,0.15)]' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-gradient-to-r from-primary to-amber-500 rounded-full text-white text-sm font-bold shadow-[0_4px_20px_rgba(249,115,22,0.4)]">
                  الأكثر شيوعاً
                </div>
              )}

              <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${plan.popular ? 'bg-primary/20' : 'bg-white/5'}`}>
                  <plan.icon className={`w-5 h-5 ${plan.popular ? 'text-primary' : 'text-slate-400'}`} />
                </div>
                <h3 className="text-xl font-bold text-white">{plan.name}</h3>
              </div>

              <p className="text-slate-400 text-sm mb-6">{plan.description}</p>

              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-4xl md:text-5xl font-black text-white">{plan.price}</span>
                {plan.period && <span className="text-slate-400 text-sm">{plan.period}</span>}
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <div className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${plan.popular ? 'bg-primary/20' : 'bg-white/10'}`}>
                      <Check className={`w-3 h-3 ${plan.popular ? 'text-primary' : 'text-slate-400'}`} />
                    </div>
                    <span className="text-slate-300 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full py-3.5 rounded-xl font-bold text-sm transition-all ${
                  plan.popular
                    ? 'bg-primary text-white hover:bg-primary/90 shadow-[0_4px_20px_rgba(249,115,22,0.3)]'
                    : 'bg-white/5 text-white border border-white/10 hover:bg-white/10'
                }`}
              >
                {plan.cta}
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
