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
            toast.success('تمت إضافة الجلسة الذكية إلى أنشطتك بنجاح!', { icon: '🤖' })
        }, 500)
    }

    return (
        <EmployeeLayout onLogout={onLogout} currentView={currentView} onNavigate={setCurrentView}>
            {currentView === 'home' && (
                <div className="space-y-10">
                    <Greeting onNavigateStore={() => setCurrentView('store')} />
                    <ActivityFeed />
                    <Leaderboard />
                </div>
            )}
            {currentView === 'store' && (
                <Rewards />
            )}

            <ContextNudgeModal 
                isOpen={showNudge} 
                onClose={() => setShowNudge(false)} 
                onAccept={handleAcceptNudge} 
            />
        </EmployeeLayout>
    )
}
