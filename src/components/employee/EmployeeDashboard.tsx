import React, { useState, useEffect } from 'react'
import { EmployeeLayout } from './EmployeeLayout'
import { Greeting } from './Greeting'
import { ActivityFeed } from './ActivityFeed'
import { Leaderboard } from './Leaderboard'
import { Rewards } from './Rewards'
import { BottomNav } from './BottomNav'
import { ContextNudgeModal } from './ContextNudgeModal'
import { toast } from 'sonner'

interface EmployeeDashboardProps {
    onLogout: () => void
}

export const EmployeeDashboard: React.FC<EmployeeDashboardProps> = ({ onLogout }) => {
    const [activeTab, setActiveTab] = useState('home')
    const [showNudge, setShowNudge] = useState(false)

    useEffect(() => {
        // Mock a context nudge after 6 seconds
        const timer = setTimeout(() => {
            setShowNudge(true)
        }, 6000)
        return () => clearTimeout(timer)
    }, [])

    const handleAcceptNudge = () => {
        setShowNudge(false)
        setActiveTab('activities')
        setTimeout(() => {
            toast.success('تمت إضافة الجلسة الذكية إلى أنشطتك بنجاح!', { icon: '🤖' })
        }, 500)
    }

    return (
        <EmployeeLayout activeTab={activeTab} setActiveTab={setActiveTab} onLogout={onLogout}>
            {activeTab === 'home' && (
                <div className="space-y-4">
                    <Greeting />
                    <ActivityFeed />
                </div>
            )}
            {activeTab === 'activities' && (
                <ActivityFeed />
            )}
            {activeTab === 'leaderboard' && (
                <Leaderboard />
            )}
            {activeTab === 'rewards' && (
                <Rewards />
            )}
            
            {/* Fixed Navigation for Mobile */}
            <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
            
            {/* Modal */}
            <ContextNudgeModal 
                isOpen={showNudge} 
                onClose={() => setShowNudge(false)} 
                onAccept={handleAcceptNudge} 
            />
        </EmployeeLayout>
    )
}
