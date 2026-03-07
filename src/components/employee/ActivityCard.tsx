import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import type { Activity } from '@/store/microMoveStore'
import { useMicroMoveStore } from '@/store/microMoveStore'
import { CheckCircle2, Clock, Sparkles, Trophy, Activity as ActivityIcon, ChevronLeft, Flame, Play } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import { ActivityFullScreen } from './ActivityFullScreen'

interface ActivityCardProps {
    activity: Activity
}

const categoryMeta: Record<
    string,
    { icon: React.ElementType, label: string, color: string, bgLight: string, bgDark: string, border: string }
> = {
    Stretch: { icon: ActivityIcon, label: "تمدد", color: "text-emerald-600", bgLight: "bg-emerald-500/10", bgDark: "bg-emerald-500/20", border: "border-emerald-200/50" },
    social: { icon: ChevronLeft, label: "اجتماعي", color: "text-violet-600", bgLight: "bg-violet-500/10", bgDark: "bg-violet-500/20", border: "border-violet-200/50" },
    hydration: { icon: Flame, label: "ترطيب", color: "text-blue-600", bgLight: "bg-blue-500/10", bgDark: "bg-blue-500/20", border: "border-blue-200/50" },
    mindfulness: { icon: Sparkles, label: "تأمل", color: "text-rose-600", bgLight: "bg-rose-500/10", bgDark: "bg-rose-500/20", border: "border-rose-200/50" },
    physical: { icon: ActivityIcon, label: "بدني", color: "text-emerald-600", bgLight: "bg-emerald-500/10", bgDark: "bg-emerald-500/20", border: "border-emerald-200/50" }
}

