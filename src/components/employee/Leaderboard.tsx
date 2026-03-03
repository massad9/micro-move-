import React from 'react'
import { useMicroMoveStore } from '@/store/microMoveStore'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Trophy, Medal, Star } from 'lucide-react'
import { motion } from 'framer-motion'

export const Leaderboard: React.FC = () => {
    const leaderboard = useMicroMoveStore(state => state.leaderboardTop3)

    return (
        <div className="pb-10 font-sans">
            <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex items-center gap-4">
                    <div className="p-4 bg-primary/10 rounded-xl">
                        <Trophy className="w-8 h-8 text-primary" fill="currentColor" />
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Standings</h2>
                        <p className="text-sm text-slate-500 font-medium mt-1">Real-time performance ranking</p>
                    </div>
                </div>

                <div className="flex items-center gap-8 bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <div className="text-right">
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Global Rank</p>
                        <p className="text-3xl font-bold text-primary mt-1">#3</p>
                    </div>
                    <div className="w-[1px] h-12 bg-slate-200" />
                    <div className="text-right">
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Weekly Avg</p>
                        <p className="text-3xl font-bold text-slate-900 mt-1">84%</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                <div className="lg:col-span-3 space-y-4">
                    {leaderboard.map((entry, index) => (
                        <motion.div
                            key={entry.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className={`flex items-center justify-between p-5 transition-all duration-300 rounded-xl relative group ${entry.name.includes('(You)')
                                ? 'bg-primary/5 border-2 border-primary shadow-sm z-10'
                                : 'bg-white border border-slate-200 shadow-sm hover:shadow-md'
                                }`}
                        >
                            <div className="flex items-center gap-4 md:gap-5">
                                <div className="relative">
                                    <Avatar className="w-14 h-14 border-2 border-white shadow-sm transition-transform group-hover:scale-105">
                                        <AvatarImage src={entry.avatar} alt={entry.name} />
                                        <AvatarFallback className="bg-primary/10 text-primary font-medium">{entry.name[0]}</AvatarFallback>
                                    </Avatar>
                                    <div className={`absolute -bottom-1 -right-1 w-7 h-7 flex items-center justify-center text-xs font-bold rounded-full border-2 border-white shadow-sm ${entry.rank === 1 ? 'bg-amber-400 text-white' :
                                        entry.rank === 2 ? 'bg-slate-300 text-slate-700' :
                                            entry.rank === 3 ? 'bg-amber-600 text-white' : 'bg-slate-100 text-slate-500'
                                        }`}>
                                        {entry.rank === 1 ? <Medal className="w-3.5 h-3.5" /> : entry.rank}
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <p className={`text-lg font-bold tracking-tight ${entry.name.includes('(You)') ? 'text-primary' : 'text-slate-900'}`}>
                                        {entry.name}
                                    </p>
                                    <span className={`font-medium text-xs w-fit mt-1 px-2.5 py-0.5 rounded-full ${entry.name.includes('(You)') ? 'bg-primary/10 text-primary' : 'bg-slate-100 text-slate-600'}`}>
                                        {entry.rank === 1 ? 'Champion' : 'Contender'}
                                    </span>
                                </div>
                            </div>

                            <div className="text-right bg-slate-50 px-4 py-2 rounded-lg border border-slate-100">
                                <p className="text-2xl font-bold text-slate-900 tracking-tight">{entry.points.toLocaleString()}</p>
                                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Pts</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-8 p-8 bg-slate-900 rounded-2xl text-white relative overflow-hidden shadow-lg flex flex-col justify-center">
                    <Star className="absolute -top-10 -right-10 w-48 h-48 text-white/5 rotate-45 pointer-events-none" strokeWidth={1} />
                    <h3 className="text-2xl font-bold tracking-tight mb-2 z-10 text-white">Keep moving.</h3>
                    <p className="text-sm font-medium text-slate-400 mb-6 z-10 leading-relaxed">
                        You're only <span className="text-primary font-bold px-1">200 pts</span> away from surpassing Khalid Mohammed.
                    </p>
                    <div className="w-full bg-slate-800 h-2.5 rounded-full relative z-10 overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: '85%' }}
                            transition={{ duration: 1.5, ease: "easeOut", delay: 1 }}
                            className="h-full bg-primary rounded-full relative"
                        >
                            <div className="absolute inset-0 bg-white/20" />
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Leaderboard
