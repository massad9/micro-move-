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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10 font-sans">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="lg:col-span-2 relative overflow-hidden rounded-[2rem] bg-slate-900 text-white p-8 sm:p-10 shadow-xl"
            >
                {/* Decorative Gradients */}
                <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-primary/30 blur-[80px] rounded-full mix-blend-screen" />
                <div className="absolute bottom-[-20%] left-[-10%] w-[40%] h-[50%] bg-amber-500/20 blur-[60px] rounded-full mix-blend-screen" />

                <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                    <div>
                        <motion.span
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="inline-block px-3 py-1 mb-4 text-xs font-black tracking-[0.2em] uppercase text-primary bg-primary/10 rounded-full border border-primary/20"
                        >
                            تحليل الطاقة
                        </motion.span>
                        <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-2 text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/70">
                            {greeting}، {user.name.split(' ')[0]}
                        </h1>
                        <p className="text-slate-300 font-medium text-lg mt-4 max-w-sm leading-relaxed">
                            {isGoalMet
                                ? "لقد حققت هدفك اليوم! استمر في نشاطك الإضافي."
                                : "جاهز لتعزيز إنتاجيتك؟ أكمل حركة صغيرة لتنشيط تركيزك."}
                        </p>
                    </div>

                    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 w-full md:w-64 shrink-0 flex flex-col items-center justify-center relative">
                        {isGoalMet && (
                            <div className="absolute -top-3 -right-3 w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(245,158,11,0.5)] z-10">
                                <Flame className="w-4 h-4 text-white" />
                            </div>
                        )}
                        {/* Custom Circular Progress */}
                        <div className="relative w-28 h-28 mb-4">
                            <svg className="w-full h-full transform -rotate-90">
                                <circle cx="56" cy="56" r="48" stroke="currentColor" strokeWidth="6" fill="transparent" className="text-white/10" />
                                <motion.circle
                                    cx="56" cy="56" r="48" stroke="currentColor" strokeWidth="6" fill="transparent"
                                    className={isGoalMet ? "text-amber-400" : "text-primary"}
                                    strokeDasharray="301"
                                    initial={{ strokeDashoffset: 301 }}
                                    animate={{ strokeDashoffset: 301 - (301 * progress) / 100 }}
                                    transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
                                    strokeLinecap="round"
                                />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-3xl font-black">{user.completedToday}</span>
                                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">من {user.dailyGoal}</span>
                            </div>
                        </div>
                        <h3 className="font-bold text-sm tracking-wide mb-2">الهدف اليومي</h3>
                        <p className="text-[11px] text-slate-300 font-medium leading-relaxed text-center max-w-[180px]">
                            أكملت {user.completedToday} فاصل{user.completedToday > 1 ? 'ين' : ''} من أصل {user.dailyGoal} مقترحة اليوم
                        </p>
                    </div>
                </div>
            </motion.div>

            {/* Sneak Peek / Motivation Card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-[2rem] border border-slate-200 shadow-sm p-8 flex flex-col justify-between group overflow-hidden relative"
            >
                <div className="absolute -right-10 -top-10 w-40 h-40 bg-orange-50 rounded-full blur-3xl group-hover:bg-orange-100 transition-colors pointer-events-none" />

                <div className="relative z-10">
                    <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center mb-6">
                        <Target className="w-6 h-6" />
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 tracking-tight leading-tight mb-2">اقتربت من إنجاز عظيم</h3>
                    <p className="text-sm text-slate-500 font-medium leading-relaxed">
                        أنت على بُعد <strong className="text-orange-600">٢٤٠ نقطة</strong> فقط من فتح مكافأة "ساعة راحة إضافية".
                    </p>
                </div>

                <div className="relative z-10 mt-8">
                    <button onClick={onNavigateStore} className="inline-flex items-center gap-2 text-sm font-bold text-white bg-slate-900 hover:bg-slate-800 px-5 py-2.5 rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-[color,background-color,box-shadow,transform] cursor-pointer">
                        عرض المتجر <ChevronLeft className="w-4 h-4" />
                    </button>
                    <div className="h-1 w-full bg-slate-100 mt-3 rounded-full overflow-hidden">
                        <div className="h-full bg-orange-500 w-[65%]" />
                    </div>
                </div>
            </motion.div>
        </div>
    )
}
