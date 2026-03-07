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
  },
];

export const PricingSection: React.FC = () => {
  return (
    <section id="pricing" className="relative py-24 md:py-32 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-3 py-1 rounded-lg bg-surface-2 border border-border text-primary text-xs font-medium mb-6 tracking-wide uppercase">
            خطط الأسعار
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-text-primary mb-4">
            خطة مناسبة لكل فريق
          </h2>
          <p className="text-base text-text-secondary max-w-2xl mx-auto">
            اختر الخطة التي تناسب حجم فريقك واحتياجاتك. يمكنك الترقية أو التغيير في أي وقت.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 items-stretch">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className={`relative flex flex-col rounded-xl border p-6 lg:p-8 ${
                plan.popular
                  ? 'bg-surface-1 border-primary/30 shadow-glow-sm'
                  : 'bg-surface-1 border-border'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary rounded-lg text-white text-xs font-semibold">
                  الأكثر شيوعاً
                </div>
              )}

              <div className="flex items-center gap-3 mb-3">
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${plan.popular ? 'bg-primary/15' : 'bg-surface-2'}`}>
                  <plan.icon className={`w-4 h-4 ${plan.popular ? 'text-primary' : 'text-text-tertiary'}`} />
                </div>
                <h3 className="text-lg font-semibold text-text-primary">{plan.name}</h3>
              </div>

              <p className="text-text-secondary text-sm mb-5">{plan.description}</p>

              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-3xl md:text-4xl font-bold text-text-primary">{plan.price}</span>
                {plan.period && <span className="text-text-tertiary text-sm">{plan.period}</span>}
              </div>

              <ul className="space-y-2.5 mb-8 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5">
                    <div className={`mt-0.5 w-4 h-4 rounded flex items-center justify-center flex-shrink-0 ${plan.popular ? 'bg-primary/15' : 'bg-surface-3'}`}>
                      <Check className={`w-2.5 h-2.5 ${plan.popular ? 'text-primary' : 'text-text-tertiary'}`} />
                    </div>
                    <span className="text-text-secondary text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className={`w-full py-3 rounded-lg font-semibold text-sm transition-colors cursor-pointer ${
                  plan.popular
                    ? 'bg-primary text-white hover:bg-primary/90'
                    : 'bg-surface-2 text-text-primary border border-border hover:bg-surface-3'
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
