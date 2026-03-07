import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Lock, Star, ChevronLeft } from 'lucide-react'
import { useMicroMoveStore } from '@/store/microMoveStore'

export const PremiumActivityCard: React.FC = () => {
    const user = useMicroMoveStore(state => state.user)
    const activeChallenge = useMicroMoveStore(state => state.challenges[0])
    const pointsNeeded = 500

    if (!activeChallenge) return null

    return (
        <Card
            className="bg-surface-1 border border-border overflow-hidden hover:border-primary/20 transition-[border-color,box-shadow] h-full flex flex-col group relative font-sans text-right"
        >
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <CardContent className="p-6 md:p-8 flex-1 flex flex-col relative z-10">
                <div className="flex justify-between items-start mb-6">
                    <div className="w-12 h-12 bg-primary/15 rounded-xl flex items-center justify-center border border-primary/20 text-primary group-hover:bg-primary/20 transition-colors">
                        <Star className="w-6 h-6 fill-current" />
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="bg-surface-2 border border-border text-text-tertiary text-xs font-black tracking-widest uppercase px-3 py-1.5 rounded-full flex items-center gap-1.5">
                            <Lock className="w-3 h-3" />
                            مكافأة مميزة
                        </div>
                    </div>
                </div>

                <div className="flex-1">
                    <h3 className="text-xl font-black text-text-primary mb-2 leading-tight tracking-tight">غداء مجاني للفريق</h3>
                    <p className="text-sm text-text-tertiary font-medium leading-relaxed mb-6">
                        اجمع 500 نقطة عن طريق إكمال تحديات الفريق واستبدلها بوجبة غداء مدفوعة.
                    </p>
                </div>

                <div className="mt-auto pt-6 border-t border-border space-y-4">
                    <div className="flex justify-between items-end">
                        <div className="flex flex-col">
                            <span className="text-xs font-bold uppercase tracking-widest text-text-quaternary mb-1 block">تقدمك</span>
                            <span className="text-2xl font-black text-text-primary flex items-baseline gap-1">
                                {user?.points || 0}
                                <span className="text-sm text-text-tertiary font-bold uppercase">/ {pointsNeeded}</span>
                            </span>
                        </div>
                        <div className="text-left mb-1">
                            {user && user.points < pointsNeeded ? (
                                <span className="text-xs font-bold text-accent block">
                                    تحتاج {(pointsNeeded - user.points).toLocaleString()} إضافية
                                </span>
                            ) : (
                                <span className="text-xs font-bold text-emerald-400 block">
                                    أنت مستعد!
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="h-2 w-full bg-surface-3 rounded-full overflow-hidden relative">
                        <div
                            className="absolute top-0 right-0 h-full bg-gradient-to-l from-primary to-violet-500 transition-[width] duration-1000 ease-out"
                            style={{ width: `${Math.min(((user?.points || 0) / pointsNeeded) * 100, 100)}%` }}
                        />
                    </div>

                    <button className={`w-full h-12 rounded-xl flex items-center justify-center gap-2 font-bold transition-[color,background-color,box-shadow,transform] duration-300 text-sm tracking-wide ${user && user.points >= pointsNeeded
                        ? 'bg-primary text-white shadow-md hover:bg-primary/90 hover:shadow-lg hover:-translate-y-0.5 border-0 cursor-pointer'
                        : 'bg-surface-2 border border-border text-text-quaternary cursor-not-allowed'
                        }`}>
                        {user && user.points >= pointsNeeded ? 'فتح المكافأة' : 'مقفلة حالياً'}
                        {user && user.points >= pointsNeeded && (
                            <ChevronLeft className="w-4 h-4 ml-1 transition-transform group-hover:-translate-x-1" />
                        )}
                    </button>
                </div>
            </CardContent>
        </Card>
    )
}
