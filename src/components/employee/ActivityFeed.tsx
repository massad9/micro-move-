import React, { useState } from 'react'
import { useStore } from '@/store/useStore'
import { ActivityCard } from './ActivityCard'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { AnimatePresence } from 'framer-motion'
import { Zap } from 'lucide-react'

export const ActivityFeed: React.FC = () => {
    const { activities } = useStore()
    const [filter, setFilter] = useState<'All' | 'Stretch' | 'Social' | 'Hydration' | 'Mindfulness'>('All')

    const filteredActivities = activities.filter(a => filter === 'All' || a.category === filter)

    return (
        <div className="pb-10">
            <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                        <Zap className="w-6 h-6" fill="currentColor" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-slate-900 tracking-tight">Move Categories</h3>
                        <p className="text-sm text-slate-500 font-medium mt-0.5">Filter by focus area</p>
                    </div>
                </div>

                <Tabs defaultValue="All" className="w-full md:w-auto" onValueChange={(val) => setFilter(val as 'All' | 'Stretch' | 'Social' | 'Hydration' | 'Mindfulness')}>
                    <TabsList className="bg-slate-100 p-1 flex flex-wrap h-auto gap-1 rounded-xl">
                        {['All', 'Stretch', 'Social', 'Hydration', 'Mindfulness'].map(cat => (
                            <TabsTrigger
                                key={cat}
                                value={cat}
                                className="rounded-lg px-4 py-2 font-medium text-sm data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm transition-all text-slate-600"
                            >
                                {cat}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                </Tabs>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence mode="popLayout">
                    {filteredActivities.map((activity) => (
                        <ActivityCard key={activity.id} activity={activity} />
                    ))}
                </AnimatePresence>
            </div>
        </div>
    )
}
