import { useState } from 'react'
import { Greeting } from '@/components/employee/Greeting'
import { ActivityFeed } from '@/components/employee/ActivityFeed'
import { Leaderboard } from '@/components/employee/Leaderboard'
import { Rewards } from '@/components/employee/Rewards'
import { EmployeeLayout } from '@/components/employee/EmployeeLayout'
import { useMicroMoveStore } from '@/store/microMoveStore'

// Admin Components
import { AdminLayout } from '@/components/admin/AdminLayout'
import { StatCards } from '@/components/admin/StatCards'
import { AnalyticsChart } from '@/components/admin/AnalyticsChart'
import { ActivityManager } from '@/components/admin/ActivityManager'
import { EmployeeList } from '@/components/admin/EmployeeList'
import { RewardsManager } from '@/components/admin/RewardsManager'
import { AdminSettings } from '@/components/admin/AdminSettings'

// Auth Components
import { WelcomePage } from '@/components/auth/WelcomePage'
import { LoginForm } from '@/components/auth/LoginForm'
import { HrOnboarding } from '@/components/auth/HrOnboarding'

// Skeleton Components
import { EmployeeDashboardSkeleton, AdminOverviewSkeleton } from '@/components/skeletons/DashboardSkeletons'

import { Button } from '@/components/ui/button'
import { motion, AnimatePresence } from 'framer-motion'
import { Layout } from 'lucide-react'

function App() {
  const [activeTab, setActiveTab] = useState('home')
  const [activeAdminTab, setActiveAdminTab] = useState('overview')
  const user = useMicroMoveStore(state => state.user)
  const logout = useMicroMoveStore(state => state.logout)
  const [loginRole, setLoginRole] = useState<'admin' | 'employee' | null>(null)
  const [isDashboardLoading, setIsDashboardLoading] = useState(false)
  const [isOnboardingComplete, setIsOnboardingComplete] = useState(true)

  const handleLoginSuccess = () => {
    setIsDashboardLoading(true)
    setTimeout(() => {
      setIsDashboardLoading(false)
      // For demo, if admin logs in and onboarding isn't complete (this would be driven by a real db check usually)
      if (loginRole === 'admin') {
        setIsOnboardingComplete(false);
      }
    }, 1500)
  }

  const handleLogout = () => {
    logout()
    setLoginRole(null)
  }

  // --- AUTH VIEWS ---
  if (!user) {
    if (loginRole) {
      return (
        <AnimatePresence mode="wait">
          <motion.div
            key="login"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <LoginForm
              role={loginRole}
              onLogin={handleLoginSuccess}
              onBack={() => setLoginRole(null)}
            />
          </motion.div>
        </AnimatePresence>
      )
    }

    return (
      <AnimatePresence mode="wait">
        <motion.div
          key="welcome"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <WelcomePage onSelectRole={setLoginRole} />
        </motion.div>
      </AnimatePresence>
    )
  }

  // --- HR ADMIN VIEW ---
  if (user.role === 'admin') {
    if (!isOnboardingComplete) {
      return <HrOnboarding onComplete={() => setIsOnboardingComplete(true)} />
    }

    return (
      <AdminLayout activeAdminTab={activeAdminTab} setActiveAdminTab={setActiveAdminTab} onLogout={handleLogout}>
        <AnimatePresence mode="wait">
          {activeAdminTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {isDashboardLoading ? (
                <AdminOverviewSkeleton />
              ) : (
                <>
                  <div className="mb-8">
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-2">Company Vibe</h1>
                    <p className="text-slate-500 font-medium italic">"The Engineering team could use a nudge. Energy levels dipping at 2 PM." — Micro Move AI</p>
                  </div>

                  <StatCards />

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                      <AnalyticsChart />
                    </div>
                    <div>
                      <EmployeeList />
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          )}

          {activeAdminTab === 'employees' && (
            <motion.div
              key="employees-admin"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <div className="mb-8">
                <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-2">Employee Directory</h1>
                <p className="text-slate-500 font-medium">Monitor engagement levels and point distribution across your workforce.</p>
              </div>
              <EmployeeList />
            </motion.div>
          )}

          {activeAdminTab === 'activities' && (
            <motion.div
              key="activities-admin"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <div className="mb-8">
                <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-2">Micro Move Management</h1>
                <p className="text-slate-500 font-medium">Configure and analyze the nudge activities deployed to your team.</p>
              </div>
              <ActivityManager />
            </motion.div>
          )}

          {activeAdminTab === 'rewards' && (
            <motion.div
              key="rewards"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <div className="mb-8">
                <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-2">Rewards & Challenges</h1>
                <p className="text-slate-500 font-medium">Manage the store and launch team challenges to drive engagement.</p>
              </div>
              <RewardsManager />
            </motion.div>
          )}

          {activeAdminTab === 'settings' && (
            <motion.div
              key="settings"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <div className="mb-8">
                <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-2">Platform Settings</h1>
                <p className="text-slate-500 font-medium">Configure integrations, permissions, and billing.</p>
              </div>
              <AdminSettings />
            </motion.div>
          )}

          {/* Placeholder for other admin tabs */}
          {['analytics'].includes(activeAdminTab) && (
            <motion.div
              key="placeholder"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="h-[60vh] flex flex-col items-center justify-center text-center p-12 bg-white rounded-[2rem] shadow-sm border border-dashed border-slate-200"
            >
              <Layout className="w-16 h-16 text-slate-200 mb-4" />
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Beta Feature</h2>
              <p className="text-slate-500 max-w-sm">
                The {activeAdminTab} module is part of our upcoming workforce intelligence suite.
                Stay tuned for real-time ROI tracking.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </AdminLayout>
    )
  }

  // --- EMPLOYEE VIEW (Full Webapp) ---
  return (
    <EmployeeLayout
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      onLogout={handleLogout}
    >
      <AnimatePresence mode="wait">
        {activeTab === 'home' && (
          <motion.div
            key="home"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: 'circOut' }}
            className="space-y-8"
          >
            {isDashboardLoading ? (
              <EmployeeDashboardSkeleton />
            ) : (
              <>
                <Greeting />

                <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100">
                  <div className="flex justify-between items-center mb-8">
                    <div>
                      <h2 className="text-2xl font-black text-slate-900 tracking-tight">Today's Moves</h2>
                      <p className="text-sm text-slate-500 font-medium">Personalized for your peak performance</p>
                    </div>
                    <Button
                      onClick={() => setActiveTab('activities')}
                      variant="ghost"
                      className="text-primary font-black uppercase tracking-widest hover:bg-primary/5"
                    >
                      View Library
                    </Button>
                  </div>
                  <ActivityFeed />
                </div>
              </>
            )}
          </motion.div>
        )}

        {activeTab === 'activities' && (
          <motion.div
            key="activities"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: 'circOut' }}
          >
            <div className="mb-8">
              <h2 className="text-4xl font-black text-slate-900 tracking-tight mb-2">Activity Hub</h2>
              <p className="text-lg font-medium text-slate-500 italic">"Movement is medicine for the modern professional."</p>
            </div>
            <ActivityFeed />
          </motion.div>
        )}

        {activeTab === 'leaderboard' && (
          <motion.div
            key="leaderboard"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.3 }}
            className="max-w-4xl mx-auto"
          >
            <Leaderboard />
          </motion.div>
        )}

        {activeTab === 'rewards' && (
          <motion.div
            key="rewards"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Rewards />
          </motion.div>
        )}
      </AnimatePresence>
    </EmployeeLayout>
  )
}

export default App
