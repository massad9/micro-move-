import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import type { Activity } from '@/store/microMoveStore'
import { useMicroMoveStore } from '@/store/microMoveStore'
import { CheckCircle2, Clock, Sparkles, Trophy, Activity as ActivityIcon, ChevronRight, Flame, Play, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

interface ActivityCardProps {
    activity: Activity
}

const categoryMeta: Record<
    string,
    { icon: React.ElementType, label: string, color: string, bgLight: string, bgDark: string, border: string }
> = {
    Stretch: { icon: ActivityIcon, label: "Stretch", color: "text-emerald-600", bgLight: "bg-emerald-500/10", bgDark: "bg-emerald-500/20", border: "border-emerald-200/50" },
    social: { icon: ChevronRight, label: "Social", color: "text-violet-600", bgLight: "bg-violet-500/10", bgDark: "bg-violet-500/20", border: "border-violet-200/50" },
    hydration: { icon: Flame, label: "Hydration", color: "text-blue-600", bgLight: "bg-blue-500/10", bgDark: "bg-blue-500/20", border: "border-blue-200/50" },
    mindfulness: { icon: Sparkles, label: "Mindfulness", color: "text-rose-600", bgLight: "bg-rose-500/10", bgDark: "bg-rose-500/20", border: "border-rose-200/50" },
    physical: { icon: ActivityIcon, label: "Stretch", color: "text-emerald-600", bgLight: "bg-emerald-500/10", bgDark: "bg-emerald-500/20", border: "border-emerald-200/50" }
}

export const ActivityCard: React.FC<ActivityCardProps> = ({ activity }) => {
    const markActivityDone = useMicroMoveStore(state => state.markActivityDone)
    const [isAnimating, setIsAnimating] = useState(false)
    const [isActive, setIsActive] = useState(false)
    const [timeLeft, setTimeLeft] = useState(0) // dynamic based on activity duration
    const [showVibeCheck, setShowVibeCheck] = useState(false)

    const meta = categoryMeta[activity.category] || categoryMeta.physical
    const Icon = meta.icon

    // Parse duration string to seconds
    useEffect(() => {
        if (!activity.duration) return;
        const timeStr = activity.duration.toLowerCase();
        if (timeStr.includes('min')) {
            setTimeLeft(parseInt(timeStr) * 60);
        } else if (timeStr.includes('sec')) {
            setTimeLeft(parseInt(timeStr));
        } else {
            setTimeLeft(30); // default
        }
    }, [activity.duration]);

    useEffect(() => {
        let timer: ReturnType<typeof setInterval>;
        if (isActive && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft(prev => prev - 1);
            }, 1000);
        } else if (isActive && timeLeft === 0) {
            setIsActive(false);
            setShowVibeCheck(true);
        }
        return () => clearInterval(timer);
    }, [isActive, timeLeft]);

    const handleStartActivity = () => {
        if (activity.isDone || isAnimating) return;
        setIsActive(true);
    };

    const handleVibeCheck = (emoji: string) => {
        setShowVibeCheck(false);
        setIsAnimating(true);
        confetti({
            particleCount: 150,
            spread: 80,
            origin: { y: 0.6 },
            colors: ['#2563EB', '#14B8A6', '#F97316', '#8B5CF6']
        });

        setTimeout(() => {
            markActivityDone(activity.id);
            setIsAnimating(false);
            toast.success(`Move Completed! You feel ${emoji}`, {
                description: `You earned ${activity.points} Points. Keep it up!`,
            });
        }, 500);
    };

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s < 10 ? '0' : ''}${s}`;
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            whileHover={!activity.isDone && !isActive && !showVibeCheck ? { y: -4, scale: 1.01 } : {}}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className={cn(
                "relative overflow-hidden rounded-[2rem] border p-6 shadow-sm backdrop-blur-xl transition-all h-full flex flex-col justify-between group font-sans bg-white",
                activity.isDone && "bg-slate-50/50 border-slate-200/50 opacity-75 grayscale-[0.3]"
            )}
        >
            {/* Massive Background Icon for visual depth */}
            <Icon
                className={cn(
                    "absolute -right-6 -bottom-6 h-48 w-48 -rotate-12 opacity-[0.03] transition-transform duration-700 pointer-events-none",
                    !activity.isDone && !isActive && "group-hover:rotate-0 group-hover:scale-110",
                    meta.color
                )}
            />

            <AnimatePresence mode="wait">
                {/* ACTIVE TIMER STATE */}
                {isActive && (
                    <motion.div
                        key="active"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.1 }}
                        className="absolute inset-0 z-50 bg-slate-900 text-white flex flex-col items-center justify-center p-6 text-center"
                    >
                        <button onClick={() => setIsActive(false)} className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white transition-colors">
                            <X className="w-5 h-5" />
                        </button>

                        {activity.category === 'social' ? (
                            <div className="mb-8 p-4 bg-white/10 rounded-2xl border border-white/20 backdrop-blur-md">
                                <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="w-16 h-16 mx-auto bg-gradient-to-tr from-violet-500 to-fuchsia-500 rounded-full flex items-center justify-center mb-4">
                                    <span className="text-2xl">☕</span>
                                </motion.div>
                                <h3 className="text-xl font-bold mb-2">Coffee Roulette</h3>
                                <p className="text-slate-300 text-sm max-w-[200px]">"Your colleague Sarah is also available. Go grab a glass of water together."</p>
                            </div>
                        ) : (
                            <div className="relative mb-8 flex justify-center items-center">
                                {/* SVG Timer Ring */}
                                <svg className="w-40 h-40 transform -rotate-90">
                                    <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="6" fill="transparent" className="text-white/10" />
                                    <motion.circle
                                        cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="6" fill="transparent"
                                        className="text-primary"
                                        strokeDasharray="440"
                                        initial={{ strokeDashoffset: 440 }}
                                        animate={{ strokeDashoffset: 440 - (440 * (timeLeft / (parseInt(activity.duration) || 30))) }}
                                        transition={{ duration: 1, ease: 'linear' }}
                                    />
                                </svg>
                                <div className="absolute font-black text-4xl tabular-nums tracking-tighter">
                                    {formatTime(timeLeft)}
                                </div>
                            </div>
                        )}

                        <h2 className="text-2xl font-bold tracking-tight mb-2">{activity.title}</h2>
                        <p className="text-slate-400 max-w-xs">{activity.description}</p>
                    </motion.div>
                )}

                {/* VIBE CHECK STATE */}
                {showVibeCheck && (
                    <motion.div
                        key="vibe"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute inset-0 z-40 bg-white flex flex-col items-center justify-center p-6 text-center"
                    >
                        <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-2">Vibe Check</h2>
                        <p className="text-slate-500 text-sm mb-8">How do you feel after that move?</p>

                        <div className="flex items-center gap-4">
                            {[
                                { e: '😫', label: 'Tired' },
                                { e: '😐', label: 'Okay' },
                                { e: '😊', label: 'Great!' }
                            ].map(mood => (
                                <motion.button
                                    key={mood.e}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => handleVibeCheck(mood.e)}
                                    className="flex flex-col items-center gap-2 group"
                                >
                                    <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm flex items-center justify-center text-3xl group-hover:border-primary group-hover:bg-primary/5 transition-all">
                                        {mood.e}
                                    </div>
                                    <span className="text-xs font-bold text-slate-400 group-hover:text-primary transition-colors uppercase tracking-wider">{mood.label}</span>
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* DEFAULT STATE */}
                {!isActive && !showVibeCheck && (
                    <motion.div key="default" className="relative z-10 flex-1 flex flex-col h-full">
                        <div className="flex items-start justify-between gap-3 mb-4">
                            <div className="flex items-center gap-4">
                                <div className={cn("grid h-14 w-14 place-items-center rounded-2xl flex-shrink-0 shadow-inner", meta.bgLight, meta.color, meta.border, "border")}>
                                    <Icon className="h-6 w-6" />
                                </div>
                                <div>
                                    <div className="flex items-center gap-2 mb-1.5">
                                        <span className={cn("px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest border", meta.bgLight, meta.color, meta.border)}>
                                            {meta.label}
                                        </span>
                                        <span className="flex items-center gap-1.5 text-slate-500 font-bold text-[10px] uppercase tracking-wider bg-slate-100 px-2 py-0.5 rounded-full transition-colors group-hover:bg-white group-hover:shadow-sm">
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
                                <p className={cn("text-sm leading-relaxed font-medium", activity.isDone ? 'text-slate-400' : 'text-slate-500')}>
                                    {activity.description}
                                </p>

                                {!activity.isDone && activity.aiBadge && (
                                    <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/5 border border-primary/10 rounded-full">
                                        <Sparkles className="w-3.5 h-3.5 text-primary" />
                                        <span className="text-[11px] font-bold text-primary">AI Suggested for {activity.aiBadge?.toLowerCase()}</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="mt-auto pt-4 flex items-center justify-between">
                            <div className={cn(
                                "flex items-center gap-2 px-4 py-2 rounded-xl transition-colors",
                                activity.isDone ? "bg-slate-100" : cn("bg-white shadow-[0_2px_10px_rgba(0,0,0,0.04)]", meta.border, "border")
                            )}>
                                <Trophy className={cn("w-4 h-4", activity.isDone ? 'text-slate-400' : 'text-amber-500')} />
                                <span className={cn("text-lg font-black leading-none", activity.isDone ? 'text-slate-400' : 'text-slate-900')}>+{activity.points}</span>
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">PTS</span>
                            </div>

                            <Button
                                onClick={handleStartActivity}
                                disabled={activity.isDone || isAnimating}
                                className={cn(
                                    "h-12 px-6 rounded-xl text-sm font-bold tracking-wide transition-all duration-300",
                                    activity.isDone
                                        ? "bg-slate-100 text-slate-400 shadow-none border border-slate-200 opacity-80"
                                        : "bg-slate-900 hover:bg-slate-800 text-white shadow-[0_8px_20px_rgba(0,0,0,0.12)] hover:shadow-[0_12px_25px_rgba(0,0,0,0.18)] hover:-translate-y-0.5 border-0"
                                )}
                            >
                                {activity.isDone ? (
                                    <span className="flex items-center gap-2">
                                        <CheckCircle2 className="w-5 h-5" /> Done
                                    </span>
                                ) : (
                                    <span className="flex items-center gap-2">
                                        Start <Play className="w-4 h-4 fill-current text-white/80" />
                                    </span>
                                )}
                            </Button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    )
}
