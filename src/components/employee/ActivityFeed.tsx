import React, { useState } from 'react'
import { ActivityCard } from './ActivityCard'
import { useMicroMoveStore } from '@/store/microMoveStore'
import { AnimatePresence } from 'framer-motion'
import { HeroBanner } from './HeroBanner'

// Hoisted outside component to avoid recreating on every render
const TABS = [
    { id: 'all', label: 'الكل' },
    { id: 'physical', label: 'بدني' },
    { id: 'mindfulness', label: 'تأمل' },
    { id: 'social', label: 'اجتماعي' },
    { id: 'hydration', label: 'ترطيب' }
] as const

export const ActivityFeed: React.FC = () => {
    const activities = useMicroMoveStore(state => state.activities)
    const [filter, setFilter] = useState<string>('all')

    const filteredActivities = activities.filter(a => filter === 'all' || a.category === filter)
    // Single pass to split into active/done (combined array iterations optimization)
    const [activeTasks, doneTasks] = filteredActivities.reduce<[typeof filteredActivities, typeof filteredActivities]>(
        ([active, done], a) => a.isDone ? [active, [...done, a]] : [[...active, a], done],
        [[], []]
    )

    return (
        <div className="pb-20 font-sans">
            <HeroBanner />

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 mt-16">
                <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-slate-900 leading-none">
                    واصل الحركة
                </h2>

                <div className="flex p-1 bg-white border border-slate-200 rounded-2xl shadow-sm overflow-x-auto no-scrollbar">
                {TABS.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setFilter(tab.id)}
                            className={`px-5 py-2.5 text-sm font-bold rounded-xl whitespace-nowrap transition-all ${filter === tab.id
                                ? 'bg-slate-900 text-white shadow-md'
                                : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 auto-rows-[minmax(280px,auto)]">
                <AnimatePresence mode="popLayout">
                    {activeTasks.map((activity) => (
                        <ActivityCard key={activity.id} activity={activity} />
                    ))}
                    {doneTasks.map((activity) => (
                        <ActivityCard key={activity.id} activity={activity} />
                    ))}
                </AnimatePresence>

                {filteredActivities.length === 0 && (
                    <div className="col-span-full py-16 text-center bg-white border border-dashed border-slate-300 rounded-[2rem]">
                        <p className="text-slate-500 font-medium">لا توجد أنشطة في هذا التصنيف حالياً.</p>
                    </div>
                )}
            </div>
        </div>
    )
}
