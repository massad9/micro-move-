import React, { useState } from 'react'
import { ActivityCard } from './ActivityCard'
import { useMicroMoveStore } from '@/store/microMoveStore'
import { AnimatePresence } from 'framer-motion'
import { HeroBanner } from './HeroBanner'

export const ActivityFeed: React.FC = () => {
    const activities = useMicroMoveStore(state => state.activities)
    const [filter, setFilter] = useState<string>('all')

    const tabs = [
        { id: 'all', label: 'الكل' },
        { id: 'physical', label: 'بدني' },
        { id: 'mindfulness', label: 'تأمل' },
        { id: 'social', label: 'اجتماعي' },
        { id: 'hydration', label: 'ترطيب' }
    ]

    const filteredActivities = activities.filter(a => filter === 'all' || a.category === filter)
    const activeTasks = filteredActivities.filter(a => !a.isDone)
    const doneTasks = filteredActivities.filter(a => a.isDone)

    return (
        <div className="pb-20 font-sans">
            <HeroBanner />

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8 mt-12">
                <h2 className="text-2xl font-black tracking-tight text-slate-900 leading-none">واصل الحركة</h2>

                <div className="flex p-1 bg-white border border-slate-200 rounded-2xl shadow-sm overflow-x-auto no-scrollbar">
                    {tabs.map((tab) => (
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

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
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
