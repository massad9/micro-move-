import React from 'react'
import { Home, ListChecks, Trophy, Gift } from 'lucide-react'
import { motion } from 'framer-motion'

interface BottomNavProps {
    activeTab: string
    setActiveTab: (tab: string) => void
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, setActiveTab }) => {
    const tabs = [
        { id: 'home', icon: Home, label: 'Home' },
        { id: 'activities', icon: ListChecks, label: 'Move' },
        { id: 'leaderboard', icon: Trophy, label: 'Rank' },
        { id: 'rewards', icon: Gift, label: 'Perks' },
    ]

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-t border-slate-100 px-6 py-3 flex justify-between items-center z-50">
            {tabs.map((tab) => {
                const Icon = tab.icon
                const isActive = activeTab === tab.id

                return (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className="flex flex-col items-center gap-1 relative"
                    >
                        <div className={`p-2 rounded-2xl transition-all ${isActive ? 'bg-primary text-white shadow-lg shadow-primary/20 scale-110' : 'text-slate-400'}`}>
                            <Icon className="w-6 h-6" />
                        </div>
                        <span className={`text-[10px] font-bold ${isActive ? 'text-primary' : 'text-slate-400'}`}>
                            {tab.label}
                        </span>
                        {isActive && (
                            <motion.div
                                layoutId="nav-dot"
                                className="absolute -top-1 w-1 h-1 bg-primary rounded-full"
                            />
                        )}
                    </button>
                )
            })}
        </div>
    )
}
