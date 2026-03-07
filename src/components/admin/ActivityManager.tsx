import React, { useState } from 'react'
import { Plus, Search, Sparkles, Edit2, Trash2, MoreVertical, PackageOpen, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useMicroMoveStore } from '@/store/microMoveStore'
import type { Activity } from '@/store/microMoveStore'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'sonner'
// Dynamic import for canvas-confetti (bundle-conditional optimization)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fireConfetti = async (opts?: Record<string, any>) => {
    const confetti = (await import('canvas-confetti')).default
    if (confetti) confetti(opts)
}

const categories = [
    { id: 'all', label: 'الكل' },
    { id: 'physical', label: 'بدني' },
    { id: 'mindfulness', label: 'تأمل' },
    { id: 'social', label: 'اجتماعي' },
    { id: 'hydration', label: 'ترطيب' },
] as const

const CATEGORY_OPTIONS = [
    { id: 'physical', label: 'بدني' },
    { id: 'mindfulness', label: 'تأمل' },
    { id: 'social', label: 'اجتماعي' },
    { id: 'hydration', label: 'ترطيب' },
] as const

// AI-generated activity templates
const AI_ACTIVITY_TEMPLATES: Omit<Activity, 'id'>[] = [
    {
        title: 'تمارين تدوير الكتف',
        category: 'physical',
        points: 15,
        duration: '٢ دقيقة',
        description: 'قم بتدوير كتفيك للأمام والخلف ١٠ مرات لكل اتجاه لتخفيف التوتر العضلي.',
        icon: 'Activity',
        aiBadge: 'توتر عضلي'
    },
    {
        title: 'تأمل الامتنان',
        category: 'mindfulness',
        points: 20,
        duration: '٣ دقائق',
        description: 'اكتب ثلاثة أشياء تشعر بالامتنان لها اليوم. التأمل في الإيجابيات يعزز المزاج.',
        icon: 'Sparkles',
        aiBadge: 'تعزيز المزاج'
    },
    {
        title: 'محادثة قصيرة مع زميل',
        category: 'social',
        points: 15,
        duration: '٥ دقائق',
        description: 'تحدث مع زميل لم تتحدث معه اليوم. العلاقات الاجتماعية تعزز بيئة العمل.',
        icon: 'Coffee',
        aiBadge: 'تعزيز التواصل'
    },
    {
        title: 'شرب كوب ماء دافئ',
        category: 'hydration',
        points: 10,
        duration: '١ دقيقة',
        description: 'اشرب كوب ماء دافئ لتحسين الهضم والدورة الدموية. ابدأ يومك بشكل صحي.',
        icon: 'Droplet',
        aiBadge: 'صحة هضمية'
    },
    {
        title: 'تمارين إطالة الظهر',
        category: 'physical',
        points: 20,
        duration: '٣ دقائق',
        description: 'قم بإطالة عضلات الظهر السفلي والعلوي لتخفيف آلام الجلوس الطويل.',
        icon: 'Activity',
        aiBadge: 'ألم الظهر'
    },
    {
        title: 'تنفس مربع ٤-٤-٤-٤',
        category: 'mindfulness',
        points: 15,
        duration: '٢ دقيقة',
        description: 'شهيق ٤ ثوان، حبس ٤ ثوان، زفير ٤ ثوان، انتظار ٤ ثوان. يهدئ الجهاز العصبي.',
        icon: 'Sparkles',
        aiBadge: 'تخفيف التوتر'
    },
]

interface ActivityFormData {
    title: string
    category: string
    points: number
    duration: string
    description: string
}

const EMPTY_FORM: ActivityFormData = {
    title: '',
    category: 'physical',
    points: 10,
    duration: '',
    description: '',
}

// ─── Activity Form Modal ──────────────────────────────────────────
interface ActivityModalProps {
    isOpen: boolean
    onClose: () => void
    onSubmit: (data: ActivityFormData) => void
    initialData?: ActivityFormData
    mode: 'create' | 'edit'
}

