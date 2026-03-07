import React, { useState } from 'react'
import { Plus, Search, Sparkles, Edit2, Trash2, MoreVertical, PackageOpen } from 'lucide-react'
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
                    <h1 className="text-2xl font-bold text-text-primary tracking-tight">مكتبة الحركات الصغيرة</h1>
                    <p className="text-text-tertiary mt-1 text-sm leading-relaxed">تعديل وإضافة وتوليد أنشطة للشركة باستخدام الذكاء الاصطناعي.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button
                        variant="outline"
                        onClick={handleAIGenerate}
                        disabled={isGenerating}
                        className="relative overflow-hidden border-primary/20 text-primary hover:text-primary font-semibold shadow-soft transition-colors duration-200"
                        style={{
                            background: `
                                radial-gradient(ellipse at 20% 50%, rgba(139,92,246,0.15) 0%, transparent 50%),
                                radial-gradient(ellipse at 80% 20%, rgba(139,92,246,0.10) 0%, transparent 50%),
                                radial-gradient(ellipse at 60% 80%, rgba(139,92,246,0.08) 0%, transparent 50%),
                                linear-gradient(135deg, rgba(28,28,34,0.9) 0%, rgba(17,17,19,0.95) 50%, rgba(28,28,34,0.8) 100%)
                            `.trim(),
                        }}
                    >
                        {isGenerating ? (
                            <span className="flex items-center gap-2"><div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" /> جاري التوليد...</span>
                        ) : (
                            <span className="flex items-center gap-2"><Sparkles className="w-4 h-4" strokeWidth={1.5} /> توليد بالذكاء الاصطناعي</span>
                        )}
                    </Button>
                    <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold shadow-soft transition-colors duration-200">
                        <Plus className="w-4 h-4 mr-2" strokeWidth={1.5} /> نشاط جديد
                    </Button>
                </div>
            </div>

            <div className="space-y-4">
                <div className="flex flex-col sm:flex-row justify-between gap-4">
                    <div className="flex bg-surface-1 p-1 rounded-lg shadow-soft border border-border overflow-x-auto no-scrollbar">
                        {categories.map(cat => (
                            <button
                                key={cat.id}
                                onClick={() => setActiveTab(cat.id)}
                                className={`px-4 py-2 text-sm font-semibold rounded-md transition-colors duration-200 whitespace-nowrap ${activeTab === cat.id ? 'bg-primary text-primary-foreground shadow-soft' : 'text-text-tertiary hover:text-text-primary hover:bg-surface-2'}`}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </div>
                    <div className="relative group">
                        <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-quaternary group-focus-within:text-primary transition-colors" strokeWidth={1.5} aria-hidden="true" />
                        <input
                            type="text"
                            name="activity-search"
                            autoComplete="off"
                            placeholder="ابحث في الأنشطة..."
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                            className="pl-4 pr-10 py-2.5 w-full sm:w-64 bg-surface-2 border border-border rounded-lg focus:ring-1 focus:ring-primary/20 focus:border-primary/50 focus-visible:outline-none transition-colors duration-200 text-sm font-medium text-right text-text-primary placeholder:text-text-quaternary"
                        />
                    </div>
                </div>
                <div className="bg-surface-1 border border-border rounded-xl overflow-hidden shadow-soft">
                    <div className="overflow-x-auto">
                        <table className="w-full text-right">
                            <thead>
                                <tr className="bg-surface-2 border-b border-border">
                                    <th className="px-6 py-4 text-[11px] font-semibold text-text-tertiary uppercase tracking-wider text-right">عنوان النشاط</th>
                                    <th className="px-6 py-4 text-[11px] font-semibold text-text-tertiary uppercase tracking-wider text-right">الفئة</th>
                                    <th className="px-6 py-4 text-[11px] font-semibold text-text-tertiary uppercase tracking-wider text-right">المدة / النقاط</th>
                                    <th className="px-6 py-4 text-[11px] font-semibold text-text-tertiary uppercase tracking-wider text-right">إشارة الذكاء الاصطناعي</th>
                                    <th className="px-6 py-4 text-[11px] font-semibold text-text-tertiary uppercase tracking-wider text-right">الحالة</th>
                                    <th className="px-6 py-4 text-[11px] font-semibold text-text-tertiary uppercase tracking-wider"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                <AnimatePresence>
                                    {filteredActivities.map((activity, idx) => (
                                        <motion.tr
                                            key={activity.id}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            transition={{ delay: idx * 0.05 }}
                                            className="hover:bg-surface-2/50 transition-colors duration-200 group"
                                        >
                                            <td className="px-6 py-4 w-1/3">
                                                <p className="font-semibold text-text-primary">{activity.title}</p>
                                                <p className="text-sm text-text-tertiary mt-1 line-clamp-1 leading-relaxed">{activity.description}</p>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2.5 py-1 text-xs font-semibold rounded-lg border ${activity.category === 'physical' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                                                    activity.category === 'mindfulness' ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' :
                                                        activity.category === 'social' ? 'bg-violet-500/10 text-violet-400 border-violet-500/20' :
                                                            'bg-blue-500/10 text-blue-400 border-blue-500/20'
                                                    }`}>
                                                    {categories.find(c => c.id === activity.category)?.label || activity.category}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-semibold text-text-primary">{activity.duration}</span>
                                                    <span className="text-xs font-semibold text-amber-400 mt-0.5">{activity.points} نقطة</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {activity.aiBadge ? (
                                                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary bg-primary/10 px-2.5 py-1 rounded-lg border border-primary/20">
                                                        <Sparkles className="w-3 h-3" strokeWidth={1.5} /> {activity.aiBadge}
                                                    </span>
                                                ) : (
                                                    <span className="text-text-quaternary text-sm">-</span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-2 h-2 rounded-full bg-emerald-400" />
                                                    <span className="text-sm font-medium text-text-secondary">نشط</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-left">
                                                <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                                    <button aria-label="تعديل النشاط" className="p-2 text-text-quaternary hover:text-primary hover:bg-primary/10 rounded-lg transition-colors duration-200"><Edit2 className="w-4 h-4" strokeWidth={1.5} aria-hidden="true" /></button>
                                                    <button aria-label="حذف النشاط" className="p-2 text-text-quaternary hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors duration-200"><Trash2 className="w-4 h-4" strokeWidth={1.5} aria-hidden="true" /></button>
                                                    <button aria-label="خيارات إضافية" className="p-2 text-text-quaternary hover:text-text-primary hover:bg-surface-3 rounded-lg transition-colors duration-200"><MoreVertical className="w-4 h-4" strokeWidth={1.5} aria-hidden="true" /></button>
                                                </div>
                                            </td>
                                        </motion.tr>
                                    ))}
                                </AnimatePresence>
                            </tbody>
                        </table>
                        {filteredActivities.length === 0 && (
                            <div className="p-16 text-center">
                                <PackageOpen className="w-12 h-12 text-text-quaternary mx-auto mb-4" strokeWidth={1.5} />
                                <p className="text-text-tertiary font-medium">لا توجد أنشطة تطابق بحثك.</p>
                                <p className="text-sm text-text-quaternary mt-1">جرّب تغيير الفلتر أو استخدم التوليد بالذكاء الاصطناعي</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
