import React from 'react'
import { Activity, Flame, Heart, TrendingUp } from 'lucide-react'
import { motion } from 'framer-motion'
import { useMicroMoveStore } from '@/store/microMoveStore'

export const StatCards: React.FC = () => {
    const companyAdmin = useMicroMoveStore(state => state.companyAdmin)

    const vibeScore = companyAdmin?.vibeScore || 84
    const mainRisk = companyAdmin?.burnoutRisk[0]?.department || "المبيعات"

    const stats = [
        {
            label: 'مؤشر أجواء العمل',
            value: `${vibeScore}/١٠٠`,
            change: '+٥.٢%',
            icon: Heart,
            color: 'text-primary',
            bg: 'bg-primary/10'
        },
        {
            label: 'أعلى خطر إرهاق',
            value: mainRisk,
            change: 'حرج',
            icon: Flame,
            color: 'text-red-500',
            bg: 'bg-red-50'
        },
        {
            label: 'متوسط وقت الجلوس',
            value: '٤ س ١٢ د',
            change: '-١٨ د',
            icon: Activity,
            color: 'text-amber-500',
            bg: 'bg-amber-50'
        },
        {
            label: 'إتمام التنبيهات',
            value: '٧٢%',
            change: '+٨%',
            icon: TrendingUp,
            color: 'text-emerald-500',
            bg: 'bg-emerald-50'
        },
    ]

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, index) => {
                const Icon = stat.icon
                const isBadChange = stat.change === 'حرج'
                return (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <div className="bg-white border border-[#E5E7EB] rounded-2xl shadow-soft hover:shadow-soft-md transition-shadow duration-300 overflow-hidden group p-6">
                            <div className="flex justify-between items-start mb-4">
                                <div className={`p-2.5 rounded-xl ${stat.bg} ${stat.color} transition-colors duration-300`}>
                                    <Icon className="w-[18px] h-[18px] transition-transform group-hover:scale-110" strokeWidth={1.5} />
                                </div>
                                <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-lg ${isBadChange ? 'text-red-600 bg-red-50 border border-red-100' : stat.change.startsWith('-') ? 'text-green-600 bg-emerald-50 border border-emerald-100' : 'text-emerald-600 bg-emerald-50 border border-emerald-100'
                                    }`}>
                                    {stat.change}
                                </span>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-[#6B7280] mb-1 leading-relaxed">{stat.label}</p>
                                <h3 className="text-2xl font-bold text-[#111827] tracking-tight flex items-baseline gap-1">
                                    {stat.value}
                                </h3>
                            </div>
                        </div>
                    </motion.div>
                )
            })}
        </div>
    )
}