const ActivityModal: React.FC<ActivityModalProps> = ({ isOpen, onClose, onSubmit, initialData, mode }) => {
    const [form, setForm] = useState<ActivityFormData>(initialData || EMPTY_FORM)

    React.useEffect(() => {
        if (isOpen) setForm(initialData || EMPTY_FORM)
    }, [isOpen, initialData])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!form.title.trim() || !form.duration.trim() || !form.description.trim()) {
            toast.error('يرجى ملء جميع الحقول المطلوبة')
            return
        }
        onSubmit(form)
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        className="relative w-full max-w-lg bg-white rounded-3xl p-8 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] border border-slate-200/50 font-sans text-right z-10"
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-4 left-4 p-2 text-slate-400 hover:text-slate-700 bg-slate-50 hover:bg-slate-100 rounded-full transition-colors border border-slate-200/50"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-6">
                            {mode === 'create' ? 'إضافة نشاط جديد' : 'تعديل النشاط'}
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* Title */}
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">عنوان النشاط *</label>
                                <input
                                    type="text"
                                    value={form.title}
                                    onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                                    placeholder="مثال: تمرين إطالة سريع"
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-right text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500/40 outline-none transition-all text-sm font-medium"
                                />
                            </div>

                            {/* Category + Points Row */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">الفئة *</label>
                                    <select
                                        value={form.category}
                                        onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-right text-slate-900 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500/40 outline-none transition-all text-sm font-medium appearance-none"
                                    >
                                        {CATEGORY_OPTIONS.map(c => (
                                            <option key={c.id} value={c.id}>{c.label}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">النقاط *</label>
                                    <input
                                        type="number"
                                        min={1}
                                        max={100}
                                        value={form.points}
                                        onChange={e => setForm(f => ({ ...f, points: parseInt(e.target.value) || 0 }))}
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-right text-slate-900 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500/40 outline-none transition-all text-sm font-medium"
                                    />
                                </div>
                            </div>

                            {/* Duration */}
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">المدة *</label>
                                <input
                                    type="text"
                                    value={form.duration}
                                    onChange={e => setForm(f => ({ ...f, duration: e.target.value }))}
                                    placeholder="مثال: ٥ دقائق"
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-right text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500/40 outline-none transition-all text-sm font-medium"
                                />
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">الوصف *</label>
                                <textarea
                                    value={form.description}
                                    onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                                    placeholder="اكتب وصفاً مختصراً للنشاط..."
                                    rows={3}
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-right text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500/40 outline-none transition-all text-sm font-medium resize-none"
                                />
                            </div>

                            {/* Actions */}
                            <div className="flex gap-3 pt-2">
                                <Button
                                    type="submit"
                                    className="flex-1 h-12 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl shadow-[0_4px_14px_0_rgba(249,115,22,0.3)] transition-all active:scale-[0.98]"
                                >
                                    {mode === 'create' ? (
                                        <span className="flex items-center gap-2"><Plus className="w-4 h-4" /> إضافة النشاط</span>
                                    ) : (
                                        <span className="flex items-center gap-2"><Edit2 className="w-4 h-4" /> حفظ التعديلات</span>
                                    )}
                                </Button>
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={onClose}
                                    className="h-12 px-6 border-slate-200 text-slate-600 font-bold rounded-xl hover:bg-slate-50 transition-all"
                                >
                                    إلغاء
                                </Button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    )
}

// ─── Delete Confirm Dialog ──────────────────────────────────────────
interface DeleteConfirmProps {
    isOpen: boolean
    activityTitle: string
    onConfirm: () => void
    onCancel: () => void
}

const DeleteConfirmDialog: React.FC<DeleteConfirmProps> = ({ isOpen, activityTitle, onConfirm, onCancel }) => (
    <AnimatePresence>
        {isOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onCancel}
                    className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                />
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="relative bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl border border-slate-200/50 text-right z-10 font-sans"
                >
                    <h3 className="text-lg font-black text-slate-900 mb-2">حذف النشاط؟</h3>
                    <p className="text-sm text-slate-500 mb-6">
                        هل أنت متأكد من حذف <span className="font-bold text-slate-700">"{activityTitle}"</span>؟ لا يمكن التراجع عن هذا الإجراء.
                    </p>
                    <div className="flex gap-3">
                        <Button
                            onClick={onConfirm}
                            className="flex-1 h-11 bg-red-500 hover:bg-red-600 text-white font-bold rounded-xl transition-all"
                        >
                            نعم، احذف
                        </Button>
                        <Button
                            variant="outline"
                            onClick={onCancel}
                            className="flex-1 h-11 border-slate-200 text-slate-600 font-bold rounded-xl hover:bg-slate-50 transition-all"
                        >
                            إلغاء
                        </Button>
                    </div>
                </motion.div>
            </div>
        )}
    </AnimatePresence>
)

