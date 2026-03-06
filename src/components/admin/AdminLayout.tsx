import React from 'react'
import { LayoutDashboard, Users, Zap, Gift, Sliders, LogOut, Menu, Search, Bell } from 'lucide-react'
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
        { id: 'overview', icon: LayoutDashboard, label: 'نظرة عامة' },
        { id: 'employees', icon: Users, label: 'الموظفون' },
        { id: 'activities', icon: Zap, label: 'النشاطات' },
        { id: 'rewards', icon: Gift, label: 'متجر المكافآت' },
        { id: 'settings', icon: Sliders, label: 'الإعدادات' },
    ]

    return (
        <div className="flex h-screen bg-slate-50 overflow-hidden">
            {/* Sidebar */}
            <aside className="hidden lg:flex flex-col w-64 bg-[#050505] text-white border-l border-[#151515] p-6 z-10 font-sans">
                <div className="flex items-center gap-3 mb-12 px-2">
                    <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center transition-colors border border-primary/30">
                        <div className="w-4 h-4 bg-primary rounded-[2px] rotate-45" />
                    </div>
                    <div>
                        <span className="block font-bold text-xl tracking-tight text-white leading-none">مايكرو موف</span>
                        <span className="block font-medium text-[10px] tracking-wider text-primary uppercase mt-1">بوابة الإدارة</span>
                    </div>
                </div>

                <nav className="flex-1 space-y-1.5">
                    {navItems.map((item) => {
                        const Icon = item.icon
                        const isActive = activeAdminTab === item.id
                        return (
                            <button
                                key={item.id}
                                onClick={() => setActiveAdminTab(item.id)}
                                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-sm font-medium ${isActive
                                    ? 'bg-primary border border-primary/50 text-white shadow-lg shadow-primary/20'
                                    : 'text-slate-400 hover:bg-white/5 hover:text-white border border-transparent'
                                    }`}
                            >
                                <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                                <span>{item.label}</span>
                            </button>
                        )
                    })}
                </nav>

                <div className="mt-auto pt-6 space-y-4 border-t border-white/10">
                    <button
                        onClick={onLogout}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-colors group"
                    >
                        <LogOut className="w-5 h-5 text-slate-500 group-hover:text-red-400 transition-colors" />
                        <span className="font-bold text-lg hidden md:block">تسجيل الخروج</span>
                    </button>
                    <div className="p-3 bg-[#111] rounded-xl border border-white/10">
                        <div className="flex items-center gap-3">
                            <Avatar className="w-10 h-10 border border-white/10 rounded-lg">
                                <AvatarImage src="https://i.pravatar.cc/150?u=admin" />
                                <AvatarFallback className="bg-primary/20 text-primary">مد</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                            </div>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden font-sans">
                {/* Top Header */}
                <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shrink-0 relative z-20">
                    <div className="flex items-center gap-4 flex-1">
                        <button className="lg:hidden p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors">
                            <Menu className="w-5 h-5" />
                        </button>
                        <div className="relative max-w-md w-full hidden md:block group">
                            <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors" />
                            <input
                                type="text"
                                placeholder="ابحث عن موظفين، أنشطة..."
                                className="w-full pr-10 pl-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:border-primary/50 focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all text-right"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        <Button variant="ghost" size="icon" className="relative text-slate-600 rounded-full hover:bg-slate-100 transition-colors h-9 w-9">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-2 left-2.5 w-2 h-2 bg-red-500 rounded-full border border-white" />
                        </Button>
                        <div className="h-6 w-[1px] bg-slate-200 mx-2 hidden sm:block" />
                        <div className="flex items-center gap-3">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-bold text-slate-900 leading-none">سارة الفهد</p>
                                <p className="text-xs text-slate-500 font-medium mt-1">مدير النظام</p>
                            </div>
                            <Avatar className="w-9 h-9 cursor-pointer hover:opacity-80 transition-opacity">
                                <AvatarImage src="https://i.pravatar.cc/150?u=sara-admin" />
                                <AvatarFallback className="bg-primary/10 text-primary font-medium text-sm">سف</AvatarFallback>
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
