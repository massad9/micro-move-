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
                    <h1 className="text-2xl font-bold text-[#111827] tracking-tight">متجر المكافآت والتحديات</h1>
                    <p className="text-[#6B7280] mt-1 text-sm leading-relaxed">حفز فريقك من خلال مكافآت وتحديات مخصصة.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white border border-[#E5E7EB] rounded-2xl shadow-soft overflow-hidden text-right">
                        <div className="flex border-b border-[#E5E7EB]">
                            <button
                                onClick={() => setActiveTab('rewards')}
                                className={`flex-1 py-4 text-sm font-semibold transition-colors duration-200 ${activeTab === 'rewards' ? 'bg-[#FFF7ED] text-primary border-b-2 border-primary' : 'text-[#6B7280] hover:bg-[#F9FAFB]'}`}
                            >
                                <Gift className="w-4 h-4 mx-auto mb-1" strokeWidth={1.5} />
                                مكافأة فردية
                            </button>
                            <button
                                onClick={() => setActiveTab('challenges')}
                                className={`flex-1 py-4 text-sm font-semibold transition-colors duration-200 ${activeTab === 'challenges' ? 'bg-[#FFF7ED] text-primary border-b-2 border-primary' : 'text-[#6B7280] hover:bg-[#F9FAFB]'}`}
                            >
                                <Target className="w-4 h-4 mx-auto mb-1" strokeWidth={1.5} />
                                تحدي جماعي
                            </button>
                        </div>
                        <div className="p-6">
                            {activeTab === 'rewards' ? (
                                <form onSubmit={handleAddReward} className="space-y-4">
                                    <div>
                                        <label htmlFor="reward-title" className="text-xs font-semibold text-[#374151] uppercase tracking-wider mb-2 block">عنوان المكافأة</label>
                                        <input id="reward-title" type="text" value={rewardTitle} onChange={e => setRewardTitle(e.target.value)} required className="w-full px-4 py-2.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl text-sm focus-visible:outline-none focus:border-primary/40 focus:ring-2 focus:ring-primary/10 focus:shadow-inner-soft transition-colors duration-200 text-right text-[#111827] placeholder-[#9CA3AF]" placeholder="مثال: ساعة راحة إضافية" />
                                    </div>
                                    <div>
                                        <label htmlFor="reward-cost" className="text-xs font-semibold text-[#374151] uppercase tracking-wider mb-2 block">التكلفة (نقطة)</label>
                                        <input id="reward-cost" type="number" value={rewardCost} onChange={e => setRewardCost(e.target.value)} required min="1" className="w-full px-4 py-2.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl text-sm focus-visible:outline-none focus:border-primary/40 focus:ring-2 focus:ring-primary/10 focus:shadow-inner-soft transition-colors duration-200 text-right text-[#111827] placeholder-[#9CA3AF]" placeholder="مثال: 500" />
                                    </div>
                                    <div>
                                        <label htmlFor="reward-desc" className="text-xs font-semibold text-[#374151] uppercase tracking-wider mb-2 block">الوصف (اختياري)</label>
                                        <textarea id="reward-desc" value={rewardDesc} onChange={e => setRewardDesc(e.target.value)} rows={3} className="w-full px-4 py-2.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl text-sm focus-visible:outline-none focus:border-primary/40 focus:ring-2 focus:ring-primary/10 focus:shadow-inner-soft transition-colors duration-200 resize-none text-right text-[#111827] placeholder-[#9CA3AF]" placeholder="وصف قصير للمكافأة..." />
                                    </div>
                                    <Button type="submit" className="w-full bg-primary hover:bg-primary/90 font-semibold shadow-soft transition-colors duration-200"><Plus className="w-4 h-4 mr-2" strokeWidth={1.5} /> نشر في المتجر</Button>
                                </form>
                            ) : (
                                <form onSubmit={handleAddChallenge} className="space-y-4">
                                    <div>
                                        <label htmlFor="challenge-title" className="text-xs font-semibold text-[#374151] uppercase tracking-wider mb-2 block">عنوان التحدي</label>
                                        <input id="challenge-title" type="text" value={challengeTitle} onChange={e => setChallengeTitle(e.target.value)} required className="w-full px-4 py-2.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl text-sm focus-visible:outline-none focus:border-primary/40 focus:ring-2 focus:ring-primary/10 focus:shadow-inner-soft transition-colors duration-200 text-right text-[#111827] placeholder-[#9CA3AF]" placeholder="مثال: تحدي المشي الأسبوعي" />
                                    </div>
                                    <div>
                                        <label htmlFor="challenge-target" className="text-xs font-semibold text-[#374151] uppercase tracking-wider mb-2 block">النقاط المستهدفة</label>
                                        <input id="challenge-target" type="number" value={challengeTarget} onChange={e => setChallengeTarget(e.target.value)} required min="10" className="w-full px-4 py-2.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl text-sm focus-visible:outline-none focus:border-primary/40 focus:ring-2 focus:ring-primary/10 focus:shadow-inner-soft transition-colors duration-200 text-right text-[#111827] placeholder-[#9CA3AF]" placeholder="مثال: 1000" />
                                    </div>
                                    <div>
                                        <label htmlFor="challenge-reward" className="text-xs font-semibold text-[#374151] uppercase tracking-wider mb-2 block">الجائزة عند الإنجاز</label>
                                        <input id="challenge-reward" type="text" value={challengeReward} onChange={e => setChallengeReward(e.target.value)} required className="w-full px-4 py-2.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl text-sm focus-visible:outline-none focus:border-primary/40 focus:ring-2 focus:ring-primary/10 focus:shadow-inner-soft transition-colors duration-200 text-right text-[#111827] placeholder-[#9CA3AF]" placeholder="مثال: غداء للفريق" />
                                    </div>
                                    <Button type="submit" className="w-full bg-[#111827] hover:bg-[#1F2937] font-semibold text-white shadow-soft transition-colors duration-200"><Plus className="w-4 h-4 mr-2" strokeWidth={1.5} /> إطلاق التحدي</Button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-2 space-y-8">
                    <section>
                        <h3 className="text-base font-bold text-[#111827] mb-4 flex items-center gap-2"><Target className="w-5 h-5 text-primary" strokeWidth={1.5} /> التحديات النشطة</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {challenges.map(c => {
                                const progress = Math.min((c.currentPoints / c.targetPoints) * 100, 100)
                                return (
                                    <div key={c.id} className="bg-white border border-[#E5E7EB] p-5 rounded-2xl shadow-soft group hover:shadow-soft-md hover:border-primary/20 transition-colors duration-200">
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="w-10 h-10 bg-[#FFF7ED] text-primary rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200"><Target className="w-5 h-5" strokeWidth={1.5} /></div>
                                            <span className="text-[10px] font-semibold uppercase tracking-wider text-[#9CA3AF] bg-[#F9FAFB] px-2 py-1 rounded-lg border border-[#E5E7EB]">ينتهي في ٣ أيام</span>
                                        </div>
                                        <h4 className="font-semibold text-[#111827] leading-tight mb-1">{c.title}</h4>
                                        <p className="text-xs text-[#6B7280] mb-4 line-clamp-2 leading-relaxed">{c.description}</p>
                                        <div className="space-y-2">
                                            <div className="flex justify-between text-xs font-semibold">
                                                <span className="text-primary">{Math.round(progress)}% مكتمل</span>
                                                <span className="text-[#9CA3AF]">{c.currentPoints} / {c.targetPoints}</span>
                                            </div>
                                            <div className="w-full bg-[#F3F4F6] h-2 rounded-full overflow-hidden">
                                                <div className="bg-primary h-full rounded-full transition-[width] duration-1000" style={{ width: `${progress}%` }} />
                                            </div>
                                            <div className="mt-3 pt-3 border-t border-[#F3F4F6] flex items-center justify-between">
                                                <span className="text-[10px] font-medium text-[#9CA3AF] uppercase tracking-wider">الجائزة</span>
                                                <span className="text-sm font-semibold text-[#111827] flex items-center gap-1.5"><Gift className="w-3.5 h-3.5 text-primary" strokeWidth={1.5} /> {c.rewardTitle}</span>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                            {challenges.length === 0 && (
                                <div className="col-span-2 p-12 text-center bg-[#F9FAFB] rounded-2xl border border-dashed border-[#D1D5DB]">
                                    <PackageOpen className="w-10 h-10 text-[#D1D5DB] mx-auto mb-3" strokeWidth={1.5} />
                                    <p className="text-[#6B7280] font-medium">لا توجد تحديات نشطة</p>
                                    <p className="text-sm text-[#9CA3AF] mt-1">أنشئ التحدي الأول من القائمة المجاورة</p>
                                </div>
                            )}
                        </div>
                    </section>

                    <section>
                        <h3 className="text-base font-bold text-[#111827] mb-4 flex items-center gap-2"><Gift className="w-5 h-5 text-amber-500" strokeWidth={1.5} /> متجر المكافآت</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            {rewards.map(r => (
                                <div key={r.id} className="bg-white border border-[#E5E7EB] p-5 rounded-2xl shadow-soft hover:shadow-soft-md transition-colors duration-200 relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 w-16 h-16 bg-amber-50 rounded-bl-[100px] z-0 transition-transform duration-300 group-hover:scale-150" />
                                    <div className="relative z-10 flex flex-col h-full">
                                        <div className="flex justify-between items-start mb-6">
                                            <div className="w-10 h-10 bg-amber-50 text-amber-500 rounded-xl flex items-center justify-center"><Gift className="w-5 h-5" strokeWidth={1.5} /></div>
                                        </div>
                                        <h4 className="font-semibold text-[#111827] text-base leading-tight mb-2 flex-1">{r.title}</h4>
                                        <div className="flex items-center justify-between pt-4 border-t border-[#F3F4F6] mt-auto">
                                            <span className="text-[10px] font-medium text-[#9CA3AF] uppercase tracking-wider">التكلفة</span>
                                            <span className="font-bold text-amber-500">{r.cost} نقطه</span>
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