// ─── Main Component ──────────────────────────────────────────
export const ActivityManager: React.FC = () => {
    const activities = useMicroMoveStore(state => state.activities)
    const addActivity = useMicroMoveStore(state => state.addActivity)
    const removeActivity = useMicroMoveStore(state => state.removeActivity)
    const updateActivity = useMicroMoveStore(state => state.updateActivity)

    const [searchTerm, setSearchTerm] = useState('')
    const [activeTab, setActiveTab] = useState('all')
    const [isGenerating, setIsGenerating] = useState(false)

    // Modal states
    const [showCreateModal, setShowCreateModal] = useState(false)
    const [editingActivity, setEditingActivity] = useState<Activity | null>(null)
    const [deletingActivity, setDeletingActivity] = useState<Activity | null>(null)

    const filteredActivities = activities.filter(a => {
        const matchesSearch = a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            a.description.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesTab = activeTab === 'all' || a.category === activeTab
        return matchesSearch && matchesTab
    })

    // ── Create Activity ──
    const handleCreateActivity = (data: ActivityFormData) => {
        const newActivity: Activity = {
            id: `activity-${Date.now()}`,
            title: data.title,
            category: data.category,
            points: data.points,
            duration: data.duration,
            description: data.description,
            icon: data.category === 'mindfulness' ? 'Sparkles' : data.category === 'social' ? 'Coffee' : data.category === 'hydration' ? 'Droplet' : 'Activity',
        }
        addActivity(newActivity)
        setShowCreateModal(false)
        fireConfetti({ particleCount: 80, spread: 60, origin: { y: 0.6 }, colors: ['#F97316', '#14B8A6', '#3B82F6'] })
        toast.success(`تمت إضافة "${data.title}" بنجاح!`, { icon: '🎉' })
    }

    // ── Edit Activity ──
    const handleEditActivity = (data: ActivityFormData) => {
        if (!editingActivity) return
        updateActivity(editingActivity.id, {
            title: data.title,
            category: data.category,
            points: data.points,
            duration: data.duration,
            description: data.description,
        })
        setEditingActivity(null)
        toast.success('تم تحديث النشاط بنجاح', { icon: '✅' })
    }

    // ── Delete Activity ──
    const handleDeleteActivity = () => {
        if (!deletingActivity) return
        removeActivity(deletingActivity.id)
        toast.success(`تم حذف "${deletingActivity.title}"`, { icon: '🗑️' })
        setDeletingActivity(null)
    }

    // ── AI Generate ──
    const handleAIGenerate = () => {
        setIsGenerating(true)

        // Simulate AI processing time
        setTimeout(() => {
            // Pick 2 random templates that aren't already in activities
            const existingTitles = new Set(activities.map(a => a.title))
            const available = AI_ACTIVITY_TEMPLATES.filter(t => !existingTitles.has(t.title))

            if (available.length === 0) {
                setIsGenerating(false)
                toast.info('جميع الأنشطة المقترحة موجودة بالفعل. جرّب إضافة نشاط يدوياً.', { icon: '💡' })
                return
            }

            // Pick up to 2 random activities
            const shuffled = [...available].sort(() => 0.5 - Math.random())
            const toAdd = shuffled.slice(0, Math.min(2, shuffled.length))

            toAdd.forEach(template => {
                addActivity({
                    ...template,
                    id: `ai-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
                })
            })

            setIsGenerating(false)
            fireConfetti({ particleCount: 120, spread: 80, origin: { y: 0.6 }, colors: ['#F97316', '#14B8A6', '#8B5CF6'] })
            toast.success(`تم توليد ${toAdd.length} ${toAdd.length === 1 ? 'نشاط ذكي' : 'أنشطة ذكية'} بالذكاء الاصطناعي!`, {
                icon: '✨',
                description: toAdd.map(a => a.title).join('، '),
            })
        }, 2000)
    }

    return (
        <div className="space-y-6 font-sans">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-[#111827] tracking-tight">مكتبة الحركات الصغيرة</h1>
                    <p className="text-[#6B7280] mt-1 text-sm leading-relaxed">تعديل وإضافة وتوليد أنشطة للشركة باستخدام الذكاء الاصطناعي.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button
                        variant="outline"
                        onClick={handleAIGenerate}
                        disabled={isGenerating}
                        className="relative overflow-hidden border-primary/20 text-primary hover:text-primary font-semibold shadow-soft transition-all duration-200"
                        style={{
                            background: `
                                radial-gradient(ellipse at 20% 50%, rgba(249,115,22,0.10) 0%, transparent 50%),
                                radial-gradient(ellipse at 80% 20%, rgba(251,191,36,0.12) 0%, transparent 50%),
                                radial-gradient(ellipse at 60% 80%, rgba(249,115,22,0.08) 0%, transparent 50%),
                                linear-gradient(135deg, rgba(255,247,237,0.9) 0%, rgba(255,255,255,0.95) 50%, rgba(255,247,237,0.8) 100%)
                            `.trim(),
                        }}
                    >
                        {isGenerating ? (
                            <span className="flex items-center gap-2"><div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" /> جاري التوليد...</span>
                        ) : (
                            <span className="flex items-center gap-2"><Sparkles className="w-4 h-4" strokeWidth={1.5} /> توليد بالذكاء الاصطناعي</span>
                        )}
                    </Button>
                    <Button
                        onClick={() => setShowCreateModal(true)}
                        className="bg-[#111827] text-white hover:bg-[#1F2937] font-semibold shadow-soft transition-all duration-200"
                    >
                        <Plus className="w-4 h-4 mr-2" strokeWidth={1.5} /> نشاط جديد
                    </Button>
                </div>
            </div>

            <div className="space-y-4">
                <div className="flex flex-col sm:flex-row justify-between gap-4">
                    <div className="flex bg-white p-1 rounded-xl shadow-soft border border-[#E5E7EB] overflow-x-auto no-scrollbar">
                        {categories.map(cat => (
                            <button
                                key={cat.id}
                                onClick={() => setActiveTab(cat.id)}
                                className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200 whitespace-nowrap ${activeTab === cat.id ? 'bg-[#111827] text-white shadow-soft' : 'text-[#6B7280] hover:text-[#111827] hover:bg-[#F9FAFB]'}`}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </div>
                    <div className="relative group">
                        <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF] group-focus-within:text-primary transition-colors" strokeWidth={1.5} />
                        <input
                            type="text"
                            placeholder="ابحث في الأنشطة..."
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                            className="pl-4 pr-10 py-2.5 w-full sm:w-64 bg-white border border-[#E5E7EB] rounded-xl focus:ring-2 focus:ring-primary/10 focus:border-primary/40 focus:shadow-inner-soft outline-none transition-all duration-200 text-sm font-medium text-right text-[#111827] placeholder-[#9CA3AF]"
                        />
                    </div>
                </div>
                <div className="bg-white border border-[#E5E7EB] rounded-2xl overflow-hidden shadow-soft">
                    <div className="overflow-x-auto">
                        <table className="w-full text-right">
                            <thead>
                                <tr className="bg-[#F9FAFB] border-b border-[#E5E7EB]">
                                    <th className="px-6 py-4 text-[11px] font-semibold text-[#6B7280] uppercase tracking-wider text-right">عنوان النشاط</th>
                                    <th className="px-6 py-4 text-[11px] font-semibold text-[#6B7280] uppercase tracking-wider text-right">الفئة</th>
                                    <th className="px-6 py-4 text-[11px] font-semibold text-[#6B7280] uppercase tracking-wider text-right">المدة / النقاط</th>
                                    <th className="px-6 py-4 text-[11px] font-semibold text-[#6B7280] uppercase tracking-wider text-right">إشارة الذكاء الاصطناعي</th>
                                    <th className="px-6 py-4 text-[11px] font-semibold text-[#6B7280] uppercase tracking-wider text-right">الحالة</th>
                                    <th className="px-6 py-4 text-[11px] font-semibold text-[#6B7280] uppercase tracking-wider"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#F3F4F6]">
                                <AnimatePresence>
                                    {filteredActivities.map((activity, idx) => (
                                        <motion.tr
                                            key={activity.id}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            transition={{ delay: idx * 0.05 }}
                                            className="hover:bg-[#F9FAFB] transition-colors duration-200 group"
                                        >
                                            <td className="px-6 py-4 w-1/3">
                                                <p className="font-semibold text-[#111827]">{activity.title}</p>
                                                <p className="text-sm text-[#6B7280] mt-1 line-clamp-1 leading-relaxed">{activity.description}</p>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2.5 py-1 text-xs font-semibold rounded-lg border ${activity.category === 'physical' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                                                    activity.category === 'mindfulness' ? 'bg-rose-50 text-rose-700 border-rose-200' :
                                                        activity.category === 'social' ? 'bg-violet-50 text-violet-700 border-violet-200' :
                                                            'bg-blue-50 text-blue-700 border-blue-200'
                                                    }`}>
                                                    {categories.find(c => c.id === activity.category)?.label || activity.category}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-semibold text-[#111827]">{activity.duration}</span>
                                                    <span className="text-xs font-semibold text-amber-500 mt-0.5">{activity.points} نقطة</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {activity.aiBadge ? (
                                                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary bg-primary/5 px-2.5 py-1 rounded-lg border border-primary/10">
                                                        <Sparkles className="w-3 h-3" strokeWidth={1.5} /> {activity.aiBadge}
                                                    </span>
                                                ) : (
                                                    <span className="text-[#D1D5DB] text-sm">-</span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-2 h-2 rounded-full bg-emerald-400" />
                                                    <span className="text-sm font-medium text-[#374151]">نشط</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-left">
                                                <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                                    <button
                                                        onClick={() => setEditingActivity(activity)}
                                                        className="p-2 text-[#9CA3AF] hover:text-primary hover:bg-primary/5 rounded-lg transition-all duration-200"
                                                        title="تعديل"
                                                    >
                                                        <Edit2 className="w-4 h-4" strokeWidth={1.5} />
                                                    </button>
                                                    <button
                                                        onClick={() => setDeletingActivity(activity)}
                                                        className="p-2 text-[#9CA3AF] hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200"
                                                        title="حذف"
                                                    >
                                                        <Trash2 className="w-4 h-4" strokeWidth={1.5} />
                                                    </button>
                                                    <button className="p-2 text-[#9CA3AF] hover:text-[#111827] hover:bg-[#F3F4F6] rounded-lg transition-all duration-200">
                                                        <MoreVertical className="w-4 h-4" strokeWidth={1.5} />
                                                    </button>
                                                </div>
                                            </td>
                                        </motion.tr>
                                    ))}
                                </AnimatePresence>
                            </tbody>
                        </table>
                        {filteredActivities.length === 0 && (
                            <div className="p-16 text-center">
                                <PackageOpen className="w-12 h-12 text-[#D1D5DB] mx-auto mb-4" strokeWidth={1.5} />
                                <p className="text-[#6B7280] font-medium">لا توجد أنشطة تطابق بحثك.</p>
                                <p className="text-sm text-[#9CA3AF] mt-1">جرّب تغيير الفلتر أو استخدم التوليد بالذكاء الاصطناعي</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* ── Create Modal ── */}
            <ActivityModal
                isOpen={showCreateModal}
                onClose={() => setShowCreateModal(false)}
                onSubmit={handleCreateActivity}
                mode="create"
            />

            {/* ── Edit Modal ── */}
            <ActivityModal
                isOpen={!!editingActivity}
                onClose={() => setEditingActivity(null)}
                onSubmit={handleEditActivity}
                initialData={editingActivity ? {
                    title: editingActivity.title,
                    category: editingActivity.category,
                    points: editingActivity.points,
                    duration: editingActivity.duration,
                    description: editingActivity.description,
                } : undefined}
                mode="edit"
            />

            {/* ── Delete Confirm ── */}
            <DeleteConfirmDialog
                isOpen={!!deletingActivity}
                activityTitle={deletingActivity?.title || ''}
                onConfirm={handleDeleteActivity}
                onCancel={() => setDeletingActivity(null)}
            />
        </div>
    )
}
