import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { motion } from 'framer-motion'
import { Activity, Clock } from 'lucide-react'

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
        if (value === 0) return 'bg-emerald-500/20'
        if (value === 1) return 'bg-amber-500/40'
        return 'bg-red-500/80'
    }

    return (
        <Card className="bg-white border border-slate-200 shadow-sm h-full font-sans overflow-hidden relative">
            <CardHeader className="flex flex-row items-center justify-between pb-6 border-b border-slate-100">
                <div>
                    <CardTitle className="text-xl font-bold text-slate-900 tracking-tight">تحليلات المنظمة</CardTitle>
                    <p className="text-sm text-slate-500 mt-1">تتبع الإرهاق والطاقة بشكل لحظي</p>
                </div>

                <div className="flex bg-slate-100 p-1 rounded-lg">
                    <button
                        onClick={() => setView('heatmap')}
                        className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-all ${view === 'heatmap' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}
                    >
                        خريطة الطاقة
                    </button>
                    <button
                        onClick={() => setView('weekly')}
                        className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-all ${view === 'weekly' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}
                    >
                        الإنجازات
                    </button>
                </div>
            </CardHeader>
            <CardContent className="pt-6">

                {view === 'heatmap' ? (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-semibold text-slate-700 flex items-center gap-2"><Clock className="w-4 h-4 text-slate-400" /> مناطق خطر الجلوس</h3>
                            <div className="flex items-center gap-4 text-xs font-medium text-slate-500">
                                <div className="flex items-center gap-1"><div className="w-3 h-3 bg-emerald-500/20 rounded-sm"></div> مثالي</div>
                                <div className="flex items-center gap-1"><div className="w-3 h-3 bg-amber-500/40 rounded-sm"></div> تحذير</div>
                                <div className="flex items-center gap-1"><div className="w-3 h-3 bg-red-500/80 rounded-sm"></div> حرج (يحتاج تدخل)</div>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <div className="min-w-[600px]">
                                <div className="flex mb-2 mr-[60px]">
                                    {hours.map(h => (
                                        <div key={h} className="flex-1 text-center text-xs font-medium text-slate-400">{h}</div>
                                    ))}
                                </div>

                                <div className="space-y-2">
                                    {days.map((day, dIdx) => (
                                        <div key={day} className="flex items-center gap-4">
                                            <div className="w-[50px] text-xs font-bold text-slate-600">{day}</div>
                                            <div className="flex-1 flex gap-2">
                                                {heatmapData[dIdx].map((val, hIdx) => (
                                                    <motion.div
                                                        key={`${dIdx}-${hIdx}`}
                                                        initial={{ scale: 0.8, opacity: 0 }}
                                                        animate={{ scale: 1, opacity: 1 }}
                                                        transition={{ delay: (dIdx * 0.05) + (hIdx * 0.02) }}
                                                        className={`flex-1 h-10 rounded-md ${getHeatmapColor(val)} hover:scale-105 transition-transform cursor-pointer relative group`}
                                                    >
                                                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap z-10 pointer-events-none">
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

                        <div className="mt-8 p-4 bg-orange-50 border border-orange-100 rounded-xl flex items-start gap-3">
                            <Activity className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                            <div>
                                <h4 className="font-bold text-orange-900 text-sm">رؤية قابلة للتنفيذ</h4>
                                <p className="text-orange-800 text-sm mt-1">
                                    اكتشفنا "ركود ما بعد الظهر" بين الساعة ٢ و٤ مساءً أيام الأربعاء.
                                    <b> التوصية:</b> فعّل تنبيه "لقاء القهوة" العشوائي لتفكيك الاجتماعات المتواصلة.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <div className="flex items-end justify-between h-[280px] gap-4 px-2 relative">
                            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none z-0">
                                {[0, 1, 2, 3, 4].map((i) => (
                                    <div key={i} className="w-full border-t border-slate-100" />
                                ))}
                            </div>

                            {weeklyData.map((item, index) => (
                                <div key={item.day} className="flex-1 flex flex-col items-center gap-3 h-full relative z-10">
                                    <div className="flex-1 w-full max-w-[40px] bg-slate-50 border border-slate-100 rounded-t-lg relative flex flex-col justify-end group/bar overflow-hidden">
                                        <motion.div
                                            initial={{ height: 0 }}
                                            animate={{ height: `${(item.value / maxWeekly) * 100}%` }}
                                            transition={{ duration: 1.2, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                                            className="w-full bg-primary relative"
                                        >
                                            <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[11px] font-bold px-2 py-1 opacity-0 group-hover/bar:opacity-100 transition-opacity whitespace-nowrap rounded">
                                                {item.value} حركة
                                            </div>
                                        </motion.div>
                                    </div>
                                    <span className="text-xs font-bold text-slate-500">{item.day}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </CardContent>
        </Card>
    )
}
