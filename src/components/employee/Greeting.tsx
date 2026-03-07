import React from 'react'
import { motion } from 'framer-motion'
import { Flame, Target, ChevronLeft } from 'lucide-react'
import { useMicroMoveStore } from '@/store/microMoveStore'

interface GreetingProps {
    onNavigateStore?: () => void
}

export const Greeting: React.FC<GreetingProps> = ({ onNavigateStore }) => {
    const user = useMicroMoveStore(state => state.user)

    const hour = new Date().getHours()
    let greeting = 'مساء الخير'
    if (hour < 12) greeting = 'صباح الخير'
    else if (hour < 17) greeting = 'طاب مساؤك'

    if (!user) return null

    const progress = Math.min((user.completedToday / user.dailyGoal) * 100, 100)
    const isGoalMet = user.completedToday >= user.dailyGoal

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-16 font-sans">
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="lg:col-span-8 linear-card p-10 relative overflow-hidden group"
            >
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[100px] -z-10 group-hover:bg-primary/10 transition-all duration-700" />
                
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
                    <div className="flex-1">
                        <div className="inline-flex items-center gap-2 px-2.5 py-1 mb-6 text-[10px] font-bold tracking-[0.2em] uppercase text-primary bg-primary/10 rounded-full border border-primary/20">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                            ملخص النشاط اليومي
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-foreground leading-tight">
                            {greeting}، <span className="text-secondary-foreground">{user.name.split(' ')[0]}</span>
                        </h1>
                        <p className="text-muted-foreground font-medium text-lg max-w-md leading-relaxed">
                            {isGoalMet
                                ? "أداء استثنائي اليوم! لقد تجاوزت أهدافك المقترحة بالفعل."
                                : "خطوة واحدة صغيرة كفيلة بتنشيط ذهنك. هل أنت مستعد للنشاط القادم؟"}
                        </p>
                    </div>

                    <div className="linear-glass border-border/40 rounded-3xl p-8 w-full md:w-72 shrink-0 flex flex-col items-center justify-center relative group/progress">
                        {isGoalMet && (
                            <motion.div 
                                initial={{ scale: 0 }} 
                                animate={{ scale: 1 }}
                                className="absolute -top-3 -right-3 w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-lg shadow-primary/20 z-10"
                            >
                                <Flame className="w-5 h-5" />
                            </motion.div>
                        )}
                        
                        {/* Refined Circular Progress */}
                        <div className="relative w-32 h-32 mb-6">
                            <svg className="w-full h-full transform -rotate-90">
                                <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-secondary" />
                                <motion.circle
                                    cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="4" fill="transparent"
                                    className="text-primary"
                                    strokeDasharray="364"
                                    initial={{ strokeDashoffset: 364 }}
                                    animate={{ strokeDashoffset: 364 - (364 * progress) / 100 }}
                                    transition={{ duration: 2, ease: [0.23, 1, 0.32, 1], delay: 0.5 }}
                                    strokeLinecap="round"
                                />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-4xl font-bold tracking-tighter">{user.completedToday}</span>
                                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-1">/{user.dailyGoal}</span>
                            </div>
                        </div>
                        
                        <div className="text-center">
                            <h3 className="font-bold text-xs uppercase tracking-widest mb-1 text-foreground">الهدف اليومي</h3>
                            <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-tighter opacity-70">
                                تقف على بعد خطوة من الهدف
                            </p>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Motivation Card */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="lg:col-span-4 linear-card p-10 flex flex-col justify-between group overflow-hidden relative border-primary/10"
            >
                <div className="absolute -right-20 -top-20 w-48 h-48 bg-primary/5 rounded-full blur-[80px] pointer-events-none group-hover:bg-primary/10 transition-all duration-700" />

                <div className="relative z-10">
                    <div className="w-12 h-12 bg-secondary border border-border/40 text-primary rounded-xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                        <Target className="w-6 h-6" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground tracking-tight leading-tight mb-4">اقتربت من الإنجاز</h3>
                    <p className="text-sm text-muted-foreground font-medium leading-relaxed">
                        بقي لك <span className="text-primary font-bold">٢٤٠ نقطة</span> لفتح مكافأة "ساعة تركيز إضافية" هذا الأسبوع.
                    </p>
                </div>

                <div className="relative z-10 mt-10 space-y-4">
                    <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                        <motion.div 
                            initial={{ width: 0 }} 
                            animate={{ width: '65%' }} 
                            transition={{ duration: 1.5, delay: 0.8 }}
                            className="h-full bg-primary" 
                        />
                    </div>
                    <button 
                        onClick={onNavigateStore} 
                        className="w-full flex items-center justify-center gap-2 text-[11px] font-bold uppercase tracking-widest text-foreground bg-secondary hover:bg-secondary/80 border border-border/40 py-3 rounded-lg transition-all"
                    >
                        استكشف المكافآت <ChevronLeft className="w-4 h-4" />
                    </button>
                </div>
            </motion.div>
        </div>
    )
}
