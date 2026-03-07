import React from 'react';
import { motion } from 'framer-motion';
import { Check, Sparkles, Building2, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

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
    <section id="pricing" className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-6 mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 text-[10px] font-bold tracking-[0.2em] uppercase text-primary bg-primary/10 rounded-full border border-primary/20 w-fit">
            خطط الأسعار
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
            خطة مناسبة لكل فريق
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl font-medium opacity-80">
            اختر الخطة التي تناسب حجم فريقك واحتياجاتك. يمكنك الترقية أو التغيير في أي وقت.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={cn(
                "linear-card flex flex-col p-10 relative",
                plan.popular && "border-primary/40 shadow-2xl shadow-primary/5 bg-primary/[0.02]"
              )}
            >
              {plan.popular && (
                <div className="absolute -top-4 right-10 px-4 py-1.5 bg-primary rounded-full text-primary-foreground text-[10px] font-bold uppercase tracking-widest shadow-lg shadow-primary/20">
                  الأكثر شيوعاً
                </div>
              )}

              <div className="flex items-center gap-4 mb-8">
                <div className={cn(
                  "w-12 h-12 rounded-xl flex items-center justify-center border",
                  plan.popular ? "bg-primary/20 border-primary/40" : "bg-secondary border-border/40"
                )}>
                  <plan.icon className={cn("w-6 h-6", plan.popular ? "text-primary" : "text-muted-foreground")} />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-foreground tracking-tight">{plan.name}</h3>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold opacity-70">خطة أساسية</p>
                </div>
              </div>

              <div className="flex items-baseline gap-2 mb-8">
                <span className="text-5xl font-bold text-foreground tracking-tighter">{plan.price}</span>
                {plan.period && <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest leading-none">{plan.period}</span>}
              </div>

              <p className="text-sm text-muted-foreground mb-10 font-medium leading-relaxed">{plan.description}</p>

              <ul className="space-y-4 mb-12 flex-1 pt-8 border-t border-border/10">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className={cn("w-4 h-4 mt-0.5", plan.popular ? "text-primary" : "text-muted-foreground")} />
                    <span className="text-[11px] font-bold text-foreground/80 uppercase tracking-widest">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={cn(
                  "w-full h-14 rounded-xl font-bold text-[11px] uppercase tracking-widest transition-all active:scale-[0.98]",
                  plan.popular
                    ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/10 hover:brightness-110'
                    : 'bg-secondary text-foreground border border-border/40 hover:bg-secondary/80'
                )}
              >
                {plan.cta}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
