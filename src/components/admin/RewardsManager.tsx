import React, { useState } from 'react'
import { Gift, Target, Plus, PackageOpen } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useMicroMoveStore } from '@/store/microMoveStore'

export const RewardsManager: React.FC = () => {
    const rewards = useMicroMoveStore(state => state.rewards)
    const challenges = useMicroMoveStore(state => state.challenges)
    const addReward = useMicroMoveStore(state => state.addReward)
    const addChallenge = useMicroMoveStore(state => state.addChallenge)

    const [activeTab, setActiveTab] = useState<'rewards' | 'challenges'>('rewards')

    const [rewardTitle, setRewardTitle] = useState('')
    const [rewardCost, setRewardCost] = useState('')
    const [rewardDesc, setRewardDesc] = useState('')

    const [challengeTitle, setChallengeTitle] = useState('')
    const [challengeTarget, setChallengeTarget] = useState('')
    const [challengeReward, setChallengeReward] = useState('')

    const handleAddReward = (e: React.FormEvent) => {
        e.preventDefault()
        if (!rewardTitle || !rewardCost) return
        addReward({
            id: `r${Date.now()}`,
            title: rewardTitle,
            cost: parseInt(rewardCost),
            description: rewardDesc || 'مكافأة جديدة'
        })
        setRewardTitle(''); setRewardCost(''); setRewardDesc('')
    }

    const handleAddChallenge = (e: React.FormEvent) => {
        e.preventDefault()
        if (!challengeTitle || !challengeTarget || !challengeReward) return
        addChallenge({
            id: `c${Date.now()}`,
            title: challengeTitle,
            targetPoints: parseInt(challengeTarget),
            currentPoints: 0,
            rewardTitle: challengeReward,
            description: 'تحدي جديد لنشاط الفريق'
        })
        setChallengeTitle(''); setChallengeTarget(''); setChallengeReward('')
    }

    return (
        <div className="space-y-6 font-sans">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-foreground tracking-tight">متجر المكافآت والتحديات</h1>
                    <p className="text-muted-foreground mt-2 text-sm leading-relaxed">حفز فريقك من خلال مكافآت وتحديات مخصصة.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1 space-y-6">
                    <div className="linear-card text-right">
                        <div className="flex border-b border-border/40">
                            <button
                                onClick={() => setActiveTab('rewards')}
                                className={`flex-1 py-4 text-sm font-bold transition-all duration-200 ${activeTab === 'rewards' ? 'bg-primary/10 text-primary border-b-2 border-primary' : 'text-muted-foreground hover:bg-secondary/50'}`}
                            >
                                <Gift className="w-4 h-4 mx-auto mb-1.5" strokeWidth={2} />
                                مكافأة فردية
                            </button>
                            <button
                                onClick={() => setActiveTab('challenges')}
                                className={`flex-1 py-4 text-sm font-bold transition-all duration-200 ${activeTab === 'challenges' ? 'bg-primary/10 text-primary border-b-2 border-primary' : 'text-muted-foreground hover:bg-secondary/50'}`}
                            >
                                <Target className="w-4 h-4 mx-auto mb-1.5" strokeWidth={2} />
                                تحدي جماعي
                            </button>
                        </div>
                        <div className="p-6">
                            {activeTab === 'rewards' ? (
                                <form onSubmit={handleAddReward} className="space-y-4">
                                    <div>
                                        <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-2 block">عنوان المكافأة</label>
                                        <input type="text" value={rewardTitle} onChange={e => setRewardTitle(e.target.value)} required className="w-full px-4 py-3 bg-secondary/50 border border-border/40 rounded-xl text-sm outline-none focus:border-primary/40 focus:ring-1 focus:ring-primary focus:shadow-inner-soft transition-all duration-200 text-right text-foreground placeholder-muted-foreground/60" placeholder="مثال: ساعة راحة إضافية" />
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-2 block">التكلفة (نقطة)</label>
                                        <input type="number" value={rewardCost} onChange={e => setRewardCost(e.target.value)} required min="1" className="w-full px-4 py-3 bg-secondary/50 border border-border/40 rounded-xl text-sm outline-none focus:border-primary/40 focus:ring-1 focus:ring-primary focus:shadow-inner-soft transition-all duration-200 text-right text-foreground placeholder-muted-foreground/60" placeholder="مثال: 500" />
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-2 block">الوصف (اختياري)</label>
                                        <textarea value={rewardDesc} onChange={e => setRewardDesc(e.target.value)} rows={3} className="w-full px-4 py-3 bg-secondary/50 border border-border/40 rounded-xl text-sm outline-none focus:border-primary/40 focus:ring-1 focus:ring-primary focus:shadow-inner-soft transition-all duration-200 resize-none text-right text-foreground placeholder-muted-foreground/60" placeholder="وصف قصير للمكافأة..." />
                                    </div>
                                    <button type="submit" className="w-full linear-button-primary flex items-center justify-center p-3 text-sm"><Plus className="w-4 h-4 mr-2" strokeWidth={2} /> نشر في المتجر</button>
                                </form>
                            ) : (
                                <form onSubmit={handleAddChallenge} className="space-y-4">
                                    <div>
                                        <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-2 block">عنوان التحدي</label>
                                        <input type="text" value={challengeTitle} onChange={e => setChallengeTitle(e.target.value)} required className="w-full px-4 py-3 bg-secondary/50 border border-border/40 rounded-xl text-sm outline-none focus:border-primary/40 focus:ring-1 focus:ring-primary focus:shadow-inner-soft transition-all duration-200 text-right text-foreground placeholder-muted-foreground/60" placeholder="مثال: تحدي المشي الأسبوعي" />
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-2 block">النقاط المستهدفة</label>
                                        <input type="number" value={challengeTarget} onChange={e => setChallengeTarget(e.target.value)} required min="10" className="w-full px-4 py-3 bg-secondary/50 border border-border/40 rounded-xl text-sm outline-none focus:border-primary/40 focus:ring-1 focus:ring-primary focus:shadow-inner-soft transition-all duration-200 text-right text-foreground placeholder-muted-foreground/60" placeholder="مثال: 1000" />
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-2 block">الجائزة عند الإنجاز</label>
                                        <input type="text" value={challengeReward} onChange={e => setChallengeReward(e.target.value)} required className="w-full px-4 py-3 bg-secondary/50 border border-border/40 rounded-xl text-sm outline-none focus:border-primary/40 focus:ring-1 focus:ring-primary focus:shadow-inner-soft transition-all duration-200 text-right text-foreground placeholder-muted-foreground/60" placeholder="مثال: غداء للفريق" />
                                    </div>
                                    <button type="submit" className="w-full linear-button-primary flex items-center justify-center p-3 text-sm"><Plus className="w-4 h-4 mr-2" strokeWidth={2} /> إطلاق التحدي</button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-2 space-y-8">
                    <section>
                        <h3 className="text-sm font-bold text-foreground mb-4 flex items-center gap-2 uppercase tracking-widest"><Target className="w-4 h-4 text-primary" strokeWidth={2} /> التحديات النشطة</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {challenges.map(c => {
                                const progress = Math.min((c.currentPoints / c.targetPoints) * 100, 100)
                                return (
                                    <div key={c.id} className="linear-card p-6 group">
                                        <div className="flex justify-between items-start mb-5">
                                            <div className="w-10 h-10 bg-primary/10 border border-primary/20 text-primary rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300"><Target className="w-5 h-5" strokeWidth={2} /></div>
                                            <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground bg-secondary/50 px-2.5 py-1 rounded-lg border border-border/40">ينتهي في ٣ أيام</span>
                                        </div>
                                        <h4 className="font-bold text-foreground leading-tight mb-2 text-lg">{c.title}</h4>
                                        <p className="text-sm text-muted-foreground mb-6 line-clamp-2 leading-relaxed">{c.description}</p>
                                        <div className="space-y-3">
                                            <div className="flex justify-between text-xs font-bold uppercase tracking-wider">
                                                <span className="text-primary">{Math.round(progress)}% مكتمل</span>
                                                <span className="text-muted-foreground">{c.currentPoints} / {c.targetPoints}</span>
                                            </div>
                                            <div className="w-full bg-secondary h-2.5 rounded-full overflow-hidden border border-border/20 shadow-inner">
                                                <div className="bg-primary h-full rounded-full transition-all duration-1000 relative overflow-hidden" style={{ width: `${progress}%` }}>
                                                    <div className="absolute inset-0 bg-white/20 w-full animate-pulse blur-sm" />
                                                </div>
                                            </div>
                                            <div className="mt-4 pt-4 border-t border-border/40 flex items-center justify-between">
                                                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">الجائزة</span>
                                                <span className="text-sm font-bold text-foreground flex items-center gap-1.5"><Gift className="w-3.5 h-3.5 text-primary" strokeWidth={2} /> {c.rewardTitle}</span>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                            {challenges.length === 0 && (
                                <div className="col-span-2 p-12 text-center bg-secondary/20 rounded-2xl border border-dashed border-border/40">
                                    <PackageOpen className="w-10 h-10 text-muted-foreground/40 mx-auto mb-3" strokeWidth={1.5} />
                                    <p className="text-foreground font-bold">لا توجد تحديات نشطة</p>
                                    <p className="text-sm text-muted-foreground mt-1">أنشئ التحدي الأول من القائمة المجاورة</p>
                                </div>
                            )}
                        </div>
                    </section>

                    <section>
                        <h3 className="text-sm font-bold text-foreground mb-4 flex items-center gap-2 uppercase tracking-widest"><Gift className="w-4 h-4 text-amber-500" strokeWidth={2} /> متجر المكافآت</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            {rewards.map(r => (
                                <div key={r.id} className="linear-card p-5 group min-h-[160px] flex flex-col relative overflow-hidden">
                                    <div className="absolute -top-10 -right-10 w-28 h-28 bg-amber-500/5 rounded-full blur-2xl z-0 transition-transform duration-500 group-hover:scale-150" />
                                    <div className="relative z-10 flex flex-col h-full">
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="w-10 h-10 bg-amber-500/10 border border-amber-500/20 text-amber-500 rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/5"><Gift className="w-5 h-5" strokeWidth={2} /></div>
                                        </div>
                                        <h4 className="font-bold text-foreground text-lg leading-tight mb-2 flex-1">{r.title}</h4>
                                        <div className="flex items-center justify-between pt-4 border-t border-border/40 mt-auto">
                                            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">التكلفة</span>
                                            <span className="font-bold text-amber-500 text-sm">{r.cost} نقطة</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}
