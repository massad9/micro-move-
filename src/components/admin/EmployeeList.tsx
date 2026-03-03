import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { motion } from 'framer-motion'

const employees = [
    { id: '1', name: 'Sara Al-Otaibi', dept: 'Design', status: 'High', points: 3450, avatar: 'https://i.pravatar.cc/150?u=sara' },
    { id: '2', name: 'Khalid Mohammed', dept: 'Engineering', status: 'Medium', points: 3120, avatar: 'https://i.pravatar.cc/150?u=khalid' },
    { id: '4', name: 'Laila Hassan', dept: 'Marketing', status: 'High', points: 2890, avatar: 'https://i.pravatar.cc/150?u=laila' },
    { id: '3', name: 'Ahmad bin Zaid', dept: 'Sales', status: 'Medium', points: 1250, avatar: 'https://i.pravatar.cc/150?u=ahmad' },
    { id: '5', name: 'Omar Ibrahim', dept: 'Engineering', status: 'Low', points: 450, avatar: 'https://i.pravatar.cc/150?u=omar' },
]

const RANK_STYLES: Record<number, { bg: string; text: string; label: string }> = {
    1: { bg: 'bg-amber-50 border border-amber-200', text: 'text-amber-600', label: '🥇' },
    2: { bg: 'bg-slate-100 border border-slate-200', text: 'text-slate-500', label: '🥈' },
    3: { bg: 'bg-orange-50 border border-orange-200', text: 'text-orange-500', label: '🥉' },
}

const STATUS_CONFIG: Record<string, { bar: string; badge: string; dot: string; label: string }> = {
    High: { bar: 'bg-emerald-400', badge: 'bg-emerald-50 text-emerald-700 border border-emerald-200', dot: 'bg-emerald-400', label: 'High' },
    Medium: { bar: 'bg-amber-400', badge: 'bg-amber-50 text-amber-700 border border-amber-200', dot: 'bg-amber-400', label: 'Medium' },
    Low: { bar: 'bg-red-400', badge: 'bg-red-50 text-red-600 border border-red-200', dot: 'bg-red-400', label: 'Low' },
}

export const EmployeeList: React.FC = () => {
    const sorted = [...employees].sort((a, b) => b.points - a.points)
    const maxPoints = sorted[0].points

    return (
        <Card className="bg-white border border-slate-200 shadow-sm h-full font-sans overflow-hidden flex flex-col">
            <CardHeader className="border-b border-slate-100 bg-slate-50/50 pb-4 shrink-0">
                <CardTitle className="text-lg font-semibold text-slate-900 tracking-tight flex items-center gap-2">
                    <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                    Top Participants
                    <span className="ml-auto text-xs font-normal text-slate-400">ranked by points</span>
                </CardTitle>
            </CardHeader>

            <CardContent className="p-0 flex-1 overflow-y-auto">
                <div className="divide-y divide-slate-100">
                    {sorted.map((emp, index) => {
                        const rank = index + 1
                        const rankStyle = RANK_STYLES[rank] ?? { bg: 'bg-slate-50 border border-slate-100', text: 'text-slate-400', label: `${rank}` }
                        const status = STATUS_CONFIG[emp.status] ?? STATUS_CONFIG.Low
                        const pct = Math.round((emp.points / maxPoints) * 100)

                        return (
                            <motion.div
                                key={emp.id}
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.07, ease: 'easeOut' }}
                                className="px-5 py-3.5 hover:bg-slate-50 transition-colors group"
                            >
                                {/* Main row */}
                                <div className="flex items-center gap-3">

                                    {/* Rank badge */}
                                    <div className={`w-8 h-8 rounded-lg ${rankStyle.bg} flex items-center justify-center shrink-0`}>
                                        <span className={`text-sm font-bold ${rankStyle.text} leading-none`}>
                                            {rankStyle.label}
                                        </span>
                                    </div>

                                    {/* Avatar */}
                                    <Avatar className="w-9 h-9 rounded-xl border border-slate-200 shadow-sm shrink-0 group-hover:border-primary/40 transition-colors">
                                        <AvatarImage src={emp.avatar} />
                                        <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">{emp.name[0]}</AvatarFallback>
                                    </Avatar>

                                    {/* Name + Dept */}
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-semibold text-slate-900 truncate group-hover:text-primary transition-colors">
                                            {emp.name}
                                        </p>
                                        <p className="text-xs text-slate-400 truncate">{emp.dept}</p>
                                    </div>

                                    {/* Engagement badge */}
                                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium shrink-0 ${status.badge}`}>
                                        <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
                                        {status.label}
                                    </span>

                                    {/* Points */}
                                    <div className="text-right shrink-0 ml-1">
                                        <span className="text-base font-bold text-slate-900 tabular-nums">
                                            {emp.points.toLocaleString()}
                                        </span>
                                        <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest ml-1">pts</span>
                                    </div>
                                </div>

                                {/* Progress bar */}
                                <div className="mt-2.5 ml-[4.5rem] mr-0">
                                    <div className="h-1 w-full bg-slate-100 rounded-full overflow-hidden">
                                        <motion.div
                                            className={`h-full rounded-full ${status.bar}`}
                                            initial={{ width: 0 }}
                                            animate={{ width: `${pct}%` }}
                                            transition={{ delay: index * 0.07 + 0.2, duration: 0.6, ease: 'easeOut' }}
                                        />
                                    </div>
                                    <p className="text-[10px] text-slate-400 mt-0.5 text-right">{pct}% of top score</p>
                                </div>
                            </motion.div>
                        )
                    })}
                </div>
            </CardContent>
        </Card>
    )
}
