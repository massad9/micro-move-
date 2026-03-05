import React from 'react'
import { useMicroMoveStore } from '@/store/microMoveStore'
import { motion } from 'framer-motion'
import { Gift, ArrowRight } from 'lucide-react'

export const Greeting: React.FC = () => {
    const user = useMicroMoveStore(state => state.user)
    const rewards = useMicroMoveStore(state => state.rewards)
    if (!user) return null

    const percentage = user.dailyGoal === 0 ? 0 : (user.completedToday / user.dailyGoal) * 100

    const getTimeGreeting = () => {
        const hour = new Date().getHours()
        if (hour < 12) return "Good morning"
        if (hour < 17) return "Good afternoon"
        return "Good evening"
    }

    // Find the next closest reward
    const nextReward = rewards.find(r => r.cost > user.points) || rewards[0]
    const ptsAway = nextReward ? Math.max(0, nextReward.cost - user.points) : 0

    return (
        <div className="flex flex-col md:flex-row items-stretch gap-6 mb-8 font-sans">

            {/* Greeting & Vibe Score */}
            <div className="flex-1 flex flex-col md:flex-row items-center justify-between p-8 md:p-10 bg-[#050505] text-white rounded-[2rem] shadow-xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/30 transition-colors" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2" />

                <div className="relative z-10 space-y-3 text-center md:text-left mb-8 md:mb-0">
                    <motion.p
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-white font-bold text-sm bg-white/10 border border-white/10 rounded-full px-4 py-1.5 w-max mx-auto md:mx-0 backdrop-blur-md"
                    >
                        {getTimeGreeting()}, {user.name}!
                    </motion.p>
                    <div className="overflow-hidden py-1">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1, duration: 0.6, ease: "easeOut" }}
                            className="text-4xl md:text-5xl font-black text-white tracking-tight mt-2"
                        >
                            Time to <span className="text-primary italic">Move</span>
                        </motion.h1>
                    </div>
                </div>

                <div className="relative z-10 flex items-center gap-6 bg-[#111] p-6 rounded-2xl border border-white/10 shadow-2xl">
                    <div className="relative flex items-center justify-center w-24 h-24">
                        <svg className="w-full h-full transform -rotate-90">
                            <circle
                                cx="48"
                                cy="48"
                                r="40"
                                stroke="currentColor"
                                strokeWidth="8"
                                fill="transparent"
                                className="text-white/5"
                            />
                            <motion.circle
                                cx="48"
                                cy="48"
                                r="40"
                                stroke="currentColor"
                                strokeWidth="8"
                                fill="transparent"
                                strokeDasharray={2 * Math.PI * 40}
                                initial={{ strokeDashoffset: 2 * Math.PI * 40 }}
                                animate={{ strokeDashoffset: (2 * Math.PI * 40) - (percentage / 100) * (2 * Math.PI * 40) }}
                                transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
                                className="text-primary drop-shadow-[0_0_8px_rgba(var(--primary-rgb),0.5)]"
                                strokeLinecap="round"
                            />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center pt-1 text-white">
                            <span className="text-xl font-black">{Math.round(percentage)}%</span>
                        </div>
                    </div>
                    <div className="space-y-1">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Daily Goal</p>
                        <p className="text-2xl font-black text-white">
                            {user.completedToday}<span className="text-lg text-slate-500 font-medium">/{user.dailyGoal}</span>
                        </p>
                    </div>
                </div>
            </div>

            {/* Rewards Sneak Peek */}
            <div className="w-full md:w-80 bg-gradient-to-br from-indigo-500 to-purple-600 p-8 rounded-[2rem] shadow-lg text-white relative overflow-hidden flex flex-col justify-center">
                <div className="absolute top-[-20%] right-[-20%] w-[140%] h-[140%] bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')] opacity-[0.08] mix-blend-overlay rotate-12" />

                <div className="relative z-10 flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/30 shadow-inner">
                        <Gift className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest bg-white/10 px-3 py-1 rounded-full border border-white/20">Sneak Peek</span>
                </div>

                <div className="relative z-10">
                    <h3 className="font-bold text-lg mb-1">{nextReward.title}</h3>
                    <p className="text-indigo-100 text-sm mb-6 leading-relaxed">
                        You are only <strong className="text-white bg-white/20 px-1.5 py-0.5 rounded">{ptsAway} pts</strong> away! Complete 2 more moves today to unlock it.
                    </p>

                    <button className="flex items-center gap-2 text-sm font-bold bg-white text-indigo-900 px-5 py-2.5 rounded-xl hover:bg-indigo-50 transition-colors w-max shadow-[0_4px_14px_rgba(255,255,255,0.4)]">
                        View Store <ArrowRight className="w-4 h-4" />
                    </button>
                </div>
            </div>

        </div>
    )
}
