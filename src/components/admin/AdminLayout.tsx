import React from 'react'
import { LayoutDashboard, Users, Zap, BarChart3, Settings, Search, Bell, Menu, LogOut } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'

interface AdminLayoutProps {
    children: React.ReactNode
    activeAdminTab: string
    setActiveAdminTab: (tab: string) => void
    onLogout: () => void
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children, activeAdminTab, setActiveAdminTab, onLogout }) => {

    const navItems = [
        { id: 'overview', icon: LayoutDashboard, label: 'Overview' },
        { id: 'employees', icon: Users, label: 'Employees' },
        { id: 'activities', icon: Zap, label: 'Micro Moves' },
        { id: 'analytics', icon: BarChart3, label: 'Analytics' },
        { id: 'settings', icon: Settings, label: 'Settings' },
    ]

    return (
        <div className="flex h-screen bg-slate-50 overflow-hidden">
            {/* Sidebar */}
            <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-slate-200 p-6 z-10">
                <div className="flex items-center gap-3 mb-12 px-2">
                    <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center transition-colors">
                        <div className="w-4 h-4 bg-primary rounded-[2px] rotate-45" />
                    </div>
                    <div>
                        <span className="block font-bold text-xl tracking-tight text-slate-900 leading-none">Micro Move</span>
                        <span className="block font-medium text-[10px] tracking-wider text-primary uppercase mt-1">Admin Portal</span>
                    </div>
                </div>

                <nav className="flex-1 space-y-1">
                    {navItems.map((item) => {
                        const Icon = item.icon
                        const isActive = activeAdminTab === item.id
                        return (
                            <button
                                key={item.id}
                                onClick={() => setActiveAdminTab(item.id)}
                                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sm font-medium ${isActive
                                    ? 'bg-primary/10 text-primary'
                                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                                    }`}
                            >
                                <Icon className={`w-5 h-5 ${isActive ? 'text-primary' : 'text-slate-400'}`} />
                                <span>{item.label}</span>
                            </button>
                        )
                    })}
                </nav>

                <div className="mt-auto pt-6 space-y-4 border-t border-slate-200">
                    <button
                        onClick={onLogout}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 hover:bg-destructive/10 hover:text-destructive transition-colors group"
                    >
                        <LogOut className="w-5 h-5 text-slate-400 group-hover:text-destructive transition-colors" />
                        <span className="font-medium text-sm">Log Out</span>
                    </button>
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                        <div className="flex items-center gap-3">
                            <Avatar className="w-10 h-10 border border-slate-200 rounded-lg">
                                <AvatarImage src="https://i.pravatar.cc/150?u=admin" />
                                <AvatarFallback className="bg-primary/10 text-primary">AD</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-slate-900 truncate">
                                    Admin Access
                                </p>
                                <p className="text-xs text-slate-500 truncate mt-0.5">HR Dept</p>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                {/* Top Header */}
                <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shrink-0 relative z-20">
                    <div className="flex items-center gap-4 flex-1">
                        <button className="lg:hidden p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors">
                            <Menu className="w-5 h-5" />
                        </button>
                        <div className="relative max-w-md w-full hidden md:block group">
                            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-slate-600 transition-colors" />
                            <input
                                type="text"
                                placeholder="Search employees, activities..."
                                className="w-full pl-10 pr-4 py-2 bg-slate-100/50 border border-transparent rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-all"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        <Button variant="ghost" size="icon" className="relative text-slate-600 rounded-full hover:bg-slate-100 transition-colors h-9 w-9">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-2 right-2.5 w-2 h-2 bg-destructive rounded-full border border-white" />
                        </Button>
                        <div className="h-6 w-[1px] bg-slate-200 mx-2 hidden sm:block" />
                        <div className="flex items-center gap-3">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-semibold text-slate-900">Sara Al-Fahad</p>
                                <p className="text-xs text-slate-500 font-medium mt-0.5">HR Director</p>
                            </div>
                            <Avatar className="w-9 h-9 cursor-pointer hover:opacity-80 transition-opacity">
                                <AvatarImage src="https://i.pravatar.cc/150?u=sara-admin" />
                                <AvatarFallback className="bg-primary/10 text-primary font-medium text-sm">SF</AvatarFallback>
                            </Avatar>
                        </div>
                    </div>
                </header>

                {/* Dynamic View */}
                <main className="flex-1 overflow-y-auto p-4 md:p-8 no-scrollbar bg-slate-50 relative">
                    <div className="relative z-10 max-w-7xl mx-auto">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    )
}
