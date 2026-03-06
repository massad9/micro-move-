import React, { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Gift, Target, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useMicroMoveStore } from '@/store/microMoveStore'

export const RewardsManager: React.FC = () => {
    const rewards = useMicroMoveStore(state => state.rewards)
    const challenges = useMicroMoveStore(state => state.challenges)
    const addReward = useMicroMoveStore(state => state.addReward)
    const addChallenge = useMicroMoveStore(state => state.addChallenge)

    const [activeTab, setActiveTab] = useState<'rewards' | 'challenges'>('rewards')

    // New Reward Form
    const [rewardTitle, setRewardTitle] = useState('')
    const [rewardCost, setRewardCost] = useState('')
    const [rewardDesc, setRewardDesc] = useState('')

    // New Challenge Form
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
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">متجر المكافآت والتحديات</h1>
                    <p className="text-slate-500 mt-1">حفز فريقك من خلال مكافآت وتحديات مخصصة.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Col: Creator Forms */}
                <div className="lg:col-span-1 space-y-6">
                    <Card className="bg-white border text-right border-slate-200 shadow-sm overflow-hidden">
                        <div className="flex border-b border-slate-100">
                            <button
                                onClick={() => setActiveTab('rewards')}
                                className={`flex-1 py-4 text-sm font-bold transition-colors ${activeTab === 'rewards' ? 'bg-amber-50 text-amber-600 border-b-2 border-amber-500' : 'text-slate-500 hover:bg-slate-50'}`}
                            >
                                <Gift className="w-4 h-4 mx-auto mb-1" />
                                مكافأة فردية
                            </button>
                            <button
                                onClick={() => setActiveTab('challenges')}
                                className={`flex-1 py-4 text-sm font-bold transition-colors ${activeTab === 'challenges' ? 'bg-orange-50 text-orange-600 border-b-2 border-orange-500' : 'text-slate-500 hover:bg-slate-50'}`}
                            >
                                <Target className="w-4 h-4 mx-auto mb-1" />
                                تحدي جماعي
                            </button>
                        </div>
                        <CardContent className="p-6">
                            {activeTab === 'rewards' ? (
                                <form onSubmit={handleAddReward} className="space-y-4">
                                    <div>
                                        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 block">عنوان المكافأة</label>
                                        <input type="text" value={rewardTitle} onChange={e => setRewardTitle(e.target.value)} required className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all text-right" placeholder="مثال: ساعة راحة إضافية" />
                                    </div>
                                    <div>
                                        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 block">التكلفة (نقطة)</label>
                                        <input type="number" value={rewardCost} onChange={e => setRewardCost(e.target.value)} required min="1" className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all text-right" placeholder="مثال: 500" />
                                    </div>
                                    <div>
                                        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 block">الوصف (اختياري)</label>
                                        <textarea value={rewardDesc} onChange={e => setRewardDesc(e.target.value)} rows={3} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all resize-none text-right" placeholder="وصف قصير للمكافأة..." />
                                    </div>
                                    <Button type="submit" className="w-full bg-amber-500 hover:bg-amber-600 font-bold shadow-md"><Plus className="w-4 h-4 mr-2" /> نشر في المتجر</Button>
                                </form>
                            ) : (
                                <form onSubmit={handleAddChallenge} className="space-y-4">
                                    <div>
                                        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 block">عنوان التحدي</label>
                                        <input type="text" value={challengeTitle} onChange={e => setChallengeTitle(e.target.value)} required className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all text-right" placeholder="مثال: تحدي المشي الأسبوعي" />
                                    </div>
                                    <div>
                                        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 block">النقاط المستهدفة</label>
                                        <input type="number" value={challengeTarget} onChange={e => setChallengeTarget(e.target.value)} required min="10" className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all text-right" placeholder="مثال: 1000" />
                                    </div>
                                    <div>
                                        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 block">الجائزة عند الإنجاز</label>
                                        <input type="text" value={challengeReward} onChange={e => setChallengeReward(e.target.value)} required className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all text-right" placeholder="مثال: غداء للفريق" />
                                    </div>
                                    <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700 font-bold text-white shadow-md"><Plus className="w-4 h-4 mr-2" /> إطلاق التحدي</Button>
                                </form>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Right Col: Active Items */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Active Challenges */}
                    <section>
                        <h3 className="text-lg font-bold text-slate-900 mb-4 flexItems-center gap-2"><Target className="w-5 h-5 text-orange-500" /> التحديات النشطة</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {challenges.map(c => {
                                const progress = Math.min((c.currentPoints / c.targetPoints) * 100, 100)
                                return (
                                    <div key={c.id} className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm group hover:border-orange-200 transition-colors">
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="w-10 h-10 bg-orange-50 text-orange-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform"><Target className="w-5 h-5" /></div>
                                            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-50 px-2 py-1 rounded-md">ينتهي في ٣ أيام</span>
                                        </div>
                                        <h4 className="font-bold text-slate-900 leading-tight mb-1">{c.title}</h4>
                                        <p className="text-xs text-slate-500 mb-4 line-clamp-2">{c.description}</p>
                                        <div className="space-y-2">
                                            <div className="flex justify-between text-xs font-bold">
                                                <span className="text-orange-600">{Math.round(progress)}% مكتمل</span>
                                                <span className="text-slate-400">{c.currentPoints} / {c.targetPoints}</span>
                                            </div>
                                            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                                                <div className="bg-orange-500 h-full rounded-full transition-all duration-1000" style={{ width: `${progress}%` }} />
                                            </div>
                                            <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between">
                                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">الجائزة</span>
                                                <span className="text-sm font-bold text-slate-900 flex items-center gap-1.5"><Gift className="w-3.5 h-3.5 text-orange-500" /> {c.rewardTitle}</span>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                            {challenges.length === 0 && (
                                <div className="col-span-2 p-8 text-center text-slate-500 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                                    لا توجد تحديات نشطة. أنشئ التحدي الأول من القائمة المجاورة.
                                </div>
                            )}
                        </div>
                    </section>

                    {/* Rewards Catalog */}
                    <section>
                        <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2"><Gift className="w-5 h-5 text-amber-500" /> متجر المكافآت</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            {rewards.map(r => (
                                <div key={r.id} className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 w-16 h-16 bg-amber-500/5 rounded-bl-[100px] z-0 transition-transform group-hover:scale-150" />
                                    <div className="relative z-10 flex flex-col h-full">
                                        <div className="flex justify-between items-start mb-6">
                                            <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center"><Gift className="w-5 h-5" /></div>
                                        </div>
                                        <h4 className="font-bold text-slate-900 text-lg leading-tight mb-2 flex-1">{r.title}</h4>
                                        <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-auto">
                                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">التكلفة</span>
                                            <span className="font-black text-amber-500">{r.cost} نقطه</span>
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
