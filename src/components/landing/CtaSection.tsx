import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Building2 } from 'lucide-react';

interface CtaSectionProps {
  onSelectRole?: (role: 'admin' | 'employee') => void;
  onSetupWorkspace?: () => void;
}

export const CtaSection: React.FC<CtaSectionProps> = ({ onSetupWorkspace }) => {
  return (
    <section className="relative py-24 md:py-32 px-4 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[50%] bg-primary/10 blur-[160px] rounded-full" />
      </div>

      <div className="relative max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-2xl border border-border bg-surface-1 p-10 md:p-16 text-center overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] via-transparent to-accent/[0.03] pointer-events-none" />

          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-12 h-12 mx-auto mb-8 rounded-xl bg-primary/15 border border-primary/20 flex items-center justify-center"
            >
              <Sparkles className="w-6 h-6 text-primary" />
            </motion.div>

            <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-text-primary mb-4">
              ابدأ رحلة فريقك نحو
              <br />
              <span className="gradient-text-primary">
                صحة وإنتاجية أفضل
              </span>
            </h2>

            <p className="text-base text-text-secondary max-w-xl mx-auto mb-10 leading-relaxed">
              انضم لأكثر من ٥٠٠ شركة حسّنت بيئة عملها مع مايكرو موف.
              ابدأ تجربتك المجانية اليوم بدون بطاقة ائتمان.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => onSetupWorkspace?.()}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3 bg-primary text-white font-semibold text-sm rounded-lg hover:bg-primary/90 transition-colors cursor-pointer"
              >
                <Building2 className="w-4 h-4" />
                <span>إنشاء مساحة عمل الشركة</span>
                <Sparkles className="w-3.5 h-3.5 opacity-70" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3 bg-surface-2 border border-border text-text-primary font-medium text-sm rounded-lg hover:bg-surface-3 transition-colors cursor-pointer"
              >
                <span>تعرّف على الأسعار</span>
              </motion.button>
            </div>

            <p className="mt-6 text-xs text-text-quaternary">
              لا حاجة لبطاقة ائتمان • إعداد خلال دقيقتين • إلغاء في أي وقت
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
