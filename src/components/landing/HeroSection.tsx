import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Activity, Play, Building2, UserCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeroSectionProps {
    onSelectRole: (role: 'admin' | 'employee') => void;
    onSetupWorkspace?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onSelectRole, onSetupWorkspace }) => {
    return (
        <section className="relative z-10 w-full">
            <header className="px-8 py-8 w-full flex justify-between items-center max-w-7xl mx-auto">
                <div className="flex items-center gap-2">
                    <img src="/logo.png" alt="Micro Move" className="h-7 brightness-0 invert" />
                </div>
                <div className="flex gap-4 items-center">
                    <button
                        className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
                        onClick={() => onSelectRole('admin')}
                    >
                        دخول الإدارة
                    </button>
                    <button
                        className="px-5 py-2.5 rounded-lg bg-secondary border border-border/40 text-[11px] font-bold uppercase tracking-widest text-foreground hover:bg-secondary/80 transition-all"
                        onClick={() => onSelectRole('employee')}
                    >
                        دخول الموظفين
                    </button>
                </div>
            </header>

            <main className="flex flex-col items-center justify-center px-6 pt-16 pb-32 max-w-7xl mx-auto w-full">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-center w-full">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="lg:col-span-7 flex flex-col gap-10"
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 text-[10px] font-bold tracking-[0.2em] uppercase text-primary bg-primary/10 rounded-full border border-primary/20 w-fit">
                            <Sparkles className="w-3 h-3" />
                            مستقبل بيئة العمل الصحية
                        </div>
                        
                        <h1 className="text-6xl md:text-8xl font-bold tracking-tight leading-[1.05] text-foreground">
                            استثمر في <br />
                            <span className="text-secondary-foreground">صحة فريقك</span>
                        </h1>

                        <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-2xl font-medium opacity-80">
                            منصة ذكية تحول الفواصل المكتبية إلى تجارب تنشيطية ملهمة. عزز إنتاجية فريقك وقلل الإرهاق عبر حركات بسيطة ومؤثرة.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-6 pt-4">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => onSetupWorkspace?.()}
                                className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-primary text-primary-foreground font-bold rounded-xl shadow-2xl shadow-primary/20 hover:shadow-primary/30 transition-all text-sm uppercase tracking-widest"
                            >
                                <Building2 className="w-5 h-5" />
                                <span>ابدأ تجربة شركتك</span>
                            </motion.button>

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
                                className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-secondary/50 border border-border/40 text-foreground font-bold rounded-xl hover:bg-secondary transition-all text-sm uppercase tracking-widest"
                            >
                                <span>خطط الأسعار</span>
                            </motion.button>
                        </div>
                        
                        <div className="flex items-center gap-8 pt-8 border-t border-border/20">
                            <div className="flex flex-col">
                                <span className="text-2xl font-bold text-foreground">+٥٠٠</span>
                                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">شركة مستفيدة</span>
                            </div>
                            <div className="w-[1px] h-10 bg-border/20" />
                            <div className="flex flex-col">
                                <span className="text-2xl font-bold text-foreground">٩٨٪</span>
                                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">رضا الموظفين</span>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="lg:col-span-5 relative flex items-center justify-center"
                    >
                        <div className="relative w-full max-w-lg">
                            {/* Dashboard Mockup Component */}
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                                className="linear-card p-10 relative z-20 shadow-[0_50px_100px_rgba(0,0,0,0.4)]"
                            >
                                <div className="flex items-center gap-5 border-b border-border/40 pb-8 mb-8">
                                    <div className="w-14 h-14 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center shadow-lg shadow-primary/20">
                                        <Sparkles className="w-7 h-7" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-foreground tracking-tight">تنبيه ذكي</h3>
                                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">توصية مخصصة الآن</p>
                                    </div>
                                </div>

                                <div className="space-y-8">
                                    <p className="text-lg leading-relaxed text-muted-foreground">
                                        "لقد قضيت <span className="text-foreground font-bold">٣ ساعات متواصلة</span> أمام الشاشة. جسمك يحتاج حركة سريعة لاستعادة التركيز."
                                    </p>

                                    <div className="flex items-center gap-4">
                                        <button className="flex-1 bg-primary text-primary-foreground font-bold py-4 px-6 rounded-xl flex justify-center items-center gap-2 hover:brightness-110 transition-all text-xs uppercase tracking-widest">
                                            <Play className="w-4 h-4 fill-current" /> قبول الجلسة
                                        </button>
                                        <button className="py-4 px-6 bg-secondary text-muted-foreground font-bold rounded-xl hover:text-foreground transition-all text-xs uppercase tracking-widest">
                                            تخطي
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                            
                            {/* Secondary Mockup Card */}
                            <motion.div
                                animate={{ y: [0, 10, 0] }}
                                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                                className="absolute -top-16 -left-16 w-72 p-6 linear-glass border-primary/20 rounded-2xl z-10 shadow-2xl"
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
                                        <Activity className="w-5 h-5 text-orange-500" />
                                    </div>
                                    <span className="text-[9px] font-bold px-2.5 py-1 bg-red-500/10 text-red-500 border border-red-500/20 rounded-full uppercase tracking-widest">خطر إرهاق</span>
                                </div>
                                <h3 className="text-muted-foreground font-bold text-[10px] uppercase tracking-widest mb-1">وقت الجلوس</h3>
                                <p className="text-2xl font-bold text-foreground tracking-tighter">٤ س ١٢ د</p>
                            </motion.div>

                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-primary/5 blur-[120px] rounded-full -z-10" />
                        </div>
                    </motion.div>
                </div>
            </main>
        </section>
    );
};
