import React, { useState } from 'react'
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
        if (value === 0) return 'bg-emerald-100'
        if (value === 1) return 'bg-amber-200'
        return 'bg-red-300'
    }

    return (
        <div className="bg-white border border-[#E5E7EB] rounded-2xl shadow-soft h-full font-sans overflow-hidden relative mt-6">
            <div className="flex items-center justify-between p-6 pb-0">
                <div>
                    <h3 className="text-lg font-bold text-[#111827] tracking-tight">تحليلات المنظمة</h3>
                    <p className="text-sm text-[#6B7280] mt-1 leading-relaxed">تتبع الإرهاق والطاقة بشكل لحظي</p>
                </div>

                <div className="flex bg-[#F3F4F6] p-1 rounded-xl">
                    <button
                        onClick={() => setView('heatmap')}
                        className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors duration-200 cursor-pointer ${view === 'heatmap' ? 'bg-white text-[#111827] shadow-soft' : 'text-[#6B7280] hover:text-[#111827]'}`}
                    >
                        خريطة الطاقة
                    </button>
                    <button
                        onClick={() => setView('weekly')}
                        className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors duration-200 cursor-pointer ${view === 'weekly' ? 'bg-white text-[#111827] shadow-soft' : 'text-[#6B7280] hover:text-[#111827]'}`}
                    >
                        الإنجازات
                    </button>
                </div>
            </div>
            <div className="p-6">
                {view === 'heatmap' ? (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-semibold text-[#374151] flex items-center gap-2"><Clock className="w-4 h-4 text-[#9CA3AF]" strokeWidth={1.5} /> مناطق خطر الجلوس</h3>
                            <div className="flex items-center gap-4 text-xs font-medium text-[#6B7280]">
                                <div className="flex items-center gap-1.5"><div className="w-3 h-3 bg-emerald-100 rounded" /></div>
                                <span>مثالي</span>
                                <div className="flex items-center gap-1.5"><div className="w-3 h-3 bg-amber-200 rounded" /></div>
                                <span>تحذير</span>
                                <div className="flex items-center gap-1.5"><div className="w-3 h-3 bg-red-300 rounded" /></div>
                                <span>حرج</span>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <div className="min-w-[600px]">
                                <div className="flex mb-2 mr-[60px]">
                                    {hours.map(h => (
                                        <div key={h} className="flex-1 text-center text-xs font-medium text-[#9CA3AF]">{h}</div>
                                    ))}
                                </div>

                                <div className="space-y-1">
                                    {days.map((day, dIdx) => (
                                        <div key={day} className="flex items-center gap-4">
                                            <div className="w-[50px] text-xs font-semibold text-[#6B7280]">{day}</div>
                                            <div className="flex-1 flex gap-1">
                                                {heatmapData[dIdx].map((val, hIdx) => (
                                                    <motion.div
                                                        key={`${dIdx}-${hIdx}`}
                                                        initial={{ scale: 0.8, opacity: 0 }}
                                                        animate={{ scale: 1, opacity: 1 }}
                                                        transition={{ delay: (dIdx * 0.05) + (hIdx * 0.02) }}
                                                        className={`flex-1 h-10 rounded ${getHeatmapColor(val)} hover:scale-105 transition-transform duration-200 cursor-pointer relative group`}
                                                    >
                                                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#111827] text-white text-xs px-2.5 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 whitespace-nowrap z-10 pointer-events-none shadow-soft-md">
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

                        <div className="mt-8 p-4 bg-[#FFF7ED] border border-orange-100 rounded-xl flex items-start gap-3">
                            <Activity className="w-5 h-5 text-primary shrink-0 mt-0.5" strokeWidth={1.5} />
                            <div>
                                <h4 className="font-bold text-[#111827] text-sm">رؤية قابلة للتنفيذ</h4>
                                <p className="text-[#6B7280] text-sm mt-1 leading-relaxed">
                                    اكتشفنا "ركود ما بعد الظهر" بين الساعة ٢ و٤ مساءً أيام الأربعاء.
                                    <b className="text-[#374151]"> التوصية:</b> فعّل تنبيه "لقاء القهوة" العشوائي لتفكيك الاجتماعات المتواصلة.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <div className="flex items-end justify-between h-[280px] gap-4 px-2 relative">
                            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none z-0">
                                {[0, 1, 2, 3, 4].map((i) => (
                                    <div key={i} className="w-full border-t border-[#F3F4F6]" />
                                ))}
                            </div>

                            {weeklyData.map((item, index) => (
                                <div key={item.day} className="flex-1 flex flex-col items-center gap-3 h-full relative z-10">
                                    <div className="flex-1 w-full max-w-[40px] bg-[#F9FAFB] border border-[#E5E7EB] rounded-t-lg relative flex flex-col justify-end group/bar overflow-hidden">
                                        <motion.div
                                            initial={{ height: 0 }}
                                            animate={{ height: `${(item.value / maxWeekly) * 100}%` }}
                                            transition={{ duration: 1.2, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                                            className="w-full bg-primary rounded-t-md relative"
                                        >
                                            <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#111827] text-white text-[11px] font-bold px-2.5 py-1.5 opacity-0 group-hover/bar:opacity-100 transition-opacity whitespace-nowrap rounded-lg shadow-soft">
                                                {item.value} حركة
                                            </div>
                                        </motion.div>
                                    </div>
                                    <span className="text-xs font-semibold text-[#6B7280]">{item.day}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    )
}
