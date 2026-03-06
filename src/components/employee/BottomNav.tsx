import React from 'react'
import { Home, Zap, Trophy, Gift } from 'lucide-react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface BottomNavProps {
    activeTab: string
    setActiveTab: (tab: string) => void
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, setActiveTab }) => {
    const navItems = [
        { id: 'dashboard', icon: Home, label: 'الرئيسية' },
        { id: 'moves', icon: Zap, label: 'حركة' },
        { id: 'leaderboard', icon: Trophy, label: 'الترتيب' },
        { id: 'rewards', icon: Gift, label: 'المكافآت' },
    ]

    return (
        <div className="md:hidden fixed bottom-6 left-4 right-4 z-40 font-sans">
            <div className="bg-white/90 backdrop-blur-xl border border-slate-200/50 rounded-3xl p-2 shadow-[0_8px_30px_rgba(0,0,0,0.08)] flex justify-between items-center relative overflow-hidden">
                {/* Active Indicator Background */}
                <div className="absolute inset-y-2 w-[22%] bg-primary/10 rounded-2xl transition-all duration-300 ease-out"
                    style={{
                        right: `${navItems.findIndex(i => i.id === activeTab) * 25 + 1.5}%`
                    }}
                />

                {navItems.map((item) => {
                    const Icon = item.icon
                    const isActive = activeTab === item.id
                    return (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className="flex-1 flex flex-col items-center justify-center py-2 relative z-10 group"
                        >
                            <motion.div
                                animate={{ scale: isActive ? 1.1 : 1, y: isActive ? -2 : 0 }}
                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                className={cn(
                                    "p-1.5 rounded-xl transition-colors duration-300",
                                    isActive ? "text-primary" : "text-slate-400 group-hover:text-slate-600"
                                )}
                            >
                                <Icon className={cn("w-5 h-5", isActive && "fill-primary/20")} />
                            </motion.div>
                            <motion.span
                                animate={{ opacity: isActive ? 1 : 0.7, y: isActive ? 0 : 2 }}
                                className={cn(
                                    "text-[10px] font-bold mt-1 tracking-wide transition-colors duration-300",
                                    isActive ? "text-primary" : "text-slate-500"
                                )}
                            >
                                {item.label}
                            </motion.span>
                        </button>
                    )
                })}
            </div>
        </div>
    )
}
