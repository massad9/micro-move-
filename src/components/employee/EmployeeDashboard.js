import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React, { useState, useEffect } from 'react';
import { EmployeeLayout } from './EmployeeLayout';
import { Greeting } from './Greeting';
import { ActivityFeed } from './ActivityFeed';
import { Leaderboard } from './Leaderboard';
import { Rewards } from './Rewards';
import { ContextNudgeModal } from './ContextNudgeModal';
import { EmployeeDashboardSkeleton } from '@/components/skeletons/DashboardSkeletons';
import { toast } from 'sonner';
export const EmployeeDashboard = ({ onLogout }) => {
    const [currentView, setCurrentView] = useState('home');
    const [showNudge, setShowNudge] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1200);
        return () => clearTimeout(timer);
    }, []);
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowNudge(true);
        }, 6000);
        return () => clearTimeout(timer);
    }, []);
    const handleAcceptNudge = () => {
        setShowNudge(false);
        setTimeout(() => {
            toast.success('تمت إضافة الجلسة الذكية إلى أنشطتك بنجاح!', { icon: '🤖' });
        }, 500);
    };
    return (_jsxs(EmployeeLayout, { onLogout: onLogout, currentView: currentView, onNavigate: setCurrentView, children: [isLoading ? (_jsx(EmployeeDashboardSkeleton, {})) : (_jsxs(_Fragment, { children: [currentView === 'home' && (_jsxs("div", { className: "space-y-10", children: [_jsx(Greeting, { onNavigateStore: () => setCurrentView('store') }), _jsx(ActivityFeed, {}), _jsx(Leaderboard, {})] })), currentView === 'store' && (_jsx(Rewards, {}))] })), _jsx(ContextNudgeModal, { isOpen: showNudge, onClose: () => setShowNudge(false), onAccept: handleAcceptNudge })] }));
};
