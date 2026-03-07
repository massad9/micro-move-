import React from 'react'
import { ShoppingBag, Bell, LogOut, ArrowRight } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { useMicroMoveStore } from '@/store/microMoveStore'

interface EmployeeLayoutProps {
    children: React.ReactNode
    onLogout: () => void
    currentView: 'home' | 'store'
    onNavigate: (view: 'home' | 'store') => void
}

export const EmployeeLayout: React.FC<EmployeeLayoutProps> = ({ children, onLogout, currentView, onNavigate }) => {
    const user = useMicroMoveStore(state => state.user)

    return (
        <div className="min-h-screen bg-background font-sans text-foreground">
            <header className="h-20 linear-glass border-b border-border/40 flex items-center justify-between px-6 md:px-10 sticky top-0 z-20">
                <div className="flex items-center gap-4">
                    {currentView === 'store' ? (
                        <button
                            onClick={() => onNavigate('home')}
                            className="flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-foreground transition-colors"
                        >
                            <ArrowRight className="w-5 h-5" />
                            <span>الرجوع</span>
                        </button>
                    ) : (
                        <img src="/logo.png" alt="Micro Move" className="h-8 brightness-0 invert" />
                    )}
                </div>

                <div className="flex items-center gap-3 md:gap-4">
                    {currentView !== 'store' && (
                        <button
                            onClick={() => onNavigate('store')}
                            className="linear-button-secondary h-10 px-4 group flex items-center text-sm"
                        >
                            <ShoppingBag className="w-4 h-4 ml-2 text-primary group-hover:scale-110 transition-transform" />
                            <span className="text-foreground">المتجر</span>
                        </button>
                    )}
                    <div className="hidden sm:flex items-center gap-1 px-3 py-1.5 bg-primary/10 border border-primary/20 rounded-xl text-sm font-bold text-primary shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
                        {user?.points.toLocaleString()} نقطة
                    </div>
                    <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:bg-secondary rounded-full w-10 h-10 transition-colors">
                        <Bell className="w-5 h-5" />
                        <span className="absolute top-2.5 left-2.5 w-2 h-2 bg-primary rounded-full ring-2 ring-background shadow-[0_0_8px_rgba(249,115,22,0.8)]" />
                    </Button>
                    <Avatar className="w-10 h-10 border border-border/50 shadow-sm">
                        <AvatarImage src={`https://i.pravatar.cc/150?u=${user?.email}`} />
                        <AvatarFallback className="bg-primary/20 text-primary font-bold">{user?.name[0]}</AvatarFallback>
                    </Avatar>
                    <button
                        onClick={onLogout}
                        className="text-muted-foreground hover:text-red-400 transition-colors p-2 rounded-full hover:bg-red-500/10"
                        title="تسجيل الخروج"
                    >
                        <LogOut className="w-5 h-5" />
                    </button>
                </div>
            </header>

            <main className="relative">
                <div className="max-w-7xl mx-auto px-4 md:px-10 py-8">
                    {children}
                </div>
            </main>
        </div>
    )
}
