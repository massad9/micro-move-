import { motion } from "framer-motion"
import { Activity as ActivityIcon, Award, Check, ChevronRight, Flame, Sparkles } from "lucide-react"

import Badge from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { Activity } from "@/store/microMoveStore"

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
    physical: {
        icon: ActivityIcon,
        label: "Stretch",
        color: "text-emerald-600",
        bgLight: "bg-emerald-500/10",
        bgDark: "bg-emerald-500/20",
        border: "border-emerald-200/50"
    },
    social: {
        icon: ChevronRight,
        label: "Social",
        color: "text-violet-600",
        bgLight: "bg-violet-500/10",
        bgDark: "bg-violet-500/20",
        border: "border-violet-200/50"
    },
    hydration: {
        icon: Flame,
        label: "Hydration",
        color: "text-blue-600",
        bgLight: "bg-blue-500/10",
        bgDark: "bg-blue-500/20",
        border: "border-blue-200/50"
    },
    mindfulness: {
        icon: Sparkles,
        label: "Mindfulness",
        color: "text-rose-600",
        bgLight: "bg-rose-500/10",
        bgDark: "bg-rose-500/20",
        border: "border-rose-200/50"
    },
}

interface PremiumActivityCardProps {
    activity: Activity
    onDone: (id: string) => void
}

export function PremiumActivityCard({ activity, onDone }: PremiumActivityCardProps) {
    const meta = categoryMeta[activity.category] || categoryMeta.physical
    const Icon = meta.icon

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            whileHover={!activity.isDone ? { y: -4, scale: 1.01 } : {}}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className={cn(
                "relative overflow-hidden rounded-2xl border p-5 shadow-sm backdrop-blur-xl transition-all",
                activity.isDone
                    ? "bg-slate-50/50 border-slate-200/50 opacity-75 grayscale-[0.3]"
                    : cn("bg-white/70 shadow-lg shadow-slate-200/40", meta.border)
            )}
        >
            {/* Massive Background Icon for visual depth */}
            <Icon
                className={cn(
                    "absolute -right-6 -bottom-6 h-40 w-40 -rotate-12 opacity-[0.03] transition-transform duration-700",
                    !activity.isDone && "group-hover:rotate-0 group-hover:scale-110",
                    meta.color
                )}
            />

            <div className="relative z-10">
                <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3">
                        <div className={cn("grid h-12 w-12 place-items-center rounded-2xl", meta.bgLight, meta.color)}>
                            <Icon className="h-6 w-6" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold tracking-tight text-slate-900 leading-tight">
                                {activity.title}
                            </h3>
                            <div className="flex items-center gap-2 mt-1 text-xs font-medium text-slate-500">
                                <span className={cn("px-2 py-0.5 rounded-full", meta.bgLight, meta.color)}>
                                    {meta.label}
                                </span>
                                <span>•</span>
                                <span>{activity.duration}</span>
                                <span>•</span>
                                <span className="flex items-center text-amber-600 bg-amber-500/10 px-2 py-0.5 rounded-full">
                                    {activity.points} pts
                                </span>
                            </div>
                        </div>
                    </div>

                    {activity.aiBadge && (
                        <Badge variant="secondary" className="shrink-0 gap-1 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border-indigo-100">
                            <Sparkles className="h-3 w-3" /> {activity.aiBadge}
                        </Badge>
                    )}
                </div>

                <p className="text-sm text-slate-600 leading-relaxed mb-5 pr-8">
                    {activity.description}
                </p>

                <Button
                    className={cn(
                        "w-full gap-2 rounded-xl transition-all duration-300",
                        activity.isDone
                            ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 shadow-none"
                            : "bg-slate-900 hover:bg-slate-800 text-white shadow-md hover:shadow-xl hover:shadow-slate-900/20"
                    )}
                    onClick={() => onDone(activity.id)}
                    disabled={activity.isDone}
                    variant={activity.isDone ? "outline" : "default"}
                    size="lg"
                >
                    {activity.isDone ? (
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="flex items-center gap-2 font-semibold"
                        >
                            <Check className="h-5 w-5" /> Completed
                        </motion.div>
                    ) : (
                        <div className="flex items-center gap-2 font-semibold">
                            <Award className="h-5 w-5" /> Complete Move
                        </div>
                    )}
                </Button>
            </div>
        </motion.div>
    )
}
