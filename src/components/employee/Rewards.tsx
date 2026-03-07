import React, { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Gift, Lock, Star, Sparkles, Coffee, Plane, Heart, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { motion, AnimatePresence } from 'framer-motion'
import { useMicroMoveStore, type Reward } from '@/store/microMoveStore'
import confetti from 'canvas-confetti'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

const getIconForReward = (title: string, w: string, h: string) => {
    if (title.includes('قهوة') || title.includes('مشروب')) return <Coffee className={`${w} ${h}`} />
    if (title.includes('إجازة') || title.includes('سفر')) return <Plane className={`${w} ${h}`} />
    if (title.includes('تبرع') || title.includes('خيري')) return <Heart className={`${w} ${h}`} />
    if (title.includes('راحة') || title.includes('وقت')) return <Clock className={`${w} ${h}`} />
    return <Gift className={`${w} ${h}`} />
}

export const Rewards: React.FC = () => {
    const rewards = useMicroMoveStore(state => state.rewards)
    const user = useMicroMoveStore(state => state.user)
    const [selectedReward, setSelectedReward] = useState<Reward | null>(null)
    const [isRedeeming, setIsRedeeming] = useState(false)
    const [redeemedReward, setRedeemedReward] = useState<{ reward: Reward, coupon: string } | null>(null)

    if (!user) return null

    const generateCoupon = () => {
        const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
        let code = 'MM-'
        for (let i = 0; i < 8; i++) {
            code += chars[Math.floor(Math.random() * chars.length)]
        }
        return code
    }

    const handleRedeem = (reward: Reward) => {
        if (user.points < reward.cost) return

        setIsRedeeming(true)
        setTimeout(() => {
            setIsRedeeming(false)
            setSelectedReward(null)

            const coupon = generateCoupon()

            confetti({
                particleCount: 200,
                spread: 100,
                origin: { y: 0.5 },
                colors: ['#F59E0B', '#10B981', '#3B82F6', '#8B5CF6']
            })

            setRedeemedReward({ reward, coupon })
        }, 1500)
    }

    return (
        <div className="pb-24 font-sans text-right relative">
            <div className="absolute top-0 right-0 w-full h-[300px] bg-gradient-to-b from-primary/5 to-transparent -z-10 rounded-2xl" />

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 relative z-10 pt-4 px-2">
                <div>
                    <h2 className="text-3xl lg:text-4xl font-black text-text-primary tracking-tight flex items-center gap-3">
                        سوق المكافآت <span className="inline-block p-2 bg-primary/15 text-primary rounded-xl"><Gift className="w-6 h-6" /></span>
                    </h2>
                    <p className="text-text-tertiary mt-2 font-medium max-w-md leading-relaxed text-sm md:text-base">استبدل نقاط الحركة الخاصة بك بمكافآت قيّمة. لقد تعبت، وأنت تستحقها!</p>
                </div>
                <div className="bg-surface-1 px-6 py-4 rounded-xl border border-border flex items-center gap-4">
                    <div className="flex flex-col justify-center">
                        <span className="text-xs font-bold text-text-quaternary tracking-wider uppercase">الرصيد المتاح</span>
                        <span className="text-2xl font-black text-primary tracking-tight">{user.points.toLocaleString()}</span>
                    </div>
                    <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center border-2 border-primary/20">
                        <Star className="w-6 h-6 text-primary" />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {rewards.map((reward, idx) => {
                    const canAfford = user.points >= reward.cost
                    const progress = Math.min((user.points / reward.cost) * 100, 100)

                    return (
                        <motion.div
                            key={reward.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1, type: "spring", stiffness: 200, damping: 20 }}
                        >
                            <Card
                                role={canAfford ? "button" : undefined}
                                tabIndex={canAfford ? 0 : undefined}
                                onKeyDown={canAfford ? (e: React.KeyboardEvent) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedReward(reward); } } : undefined}
                                className={cn(
                                    "bg-surface-1 border text-right duration-300 h-full flex flex-col group relative overflow-hidden",
                                    canAfford
                                        ? "border-primary/20 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(139,92,246,0.1)] cursor-pointer transition-[box-shadow,transform]"
                                        : "border-border opacity-90"
                                )}
                                onClick={() => canAfford && setSelectedReward(reward)}
                            >
                                {canAfford && (
                                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                )}

                                <CardContent className="p-6 md:p-8 flex-1 flex flex-col relative z-10">
                                    <div className="flex justify-between items-start mb-6">
                                        <div className={cn(
                                            "w-14 h-14 rounded-2xl flex items-center justify-center transition-transform duration-300",
                                            canAfford
                                                ? "bg-primary/15 text-primary group-hover:scale-110 group-hover:rotate-6"
                                                : "bg-surface-2 text-text-quaternary"
                                        )}>
                                            {getIconForReward(reward.title, "w-6", "h-6")}
                                        </div>
                                        {!canAfford && (
                                            <div className="w-8 h-8 rounded-full bg-surface-2 flex items-center justify-center border border-border text-text-quaternary">
                                                <Lock className="w-3.5 h-3.5" />
                                            </div>
                                        )}
                                        {canAfford && (
                                            <div className="bg-primary/10 border border-primary/20 text-primary text-xs font-black tracking-widest uppercase px-3 py-1.5 rounded-full">
                                                متوفر
                                            </div>
                                        )}
                                    </div>

                                    <h3 className={cn(
                                        "text-xl font-black mb-2 leading-tight tracking-tight",
                                        canAfford ? "text-text-primary" : "text-text-secondary"
                                    )}>{reward.title}</h3>
                                    <p className="text-sm text-text-tertiary font-medium mb-6 flex-1">{reward.description}</p>

                                    <div className="mt-auto space-y-4">
                                        <div className="flex justify-between items-end">
                                            <div className="flex flex-col">
                                                <span className="text-xs font-bold uppercase tracking-widest text-text-quaternary mb-0.5">التكلفة</span>
                                                <span className={cn(
                                                    "text-xl font-black tracking-tighter flex items-center gap-1",
                                                    canAfford ? "text-primary" : "text-text-quaternary"
                                                )}>
                                                    <Star className="w-4 h-4 fill-current opacity-70" />
                                                    {reward.cost.toLocaleString()}
                                                </span>
                                            </div>

                                            {!canAfford && (
                                                <div className="text-left">
                                                    <span className="text-xs font-bold text-text-quaternary">تحتاج {reward.cost - user.points} نقطة إضافية</span>
                                                </div>
                                            )}
                                        </div>

                                        {!canAfford && (
                                            <div className="h-1.5 w-full bg-surface-3 rounded-full overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${progress}%` }}
                                                    transition={{ duration: 1, ease: "easeOut" }}
                                                    className="h-full bg-surface-3 rounded-full"
                                                />
                                            </div>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    )
                })}
            </div>

            <AnimatePresence>
                {selectedReward && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                        onClick={() => !isRedeeming && setSelectedReward(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="bg-surface-1 border border-border rounded-2xl p-8 md:p-10 max-w-md w-full shadow-2xl relative overflow-hidden text-right"
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="absolute top-0 right-0 w-full h-32 bg-primary/5 opacity-50" />
                            <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/10 blur-3xl rounded-full" />

                            <div className="relative z-10">
                                <div className="w-20 h-20 bg-primary/15 text-primary rounded-2xl flex items-center justify-center mx-auto mb-6 border-4 border-surface-1">
                                    {getIconForReward(selectedReward.title, "w-10", "h-10")}
                                </div>
                                <h2 className="text-3xl font-black text-center text-text-primary mb-2">{selectedReward.title}</h2>
                                <p className="text-text-tertiary text-center text-sm mb-8 leading-relaxed px-4">{selectedReward.description}</p>

                                <div className="bg-surface-2 border border-border rounded-xl p-6 mb-8 flex justify-between items-center">
                                    <div className="text-right">
                                        <p className="text-sm font-semibold text-text-quaternary uppercase tracking-widest mb-1">الرصيد المتاح</p>
                                        <span className="block text-lg font-black text-text-primary">{(user.points - selectedReward.cost).toLocaleString()} نقطة</span>
                                    </div>
                                    <div className="w-px h-10 bg-border" />
                                    <div className="text-left">
                                        <span className="block text-xs font-bold text-primary/70 uppercase tracking-widest mb-1">تكلفة المكافأة</span>
                                        <span className="block text-lg font-black text-primary flex items-center gap-1 justify-end"><Star className="w-4 h-4" /> {selectedReward.cost.toLocaleString()}</span>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <Button
                                        variant="outline"
                                        onClick={() => setSelectedReward(null)}
                                        disabled={isRedeeming}
                                        className="flex-1 h-14 rounded-xl border-border font-bold text-text-tertiary hover:bg-surface-2"
                                    >
                                        تراجع
                                    </Button>
                                    <Button
                                        onClick={() => handleRedeem(selectedReward)}
                                        disabled={isRedeeming}
                                        className="flex-[2] h-14 rounded-xl bg-primary hover:bg-primary/90 text-white font-black px-0 shadow-[0_8px_20px_rgba(139,92,246,0.3)] transition-[color,background-color,box-shadow,transform] hover:shadow-[0_12px_25px_rgba(139,92,246,0.4)] hover:-translate-y-0.5 border-0"
                                    >
                                        {isRedeeming ? (
                                            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, ease: "linear", duration: 1 }} className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full" />
                                        ) : (
                                            <span className="flex items-center justify-center gap-2 w-full"><Sparkles className="w-4 h-4" /> تأكيد الاستبدال</span>
                                        )}
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {redeemedReward && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                        onClick={() => setRedeemedReward(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="bg-surface-1 border border-border rounded-2xl p-8 md:p-10 max-w-md w-full shadow-2xl relative overflow-hidden text-center"
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-emerald-500/5 to-transparent" />
                            <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-60 h-60 bg-emerald-500/10 blur-3xl rounded-full" />

                            <div className="relative z-10">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
                                    className="w-20 h-20 bg-emerald-500/15 text-emerald-400 rounded-2xl flex items-center justify-center mx-auto mb-6 border-4 border-surface-1"
                                >
                                    <span className="text-4xl">🎉</span>
                                </motion.div>

                                <h2 className="text-2xl font-black text-text-primary mb-2">تم الاستبدال بنجاح!</h2>
                                <p className="text-text-tertiary text-sm mb-6 font-medium leading-relaxed">
                                    استمتع بـ <strong className="text-text-primary">{redeemedReward.reward.title}</strong>
                                    <br />تم خصم <strong className="text-primary">{redeemedReward.reward.cost}</strong> نقطة من رصيدك.
                                </p>

                                <div className="bg-surface-2 border-2 border-dashed border-border rounded-xl p-5 mb-6">
                                    <span className="text-xs font-bold text-text-quaternary uppercase tracking-widest block mb-2">كود القسيمة</span>
                                    <div className="flex items-center justify-center gap-3">
                                        <span className="text-2xl font-black text-text-primary tracking-[0.15em] font-mono" style={{ direction: 'ltr' }}>
                                            {redeemedReward.coupon}
                                        </span>
                                    </div>
                                    <button
                                        onClick={() => {
                                            navigator.clipboard.writeText(redeemedReward.coupon)
                                            toast.success('تم نسخ الكود!', { duration: 2000 })
                                        }}
                                        className="mt-3 text-xs font-bold text-primary hover:text-primary/80 transition-colors"
                                    >
                                        نسخ الكود
                                    </button>
                                </div>

                                <Button
                                    onClick={() => setRedeemedReward(null)}
                                    className="w-full h-14 rounded-xl bg-primary hover:bg-primary/90 text-white font-black shadow-lg border-0"
                                >
                                    حسنًا، شكرًا!
                                </Button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
