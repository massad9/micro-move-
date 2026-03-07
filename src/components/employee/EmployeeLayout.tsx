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
        <div className="min-h-screen bg-slate-50 font-sans">
            <header className="h-20 bg-white/80 backdrop-blur-xl border-b border-slate-200/60 flex items-center justify-between px-6 md:px-10 sticky top-0 z-20">
                <div className="flex items-center gap-4">
                    {currentView === 'store' ? (
                        <button
                            onClick={() => onNavigate('home')}
                            className="flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-slate-900 transition-colors"
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
                            className="border-slate-200 shadow-sm rounded-xl font-bold hover:bg-slate-50 h-10 px-4 group"
                        >
                            <ShoppingBag className="w-4 h-4 ml-2 text-primary group-hover:scale-110 transition-transform" />
                            المتجر
                        </Button>
                    )}
                    <div className="hidden sm:flex items-center gap-1 px-3 py-1.5 bg-orange-50 border border-orange-200/60 rounded-xl text-sm font-bold text-orange-600">
                        {user?.points.toLocaleString()} نقطة
                    </div>
                    <Button variant="ghost" size="icon" className="relative text-slate-500 hover:bg-slate-100 rounded-full w-10 h-10 transition-colors">
                        <Bell className="w-5 h-5" />
                        <span className="absolute top-2.5 left-2.5 w-2 h-2 bg-primary rounded-full ring-2 ring-white" />
                    </Button>
                    <Avatar className="w-10 h-10 border border-slate-200 shadow-sm">
                        <AvatarImage src={`https://i.pravatar.cc/150?u=${user?.email}`} />
                        <AvatarFallback className="bg-primary/10 text-primary font-bold">{user?.name[0]}</AvatarFallback>
                    </Avatar>
                    <button
                        onClick={onLogout}
                        className="text-slate-400 hover:text-red-500 transition-colors p-2 rounded-full hover:bg-red-50"
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
