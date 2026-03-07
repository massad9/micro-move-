import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Building2 } from 'lucide-react';

interface CtaSectionProps {
  onSelectRole?: (role: 'admin' | 'employee') => void;
  onSetupWorkspace?: () => void;
}

export const CtaSection: React.FC<CtaSectionProps> = ({ onSetupWorkspace }) => {
  return (
    <section className="relative py-32 px-6 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/5 blur-[150px] opacity-20" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="linear-card p-16 md:p-24 text-center border-primary/10 bg-primary/[0.01]"
        >
          <div className="relative z-10">
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center mx-auto mb-10 shadow-2xl shadow-primary/20"
            >
                <Sparkles className="w-8 h-8 text-primary-foreground" />
            </motion.div>

            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-foreground mb-8">
              ابدأ رحلة فريقك نحو <br />
              <span className="text-primary brightness-125">صحة وإنتاجية غير مسبوقة</span>
            </h2>

            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-16 font-medium leading-relaxed opacity-80 text-balance">
              انضم لأكثر من ٥٠٠ شركة حسّنت بيئة عملها مع مايكرو موف.
              ابدأ تجربتك المجانية اليوم بدون بطاقة ائتمان.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button
                onClick={() => onSetupWorkspace?.()}
                className="h-16 px-10 bg-primary text-primary-foreground font-bold text-[13px] uppercase tracking-widest rounded-xl shadow-2xl shadow-primary/20 hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-3"
              >
                <Building2 className="w-5 h-5" />
                إنشاء مساحة عمل الشركة
              </button>

              <button
                onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
                className="h-16 px-10 bg-secondary text-foreground border border-border/40 font-bold text-[13px] uppercase tracking-widest rounded-xl hover:bg-secondary/80 active:scale-[0.98] transition-all"
              >
                تعرّف على الأسعار
              </button>
            </div>

            <p className="mt-12 text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] opacity-50">
              لا حاجة لبطاقة ائتمان • إعداد خلال دقيقتين • إلغاء في أي وقت
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
