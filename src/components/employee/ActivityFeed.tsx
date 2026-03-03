import React, { useState } from 'react'
import { useMicroMoveStore } from '@/store/microMoveStore'
import { ActivityCard } from './ActivityCard'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { AnimatePresence } from 'framer-motion'
import { HeroBanner } from './HeroBanner'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const ActivityFeed: React.FC = () => {
    const activities = useMicroMoveStore(state => state.activities)
    const [filter, setFilter] = useState<'All' | 'physical' | 'social' | 'hydration' | 'mindfulness'>('All')

    const filteredActivities = activities.filter(a => filter === 'All' || a.category === filter)

    return (
        <div className="pb-10 max-w-5xl"> {/* Constrain width for main content vs sidebar */}
            <HeroBanner />

            {/* Filter & Title Header */}
            <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4 mt-12">
                <h3 className="text-2xl font-bold text-slate-900 tracking-tight">Continue Moving</h3>

                <div className="flex items-center gap-4">
                    <Tabs defaultValue="All" className="w-full md:w-auto" onValueChange={(val) => setFilter(val as 'All' | 'physical' | 'social' | 'hydration' | 'mindfulness')}>
                        <TabsList className="bg-transparent h-auto p-0 gap-3 text-transform: capitalize">
                            {['All', 'physical', 'social', 'hydration', 'mindfulness'].map(cat => (
                                <TabsTrigger
                                    key={cat}
                                    value={cat}
                                    className="rounded-full px-5 py-2.5 font-bold text-sm data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-600 data-[state=active]:shadow-none transition-all text-slate-500 bg-white border border-slate-200 shadow-sm hover:shadow-md hover:-translate-y-0.5"
                                >
                                    {cat}
                                </TabsTrigger>
                            ))}
                        </TabsList>
                    </Tabs>

                    <div className="hidden md:flex items-center gap-2">
                        <Button variant="outline" size="icon" className="rounded-full w-10 h-10 border-slate-200 text-slate-400 hover:text-indigo-600 hover:border-indigo-200">
                            <ChevronLeft className="w-5 h-5" />
                        </Button>
                        <Button variant="default" size="icon" className="rounded-full w-10 h-10 bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-600/20">
                            <ChevronRight className="w-5 h-5" />
                        </Button>
                    </div>
                </div>
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
