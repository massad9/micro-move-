import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Zap, Clock } from 'lucide-react'

export const AnalyticsChart: React.FC = () => {
    const [view, setView] = useState<'heatmap' | 'weekly'>('heatmap')

    const weeklyData = [
        { day: 'الإثنين', value: 65 },
        { day: 'الثلاثاء', value: 45 },
        { day: 'الأربعاء', value: 85 },
        { day: 'الخميس', value: 100 },
        { day: 'الجمعة', value: 75 },
    ]
    const maxWeekly = 100

    const hours = ['٩ص', '١٠ص', '١١ص', '١٢م', '١م', '٢م', '٣م', '٤م']
    const days = ['الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة']

    const heatmapData = [
        [0, 1, 0, 0, 1, 2, 2, 1],
        [0, 0, 0, 1, 1, 2, 1, 0],
        [1, 1, 0, 0, 2, 2, 2, 1],
        [0, 1, 1, 0, 1, 2, 1, 0],
        [0, 0, 0, 0, 1, 1, 0, 0],
    ]

    const getHeatmapColor = (value: number) => {
        if (value === 0) return 'bg-emerald-500/20 shadow-[inset_0_0_10px_rgba(16,185,129,0.1)] border-emerald-500/20'
        if (value === 1) return 'bg-amber-500/20 shadow-[inset_0_0_10px_rgba(245,158,11,0.1)] border-amber-500/20'
        return 'bg-red-500/20 shadow-[inset_0_0_10px_rgba(239,68,68,0.1)] border-red-500/20'
    }

    return (
        <div className="linear-card h-full font-sans mt-6">
            <div className="flex items-center justify-between p-6">
                <div>
                    <h3 className="text-base font-bold text-foreground tracking-tight">تحليلات المنظمة</h3>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-1">تتبع مستويات الطاقة اللحظية</p>
                </div>

                <div className="flex bg-secondary/50 border border-border/40 p-1 rounded-lg">
                    <button
                        onClick={() => setView('heatmap')}
                        className={`px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest rounded-md transition-all ${view === 'heatmap' ? 'bg-primary text-primary-foreground shadow-lg' : 'text-muted-foreground hover:text-foreground'}`}
                    >
                        خريطة الطاقة
                    </button>
                    <button
                        onClick={() => setView('weekly')}
                        className={`px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest rounded-md transition-all ${view === 'weekly' ? 'bg-primary text-primary-foreground shadow-lg' : 'text-muted-foreground hover:text-foreground'}`}
                    >
                        الإنجازات
                    </button>
                </div>
            </div>
            
            <div className="px-6 pb-6">
                {view === 'heatmap' ? (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                                <Clock className="w-3 h-3 text-primary" strokeWidth={2} /> 
                                كثافة الجلوس
                            </h3>
                            <div className="flex items-center gap-4 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                                <div className="flex items-center gap-1.5"><div className="w-2 h-2 bg-emerald-500/40 rounded-sm" /> <span>مثالي</span></div>
                                <div className="flex items-center gap-1.5"><div className="w-2 h-2 bg-amber-500/40 rounded-sm" /> <span>تحذير</span></div>
                                <div className="flex items-center gap-1.5"><div className="w-2 h-2 bg-red-500/40 rounded-sm" /> <span>حرج</span></div>
                            </div>
                        </div>

                        <div className="overflow-x-auto no-scrollbar">
                            <div className="min-w-[600px]">
                                <div className="flex mb-3 mr-[60px]">
                                    {hours.map(h => (
                                        <div key={h} className="flex-1 text-center text-[10px] font-bold text-muted-foreground/60">{h}</div>
                                    ))}
                                </div>

                                <div className="space-y-1.5">
                                    {days.map((day, dIdx) => (
                                        <div key={day} className="flex items-center gap-4">
                                            <div className="w-[50px] text-[10px] font-bold text-muted-foreground uppercase">{day}</div>
                                            <div className="flex-1 flex gap-1.5">
                                                {heatmapData[dIdx].map((val, hIdx) => (
                                                    <motion.div
                                                        key={`${dIdx}-${hIdx}`}
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        transition={{ delay: (dIdx * 0.05) + (hIdx * 0.02) }}
                                                        className={`flex-1 h-8 rounded-sm border ${getHeatmapColor(val)} hover:brightness-150 transition-all cursor-pointer relative group`}
                                                    >
                                                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 linear-glass text-foreground text-[10px] font-bold px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 whitespace-nowrap z-30 pointer-events-none transition-all scale-95 group-hover:scale-100">
                                                            {val === 2 ? 'منطقة خطر عالي' : val === 1 ? 'جلوس متوسط' : 'حركة جيدة'}
                                                        </div>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 p-4 bg-primary/5 border border-primary/20 rounded-xl flex items-start gap-4 relative overflow-hidden group">
                           <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-3xl -z-10" />
                            <div className="p-2 bg-primary/20 rounded-lg text-primary">
                                <Zap className="w-4 h-4" strokeWidth={2.5} />
                            </div>
                            <div>
                                <h4 className="font-bold text-foreground text-xs uppercase tracking-widest mb-1">رؤية ذكية</h4>
                                <p className="text-muted-foreground text-xs leading-relaxed max-w-2xl">
                                    تحليل البيانات يشير إلى "انخفاض في النشاط" أيام الأربعاء بعد الظهر. 
                                    <span className="text-primary font-bold"> التوصية:</span> تفعيل جلسات "الوقوف والنقاش" القصيرة لمدة ١٠ دقائق.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-4">
                        <div className="flex items-end justify-between h-[240px] gap-6 px-4 relative">
                            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                                {[0, 1, 2, 3].map((i) => (
                                    <div key={i} className="w-full border-t border-border/20" />
                                ))}
                            </div>

                            {weeklyData.map((item, index) => (
                                <div key={item.day} className="flex-1 flex flex-col items-center gap-4 h-full relative z-10">
                                    <div className="flex-1 w-full max-w-[32px] bg-secondary/30 border border-border/40 rounded-t-md relative flex flex-col justify-end group/bar overflow-hidden">
                                        <motion.div
                                            initial={{ height: 0 }}
                                            animate={{ height: `${(item.value / maxWeekly) * 100}%` }}
                                            transition={{ duration: 1.5, delay: index * 0.1, ease: [0.23, 1, 0.32, 1] }}
                                            className="w-full bg-primary relative overflow-hidden"
                                        >
                                            <div className="absolute inset-0 bg-white/20 animate-shimmer" />
                                        </motion.div>
                                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 linear-glass text-foreground text-[10px] font-bold px-3 py-2 rounded-lg opacity-0 group-hover/bar:opacity-100 transition-all scale-90 group-hover/bar:scale-100 whitespace-nowrap z-20">
                                            {item.value} نقطة نشاط
                                        </div>
                                    </div>
                                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{item.day}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    )
}
