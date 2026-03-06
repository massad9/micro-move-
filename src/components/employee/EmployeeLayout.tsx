import React from 'react'
import { LayoutDashboard, Zap, Trophy, Gift, Search, Bell, LogOut, Activity } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { useMicroMoveStore } from '@/store/microMoveStore'

interface EmployeeLayoutProps {
    children: React.ReactNode
    activeTab: string
    setActiveTab: (tab: string) => void
    onLogout: () => void
}

export const EmployeeLayout: React.FC<EmployeeLayoutProps> = ({ children, activeTab, setActiveTab, onLogout }) => {
    const user = useMicroMoveStore(state => state.user)

    const navItems = [
        { id: 'dashboard', icon: LayoutDashboard, label: 'الرئيسية' },
        { id: 'moves', icon: Zap, label: 'نشاطاتي' },
        { id: 'leaderboard', icon: Trophy, label: 'الترتيب' },
        { id: 'rewards', icon: Gift, label: 'المكافآت' },
    ]

    return (
        <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
            {/* Sidebar (Desktop) */}
            <aside className="hidden md:flex flex-col w-72 bg-white border-l border-slate-200 z-10 shrink-0">
                <div className="h-24 flex items-center gap-3 px-8 border-b border-slate-100 shrink-0">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary to-orange-400 rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
                        <Activity className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <span className="block font-black text-xl tracking-tight text-slate-900 leading-none">مايكرو موف</span>
                        <span className="block font-bold text-[10px] tracking-wider text-slate-400 uppercase mt-1">الموظف</span>
                    </div>
                </div>

                <div className="p-8">
                    <div className="flex items-center gap-4 mb-8">
                        <Avatar className="w-12 h-12 shadow-sm border border-slate-100">
                            <AvatarImage src={`https://i.pravatar.cc/150?u=${user?.email}`} />
                            <AvatarFallback className="bg-primary/10 text-primary font-bold">{user?.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="text-sm font-bold text-slate-900">{user?.name}</p>
                            <p className="text-xs font-semibold text-slate-500 mt-0.5">{user?.department}</p>
                        </div>
                    </div>

                    <nav className="space-y-2 relative">
                        {navItems.map((item) => {
                            const Icon = item.icon
                            const isActive = activeTab === item.id
                            return (
                                <button
                                    key={item.id}
                                    onClick={() => setActiveTab(item.id)}
                                    className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all relative ${isActive
                                        ? 'bg-slate-900 text-white shadow-xl shadow-slate-900/10'
                                        : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                                        }`}
                                >
                                    <Icon className={`w-5 h-5 relative z-10 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                                    <span className="font-bold text-sm relative z-10">{item.label}</span>
                                </button>
                            )
                        })}
                    </nav>
                </div>

                <div className="mt-auto p-8 border-t border-slate-100">
                    <button
                        onClick={onLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-slate-500 hover:bg-red-50 hover:text-red-600 transition-colors font-bold text-sm"
                    >
                        <LogOut className="w-5 h-5" />
                        <span>تسجيل الخروج</span>
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0 relative">

                {/* Topbar */}
                <header className="h-20 bg-white/80 backdrop-blur-xl border-b border-slate-200/60 flex items-center justify-between px-6 md:px-10 shrink-0 sticky top-0 z-20">
                    <div className="flex items-center gap-6">
                        <div className="md:hidden flex items-center gap-2">
                            <div className="w-8 h-8 bg-gradient-to-br from-primary to-orange-400 rounded-lg flex items-center justify-center shadow-md">
                                <Activity className="w-4 h-4 text-white" />
                            </div>
                        </div>

                        <div className="hidden md:flex relative group w-64 lg:w-96">
                            <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors z-10" />
                            <input
                                type="text"
                                placeholder="ابحث عن زميل، مكافأة..."
                                className="w-full pr-11 pl-4 py-2.5 bg-slate-100/50 hover:bg-slate-100 border border-transparent focus:bg-white focus:border-primary/20 focus:ring-4 focus:ring-primary/5 rounded-2xl text-sm text-slate-900 placeholder-slate-400 transition-all outline-none text-right"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-3 md:gap-4">
                        <Button variant="outline" className="hidden sm:flex border-slate-200 shadow-sm rounded-xl font-bold hover:bg-slate-50 h-10 px-4 group">
                            <Gift className="w-4 h-4 ml-2 text-primary group-hover:scale-110 transition-transform" />
                            {user?.points.toLocaleString()} نقطة
                        </Button>
                        <Button variant="ghost" size="icon" className="relative text-slate-500 hover:bg-slate-100 rounded-full w-10 h-10 transition-colors">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-2.5 left-2.5 w-2 h-2 bg-primary rounded-full ring-2 ring-white" />
                        </Button>
                        <Avatar className="w-10 h-10 md:hidden border border-slate-200 shadow-sm">
                            <AvatarImage src={`https://i.pravatar.cc/150?u=${user?.email}`} />
                            <AvatarFallback className="bg-primary/10 text-primary font-bold">{user?.name[0]}</AvatarFallback>
                        </Avatar>
                    </div>
                </header>

                {/* Dashboard / Content Area */}
                <main className="flex-1 overflow-y-auto no-scrollbar relative">
                    <div className="absolute inset-0 bg-slate-50 -z-10" />
                    <div className="max-w-7xl mx-auto px-4 md:px-10 py-8">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    )
}
