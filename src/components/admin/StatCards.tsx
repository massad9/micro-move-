import React from 'react'
import { Activity, Flame, Heart, TrendingUp } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { motion } from 'framer-motion'
import { useMicroMoveStore } from '@/store/microMoveStore'

export const StatCards: React.FC = () => {
    const companyAdmin = useMicroMoveStore(state => state.companyAdmin)

    // Fallback if not loaded
    const vibeScore = companyAdmin?.vibeScore || 84
    const mainRisk = companyAdmin?.burnoutRisk[0]?.department || "Sales"

    const stats = [
        {
            label: 'Company Vibe Score',
            value: `${vibeScore}/100`,
            change: '+5.2%',
            icon: Heart,
            color: 'text-primary',
            bg: 'bg-primary/10 border border-primary/20'
        },
        {
            label: 'Highest Burnout Risk',
            value: mainRisk,
            change: 'Critical',
            icon: Flame,
            color: 'text-red-500',
            bg: 'bg-red-500/10 border border-red-500/20'
        },
        {
            label: 'Avg Sitting Time',
            value: '4h 12m',
            change: '-18m',
            icon: Activity,
            color: 'text-amber-500',
            bg: 'bg-amber-500/10 border border-amber-500/20'
        },
        {
            label: 'Nudge Completion',
            value: '72%',
            change: '+8%',
            icon: TrendingUp,
            color: 'text-emerald-500',
            bg: 'bg-emerald-500/10 border border-emerald-500/20'
        },
    ]

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => {
                const Icon = stat.icon
                const isBadChange = stat.change === 'Critical'
                return (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <Card className="bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group">
                            <CardContent className="p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <div className={`p-2.5 rounded-lg ${stat.bg} ${stat.color} transition-all duration-300`}>
                                        <Icon className="w-5 h-5 transition-transform group-hover:scale-110" />
                                    </div>
                                    <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-md bg-slate-50 border border-slate-100 ${isBadChange ? 'text-red-600 bg-red-50 border-red-100' : stat.change.startsWith('-') ? 'text-green-600' : 'text-emerald-600'
                                        }`}>
                                        {stat.change}
                                    </span>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-slate-500 mb-1">{stat.label}</p>
                                    <h3 className="text-3xl font-bold text-slate-900 tracking-tight flex items-baseline gap-1">
                                        {stat.value}
                                    </h3>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                )
            })}
        </div>
    )
}
