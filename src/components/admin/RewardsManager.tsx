import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Gift, Target, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useMicroMoveStore } from '@/store/microMoveStore';
import type { Reward, Challenge } from '@/store/microMoveStore';

export const RewardsManager: React.FC = () => {
    const rewards = useMicroMoveStore(state => state.rewards);
    const challenges = useMicroMoveStore(state => state.challenges);
    const addReward = useMicroMoveStore(state => state.addReward);
    const addChallenge = useMicroMoveStore(state => state.addChallenge);

    const [isAddingReward, setIsAddingReward] = useState(false);
    const [rewardTitle, setRewardTitle] = useState('');
    const [rewardCost, setRewardCost] = useState(100);
    const [rewardDesc, setRewardDesc] = useState('');

    const [isAddingChallenge, setIsAddingChallenge] = useState(false);
    const [challengeTitle, setChallengeTitle] = useState('');
    const [challengeTarget, setChallengeTarget] = useState(500);
    const [challengeReward, setChallengeReward] = useState('');
    const [challengeDesc, setChallengeDesc] = useState('');

    const handleCreateReward = () => {
        if (!rewardTitle) return;
        addReward({
            id: `r-${Date.now()}`,
            title: rewardTitle,
            cost: rewardCost,
            description: rewardDesc
        });
        setIsAddingReward(false);
        setRewardTitle(''); setRewardCost(100); setRewardDesc('');
    };

    const handleCreateChallenge = () => {
        if (!challengeTitle) return;
        addChallenge({
            id: `c-${Date.now()}`,
            title: challengeTitle,
            targetPoints: challengeTarget,
            currentPoints: 0,
            rewardTitle: challengeReward,
            description: challengeDesc
        });
        setIsAddingChallenge(false);
        setChallengeTitle(''); setChallengeTarget(500); setChallengeReward(''); setChallengeDesc('');
    };

    return (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 font-sans">
            {/* Rewards Section */}
            <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-200">
                <div className="flex justify-between items-center mb-8 border-b border-slate-100 pb-4">
                    <h2 className="text-2xl font-bold flex items-center gap-3"><Gift className="text-primary" /> Store Inventory</h2>
                    <Button onClick={() => setIsAddingReward(!isAddingReward)} variant={isAddingReward ? "secondary" : "default"}>
                        {isAddingReward ? 'Cancel' : <><Plus className="w-4 h-4 mr-2" /> Add Reward</>}
                    </Button>
                </div>

                {isAddingReward && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mb-8 p-6 bg-slate-50 border border-slate-200 rounded-xl space-y-4">
                        <div className="space-y-4">
                            <div>
                                <label className="text-sm font-semibold text-slate-700">Reward Title</label>
                                <input type="text" value={rewardTitle} onChange={(e) => setRewardTitle(e.target.value)} className="w-full mt-1 px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-primary/20" placeholder="e.g. Leave 1 Hour Early" />
                            </div>
                            <div>
                                <label className="text-sm font-semibold text-slate-700">Cost (Points)</label>
                                <input type="number" value={rewardCost} onChange={(e) => setRewardCost(Number(e.target.value))} className="w-full mt-1 px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-primary/20" />
                            </div>
                            <div>
                                <label className="text-sm font-semibold text-slate-700">Description</label>
                                <input type="text" value={rewardDesc} onChange={(e) => setRewardDesc(e.target.value)} className="w-full mt-1 px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-primary/20" />
                            </div>
                            <Button onClick={handleCreateReward} className="w-full">Create Reward</Button>
                        </div>
                    </motion.div>
                )}

                <div className="space-y-4">
                    {rewards.map((reward: Reward) => (
                        <div key={reward.id} className="flex justify-between items-center p-4 border border-slate-100 rounded-xl hover:border-primary/30 transition-colors group">
                            <div>
                                <h3 className="font-bold text-slate-900 group-hover:text-primary transition-colors">{reward.title}</h3>
                                <p className="text-sm text-slate-500">{reward.description}</p>
                            </div>
                            <div className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full font-bold text-sm shrink-0 shadow-sm border border-amber-200">
                                {reward.cost} pts
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Challenges Section */}
            <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-200">
                <div className="flex justify-between items-center mb-8 border-b border-slate-100 pb-4">
                    <h2 className="text-2xl font-bold flex items-center gap-3"><Target className="text-purple-500" /> Active Challenges</h2>
                    <Button onClick={() => setIsAddingChallenge(!isAddingChallenge)} variant={isAddingChallenge ? "secondary" : "default"} className="bg-purple-600 hover:bg-purple-700 text-white">
                        {isAddingChallenge ? 'Cancel' : <><Plus className="w-4 h-4 mr-2" /> Launch Challenge</>}
                    </Button>
                </div>

                {isAddingChallenge && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mb-8 p-6 bg-purple-50 border border-purple-100 rounded-xl space-y-4">
                        <div className="space-y-4">
                            <div>
                                <label className="text-sm font-semibold text-slate-700">Challenge Title</label>
                                <input type="text" value={challengeTitle} onChange={(e) => setChallengeTitle(e.target.value)} className="w-full mt-1 px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-purple-500/20" placeholder="e.g. Sales Team September Sprint" />
                            </div>
                            <div>
                                <label className="text-sm font-semibold text-slate-700">Description</label>
                                <input type="text" value={challengeDesc} onChange={(e) => setChallengeDesc(e.target.value)} className="w-full mt-1 px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-purple-500/20" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm font-semibold text-slate-700">Target Points</label>
                                    <input type="number" value={challengeTarget} onChange={(e) => setChallengeTarget(Number(e.target.value))} className="w-full mt-1 px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-purple-500/20" />
                                </div>
                                <div>
                                    <label className="text-sm font-semibold text-slate-700">Reward</label>
                                    <input type="text" value={challengeReward} onChange={(e) => setChallengeReward(e.target.value)} className="w-full mt-1 px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-purple-500/20" placeholder="e.g. Pizza Party" />
                                </div>
                            </div>
                            <Button onClick={handleCreateChallenge} className="w-full bg-purple-600 hover:bg-purple-700">Launch Challenge</Button>
                        </div>
                    </motion.div>
                )}

                <div className="space-y-4">
                    {challenges.map((c: Challenge) => {
                        const progress = Math.min(100, (c.currentPoints / c.targetPoints) * 100);
                        return (
                            <div key={c.id} className="p-5 border border-slate-100 rounded-xl bg-gradient-to-br from-white to-purple-50/30">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="font-bold text-slate-900">{c.title}</h3>
                                        <p className="text-sm text-slate-500">{c.description}</p>
                                    </div>
                                    <div className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-bold shrink-0 border border-purple-200">
                                        Goal: {c.targetPoints}
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <div className="flex justify-between text-xs font-medium text-slate-600">
                                        <span>{c.currentPoints} pts</span>
                                        <span>{Math.round(progress)}%</span>
                                    </div>
                                    <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                                        <div className="h-full bg-purple-500 rounded-full" style={{ width: `${progress}%` }} />
                                    </div>
                                </div>
                                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center text-sm font-medium text-slate-700">
                                    <ShieldCheck className="w-4 h-4 text-emerald-500 mr-2" /> Reward: {c.rewardTitle}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );
};
