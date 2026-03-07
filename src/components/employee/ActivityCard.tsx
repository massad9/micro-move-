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
                <div className="linear-glass text-foreground rounded-2xl p-6 border border-primary/20 shadow-2xl max-w-sm w-full font-sans" dir="rtl">
                    <div className="flex items-start gap-5">
                        <div className="w-12 h-12 rounded-xl bg-primary text-primary-foreground flex items-center justify-center shadow-lg shadow-primary/20 shrink-0">
                            <Trophy className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                            <h4 className="font-bold text-base tracking-tight">إنجاز رائع! {emoji}</h4>
                            <p className="text-muted-foreground text-sm mt-1 font-medium">كسبت <span className="text-primary font-bold">+{activity.points}</span> نقطة</p>
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
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                whileHover={{ y: -5, scale: 1.015 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                className={cn(
                    "linear-card flex flex-col group h-full transition-all duration-500 min-h-[320px] will-change-transform",
                    activity.isDone && "opacity-60 grayscale-[0.5]"
                )}
            >
                <AnimatePresence mode="wait">
                    {showVibeCheck ? (
                        <motion.div
                            key="vibe"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="absolute inset-0 z-40 bg-background/95 backdrop-blur-sm flex flex-col items-center justify-center p-8 text-center"
                        >
                            <h2 className="text-xl font-bold text-foreground tracking-tight mb-2">كيف هو شعورك؟</h2>
                            <p className="text-muted-foreground text-xs uppercase tracking-widest mb-10">تحليل الحالة المزاجية</p>

                            <div className="flex flex-row-reverse items-center gap-6">
                                {[
                                    { e: '😫', label: 'متعب' },
                                    { e: '😐', label: 'عادي' },
                                    { e: '😊', label: 'رائع!' }
                                ].map(mood => (
                                    <motion.button
                                        key={mood.e}
                                        whileHover={{ scale: 1.1, y: -5 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => handleVibeCheck(mood.e)}
                                        className="flex flex-col items-center gap-3"
                                    >
                                        <div className="w-16 h-16 rounded-2xl bg-secondary border border-border/40 flex items-center justify-center text-3xl shadow-lg shadow-black/20 hover:border-primary/40 transition-all">
                                            {mood.e}
                                        </div>
                                        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{mood.label}</span>
                                    </motion.button>
                                ))}
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div key="default" className="flex flex-col h-full p-8 relative">
                            <div className="flex items-start justify-between gap-6 mb-8">
                                <div className="flex-1 space-y-4">
                                    <div className="flex flex-wrap items-center gap-3">
                                        <div className={cn("p-2 rounded-lg border bg-secondary/80", meta.color, "border-border/40")}>
                                            <Icon className="h-4 w-4" />
                                        </div>
                                        <span className={cn("text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border bg-secondary/50", meta.color, "border-border/20")}>
                                            {meta.label}
                                        </span>
                                        <span className="flex items-center gap-1.5 text-muted-foreground font-bold text-[10px] uppercase tracking-widest bg-secondary/30 px-2.5 py-1 rounded-full border border-border/20">
                                            <Clock className="w-3 h-3" />
                                            {activity.duration}
                                        </span>
                                    </div>
                                    <h3 className={cn("text-2xl font-bold tracking-tight leading-tight", activity.isDone ? 'text-muted-foreground/60 line-through' : 'text-foreground')}>
                                        {activity.title}
                                    </h3>
                                </div>
                            </div>

                            <p className={cn("text-sm leading-relaxed font-medium mb-8", activity.isDone ? 'text-muted-foreground/50' : 'text-muted-foreground')}>
                                {activity.description}
                            </p>

                            {!activity.isDone && activity.aiBadge && (
                                <div className="mt-auto mb-8">
                                    <div className="linear-glass border-primary/20 px-3 py-2 rounded-xl flex items-center gap-2 w-fit">
                                        <Sparkles className="w-3.5 h-3.5 text-primary" />
                                        <span className="text-[10px] font-bold text-foreground uppercase tracking-widest opacity-80">
                                            مقترح بذكاء: {activity.aiBadge}
                                        </span>
                                    </div>
                                </div>
                            )}

                            <div className="mt-auto flex flex-row-reverse items-center justify-between gap-4 pt-6 border-t border-border/20">
                                <button
                                    onClick={() => activity.category === 'social' || activity.category === 'hydration' ? setShowVibeCheck(true) : setShowFullScreen(true)}
                                    disabled={activity.isDone || isAnimating}
                                    className={cn(
                                        "flex-1 h-12 rounded-xl text-[11px] font-bold uppercase tracking-widest transition-all",
                                        activity.isDone
                                            ? "bg-secondary text-muted-foreground/40 border border-border/20"
                                            : "bg-primary text-primary-foreground shadow-lg shadow-primary/10 hover:shadow-primary/20 hover:-translate-y-0.5"
                                    )}
                                >
                                    {activity.isDone ? (
                                        <span className="flex items-center justify-center gap-2">
                                            <CheckCircle2 className="w-4 h-4" /> تم الإنجاز
                                        </span>
                                    ) : (
                                        <span className="flex items-center justify-center gap-2">
                                            ابدأ الآن <Play className="w-3 h-3 fill-current" />
                                        </span>
                                    )}
                                </button>

                                <div className="linear-glass border-border/40 px-4 py-2 rounded-xl flex items-center gap-3">
                                    <Trophy className={cn("w-4 h-4", activity.isDone ? 'text-muted-foreground/40' : 'text-primary')} />
                                    <div className="flex flex-col items-start leading-none">
                                        <span className={cn("text-lg font-bold", activity.isDone ? 'text-muted-foreground/40' : 'text-foreground')}>+{activity.points}</span>
                                        <span className="text-[8px] font-bold text-muted-foreground uppercase tracking-widest">نقطة</span>
                                    </div>
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
