import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Activity, Play, Building2, UserCircle, ArrowLeft } from 'lucide-react';

interface HeroSectionProps {
    onSelectRole: (role: 'admin' | 'employee') => void;
    onSetupWorkspace?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onSelectRole, onSetupWorkspace }) => {
    return (
        <section className="relative z-10 w-full">
            <header className="px-6 md:px-8 py-5 w-full flex justify-between items-center max-w-7xl mx-auto">
                <div className="flex items-center gap-2">
                    <img src="/logo.png" alt="Micro Move" className="h-7 brightness-0 invert opacity-90" />
                </div>
                <div className="flex gap-1 items-center">
                    <button
                        className="text-text-tertiary hover:text-text-primary hover:bg-surface-2 flex items-center gap-2 cursor-pointer px-3 py-2 rounded-lg text-sm transition-colors"
                        onClick={() => onSelectRole('admin')}
                    >
                        <Building2 className="w-4 h-4" aria-hidden="true" />
                        <span className="hidden sm:inline">دخول للإدارة</span>
                    </button>
                    <button
                        className="text-text-tertiary hover:text-text-primary hover:bg-surface-2 flex items-center gap-2 cursor-pointer px-3 py-2 rounded-lg text-sm transition-colors"
                        onClick={() => onSelectRole('employee')}
                    >
                        <UserCircle className="w-4 h-4" aria-hidden="true" />
                        <span className="hidden sm:inline">دخول الموظفين</span>
                    </button>
                </div>
            </header>

            <main className="flex flex-col items-center justify-center px-4 pt-16 md:pt-24 pb-24 md:pb-32 max-w-6xl mx-auto w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center w-full">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        className="flex flex-col gap-6"
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium w-fit">
                            <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
                            منصة العافية المؤسسية
                        </div>

                        <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.1]">
                            <span className="text-text-primary">صحة فريقك هي محرك</span>
                            <br />
                            <span className="text-text-primary">إنتاجيتك..</span>
                            {' '}
                            <span className="gradient-text-primary">
                                استثمر فيها كل يوم
                            </span>
                        </h1>

                        <p className="text-base md:text-lg text-text-tertiary leading-relaxed max-w-lg">
                            نوفر منصة متكاملة للحد من أضرار الجلوس المكتبي. عبر فواصل قصيرة وممتعة، نضمن لك فريقاً أكثر نشاطاً، أقل توتراً، وبولاء وسعادة أكبر لشركتك.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-3 pt-2">
                            <motion.button
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.99 }}
                                onClick={() => onSetupWorkspace?.()}
                                className="group inline-flex items-center justify-center gap-2.5 px-6 py-3 bg-primary text-white font-medium rounded-xl transition-shadow hover:shadow-glow-sm cursor-pointer text-sm"
                            >
                                <Building2 className="w-4 h-4" aria-hidden="true" />
                                إنشاء مساحة عمل الشركة
                                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" aria-hidden="true" />
                            </motion.button>

                            <motion.button
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.99 }}
                                onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
                                className="inline-flex items-center justify-center gap-2.5 px-6 py-3 bg-transparent border border-border text-text-secondary font-medium rounded-xl hover:bg-surface-2 hover:text-text-primary transition-colors cursor-pointer text-sm"
                            >
                                تعرّف على الأسعار
                            </motion.button>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                        className="relative flex items-center justify-center"
                    >
                        <div className="relative w-full max-w-md">
                            <motion.div
                                animate={{ y: [0, -6, 0] }}
                                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute -top-8 -left-8 w-56 p-4 bg-surface-1/90 backdrop-blur-xl border border-border rounded-xl"
                                style={{ transform: 'translateZ(-50px)' }}
                            >
                                <div className="flex justify-between items-start mb-3">
                                    <div className="w-8 h-8 rounded-lg bg-destructive/15 flex items-center justify-center">
                                        <Activity className="w-4 h-4 text-destructive" />
                                    </div>
                                    <span className="text-[11px] font-medium px-2 py-0.5 bg-surface-2 rounded-md text-text-tertiary">خطر عالي</span>
                                </div>
                                <p className="text-text-tertiary text-xs mb-0.5">وقت الجلوس</p>
                                <p className="text-xl font-bold text-text-primary">٤ س ١٢ د <span className="text-xs font-normal text-destructive/80">متوسط</span></p>
                            </motion.div>

                            <motion.div
                                animate={{ y: [0, 6, 0] }}
                                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                                className="relative z-10 w-full bg-surface-1 border border-border rounded-2xl p-6 flex flex-col gap-5"
                            >
                                <div className="flex items-center gap-3 border-b border-border pb-4">
                                    <div className="relative">
                                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-violet-600 flex items-center justify-center">
                                            <Sparkles className="w-5 h-5 text-white" />
                                        </div>
                                        <div className="absolute -bottom-0.5 -left-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-surface-1"></div>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-semibold text-text-primary">تنبيه ذكي</h3>
                                        <p className="text-xs text-text-tertiary">مقاطعة واعية بالسياق</p>
                                    </div>
                                </div>

                                <p className="text-sm leading-relaxed text-text-secondary">
                                    "<span className="text-text-primary font-medium">أحسنت في اجتماعك الطويل!</span> جسمك يحتاج استراحة. ما رأيك بتمرين رقبة لمدة دقيقتين لتجديد نشاطك؟"
                                </p>

                                <div className="flex items-center gap-2 pt-1">
                                    <button className="flex-1 bg-primary text-white font-medium py-2.5 px-4 rounded-lg flex justify-center items-center gap-2 hover:bg-primary/90 transition-colors cursor-pointer text-sm">
                                        <Play className="w-3.5 h-3.5 fill-current" aria-hidden="true" /> قبول (+٢٠ نقطة)
                                    </button>
                                    <button className="py-2.5 px-4 bg-surface-2 text-text-tertiary font-medium rounded-lg hover:bg-surface-3 hover:text-text-secondary transition-colors cursor-pointer text-sm">
                                        تخطي
                                    </button>
                                </div>
                            </motion.div>

                            <div className="absolute top-[20%] -right-12 w-24 h-24 bg-primary/20 blur-[50px] rounded-full -z-10" />
                            <div className="absolute bottom-[10%] -left-8 w-20 h-20 bg-violet-500/15 blur-[40px] rounded-full -z-10" />
                        </div>
                    </motion.div>
                </div>
            </main>
        </section>
    );
};
