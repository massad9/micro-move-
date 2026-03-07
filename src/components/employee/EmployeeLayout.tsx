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
        <div className="min-h-screen bg-background font-sans">
            <header className="h-16 bg-surface-1/80 backdrop-blur-xl border-b border-border flex items-center justify-between px-6 md:px-10 sticky top-0 z-20">
                <div className="flex items-center gap-4">
                    {currentView === 'store' ? (
                        <button
                            onClick={() => onNavigate('home')}
                            className="flex items-center gap-2 text-sm font-bold text-text-secondary hover:text-text-primary transition-colors"
                        >
                            <ArrowRight className="w-5 h-5" />
                            <span>الرجوع</span>
                        </button>
                    ) : (
                        <img src="/logo.png" alt="Micro Move" className="h-8" />
                    )}
                </div>

                <div className="flex items-center gap-3 md:gap-4">
                    {currentView !== 'store' && (
                        <Button
                            onClick={() => onNavigate('store')}
                            variant="outline"
                            className="border-border shadow-sm rounded-xl font-bold hover:bg-surface-2 h-10 px-4 group"
                        >
                            <ShoppingBag className="w-4 h-4 ml-2 text-primary group-hover:scale-110 transition-transform" />
                            المتجر
                        </Button>
                    )}
                    <div className="hidden sm:flex items-center gap-1 px-3 py-1.5 bg-primary/10 border border-primary/20 rounded-xl text-sm font-bold text-primary">
                        {user?.points.toLocaleString()} نقطة
                    </div>
                    <Button variant="ghost" size="icon" aria-label="الإشعارات" className="relative text-text-tertiary hover:bg-surface-2 rounded-full w-11 h-11 transition-colors">
                        <Bell className="w-5 h-5" aria-hidden="true" />
                        <span className="absolute top-2.5 left-2.5 w-2 h-2 bg-primary rounded-full ring-2 ring-surface-1" aria-hidden="true" />
                    </Button>
                    <Avatar className="w-10 h-10 border border-border shadow-sm">
                        <AvatarImage src={`https://i.pravatar.cc/150?u=${user?.email}`} />
                        <AvatarFallback className="bg-primary/10 text-primary font-bold">{user?.name[0]}</AvatarFallback>
                    </Avatar>
                    <button
                        onClick={onLogout}
                        aria-label="تسجيل الخروج"
                        className="text-text-quaternary hover:text-red-500 transition-colors p-3 rounded-full hover:bg-red-500/10"
                    >
                        <LogOut className="w-5 h-5" aria-hidden="true" />
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
