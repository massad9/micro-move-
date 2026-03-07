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
            label: 'مؤشر الأجواء',
            value: `${vibeScore}/١٠٠`,
            change: '+٥.٢%',
            icon: Heart,
            trend: 'up'
        },
        {
            label: 'خطر الإرهاق',
            value: mainRisk,
            change: 'حرج',
            itemLabel: 'القسم الأكثر تضرراً',
            icon: Flame,
            trend: 'warning'
        },
        {
            label: 'وقت الجلوس',
            value: '٤ س ١٢ د',
            change: '-١٨ د',
            icon: Activity,
            trend: 'down'
        },
        {
            label: 'إتمام المهام',
            value: '٧٢%',
            change: '+٨%',
            icon: TrendingUp,
            trend: 'up'
        },
    ]

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, index) => {
                const Icon = stat.icon
                return (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="linear-card group p-5 flex flex-col justify-between h-32"
                    >
                        <div className="flex justify-between items-start">
                            <div className="p-1.5 rounded-md bg-secondary border border-border/40 text-muted-foreground group-hover:text-primary transition-colors">
                                <Icon className="w-4 h-4" strokeWidth={2} />
                            </div>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                                stat.trend === 'warning' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                                stat.trend === 'up' ? 'bg-primary/10 text-primary border-primary/20' :
                                'bg-green-500/10 text-green-400 border-green-500/20'
                            }`}>
                                {stat.change}
                            </span>
                        </div>
                        
                        <div>
                            <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mb-1">{stat.label}</p>
                            <h3 className="text-xl font-bold text-foreground tracking-tight">{stat.value}</h3>
                        </div>
                        
                        {/* Interactive Sparkline Mockup (Linear Style) */}
                        <div className="absolute bottom-0 right-0 left-0 h-[2px] bg-secondary overflow-hidden">
                            <div className={`h-full animate-shimmer ${
                                stat.trend === 'warning' ? 'bg-red-500/30' : 'bg-primary/30'
                            }`} style={{ width: '100%' }} />
                        </div>
                    </motion.div>
                )
            })}
        </div>
    )
}
