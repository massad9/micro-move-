import React, { useState } from 'react'
import { Plus, Search, Sparkles, Edit2, Trash2, MoreVertical, PackageOpen } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useMicroMoveStore } from '@/store/microMoveStore'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
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
                    <h1 className="text-3xl font-bold text-foreground tracking-tight">مكتبة الحركات الصغيرة</h1>
                    <p className="text-muted-foreground mt-2 text-sm leading-relaxed">تعديل وإضافة وتوليد أنشطة للشركة باستخدام الذكاء الاصطناعي.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button
                        variant="outline"
                        onClick={handleAIGenerate}
                        disabled={isGenerating}
                        className="relative overflow-hidden border-primary/20 text-primary hover:text-primary font-semibold shadow-soft transition-all duration-200 bg-primary/5 hover:bg-primary/10"
                    >
                        {isGenerating ? (
                            <span className="flex items-center gap-2"><div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" /> جاري التوليد...</span>
                        ) : (
                            <span className="flex items-center gap-2"><Sparkles className="w-4 h-4" strokeWidth={1.5} /> توليد بالذكاء الاصطناعي</span>
                        )}
                    </Button>
                    <button className="linear-button-primary flex items-center">
                        <Plus className="w-4 h-4 mr-2" strokeWidth={1.5} /> نشاط جديد
                    </button>
                </div>
            </div>

            <div className="space-y-6">
                <div className="flex flex-col sm:flex-row justify-between gap-4">
                    <div className="flex bg-secondary/50 p-1.5 rounded-xl border border-border/40 overflow-x-auto no-scrollbar relative">
                        {categories.map(cat => (
                            <button
                                key={cat.id}
                                onClick={() => setActiveTab(cat.id)}
                                className={cn(
                                    "relative px-5 py-2.5 text-sm font-bold rounded-lg transition-colors whitespace-nowrap z-10",
                                    activeTab === cat.id ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                                )}
                            >
                                {activeTab === cat.id && (
                                    <motion.div
                                        layoutId="activeTabIndicator"
                                        className="absolute inset-0 bg-primary/10 border border-primary/20 rounded-lg -z-10"
                                        initial={false}
                                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                    />
                                )}
                                {cat.label}
                            </button>
                        ))}
                    </div>
                    <div className="relative group flex-1 max-w-sm">
                        <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" strokeWidth={2} />
                        <input
                            type="text"
                            placeholder="ابحث في الأنشطة..."
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                            className="pl-4 pr-11 py-3 w-full bg-secondary border border-border/40 rounded-xl focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all font-medium text-foreground placeholder-muted-foreground/60 text-right"
                        />
                    </div>
                </div>
                <div className="linear-card">
                    <div className="overflow-x-auto">
                        <table className="w-full text-right">
                            <thead>
                                <tr className="bg-secondary/40 border-b border-border/40">
                                    <th className="px-6 py-4 text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] text-right">عنوان النشاط</th>
                                    <th className="px-6 py-4 text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] text-right">الفئة</th>
                                    <th className="px-6 py-4 text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] text-right">المدة / النقاط</th>
                                    <th className="px-6 py-4 text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] text-right">إشارة الذكاء الاصطناعي</th>
                                    <th className="px-6 py-4 text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] text-right">الحالة</th>
                                    <th className="px-6 py-4 text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border/20">
                                <AnimatePresence>
                                    {filteredActivities.map((activity, idx) => (
                                        <motion.tr
                                            layout
                                            key={activity.id}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            transition={{ delay: idx * 0.05, duration: 0.2 }}
                                            className="hover:bg-secondary/30 transition-colors duration-200 group"
                                        >
                                            <td className="px-6 py-5 w-1/3">
                                                <p className="font-bold text-foreground text-sm">{activity.title}</p>
                                                <p className="text-sm text-muted-foreground mt-1 line-clamp-1 leading-relaxed">{activity.description}</p>
                                            </td>
                                            <td className="px-6 py-5 whitespace-nowrap">
                                                <span className={`px-2.5 py-1 text-[10px] uppercase tracking-widest font-bold rounded-lg border ${activity.category === 'physical' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                                                    activity.category === 'mindfulness' ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' :
                                                        activity.category === 'social' ? 'bg-violet-500/10 text-violet-400 border-violet-500/20' :
                                                            'bg-blue-500/10 text-blue-400 border-blue-500/20'
                                                    }`}>
                                                    {categories.find(c => c.id === activity.category)?.label || activity.category}
                                                </span>
                                            </td>
                                            <td className="px-6 py-5 whitespace-nowrap">
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-bold text-foreground">{activity.duration}</span>
                                                    <span className="text-[10px] font-bold uppercase tracking-widest text-primary mt-1">{activity.points} نقطة</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5 whitespace-nowrap">
                                                {activity.aiBadge ? (
                                                    <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-primary bg-primary/10 px-2.5 py-1 rounded-lg border border-primary/20">
                                                        <Sparkles className="w-3 h-3" strokeWidth={2} /> {activity.aiBadge}
                                                    </span>
                                                ) : (
                                                    <span className="text-border text-sm">-</span>
                                                )}
                                            </td>
                                            <td className="px-6 py-5 whitespace-nowrap">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]" />
                                                    <span className="text-sm font-bold text-foreground opacity-80">نشط</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5 whitespace-nowrap text-left">
                                                <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                                    <button className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-all duration-200"><Edit2 className="w-4 h-4" strokeWidth={2} /></button>
                                                    <button className="p-2 text-muted-foreground hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all duration-200"><Trash2 className="w-4 h-4" strokeWidth={2} /></button>
                                                    <button className="p-2 text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg transition-all duration-200"><MoreVertical className="w-4 h-4" strokeWidth={2} /></button>
                                                </div>
                                            </td>
                                        </motion.tr>
                                    ))}
                                </AnimatePresence>
                            </tbody>
                        </table>
                        {filteredActivities.length === 0 && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-16 text-center">
                                <PackageOpen className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" strokeWidth={1.5} />
                                <p className="text-foreground font-bold">لا توجد أنشطة تطابق بحثك.</p>
                                <p className="text-sm text-muted-foreground mt-1">جرّب تغيير الفلتر أو استخدم التوليد بالذكاء الاصطناعي</p>
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
