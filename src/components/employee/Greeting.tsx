import React from 'react'
import { useMicroMoveStore } from '@/store/microMoveStore'
import { motion } from 'framer-motion'

export const Greeting: React.FC = () => {
    const user = useMicroMoveStore(state => state.user)
    if (!user) return null

    const percentage = user.dailyGoal === 0 ? 0 : (user.completedToday / user.dailyGoal) * 100

    const getTimeGreeting = () => {
        const hour = new Date().getHours()
        if (hour < 12) return "Good morning"
        if (hour < 17) return "Good afternoon"
        return "Good evening"
    }

    return (
        <div className="flex flex-col md:flex-row items-center justify-between p-8 md:p-10 bg-white rounded-2xl shadow-sm border border-slate-200 mb-8 relative overflow-hidden">
            <div className="relative z-10 space-y-3 text-center md:text-left mb-8 md:mb-0">
                <motion.p
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-primary font-semibold text-sm bg-primary/10 rounded-full px-3 py-1 w-max mx-auto md:mx-0"
                >
                    {getTimeGreeting()}, {user.name}!
                </motion.p>
                <div className="overflow-hidden py-1">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1, duration: 0.6, ease: "easeOut" }}
                        className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight mt-2"
                    >
                        Time to <span className="text-primary">Move</span>
                    </motion.h1>
                </div>
                <p className="text-slate-500 text-base max-w-sm mt-2">
                    Unlock your potential today. Stay engaged, earn points, and build momentum.
                </p>
            </div>

            <div className="relative z-10 flex flex-col items-center gap-4 bg-slate-50 p-6 rounded-xl border border-slate-100">
                <div className="relative flex items-center justify-center w-32 h-32">
                    <svg className="w-full h-full transform -rotate-90">
                        <circle
                            cx="64"
                            cy="64"
                            r="56"
                            stroke="currentColor"
                            strokeWidth="10"
                            fill="transparent"
                            className="text-slate-200"
                        />
                        <motion.circle
                            cx="64"
                            cy="64"
                            r="56"
                            stroke="currentColor"
                            strokeWidth="10"
                            fill="transparent"
                            strokeDasharray={2 * Math.PI * 56}
                            initial={{ strokeDashoffset: 2 * Math.PI * 56 }}
                            animate={{ strokeDashoffset: (2 * Math.PI * 56) - (percentage / 100) * (2 * Math.PI * 56) }}
                            transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
                            className="text-primary"
                            strokeLinecap="round"
                        />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center pt-1">
                        <span className="text-2xl font-bold text-slate-900">{Math.round(percentage)}%</span>
                        <span className="text-xs font-medium text-slate-500 uppercase tracking-wider mt-0.5">Goal</span>
                    </div>
                </div>
                <div className="flex flex-col items-center bg-white rounded-lg px-4 py-2 border border-slate-100 w-full shadow-sm">
                    <p className="text-sm">
                        <span className="text-primary font-semibold text-base">{user.completedToday}</span><span className="text-slate-400 font-medium"> / {user.dailyGoal}</span>
                    </p>
                    <p className="text-[10px] font-medium text-slate-500 uppercase tracking-wider mt-0.5">Completed</p>
                </div>
            </div>
        </div>
    )
}
