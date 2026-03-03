import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import type { Activity } from '@/store/microMoveStore'
import { useMicroMoveStore } from '@/store/microMoveStore'
import { CheckCircle2, Clock, Sparkles, Trophy, Activity as ActivityIcon, ChevronRight, Flame } from 'lucide-react'
import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

interface ActivityCardProps {
    activity: Activity
}

const categoryMeta: Record<
    string,
    {
        icon: React.ElementType,
        label: string,
        color: string,
        bgLight: string,
        bgDark: string,
        border: string
    }
> = {
    Stretch: {
        icon: ActivityIcon,
        label: "Stretch",
        color: "text-emerald-600",
        bgLight: "bg-emerald-500/10",
        bgDark: "bg-emerald-500/20",
        border: "border-emerald-200/50"
    },
    Social: {
        icon: ChevronRight,
        label: "Social",
        color: "text-violet-600",
        bgLight: "bg-violet-500/10",
        bgDark: "bg-violet-500/20",
        border: "border-violet-200/50"
    },
    Hydration: {
        icon: Flame,
        label: "Hydration",
        color: "text-blue-600",
        bgLight: "bg-blue-500/10",
        bgDark: "bg-blue-500/20",
        border: "border-blue-200/50"
    },
    Mindfulness: {
        icon: Sparkles,
        label: "Mindfulness",
        color: "text-rose-600",
        bgLight: "bg-rose-500/10",
        bgDark: "bg-rose-500/20",
        border: "border-rose-200/50"
    },
}

export const ActivityCard: React.FC<ActivityCardProps> = ({ activity }) => {
    const markActivityDone = useMicroMoveStore(state => state.markActivityDone)
    const [isAnimating, setIsAnimating] = useState(false)

    const meta = categoryMeta[activity.category] || categoryMeta.Stretch
    const Icon = meta.icon

    const handleComplete = () => {
        if (activity.isDone || isAnimating) return

        setIsAnimating(true)
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#2563EB', '#14B8A6', '#F97316']
        })

        setTimeout(() => {
            markActivityDone(activity.id)
            setIsAnimating(false)
            toast.success('Move Completed!', {
                description: `You earned ${activity.points} PST. Keep it up!`,
            })
        }, 500)
    }

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            whileHover={!activity.isDone ? { y: -4, scale: 1.01 } : {}}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className={cn(
                "relative overflow-hidden rounded-2xl border p-5 shadow-sm backdrop-blur-xl transition-all h-full flex flex-col justify-between group",
                activity.isDone
                    ? "bg-slate-50/50 border-slate-200/50 opacity-75 grayscale-[0.3]"
                    : cn("bg-white/70 shadow-lg shadow-slate-200/40", meta.border)
            )}
        >
            {/* Massive Background Icon for visual depth */}
            <Icon
                className={cn(
                    "absolute -right-6 -bottom-6 h-48 w-48 -rotate-12 opacity-[0.03] transition-transform duration-700",
                    !activity.isDone && "group-hover:rotate-0 group-hover:scale-110",
                    meta.color
                )}
            />

            <div className="relative z-10 flex-1 flex flex-col">
                <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3">
                        <div className={cn("grid h-12 w-12 place-items-center rounded-2xl flex-shrink-0", meta.bgLight, meta.color)}>
                            <Icon className="h-6 w-6" />
                        </div>
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <span className={cn("px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider", meta.bgLight, meta.color)}>
                                    {meta.label}
                                </span>
                                <span className="flex items-center gap-1 text-slate-500 font-medium text-[11px] bg-slate-100 px-2 py-0.5 rounded-md transition-colors group-hover:bg-white group-hover:shadow-sm">
                                    <Clock className="w-3 h-3" />
                                    {activity.duration}
                                </span>
                            </div>
                            <h3 className={cn("text-lg font-bold tracking-tight leading-tight transition-colors", activity.isDone ? 'text-slate-400 line-through' : 'text-slate-900 group-hover:text-primary')}>
                                {activity.title}
                            </h3>
                        </div>
                    </div>
                </div>

                <div className="flex items-start justify-between gap-4 mb-6">
                    <div className="space-y-2 flex-1">
                        <p className={cn("text-sm leading-relaxed", activity.isDone ? 'text-slate-400' : 'text-slate-600')}>
                            {activity.description}
                        </p>

                        {!activity.isDone && activity.aiBadge && (
                            <p className="text-[11px] font-semibold text-primary pt-1 flex items-center gap-1.5 opacity-90">
                                <Sparkles className="w-3.5 h-3.5" />
                                "Perfect for your {activity.aiBadge?.toLowerCase()}!"
                            </p>
                        )}
                    </div>

                    <div className={cn(
                        "flex flex-col items-center justify-center p-3 rounded-2xl border flex-shrink-0 min-w-[70px] transition-colors",
                        activity.isDone ? "bg-slate-100 border-slate-200" : cn("bg-white border-slate-100 shadow-sm", meta.bgLight)
                    )}>
                        <Trophy className={cn("w-6 h-6 mb-1", activity.isDone ? 'text-slate-400' : 'text-amber-500 drop-shadow-sm')} />
                        <span className={cn("text-lg font-black leading-none", activity.isDone ? 'text-slate-400' : 'text-slate-900')}>+{activity.points}</span>
                        <span className="text-[9px] uppercase font-black tracking-widest text-slate-400 mt-1">PTS</span>
                    </div>
                </div>

                <div className="mt-auto pt-4">
                    <Button
                        onClick={handleComplete}
                        disabled={activity.isDone || isAnimating}
                        className={cn(
                            "w-full h-12 rounded-xl text-sm font-bold tracking-wide transition-all duration-300",
                            activity.isDone
                                ? "bg-slate-100 text-slate-400 shadow-none border border-slate-200 opacity-80"
                                : "bg-slate-900 hover:bg-slate-800 text-white shadow-md hover:shadow-xl hover:-translate-y-0.5 hover:shadow-slate-900/20 border-0"
                        )}
                    >
                        {activity.isDone ? (
                            <motion.span
                                initial={{ scale: 0.8 }}
                                animate={{ scale: 1 }}
                                className="flex items-center gap-2"
                            >
                                <CheckCircle2 className="w-5 h-5" /> Completed
                            </motion.span>
                        ) : (
                            isAnimating ? "Completing..." : "Complete Move"
                        )}
                    </Button>
                </div>
            </div>
        </motion.div>
    )
}
