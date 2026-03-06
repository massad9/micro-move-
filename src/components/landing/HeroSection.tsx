import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Activity, Play, Building2, UserCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeroSectionProps {
    onSelectRole: (role: 'admin' | 'employee') => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onSelectRole }) => {
    return (
        <section className="relative z-10 w-full">
            <header className="px-8 py-6 w-full flex justify-between items-center max-w-7xl mx-auto">
                <div className="flex items-center gap-2">
                    <img src="/logo.png" alt="Micro Move" className="h-8 brightness-0 invert" />
                </div>
                <div className="flex gap-4 items-center">
                    <Button
                        variant="ghost"
                        className="text-slate-300 hover:text-white hover:bg-white/5 flex items-center gap-2"
                        onClick={() => onSelectRole('employee')}
                    >
                        <UserCircle className="w-5 h-5" />
                        دخول الموظفين
                    </Button>
                </div>
            </header>

            <main className="flex flex-col items-center justify-center px-4 pt-12 pb-24 max-w-6xl mx-auto w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full">
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="flex flex-col gap-8"
                    >
                        <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[1.1] text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/60">
                            صحة فريقك هي محرك
                            إنتاجيتك..{' '}
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-[#ffb938] to-primary bg-[length:200%_auto] animate-gradient">
                                استثمر فيها كل يوم
                            </span>
                        </h1>

                        <p className="text-lg md:text-xl text-slate-400 leading-relaxed max-w-xl font-light">
                            نوفر منصة متكاملة للحد من أضرار الجلوس المكتبي. عبر فواصل قصيرة وممتعة، نضمن لك فريقاً أكثر نشاطاً، أقل توتراً، وبولاء وسعادة أكبر لشركتك.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => onSelectRole('admin')}
                                className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-black font-bold rounded-full overflow-hidden transition-all hover:shadow-[0_0_40px_rgba(255,255,255,0.2)]"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-white via-white to-slate-200 opacity-0 group-hover:opacity-100 transition-opacity" />
                                <Building2 className="w-5 h-5 relative z-10" />
                                <span className="relative z-10">إنشاء مساحة عمل الشركة</span>
                                <Sparkles className="w-4 h-4 text-primary relative z-10" />
                            </motion.button>

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
                                className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-white/5 border border-white/10 text-white font-semibold rounded-full hover:bg-white/10 transition-colors"
                            >
                                <span>تعرّف على الأسعار</span>
                            </motion.button>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="relative lg:h-[600px] flex items-center justify-center perspective-[2000px]"
                    >
                        <div className="relative w-full max-w-md" style={{ transformStyle: 'preserve-3d', transform: 'rotateY(10deg) rotateX(10deg)' }}>
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute -top-12 -left-12 w-64 p-6 bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl skew-x-[2deg]"
                                style={{ transform: 'translateZ(-50px)' }}
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
                                        <Activity className="w-5 h-5 text-red-400" />
                                    </div>
                                    <span className="text-xs font-semibold px-2 py-1 bg-white/5 rounded-full text-white/60">خطر عالي</span>
                                </div>
                                <h3 className="text-white/80 font-medium mb-1">وقت الجلوس</h3>
                                <p className="text-3xl font-bold text-white">٤ س ١٢ د <span className="text-sm font-normal text-red-400">متوسط</span></p>
                            </motion.div>

                            <motion.div
                                animate={{ y: [0, 10, 0] }}
                                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                                className="relative z-10 w-full bg-[#111] backdrop-blur-2xl border border-white/10 rounded-[2rem] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col gap-6 transform-gpu"
                            >
                                <div className="flex items-center gap-4 border-b border-white/5 pb-6">
                                    <div className="relative">
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-primary to-amber-500 flex items-center justify-center shadow-[0_0_20px_rgba(249,115,22,0.4)]">
                                            <Sparkles className="w-6 h-6 text-white" />
                                        </div>
                                        <div className="absolute -bottom-1 -left-1 w-4 h-4 bg-green-500 rounded-full border-2 border-[#111]"></div>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-white tracking-tight">تنبيه ذكي</h3>
                                        <p className="text-sm text-slate-400">مقاطعة واعية بالسياق</p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <p className="text-[1.05rem] leading-relaxed text-slate-300">
                                        "<span className="text-white font-medium">أحسنت في اجتماعك الطويل!</span> جسمك يحتاج استراحة. ما رأيك بتمرين رقبة لمدة دقيقتين لتجديد نشاطك؟"
                                    </p>

                                    <div className="flex items-center gap-3 pt-4">
                                        <button className="flex-1 bg-primary text-white font-semibold py-3 px-4 rounded-xl flex justify-center items-center gap-2 hover:bg-primary/90 transition-colors">
                                            <Play className="w-4 h-4 fill-current" /> قبول (+٢٠ نقطة)
                                        </button>
                                        <button className="py-3 px-4 bg-white/5 text-slate-400 font-medium rounded-xl hover:bg-white/10 hover:text-white transition-colors">
                                            تخطي
                                        </button>
                                    </div>
                                </div>
                            </motion.div>

                            <div className="absolute top-[20%] -right-16 w-32 h-32 bg-primary/30 blur-[60px] rounded-full mix-blend-screen -z-10" />
                        </div>
                    </motion.div>
                </div>
            </main>
        </section>
    );
};
