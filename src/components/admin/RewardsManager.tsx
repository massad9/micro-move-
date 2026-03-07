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
                    <h1 className="text-2xl font-bold text-text-primary tracking-tight">متجر المكافآت والتحديات</h1>
                    <p className="text-text-tertiary mt-1 text-sm leading-relaxed">حفز فريقك من خلال مكافآت وتحديات مخصصة.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-surface-1 border border-border rounded-xl shadow-soft overflow-hidden text-right">
                        <div className="flex border-b border-border">
                            <button
                                onClick={() => setActiveTab('rewards')}
                                className={`flex-1 py-4 text-sm font-semibold transition-colors duration-200 ${activeTab === 'rewards' ? 'bg-primary/10 text-primary border-b-2 border-primary' : 'text-text-tertiary hover:bg-surface-2'}`}
                            >
                                <Gift className="w-4 h-4 mx-auto mb-1" strokeWidth={1.5} />
                                مكافأة فردية
                            </button>
                            <button
                                onClick={() => setActiveTab('challenges')}
                                className={`flex-1 py-4 text-sm font-semibold transition-colors duration-200 ${activeTab === 'challenges' ? 'bg-primary/10 text-primary border-b-2 border-primary' : 'text-text-tertiary hover:bg-surface-2'}`}
                            >
                                <Target className="w-4 h-4 mx-auto mb-1" strokeWidth={1.5} />
                                تحدي جماعي
                            </button>
                        </div>
                        <div className="p-6">
                            {activeTab === 'rewards' ? (
                                <form onSubmit={handleAddReward} className="space-y-4">
                                    <div>
                                        <label htmlFor="reward-title" className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-2 block">عنوان المكافأة</label>
                                        <input id="reward-title" type="text" value={rewardTitle} onChange={e => setRewardTitle(e.target.value)} required className="w-full px-4 py-2.5 bg-surface-2 border border-border rounded-lg text-sm focus-visible:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-colors duration-200 text-right text-text-primary placeholder:text-text-quaternary" placeholder="مثال: ساعة راحة إضافية" />
                                    </div>
                                    <div>
                                        <label htmlFor="reward-cost" className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-2 block">التكلفة (نقطة)</label>
                                        <input id="reward-cost" type="number" value={rewardCost} onChange={e => setRewardCost(e.target.value)} required min="1" className="w-full px-4 py-2.5 bg-surface-2 border border-border rounded-lg text-sm focus-visible:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-colors duration-200 text-right text-text-primary placeholder:text-text-quaternary" placeholder="مثال: 500" />
                                    </div>
                                    <div>
                                        <label htmlFor="reward-desc" className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-2 block">الوصف (اختياري)</label>
                                        <textarea id="reward-desc" value={rewardDesc} onChange={e => setRewardDesc(e.target.value)} rows={3} className="w-full px-4 py-2.5 bg-surface-2 border border-border rounded-lg text-sm focus-visible:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-colors duration-200 resize-none text-right text-text-primary placeholder:text-text-quaternary" placeholder="وصف قصير للمكافأة..." />
                                    </div>
                                    <Button type="submit" className="w-full bg-primary hover:bg-primary/90 font-semibold shadow-soft transition-colors duration-200"><Plus className="w-4 h-4 mr-2" strokeWidth={1.5} /> نشر في المتجر</Button>
                                </form>
                            ) : (
                                <form onSubmit={handleAddChallenge} className="space-y-4">
                                    <div>
                                        <label htmlFor="challenge-title" className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-2 block">عنوان التحدي</label>
                                        <input id="challenge-title" type="text" value={challengeTitle} onChange={e => setChallengeTitle(e.target.value)} required className="w-full px-4 py-2.5 bg-surface-2 border border-border rounded-lg text-sm focus-visible:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-colors duration-200 text-right text-text-primary placeholder:text-text-quaternary" placeholder="مثال: تحدي المشي الأسبوعي" />
                                    </div>
                                    <div>
                                        <label htmlFor="challenge-target" className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-2 block">النقاط المستهدفة</label>
                                        <input id="challenge-target" type="number" value={challengeTarget} onChange={e => setChallengeTarget(e.target.value)} required min="10" className="w-full px-4 py-2.5 bg-surface-2 border border-border rounded-lg text-sm focus-visible:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-colors duration-200 text-right text-text-primary placeholder:text-text-quaternary" placeholder="مثال: 1000" />
                                    </div>
                                    <div>
                                        <label htmlFor="challenge-reward" className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-2 block">الجائزة عند الإنجاز</label>
                                        <input id="challenge-reward" type="text" value={challengeReward} onChange={e => setChallengeReward(e.target.value)} required className="w-full px-4 py-2.5 bg-surface-2 border border-border rounded-lg text-sm focus-visible:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-colors duration-200 text-right text-text-primary placeholder:text-text-quaternary" placeholder="مثال: غداء للفريق" />
                                    </div>
                                    <Button type="submit" className="w-full bg-surface-3 hover:bg-surface-3/80 font-semibold text-text-primary shadow-soft border border-border transition-colors duration-200"><Plus className="w-4 h-4 mr-2" strokeWidth={1.5} /> إطلاق التحدي</Button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-2 space-y-8">
                    <section>
                        <h3 className="text-base font-bold text-text-primary mb-4 flex items-center gap-2"><Target className="w-5 h-5 text-primary" strokeWidth={1.5} /> التحديات النشطة</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {challenges.map(c => {
                                const progress = Math.min((c.currentPoints / c.targetPoints) * 100, 100)
                                return (
                                    <div key={c.id} className="bg-surface-1 border border-border p-5 rounded-xl shadow-soft group hover:shadow-glow-sm hover:border-primary/20 transition-all duration-200">
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="w-10 h-10 bg-primary/10 text-primary rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200"><Target className="w-5 h-5" strokeWidth={1.5} /></div>
                                            <span className="text-xs font-semibold uppercase tracking-wider text-text-quaternary bg-surface-2 px-2 py-1 rounded-lg border border-border">ينتهي في ٣ أيام</span>
                                        </div>
                                        <h4 className="font-semibold text-text-primary leading-tight mb-1">{c.title}</h4>
                                        <p className="text-xs text-text-tertiary mb-4 line-clamp-2 leading-relaxed">{c.description}</p>
                                        <div className="space-y-2">
                                            <div className="flex justify-between text-xs font-semibold">
                                                <span className="text-primary">{Math.round(progress)}% مكتمل</span>
                                                <span className="text-text-quaternary">{c.currentPoints} / {c.targetPoints}</span>
                                            </div>
                                            <div className="w-full bg-surface-3 h-2 rounded-full overflow-hidden">
                                                <div className="bg-primary h-full rounded-full transition-[width] duration-1000" style={{ width: `${progress}%` }} />
                                            </div>
                                            <div className="mt-3 pt-3 border-t border-border flex items-center justify-between">
                                                <span className="text-xs font-medium text-text-quaternary uppercase tracking-wider">الجائزة</span>
                                                <span className="text-sm font-semibold text-text-primary flex items-center gap-1.5"><Gift className="w-3.5 h-3.5 text-primary" strokeWidth={1.5} /> {c.rewardTitle}</span>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                            {challenges.length === 0 && (
                                <div className="col-span-2 p-12 text-center bg-surface-2 rounded-xl border border-dashed border-border">
                                    <PackageOpen className="w-10 h-10 text-text-quaternary mx-auto mb-3" strokeWidth={1.5} />
                                    <p className="text-text-tertiary font-medium">لا توجد تحديات نشطة</p>
                                    <p className="text-sm text-text-quaternary mt-1">أنشئ التحدي الأول من القائمة المجاورة</p>
                                </div>
                            )}
                        </div>
                    </section>

                    <section>
                        <h3 className="text-base font-bold text-text-primary mb-4 flex items-center gap-2"><Gift className="w-5 h-5 text-amber-400" strokeWidth={1.5} /> متجر المكافآت</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            {rewards.map(r => (
                                <div key={r.id} className="bg-surface-1 border border-border p-5 rounded-xl shadow-soft hover:shadow-glow-sm transition-all duration-200 relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 w-16 h-16 bg-amber-500/5 rounded-bl-[100px] z-0 transition-transform duration-300 group-hover:scale-150" />
                                    <div className="relative z-10 flex flex-col h-full">
                                        <div className="flex justify-between items-start mb-6">
                                            <div className="w-10 h-10 bg-amber-500/10 text-amber-400 rounded-lg flex items-center justify-center"><Gift className="w-5 h-5" strokeWidth={1.5} /></div>
                                        </div>
                                        <h4 className="font-semibold text-text-primary text-base leading-tight mb-2 flex-1">{r.title}</h4>
                                        <div className="flex items-center justify-between pt-4 border-t border-border mt-auto">
                                            <span className="text-xs font-medium text-text-quaternary uppercase tracking-wider">التكلفة</span>
                                            <span className="font-bold text-amber-400">{r.cost} نقطه</span>
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
