import { Home, Zap, Trophy, Gift, Bell, Search, Menu, LogOut } from 'lucide-react'
import { useMicroMoveStore } from '@/store/microMoveStore'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { BottomNav } from '@/components/employee/BottomNav'
import { ContextNudgeModal } from '@/components/employee/ContextNudgeModal'

interface EmployeeLayoutProps {
    children: React.ReactNode
    activeTab: string
    setActiveTab: (tab: string) => void
    onLogout: () => void
}

export const EmployeeLayout: React.FC<EmployeeLayoutProps> = ({ children, activeTab, setActiveTab, onLogout }) => {
    const user = useMicroMoveStore(state => state.user)
    if (!user) return null

    const navItems = [
        { id: 'home', icon: Home, label: 'Dashboard' },
        { id: 'activities', icon: Zap, label: 'My Moves' },
        { id: 'leaderboard', icon: Trophy, label: 'Leaderboard' },
        { id: 'rewards', icon: Gift, label: 'Rewards' },
    ]

    return (
        <div className="flex h-screen bg-slate-50 overflow-hidden">
            {/* Sidebar */}
            <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-slate-200 p-6">
                <div className="flex items-center gap-3 mb-10 px-2 transition-transform hover:-translate-y-0.5 duration-300">
                    <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                        <Zap className="w-5 h-5 text-primary" fill="currentColor" />
                    </div>
                    <span className="font-bold text-xl tracking-tight text-slate-900">Micro Move</span>
                </div>

                <nav className="flex-1 space-y-2">
                    {navItems.map((item) => {
                        const Icon = item.icon
                        const isActive = activeTab === item.id
                        return (
                            <button
                                key={item.id}
                                onClick={() => setActiveTab(item.id)}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-sm font-medium ${isActive
                                    ? 'bg-primary/10 text-primary'
                                    : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'
                                    }`}
                            >
                                <Icon className={`w-5 h-5 ${isActive ? 'text-primary' : 'text-slate-400'}`} />
                                <span>{item.label}</span>
                            </button>
                        )
                    })}
                </nav>

                <div className="mt-auto pt-6 space-y-2">
                    <button
                        onClick={onLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 hover:bg-destructive/10 hover:text-destructive transition-colors group text-sm font-medium"
                    >
                        <LogOut className="w-5 h-5 text-slate-400 group-hover:text-destructive transition-colors" />
                        <span>Log Out</span>
                    </button>

                    <div className="pt-6 border-t border-slate-200">
                        <div className="flex items-center gap-3 px-2">
                            <Avatar className="w-10 h-10 ring-2 ring-primary/10">
                                <AvatarImage src="https://i.pravatar.cc/150?u=ahmad" />
                                <AvatarFallback>AZ</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-bold text-slate-900 truncate">Ahmad bin Zaid</p>
                                <p className="text-xs text-slate-500 truncate">{user.points} Points</p>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shrink-0 relative z-20">
                    <div className="flex items-center gap-4 flex-1">
                        <button className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                            <Menu className="w-5 h-5" />
                        </button>
                        <div className="relative max-w-md w-full hidden md:block group">
                            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-slate-600 transition-colors" />
                            <input
                                type="text"
                                placeholder="Search activities..."
                                className="w-full pl-10 pr-4 py-2 bg-slate-100/50 border border-transparent rounded-lg text-sm focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-all placeholder:text-slate-400"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-5">
                        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-primary/10 rounded-lg text-primary hover:bg-primary/15 transition-colors cursor-pointer">
                            <Zap className="w-4 h-4" />
                            <span className="text-sm font-semibold">{user.points} PTS</span>
                        </div>

                        <Button variant="ghost" size="icon" className="relative text-slate-600 rounded-full hover:bg-slate-100 transition-colors">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-2 right-2.5 w-2 h-2 bg-destructive rounded-full border border-white" />
                        </Button>

                        <div className="h-6 w-px bg-slate-200 mx-1 hidden sm:block" />

                        <Avatar className="w-9 h-9 cursor-pointer hover:opacity-80 transition-opacity">
                            <AvatarImage src="https://i.pravatar.cc/150?u=ahmad" />
                            <AvatarFallback className="bg-primary/10 text-primary font-medium text-sm">AZ</AvatarFallback>
                        </Avatar>
                    </div>
                </header>

                {/* Dynamic View */}
                <main className="flex-1 overflow-y-auto bg-slate-50/50 no-scrollbar relative w-full">
                    {/* The max-w has been removed from here to allow the child (Dashboard) to manage the split layout */}
                    <div className="h-full w-full">
                        {children}
                        <ContextNudgeModal />
                    </div>
                </main>
            </div>

            {/* Mobile Bottom Nav */}
            <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 shadow-[0_-8px_30px_rgb(0,0,0,0.04)] bg-white/80 backdrop-blur-xl border-t border-slate-100">
                <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
            </div>
        </div>
    )
}
