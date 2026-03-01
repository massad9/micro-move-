import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { motion } from 'framer-motion'

export const AnalyticsChart: React.FC = () => {
    const data = [
        { day: 'MON', value: 65 },
        { day: 'TUE', value: 45 },
        { day: 'WED', value: 85 },
        { day: 'THU', value: 100 },
        { day: 'FRI', value: 75 },
        { day: 'SAT', value: 30 },
        { day: 'SUN', value: 25 },
    ]

    const max = 100

    return (
        <Card className="bg-white border border-slate-200 shadow-sm h-full font-sans overflow-hidden relative group">
            <CardHeader className="flex flex-row items-center justify-between pb-8">
                <CardTitle className="text-base font-semibold text-slate-900 tracking-tight">Activity Completion Weekly</CardTitle>
                <div className="flex items-center gap-6 text-xs font-medium">
                    <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 bg-primary rounded-sm" />
                        <span className="text-slate-600">Activities</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 bg-slate-200 rounded-sm" />
                        <span className="text-slate-500">Goal</span>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div className="flex items-end justify-between h-[250px] gap-2 px-4 relative">
                    {/* Reference lines */}
                    <div className="absolute inset-0 flex flex-col justify-between pointer-events-none z-0">
                        {[0, 1, 2, 3, 4].map((i) => (
                            <div key={i} className="w-full border-t border-slate-100" />
                        ))}
                    </div>

                    {data.map((item, index) => (
                        <div key={item.day} className="flex-1 flex flex-col items-center gap-3 h-full relative z-10">
                            <div className="flex-1 w-full bg-slate-50 rounded-t-md relative flex flex-col justify-end group/bar">
                                <motion.div
                                    initial={{ height: 0 }}
                                    animate={{ height: `${(item.value / max) * 100}%` }}
                                    transition={{ duration: 1.2, delay: 0.2 + index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                                    className="w-full bg-primary/90 hover:bg-primary transition-colors rounded-t-sm relative"
                                >
                                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white border border-slate-200 shadow-md text-slate-900 text-[11px] font-medium px-2 py-1 opacity-0 group-hover/bar:opacity-100 transition-opacity whitespace-nowrap rounded">
                                        <span className="text-primary font-bold">{item.value}</span>
                                        <span className="text-slate-500 ml-1">moves</span>
                                    </div>
                                </motion.div>
                            </div>
                            <span className="text-xs font-medium text-slate-500 uppercase">{item.day}</span>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}
