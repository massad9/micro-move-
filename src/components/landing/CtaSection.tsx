import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Building2 } from 'lucide-react';

interface CtaSectionProps {
  onSelectRole?: (role: 'admin' | 'employee') => void;
  onSetupWorkspace?: () => void;
}

export const CtaSection: React.FC<CtaSectionProps> = ({ onSelectRole, onSetupWorkspace }) => {
  return (
    <section className="relative py-24 md:py-32 px-4 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[60%] bg-primary/15 blur-[150px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-amber-500/10 blur-[120px] rounded-full" />
      </div>

      <div className="relative max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-[2rem] border border-white/10 bg-gradient-to-b from-white/[0.05] to-transparent p-10 md:p-16 text-center overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-amber-500/5 pointer-events-none" />

          <div className="relative z-10">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-16 h-16 mx-auto mb-8 rounded-2xl bg-gradient-to-br from-primary to-amber-500 flex items-center justify-center shadow-[0_0_40px_rgba(249,115,22,0.4)]"
            >
              <Sparkles className="w-8 h-8 text-white" />
            </motion.div>

            <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-white mb-4">
              ابدأ رحلة فريقك نحو
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-amber-400">
                صحة وإنتاجية أفضل
              </span>
            </h2>

            <p className="text-lg text-slate-400 max-w-xl mx-auto mb-10 leading-relaxed">
              انضم لأكثر من ٥٠٠ شركة حسّنت بيئة عملها مع مايكرو موف.
              ابدأ تجربتك المجانية اليوم بدون بطاقة ائتمان.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => onSetupWorkspace?.()}
                className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-black font-bold rounded-full overflow-hidden transition-all hover:shadow-[0_0_40px_rgba(255,255,255,0.2)]"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white via-white to-slate-200 opacity-0 group-hover:opacity-100 transition-opacity" />
                <Building2 className="w-5 h-5 relative z-10" />
                <span className="relative z-10">إنشاء مساحة عمل الشركة</span>
                <Sparkles className="w-4 h-4 text-primary relative z-10" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
                className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-white/5 border border-white/10 text-white font-semibold rounded-full hover:bg-white/10 transition-colors"
              >
                <span>تعرّف على الأسعار</span>
              </motion.button>
            </div>

            <p className="mt-6 text-sm text-slate-500">
              لا حاجة لبطاقة ائتمان • إعداد خلال دقيقتين • إلغاء في أي وقت
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
