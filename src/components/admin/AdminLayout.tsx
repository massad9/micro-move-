import React from 'react'
import { LayoutDashboard, Users, Zap, Gift, Sliders, LogOut, Menu, Search, Bell } from 'lucide-react'
import { motion } from 'framer-motion'
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
        <div className="flex h-screen bg-background overflow-hidden selection:bg-primary/20">
            {/* Sidebar */}
            <aside className="hidden lg:flex flex-col w-64 bg-card border-l border-border/60 z-30 font-sans">
                <div className="flex items-center gap-3 h-16 px-6 border-b border-border/40">
                    <img src="/logo.png" alt="Micro Move" className="h-6 brightness-0 invert" />
                    <span className="font-bold text-xs tracking-[0.2em] text-muted-foreground uppercase">نظام الإدارة</span>
                </div>

                <div className="flex-1 px-3 py-6 space-y-1 overflow-y-auto no-scrollbar">
                    {navItems.map((item) => {
                        const Icon = item.icon
                        const isActive = activeAdminTab === item.id
                        return (
                            <button
                                key={item.id}
                                onClick={() => setActiveAdminTab(item.id)}
                                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 text-sm font-medium group ${isActive
                                    ? 'bg-primary/10 text-primary border border-primary/20'
                                    : 'text-muted-foreground hover:bg-secondary hover:text-foreground border border-transparent'
                                    }`}
                            >
                                <Icon className={`w-4 h-4 transition-colors ${isActive ? 'text-primary' : 'group-hover:text-foreground'}`} strokeWidth={2} />
                                <span>{item.label}</span>
                                {isActive && (
                                    <motion.div 
                                        layoutId="active-pill"
                                        className="mr-auto w-1 h-4 bg-primary rounded-full"
                                    />
                                )}
                            </button>
                        )
                    })}
                </div>

                <div className="p-4 border-t border-border/40 space-y-4">
                    <div className="p-3 bg-secondary/50 rounded-xl border border-border/40 hover:bg-secondary transition-colors cursor-pointer group">
                        <div className="flex items-center gap-3">
                            <Avatar className="w-8 h-8 border border-white/5 rounded-full overflow-hidden">
                                <AvatarImage src="https://i.pravatar.cc/150?u=admin" />
                                <AvatarFallback className="bg-primary/20 text-primary text-[10px]">مد</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                                <p className="text-xs font-bold text-foreground truncate group-hover:text-primary transition-colors">سارة الفهد</p>
                                <p className="text-[10px] text-muted-foreground uppercase tracking-widest">المشرف</p>
                            </div>
                        </div>
                    </div>
                    
                    <button
                        onClick={onLogout}
                        className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-muted-foreground hover:bg-red-500/10 hover:text-red-400 transition-all duration-200 text-sm font-medium"
                    >
                        <LogOut className="w-4 h-4" strokeWidth={2} />
                        <span>تسجيل الخروج</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
                <header className="h-16 border-b border-border/40 flex items-center justify-between px-8 bg-background/50 backdrop-blur-xl z-20 sticky top-0">
                    <div className="flex items-center gap-4 flex-1">
                        <button className="lg:hidden p-2 text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg transition-all">
                            <Menu className="w-5 h-5" strokeWidth={2} />
                        </button>
                        
                        <div className="relative max-w-md w-full hidden md:block group">
                            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" strokeWidth={2} />
                            <input
                                type="text"
                                placeholder="ابحث عن مهام، موظفين..."
                                className="w-full pr-10 pl-4 py-2 bg-secondary/40 border border-border/40 rounded-lg text-sm text-foreground placeholder:text-muted-foreground/60 focus:bg-background focus:border-primary/50 focus:ring-4 focus:ring-primary/5 focus:outline-none transition-all duration-300 text-right"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                            <Button variant="ghost" size="icon" className="text-muted-foreground hover:bg-secondary hover:text-foreground rounded-lg h-9 w-9">
                                <Bell className="w-4 h-4" />
                            </Button>
                        </div>
                        <div className="h-4 w-[1px] bg-border/60 mx-2 hidden sm:block" />
                        <div className="flex items-center gap-3">
                            <div className="text-right hidden sm:block">
                                <p className="text-xs font-bold text-foreground">سارة الفهد</p>
                                <div className="flex items-center justify-end gap-1 mt-0.5">
                                    <div className="w-1 h-1 bg-green-500 rounded-full animate-pulse" />
                                    <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">نشط</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto no-scrollbar relative">
                    <div className="max-w-7xl mx-auto p-8 space-y-8 animate-fade-up">
                        {children}
                    </div>
                    {/* Background Glow */}
                    <div className="absolute top-0 right-0 w-full h-96 bg-primary/5 blur-[120px] pointer-events-none -z-10" />
                </main>
            </div>
        </div>
    )
}
