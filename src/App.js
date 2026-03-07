import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React, { useEffect, useState } from 'react';
import { Toaster } from 'sonner';
import { WelcomePage } from '@/components/auth/WelcomePage';
import { LoginForm } from '@/components/auth/LoginForm';
import { HrOnboarding } from '@/components/auth/HrOnboarding';
import { WorkspaceSetup } from '@/components/auth/WorkspaceSetup';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { StatCards } from '@/components/admin/StatCards';
import { AnalyticsChart } from '@/components/admin/AnalyticsChart';
import { ActivityManager } from '@/components/admin/ActivityManager';
import { EmployeeList } from '@/components/admin/EmployeeList';
import { RewardsManager } from '@/components/admin/RewardsManager';
import { AdminSettings } from '@/components/admin/AdminSettings';
import { EmployeeDashboard } from '@/components/employee/EmployeeDashboard';
import { AdminOverviewSkeleton } from '@/components/skeletons/DashboardSkeletons';
import { useMicroMoveStore } from '@/store/microMoveStore';
function App() {
    const user = useMicroMoveStore(state => state.user);
    const setUser = useMicroMoveStore(state => state.setUser);
    useEffect(() => {
        // Determine initial route base on URL hash (super simple routing for demo)
        const hash = window.location.hash;
        if (hash === '#/employee' && !user) {
            setUser({
                id: '123',
                name: 'Alex Employee',
                email: 'alex@company.com',
                role: 'employee',
                points: 840,
                department: 'Engineering',
                completedToday: 2,
                dailyGoal: 5
            });
        }
        else if (hash === '#/admin' && !user) {
            setUser({
                id: '456',
                name: 'Sarah Admin',
                email: 'sarah@company.com',
                role: 'admin',
                points: 0,
                department: 'HR',
                completedToday: 0,
                dailyGoal: 0
            });
        }
    }, [setUser, user]);
    // Simple Router State
    const [currentRoute, setCurrentRoute] = React.useState('welcome');
    const [activeAdminTab, setActiveAdminTab] = React.useState('overview'); // Admin current tab
    // Handle auto-routing when user state changes
    useEffect(() => {
        if (user) {
            setCurrentRoute('dashboard');
        }
    }, [user]);
    const [selectedRole, setSelectedRole] = React.useState('employee');
    const [adminLoading, setAdminLoading] = useState(true);
    useEffect(() => {
        if (user && (user.role === 'admin' || user.role === 'hr')) {
            setAdminLoading(true);
            const timer = setTimeout(() => {
                setAdminLoading(false);
            }, 1200);
            return () => clearTimeout(timer);
        }
    }, [user]);
    // Custom Navigation Handlers
    const handleSelectRole = (role) => {
        setSelectedRole(role);
        setCurrentRoute('login');
    };
    const handleLogin = () => {
        // We pass handling down to components, but here is a global state catch if needed
    };
    const handleOnboardingComplete = () => {
        // Fake delay
        setTimeout(() => {
            setUser({
                id: '456',
                name: 'سارة الفهد',
                email: 'sara@company.com',
                role: 'admin',
                points: 0,
                department: 'الموارد البشرية',
                completedToday: 0,
                dailyGoal: 0
            });
        }, 1000);
    };
    const handleLogout = () => {
        setUser(null);
        setCurrentRoute('welcome');
        window.location.hash = '';
    };
    return (_jsxs("div", { className: "min-h-screen bg-white text-slate-900 font-sans selection:bg-primary/20", dir: "rtl", children: [_jsx(Toaster, { position: "bottom-left", toastOptions: { className: 'font-sans' }, closeButton: true }), currentRoute === 'welcome' && (_jsx(WelcomePage, { onSelectRole: handleSelectRole, onSetupWorkspace: () => setCurrentRoute('workspace-setup') })), currentRoute === 'login' && (_jsx(LoginForm, { role: selectedRole, onLogin: handleLogin, onBack: () => setCurrentRoute('welcome') })), currentRoute === 'workspace-setup' && (_jsx(WorkspaceSetup, { onComplete: () => setCurrentRoute('dashboard'), onBack: () => setCurrentRoute('welcome') })), currentRoute === 'onboarding' && (_jsx(HrOnboarding, { onComplete: handleOnboardingComplete })), currentRoute === 'dashboard' && user && (_jsx(_Fragment, { children: user.role === 'admin' || user.role === 'hr' ? (_jsxs(AdminLayout, { activeAdminTab: activeAdminTab, setActiveAdminTab: setActiveAdminTab, onLogout: handleLogout, children: [activeAdminTab === 'overview' && (adminLoading ? (_jsx(AdminOverviewSkeleton, {})) : (_jsxs("div", { className: "space-y-6 animate-fade-in-up", children: [_jsxs("div", { children: [_jsx("h2", { className: "text-2xl font-bold text-[#111827] tracking-tight", children: "\u0646\u0638\u0631\u0629 \u0639\u0627\u0645\u0629 \u0639\u0644\u0649 \u0627\u0644\u0645\u0646\u0638\u0645\u0629" }), _jsx("p", { className: "text-[#6B7280] mt-1 text-sm leading-relaxed", children: "\u0642\u064A\u0627\u0633 \u0646\u0628\u0636 \u0627\u0644\u0645\u0646\u0638\u0645\u0629 \u0648\u0625\u0631\u0647\u0627\u0642 \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646 \u0627\u0644\u0644\u062D\u0638\u064A." })] }), _jsx(StatCards, {}), _jsx(AnalyticsChart, {})] }))), activeAdminTab === 'activities' && (_jsx("div", { className: "animate-fade-in-up", children: _jsx(ActivityManager, {}) })), activeAdminTab === 'employees' && (_jsx("div", { className: "animate-fade-in-up h-[calc(100vh-8rem)]", children: _jsx(EmployeeList, {}) })), activeAdminTab === 'rewards' && (_jsx("div", { className: "animate-fade-in-up", children: _jsx(RewardsManager, {}) })), activeAdminTab === 'settings' && (_jsx("div", { className: "animate-fade-in-up h-[calc(100vh-8rem)]", children: _jsx(AdminSettings, {}) }))] })) : (_jsx(EmployeeDashboard, { onLogout: handleLogout })) })), !user && currentRoute === 'dashboard' && (_jsx("div", { className: "h-screen flex items-center justify-center bg-white", children: _jsx("div", { className: "w-8 h-8 rounded-full border-4 border-slate-200 border-t-primary animate-spin" }) }))] }));
}
export default App;
