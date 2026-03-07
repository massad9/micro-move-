import React, { useEffect } from 'react'
import { Toaster } from 'sonner'
import { WelcomePage } from '@/components/auth/WelcomePage'
import { LoginForm } from '@/components/auth/LoginForm'
import { HrOnboarding } from '@/components/auth/HrOnboarding'
import { WorkspaceSetup } from '@/components/auth/WorkspaceSetup'
import { AdminLayout } from '@/components/admin/AdminLayout'
import { StatCards } from '@/components/admin/StatCards'
import { AnalyticsChart } from '@/components/admin/AnalyticsChart'
import { ActivityManager } from '@/components/admin/ActivityManager'
import { EmployeeList } from '@/components/admin/EmployeeList'
import { RewardsManager } from '@/components/admin/RewardsManager'
import { AdminSettings } from '@/components/admin/AdminSettings'
import { EmployeeDashboard } from '@/components/employee/EmployeeDashboard'
import { useMicroMoveStore } from '@/store/microMoveStore'

function App() {
  const user = useMicroMoveStore(state => state.user)
  const setUser = useMicroMoveStore(state => state.setUser)

  useEffect(() => {
    // Determine initial route base on URL hash (super simple routing for demo)
    const hash = window.location.hash
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
      })
    } else if (hash === '#/admin' && !user) {
      setUser({
        id: '456',
        name: 'Sarah Admin',
        email: 'sarah@company.com',
        role: 'admin',
        points: 0,
        department: 'HR',
        completedToday: 0,
        dailyGoal: 0
      })
    }
  }, [setUser, user])

  // Simple Router State
  const [currentRoute, setCurrentRoute] = React.useState<'welcome' | 'login' | 'onboarding' | 'workspace-setup' | 'dashboard'>('welcome')
  const [activeAdminTab, setActiveAdminTab] = React.useState('overview') // Admin current tab

  // Handle auto-routing when user state changes
  useEffect(() => {
    if (user) {
      setCurrentRoute('dashboard')
    }
  }, [user])

  const [selectedRole, setSelectedRole] = React.useState<'employee' | 'admin'>('employee')

  // Custom Navigation Handlers
  const handleSelectRole = (role: 'employee' | 'admin') => {
    setSelectedRole(role)
    setCurrentRoute('login')
  }

  const handleLogin = () => {
    // We pass handling down to components, but here is a global state catch if needed
  }

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
      })
    }, 1000)
  }

  const handleLogout = () => {
    setUser(null)
    setCurrentRoute('welcome')
    window.location.hash = ''
  }


  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/20" dir="rtl">
      {/* Toast Notifications Provider - Adjusted for RTL */}
      <Toaster position="bottom-left" toastOptions={{ className: 'font-sans' }} closeButton />

      {currentRoute === 'welcome' && (
        <WelcomePage onSelectRole={handleSelectRole} onSetupWorkspace={() => setCurrentRoute('workspace-setup')} />
      )}

      {currentRoute === 'login' && (
        <LoginForm role={selectedRole} onLogin={handleLogin} onBack={() => setCurrentRoute('welcome')} />
      )}

      {currentRoute === 'workspace-setup' && (
        <WorkspaceSetup
          onComplete={() => setCurrentRoute('dashboard')}
          onBack={() => setCurrentRoute('welcome')}
        />
      )}

      {currentRoute === 'onboarding' && (
        <HrOnboarding onComplete={handleOnboardingComplete} />
      )}

      {currentRoute === 'dashboard' && user && (
        <>
          {user.role === 'admin' || user.role === 'hr' ? (
            <AdminLayout activeAdminTab={activeAdminTab} setActiveAdminTab={setActiveAdminTab} onLogout={handleLogout}>
              {activeAdminTab === 'overview' && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div>
                    <h2 className="text-2xl font-bold text-[#111827] tracking-tight">نظرة عامة على المنظمة</h2>
                    <p className="text-[#6B7280] mt-1 text-sm leading-relaxed">قياس نبض المنظمة وإرهاق الموظفين اللحظي.</p>
                  </div>
                  <StatCards />
                  <AnalyticsChart />
                </div>
              )}
              {activeAdminTab === 'activities' && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <ActivityManager />
                </div>
              )}
              {activeAdminTab === 'employees' && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 h-[calc(100vh-8rem)]">
                  <EmployeeList />
                </div>
              )}
              {activeAdminTab === 'rewards' && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <RewardsManager />
                </div>
              )}
               {activeAdminTab === 'settings' && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 h-[calc(100vh-8rem)]">
                  <AdminSettings />
                </div>
              )}
            </AdminLayout>
          ) : (
            <EmployeeDashboard onLogout={handleLogout} />
          )}
        </>
      )}

      {!user && currentRoute === 'dashboard' && (
        <div className="h-screen flex items-center justify-center bg-white">
           <div className="w-8 h-8 rounded-full border-4 border-slate-200 border-t-primary animate-spin" />
        </div>
      )}
    </div>
  )
}

export default App
