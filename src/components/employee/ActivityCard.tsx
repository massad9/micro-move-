import React, { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Badge from '@/components/ui/badge'
import type { Activity } from '@/store/useStore'
import { useStore } from '@/store/useStore'
import { CheckCircle2, Clock, Sparkles, Trophy } from 'lucide-react'
import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import { toast } from 'sonner'

interface ActivityCardProps {
    activity: Activity
}

export const ActivityCard: React.FC<ActivityCardProps> = ({ activity }) => {
    const { markDone } = useStore()
    const [isAnimating, setIsAnimating] = useState(false)

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
            markDone(activity.id)
            setIsAnimating(false)
            toast.success('Move Completed!', {
                description: `You earned ${activity.points} PST. Keep it up!`,
            })
        }, 500)
    }

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="mb-4 mx-4"
        >
            <Card className={`relative overflow-hidden transition-all duration-300 ${activity.isDone ? 'bg-slate-50 border-slate-200 opacity-75' : 'bg-white border-slate-200 shadow-sm hover:shadow-md'}`}>
                {activity.aiSuggestion && !activity.isDone && (
                    <div className="absolute top-0 right-0 p-3 z-10">
                        <Badge className="bg-primary/10 text-primary hover:bg-primary/20 flex items-center gap-1 text-[10px] py-1 px-2 uppercase tracking-wider font-semibold shadow-none border-0">
                            <Sparkles className="w-3 h-3" />
                            Smart Suggestion
                        </Badge>
                    </div>
                )}

                <CardContent className="p-5">
                    <div className="flex items-start justify-between gap-4">
                        <div className="space-y-3 flex-1 mt-6">
                            <div className="flex items-center gap-2">
                                <span className="px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider bg-slate-100 text-slate-600 rounded-md">
                                    {activity.category}
                                </span>
                                <span className="flex items-center gap-1 text-slate-500 font-medium text-xs bg-slate-50 px-2 py-1 rounded-md">
                                    <Clock className="w-3 h-3" />
                                    {activity.duration}
                                </span>
                            </div>

                            <h3 className={`text-xl font-bold tracking-tight ${activity.isDone ? 'text-slate-400 line-through' : 'text-slate-900'}`}>
                                {activity.title}
                            </h3>

                            <p className={`text-sm ${activity.isDone ? 'text-slate-400' : 'text-slate-600'}`}>
                                {activity.description}
                            </p>

                            {!activity.isDone && activity.aiSuggestion && (
                                <p className="text-xs font-medium text-primary pt-1">
                                    "Perfect for your {activity.aiSuggestion?.toLowerCase()}!"
                                </p>
                            )}
                        </div>

                        <div className="flex flex-col items-center justify-center p-3 bg-slate-50 rounded-xl border border-slate-100">
                            <Trophy className={`w-6 h-6 mb-1 ${activity.isDone ? 'text-slate-400' : 'text-primary'}`} />
                            <span className={`text-base font-bold ${activity.isDone ? 'text-slate-400' : 'text-slate-900'}`}>+{activity.points}</span>
                            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500">PTS</span>
                        </div>
                    </div>

                    <div className="mt-6 flex items-center justify-between gap-3">
                        <Button
                            onClick={handleComplete}
                            disabled={activity.isDone || isAnimating}
                            className={`w-full h-12 rounded-xl text-sm font-semibold transition-all ${activity.isDone
                                ? 'bg-slate-100 text-slate-400 cursor-not-allowed shadow-none hover:bg-slate-100 hover:text-slate-400'
                                : 'bg-primary hover:bg-primary/90 text-white shadow-sm'
                                }`}
                        >
                            {activity.isDone ? (
                                <span className="flex items-center gap-2">
                                    <CheckCircle2 className="w-5 h-5" /> Completed
                                </span>
                            ) : (
                                isAnimating ? "Completing..." : "Complete Move"
                            )}
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    )
}
