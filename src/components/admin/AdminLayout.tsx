import React from 'react'
import { LayoutDashboard, Users, Zap, Gift, Sliders, LogOut, Menu, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { NotificationDropdown } from '@/components/shared/NotificationDropdown'
import { UserAvatarDropdown } from '@/components/shared/UserAvatarDropdown'

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
        <div className="flex h-screen bg-[#F9FAFB] overflow-hidden">
            <aside className="hidden lg:flex flex-col w-64 bg-white border-l-[1.5px] border-[#E5E7EB] p-6 z-10 font-sans">
                <div className="flex items-center gap-3 mb-10 px-2">
                    <img src="/logo.png" alt="Micro Move" className="h-8" />
                    <span className="block font-semibold text-[10px] tracking-wider text-primary uppercase">بوابة الإدارة</span>
                </div>

                <nav className="flex-1 space-y-1">
                    {navItems.map((item) => {
                        const Icon = item.icon
                        const isActive = activeAdminTab === item.id
                        return (
                            <button
                                key={item.id}
                                onClick={() => setActiveAdminTab(item.id)}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-sm font-semibold ${isActive
                                    ? 'bg-[#FFF7ED] text-primary border-r-[3px] border-primary'
                                    : 'text-[#6B7280] hover:bg-[#F9FAFB] hover:text-[#111827] border-r-[3px] border-transparent'
                                    }`}
                            >
                                <Icon className={`w-[18px] h-[18px] ${isActive ? 'text-primary' : 'text-[#9CA3AF]'}`} strokeWidth={1.5} />
                                <span>{item.label}</span>
                            </button>
                        )
                    })}
                </nav>

                <div className="mt-auto pt-6 space-y-4 border-t border-[#E5E7EB]">
                    <button
                        onClick={onLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[#6B7280] hover:bg-red-50 hover:text-red-500 transition-all duration-200 group"
                    >
                        <LogOut className="w-[18px] h-[18px] group-hover:text-red-500 transition-colors" strokeWidth={1.5} />
                        <span className="font-semibold text-sm">تسجيل الخروج</span>
                    </button>
                    <div className="p-3 bg-[#F9FAFB] rounded-xl border border-[#E5E7EB]">
                        <div className="flex items-center gap-3">
                            <div className="flex items-center justify-center shrink-0">
                                <NotificationDropdown />
                            </div>
                            <UserAvatarDropdown />
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-bold text-[#111827] leading-none">سارة الفهد</p>
                                <p className="text-xs text-[#6B7280] mt-1">مدير النظام</p>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>

            <div className="flex-1 flex flex-col min-w-0 overflow-hidden font-sans">
                <header className="h-16 bg-white border-b border-[#E5E7EB] flex items-center justify-between px-8 shrink-0 relative z-20">
                    <div className="flex items-center gap-4 flex-1">
                        <button className="lg:hidden p-2 text-[#6B7280] hover:text-[#111827] hover:bg-[#F9FAFB] rounded-lg transition-all duration-200">
                            <Menu className="w-5 h-5" strokeWidth={1.5} />
                        </button>
                        <div className="relative max-w-md w-full hidden md:block group">
                            <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF] group-focus-within:text-primary transition-colors" strokeWidth={1.5} />
                            <input
                                type="text"
                                placeholder="ابحث عن موظفين، أنشطة..."
                                className="w-full pr-10 pl-4 py-2.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl text-sm text-[#111827] placeholder-[#9CA3AF] focus:bg-white focus:border-primary/40 focus:ring-2 focus:ring-primary/10 focus:shadow-inner-soft focus:outline-none transition-all duration-200 text-right"
                            />
                        </div>
                    </div>

                        <div className="flex items-center gap-3">
                            <NotificationDropdown />
                            <div className="h-8 w-px bg-slate-200/60 mx-1"></div>
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-bold text-[#111827] leading-none">سارة الفهد</p>
                                <p className="text-xs text-[#6B7280] mt-1">مدير النظام</p>
                            </div>
                            <UserAvatarDropdown onLogout={onLogout} />
                        </div>
                </header>

                <main className="flex-1 overflow-y-auto p-8 no-scrollbar bg-[#F9FAFB] relative">
                    <div className="relative z-10 max-w-7xl mx-auto">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    )
}
