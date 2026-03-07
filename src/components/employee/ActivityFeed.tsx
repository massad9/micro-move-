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
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-12">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight text-foreground leading-none">واصل الحركة</h2>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-2">أنشطة مصممة ليومك</p>
                </div>

                <div className="flex p-1 bg-secondary/50 border border-border/40 rounded-xl overflow-x-auto no-scrollbar">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setFilter(tab.id)}
                            className={`px-4 py-2 text-[11px] font-bold rounded-lg whitespace-nowrap transition-all uppercase tracking-widest ${filter === tab.id
                                ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/10'
                                : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <AnimatePresence mode="popLayout">
                    {activeTasks.map((activity) => (
                        <ActivityCard key={activity.id} activity={activity} />
                    ))}
                    {doneTasks.map((activity) => (
                        <ActivityCard key={activity.id} activity={activity} />
                    ))}
                </AnimatePresence>

                {filteredActivities.length === 0 && (
                    <div className="col-span-full py-20 text-center linear-card border-dashed">
                        <p className="text-muted-foreground font-medium uppercase tracking-widest text-[10px]">لا توجد أنشطة في هذا التصنيف حالياً.</p>
                    </div>
                )}
            </div>
        </div>
    )
}
