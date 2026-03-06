import React, { useState } from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Plus, Search, Sparkles, MoreVertical, Edit2, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useMicroMoveStore } from '@/store/microMoveStore'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'sonner'
import confetti from 'canvas-confetti'

export const ActivityManager: React.FC = () => {
    const activities = useMicroMoveStore(state => state.activities)
    const [searchTerm, setSearchTerm] = useState('')
    const [activeTab, setActiveTab] = useState('all')
    const [isGenerating, setIsGenerating] = useState(false)

    const filteredActivities = activities.filter(a => {
        const matchesSearch = a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            a.description.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesTab = activeTab === 'all' || a.category === activeTab
        return matchesSearch && matchesTab
    })

    const handleAIGenerate = () => {
        setIsGenerating(true)
        setTimeout(() => {
            setIsGenerating(false)
            confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 }, colors: ['#F97316', '#14B8A6'] })
            toast.success('تمت إضافة حركات ذكية بناءً على ملاحظات مكتبية مريحة.', {
                icon: '✨'
            })
        }, 1500)
    }

    const categories = [
        { id: 'all', label: 'الكل' },
        { id: 'physical', label: 'بدني' },
        { id: 'mindfulness', label: 'تأمل' },
        { id: 'social', label: 'اجتماعي' },
        { id: 'hydration', label: 'ترطيب' },
    ]

    return (
        <div className="space-y-6 font-sans">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">مكتبة الحركات الصغيرة</h1>
                    <p className="text-slate-500 mt-1">تعديل وإضافة وتوليد أنشطة للشركة باستخدام الذكاء الاصطناعي.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button
                        variant="outline"
                        onClick={handleAIGenerate}
                        disabled={isGenerating}
                        className="bg-primary/5 text-primary border-primary/20 hover:bg-primary/10 hover:text-primary font-bold shadow-sm"
                    >
                        {isGenerating ? (
                            <span className="flex items-center gap-2"><div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" /> جاري التوليد...</span>
                        ) : (
                            <span className="flex items-center gap-2"><Sparkles className="w-4 h-4" /> توليد بالذكاء الاصطناعي</span>
                        )}
                    </Button>
                    <Button className="bg-slate-900 text-white hover:bg-slate-800 font-bold shadow-md">
                        <Plus className="w-4 h-4 mr-2" /> نشاط جديد
                    </Button>
                </div>
            </div>

            <Card className="border-none shadow-sm bg-transparent">
                <CardHeader className="px-0 pt-0">
                    <div className="flex flex-col sm:flex-row justify-between gap-4">
                        <div className="flex bg-white p-1 rounded-xl shadow-sm border border-slate-200 overflow-x-auto no-scrollbar">
                            {categories.map(cat => (
                                <button
                                    key={cat.id}
                                    onClick={() => setActiveTab(cat.id)}
                                    className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all whitespace-nowrap ${activeTab === cat.id ? 'bg-slate-900 text-white shadow-md' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'}`}
                                >
                                    {cat.label}
                                </button>
                            ))}
                        </div>
                        <div className="relative">
                            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input
                                type="text"
                                placeholder="ابحث في الأنشطة..."
                                value={searchTerm}
                                onChange={e => setSearchTerm(e.target.value)}
                                className="pl-4 pr-10 py-2.5 w-full sm:w-64 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm font-medium text-right"
                            />
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="px-0">
                    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                        <div className="overflow-x-auto">
                            <table className="w-full text-right">
                                <thead>
                                    <tr className="bg-slate-50 border-b border-slate-100">
                                        <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider text-right">عنوان النشاط</th>
                                        <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider text-right">الفئة</th>
                                        <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider text-right">المدة / النقاط</th>
                                        <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider text-right">إشارة الذكاء الاصطناعي</th>
                                        <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider text-right">الحالة</th>
                                        <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider"></th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    <AnimatePresence>
                                        {filteredActivities.map((activity, idx) => (
                                            <motion.tr
                                                key={activity.id}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, scale: 0.95 }}
                                                transition={{ delay: idx * 0.05 }}
                                                className="hover:bg-slate-50 transition-colors group"
                                            >
                                                <td className="px-6 py-4 w-1/3">
                                                    <p className="font-bold text-slate-900">{activity.title}</p>
                                                    <p className="text-sm text-slate-500 mt-1 line-clamp-1">{activity.description}</p>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-2.5 py-1 text-xs font-bold rounded-full border ${activity.category === 'physical' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                                                        activity.category === 'mindfulness' ? 'bg-rose-50 text-rose-700 border-rose-200' :
                                                            activity.category === 'social' ? 'bg-violet-50 text-violet-700 border-violet-200' :
                                                                'bg-blue-50 text-blue-700 border-blue-200'
                                                        }`}>
                                                        {categories.find(c => c.id === activity.category)?.label || activity.category}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex flex-col">
                                                        <span className="text-sm font-bold text-slate-900">{activity.duration}</span>
                                                        <span className="text-xs font-bold text-amber-500 mt-0.5">{activity.points} نقطة</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {activity.aiBadge ? (
                                                        <span className="inline-flex items-center gap-1 text-xs font-bold text-primary bg-primary/5 px-2 py-1 rounded-md border border-primary/10">
                                                            <Sparkles className="w-3 h-3" /> {activity.aiBadge}
                                                        </span>
                                                    ) : (
                                                        <span className="text-slate-300 text-sm">-</span>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-2 h-2 rounded-full bg-green-500" />
                                                        <span className="text-sm font-semibold text-slate-700">نشط</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-left">
                                                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <button className="p-2 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"><Edit2 className="w-4 h-4" /></button>
                                                        <button className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"><Trash2 className="w-4 h-4" /></button>
                                                        <button className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"><MoreVertical className="w-4 h-4" /></button>
                                                    </div>
                                                </td>
                                            </motion.tr>
                                        ))}
                                    </AnimatePresence>
                                </tbody>
                            </table>
                            {filteredActivities.length === 0 && (
                                <div className="p-12 text-center text-slate-500">
                                    لا توجد أنشطة تطابق بحثك.
                                </div>
                            )}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
