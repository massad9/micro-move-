import React, { useState, useEffect } from 'react'
import { EmployeeLayout } from './EmployeeLayout'
import { Greeting } from './Greeting'
import { ActivityFeed } from './ActivityFeed'
import { Leaderboard } from './Leaderboard'
import { Rewards } from './Rewards'
import { ContextNudgeModal } from './ContextNudgeModal'
import { toast } from 'sonner'

interface EmployeeDashboardProps {
    onLogout: () => void
}

export const EmployeeDashboard: React.FC<EmployeeDashboardProps> = ({ onLogout }) => {
    const [currentView, setCurrentView] = useState<'home' | 'store'>('home')
    const [showNudge, setShowNudge] = useState(false)

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowNudge(true)
        }, 6000)
        return () => clearTimeout(timer)
    }, [])

    const handleAcceptNudge = () => {
        setShowNudge(false)
        setTimeout(() => {
            toast.success('تمت إضافة الجلسة الذكية إلى أنشطتك بنجاح!', { 
                icon: '🤖',
                className: 'linear-glass border-primary/20 text-foreground'
            })
        }, 500)
    }

    return (
        <EmployeeLayout onLogout={onLogout} currentView={currentView} onNavigate={setCurrentView}>
            <div className="max-w-4xl mx-auto px-6 py-12 animate-fade-up">
                {currentView === 'home' && (
                    <div className="space-y-16">
                        <Greeting onNavigateStore={() => setCurrentView('store')} />
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                            <div className="lg:col-span-8 space-y-12">
                                <ActivityFeed />
                            </div>
                            <div className="lg:col-span-4 space-y-12">
                                <Leaderboard />
                            </div>
                        </div>
                    </div>
                )}
                {currentView === 'store' && (
                    <Rewards />
                )}
            </div>

            <ContextNudgeModal 
                isOpen={showNudge} 
                onClose={() => setShowNudge(false)} 
                onAccept={handleAcceptNudge} 
            />
            
            {/* Ambient Background Glow for Employee Hub */}
            <div className="fixed top-0 left-0 w-full h-screen pointer-events-none -z-10 bg-[radial-gradient(circle_at_50%_0%,rgba(25,100,250,0.03)_0%,transparent_50%)]" />
        </EmployeeLayout>
    )
}
