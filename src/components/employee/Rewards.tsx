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
            <div className="absolute top-0 right-0 w-full h-[300px] bg-gradient-to-b from-orange-50/50 to-transparent -z-10 rounded-3xl mix-blend-multiply" />

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 relative z-10 pt-4 px-2">
                <div>
                    <h2 className="text-3xl lg:text-4xl font-black text-slate-900 tracking-tight flex items-center gap-3">
                        سوق المكافآت <span className="inline-block p-2 bg-amber-100 text-amber-500 rounded-xl"><Gift className="w-6 h-6" /></span>
                    </h2>
                    <p className="text-slate-500 mt-2 font-medium max-w-md leading-relaxed text-sm md:text-base">استبدل نقاط الحركة الخاصة بك بمكافآت قيّمة. لقد تعبت، وأنت تستحقها!</p>
                </div>
                <div className="bg-white px-6 py-4 rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-slate-100 flex items-center gap-4">
                    <div className="flex flex-col justify-center">
                        <span className="text-xs font-bold text-slate-400 tracking-wider uppercase">الرصيد المتاح</span>
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
                                className={cn(
                                    "bg-white border text-right duration-300 h-full flex flex-col group relative overflow-hidden",
                                    canAfford
                                        ? "border-amber-200/60 shadow-lg shadow-amber-900/5 hover:-translate-y-1 hover:shadow-xl hover:shadow-amber-900/10 cursor-pointer transition-[box-shadow,transform]"
                                        : "border-slate-200/60 shadow-sm opacity-90"
                                )}
                                onClick={() => canAfford && setSelectedReward(reward)}
                            >
                                {canAfford && (
                                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-amber-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                )}

                                <CardContent className="p-6 md:p-8 flex-1 flex flex-col relative z-10">
                                    <div className="flex justify-between items-start mb-6">
                                        <div className={cn(
                                            "w-14 h-14 rounded-2xl flex items-center justify-center transition-transform duration-300",
                                            canAfford
                                                ? "bg-amber-100 text-amber-600 shadow-inner group-hover:scale-110 group-hover:rotate-6"
                                                : "bg-slate-100 text-slate-400"
                                        )}>
                                            {getIconForReward(reward.title, "w-6", "h-6")}
                                        </div>
                                        {!canAfford && (
                                            <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100 text-slate-400 shadow-sm">
                                                <Lock className="w-3.5 h-3.5" />
                                            </div>
                                        )}
                                        {canAfford && (
                                            <div className="bg-amber-50 border border-amber-200 text-amber-600 text-[10px] font-black tracking-widest uppercase px-3 py-1.5 rounded-full shadow-sm">
                                                متوفر
                                            </div>
                                        )}
                                    </div>

                                    <h3 className={cn(
                                        "text-xl font-black mb-2 leading-tight tracking-tight",
                                        canAfford ? "text-slate-900" : "text-slate-700"
                                    )}>{reward.title}</h3>
                                    <p className="text-sm text-slate-500 font-medium mb-6 flex-1">{reward.description}</p>

                                    <div className="mt-auto space-y-4">
                                        <div className="flex justify-between items-end">
                                            <div className="flex flex-col">
                                                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-0.5">التكلفة</span>
                                                <span className={cn(
                                                    "text-xl font-black tracking-tighter flex items-center gap-1",
                                                    canAfford ? "text-amber-600" : "text-slate-400"
                                                )}>
                                                    <Star className="w-4 h-4 fill-current opacity-70" />
                                                    {reward.cost.toLocaleString()}
                                                </span>
                                            </div>

                                            {!canAfford && (
                                                <div className="text-left">
                                                    <span className="text-xs font-bold text-slate-400">تحتاج {reward.cost - user.points} نقطة إضافية</span>
                                                </div>
                                            )}
                                        </div>

                                        {!canAfford && (
                                            <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden shadow-inner">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${progress}%` }}
                                                    transition={{ duration: 1, ease: "easeOut" }}
                                                    className="h-full bg-slate-300 rounded-full"
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
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
                        onClick={() => !isRedeeming && setSelectedReward(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="bg-white rounded-[2.5rem] p-8 md:p-10 max-w-md w-full shadow-2xl relative overflow-hidden text-right"
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="absolute top-0 right-0 w-full h-32 bg-amber-50 opacity-50" />
                            <div className="absolute -top-20 -right-20 w-40 h-40 bg-amber-200/50 blur-3xl rounded-full" />

                            <div className="relative z-10">
                                <div className="w-20 h-20 bg-amber-100 text-amber-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-inner border-4 border-white">
                                    {getIconForReward(selectedReward.title, "w-10", "h-10")}
                                </div>
                                <h2 className="text-3xl font-black text-center text-slate-900 mb-2">{selectedReward.title}</h2>
                                <p className="text-slate-500 text-center text-sm mb-8 leading-relaxed px-4">{selectedReward.description}</p>

                                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 mb-8 flex justify-between items-center shadow-inner">
                                    <div className="text-right">
                                        <p className="text-sm font-semibold text-slate-300 uppercase tracking-widest mb-1">الرصيد المتاح</p>
                                        <span className="block text-lg font-black text-slate-900">{(user.points - selectedReward.cost).toLocaleString()} نقطة</span>
                                    </div>
                                    <div className="w-px h-10 bg-slate-200" />
                                    <div className="text-left">
                                        <span className="block text-xs font-bold text-amber-600/70 uppercase tracking-widest mb-1">تكلفة المكافأة</span>
                                        <span className="block text-lg font-black text-amber-600 flex items-center gap-1 justify-end"><Star className="w-4 h-4" /> {selectedReward.cost.toLocaleString()}</span>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <Button
                                        variant="outline"
                                        onClick={() => setSelectedReward(null)}
                                        disabled={isRedeeming}
                                        className="flex-1 h-14 rounded-2xl border-slate-200 font-bold text-slate-500 hover:bg-slate-50"
                                    >
                                        تراجع
                                    </Button>
                                    <Button
                                        onClick={() => handleRedeem(selectedReward)}
                                        disabled={isRedeeming}
                                        className="flex-[2] h-14 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-black px-0 shadow-[0_8px_20px_rgba(245,158,11,0.3)] transition-[color,background-color,box-shadow,transform] hover:shadow-[0_12px_25px_rgba(245,158,11,0.4)] hover:-translate-y-0.5 border-0"
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
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
                        onClick={() => setRedeemedReward(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="bg-white rounded-[2.5rem] p-8 md:p-10 max-w-md w-full shadow-2xl relative overflow-hidden text-center"
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-emerald-50 to-transparent" />
                            <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-60 h-60 bg-emerald-200/30 blur-3xl rounded-full" />

                            <div className="relative z-10">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
                                    className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-inner border-4 border-white"
                                >
                                    <span className="text-4xl">🎉</span>
                                </motion.div>

                                <h2 className="text-2xl font-black text-slate-900 mb-2">تم الاستبدال بنجاح!</h2>
                                <p className="text-slate-500 text-sm mb-6 font-medium leading-relaxed">
                                    استمتع بـ <strong className="text-slate-900">{redeemedReward.reward.title}</strong>
                                    <br />تم خصم <strong className="text-amber-600">{redeemedReward.reward.cost}</strong> نقطة من رصيدك.
                                </p>

                                <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl p-5 mb-6">
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">كود القسيمة</span>
                                    <div className="flex items-center justify-center gap-3">
                                        <span className="text-2xl font-black text-slate-900 tracking-[0.15em] font-mono" style={{ direction: 'ltr' }}>
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
                                    className="w-full h-14 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-black shadow-lg border-0"
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