export const ActivityCard: React.FC<ActivityCardProps> = ({ activity }) => {
    const markActivityDone = useMicroMoveStore(state => state.markActivityDone)
    const [isAnimating, setIsAnimating] = useState(false)
    const [showFullScreen, setShowFullScreen] = useState(false)
    const [showVibeCheck, setShowVibeCheck] = useState(false)

    const meta = categoryMeta[activity.category] || categoryMeta.physical
    const Icon = meta.icon

    const handleStartActivity = () => {
        if (activity.isDone || isAnimating) return
        if (activity.category === 'social' || activity.category === 'hydration') {
            setShowVibeCheck(true)
            return
        }
        setShowFullScreen(true)
    }

    const handleVibeCheck = (emoji: string) => {
        setShowVibeCheck(false)
        setIsAnimating(true)
        confetti({
            particleCount: 150,
            spread: 80,
            origin: { y: 0.6 },
            colors: ['#F97316', '#14B8A6', '#3B82F6', '#8B5CF6']
        })

        const toastId = `activity-done-${activity.id}`
        toast.dismiss(toastId)

        setTimeout(() => {
            markActivityDone(activity.id)
            setIsAnimating(false)
            toast.custom(() => (
                <div className="bg-slate-900 text-white rounded-2xl p-5 shadow-2xl border border-white/10 backdrop-blur-xl max-w-sm w-full font-sans" dir="rtl">
                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg shadow-orange-500/30 shrink-0">
                            <Trophy className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                            <h4 className="font-black text-base tracking-tight">تم تسجيل النشاط {emoji}</h4>
                            <p className="text-slate-400 text-sm mt-1 font-medium">كسبت <span className="text-amber-400 font-black">+{activity.points}</span> نقطة</p>
                        </div>
                    </div>
                </div>
            ), { id: toastId, duration: 4000 })
        }, 500)
    }

    return (
        <>
            <motion.div
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                whileHover={!activity.isDone && !showVibeCheck ? { y: -4, scale: 1.01 } : {}}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className={cn(
                    "relative overflow-hidden rounded-[2rem] border p-6 shadow-sm backdrop-blur-xl transition-[color,background-color,border-color,box-shadow] h-full flex flex-col justify-between group font-sans bg-white text-right",
                    activity.isDone && "bg-slate-50/50 border-slate-200/50 opacity-75 grayscale-[0.3]"
                )}
            >
                <Icon
                    className={cn(
                        "absolute -left-6 -bottom-6 h-48 w-48 rotate-12 opacity-[0.03] transition-transform duration-700 pointer-events-none",
                        !activity.isDone && "group-hover:rotate-0 group-hover:scale-110",
                        meta.color
                    )}
                />

                <AnimatePresence mode="wait">
                    {showVibeCheck && (
                        <motion.div
                            key="vibe"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="absolute inset-0 z-40 bg-white flex flex-col items-center justify-center p-6 text-center"
                        >
                            <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-2">تحليل الشعور</h2>
                            <p className="text-slate-500 text-sm mb-8">كيف تشعر بعد هذا النشاط؟</p>

                            <div className="flex flex-row-reverse items-center gap-4">
                                {[
                                    { e: '😫', label: 'متعب' },
                                    { e: '😐', label: 'عادي' },
                                    { e: '😊', label: 'رائع!' }
                                ].map(mood => (
                                    <motion.button
                                        key={mood.e}
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={() => handleVibeCheck(mood.e)}
                                        className="flex flex-col items-center gap-2 group cursor-pointer"
                                    >
                                        <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm flex items-center justify-center text-3xl group-hover:border-primary group-hover:bg-primary/5 transition-colors">
                                            {mood.e}
                                        </div>
                                        <span className="text-xs font-bold text-slate-400 group-hover:text-primary transition-colors uppercase tracking-wider">{mood.label}</span>
                                    </motion.button>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {!showVibeCheck && (
                        <motion.div key="default" className="relative z-10 flex-1 flex flex-col h-full">
                            <div className="flex items-start justify-between gap-3 mb-4">
                                <div className="flex items-center gap-4">
                                    <div className={cn("grid h-14 w-14 place-items-center rounded-2xl flex-shrink-0 shadow-inner", meta.bgLight, meta.color, meta.border, "border")}>
                                        <Icon className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <div className="flex flex-wrap items-center gap-2 mb-1.5">
                                            <span className={cn("px-2.5 py-0.5 rounded-full text-xs font-black uppercase tracking-widest border", meta.bgLight, meta.color, meta.border)}>
                                                {meta.label}
                                            </span>
                                            <span className="flex items-center gap-1.5 text-slate-500 font-bold text-xs uppercase tracking-wider bg-slate-100 px-2 py-0.5 rounded-full transition-colors group-hover:bg-white group-hover:shadow-sm">
                                                <Clock className="w-3 h-3" />
                                                {activity.duration}
                                            </span>
                                        </div>
                                        <h3 className={cn("text-xl font-black tracking-tight leading-tight transition-colors", activity.isDone ? 'text-slate-400 line-through' : 'text-slate-900')}>
                                            {activity.title}
                                        </h3>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-start justify-between gap-4 mb-6">
                                <div className="space-y-3 flex-1">
                                    <p className={cn("text-sm leading-relaxed font-medium", activity.isDone ? 'text-slate-500' : 'text-slate-500')}>
                                        {activity.description}
                                    </p>

                                    {!activity.isDone && activity.aiBadge && (
                                        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-violet-500/10 border border-violet-300/30 rounded-full w-fit max-w-full shadow-[0_0_12px_rgba(139,92,246,0.15)]">
                                            <span className="text-sm shrink-0">✨</span>
                                            <span className="text-[11px] font-bold text-violet-600 truncate">يُقترح بفضل {activity.aiBadge.toLowerCase()}</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="mt-auto pt-4 flex flex-row-reverse items-center justify-between">
                                <Button
                                    onClick={handleStartActivity}
                                    disabled={activity.isDone || isAnimating}
                                    className={cn(
                                        "h-12 px-6 rounded-xl text-sm font-bold tracking-wide transition-[color,background-color,box-shadow,transform] duration-300",
                                        activity.isDone
                                            ? "bg-slate-100 text-slate-400 shadow-none border border-slate-200 opacity-80"
                                            : "bg-slate-900 hover:bg-slate-800 text-white shadow-[0_8px_20px_rgba(0,0,0,0.12)] hover:shadow-[0_12px_25px_rgba(0,0,0,0.18)] hover:-translate-y-0.5 border-0"
                                    )}
                                >
                                    {activity.isDone ? (
                                        <span className="flex items-center gap-2">
                                            <CheckCircle2 className="w-5 h-5" /> تم
                                        </span>
                                    ) : activity.category === 'social' || activity.category === 'hydration' ? (
                                        <span className="flex items-center gap-2">
                                            سجّل نشاطك <CheckCircle2 className="w-4 h-4" />
                                        </span>
                                    ) : (
                                        <span className="flex items-center gap-2">
                                            ابدأ <Play className="w-4 h-4 fill-current text-white/80" />
                                        </span>
                                    )}
                                </Button>

                                <div className={cn(
                                    "flex flex-row-reverse items-center gap-2 px-4 py-2 rounded-xl transition-colors",
                                    activity.isDone ? "bg-slate-100" : cn("bg-white shadow-[0_2px_10px_rgba(0,0,0,0.04)]", meta.border, "border")
                                )}>
                                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-0.5">نقاط</span>
                                    <span className={cn("text-lg font-black leading-none", activity.isDone ? 'text-slate-400' : 'text-slate-900')}>+{activity.points}</span>
                                    <Trophy className={cn("w-4 h-4", activity.isDone ? 'text-slate-400' : 'text-amber-500')} />
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            <ActivityFullScreen
                activity={activity}
                isOpen={showFullScreen}
                onClose={() => setShowFullScreen(false)}
            />
        </>
    )
}
