import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Gift, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { useStore } from '@/store/useStore'
import { toast } from 'sonner'

export const Rewards: React.FC = () => {
    const { user } = useStore()

    const rewards = [
        { id: '1', title: 'Extra 1 Hour Off', cost: 5000, description: 'Redeem for an early finish on Thursday.', color: 'bg-blue-500' },
        { id: '2', title: 'Wellness Kit', cost: 2500, description: 'Premium yoga mat and massage ball set.', color: 'bg-teal-500' },
        { id: '3', title: 'Coffee Voucher', cost: 500, description: 'Get a free specialty coffee at Brews & Moves.', color: 'bg-orange-500' },
    ]

    return (
        <div className="pb-10">
            <div className="mb-10 flex flex-col md:flex-row items-stretch gap-6">
                <div className="flex-1 bg-slate-900 text-white p-8 rounded-[2.5rem] flex items-center justify-between overflow-hidden relative group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl group-hover:bg-primary/30 transition-colors" />
                    <div className="relative z-10">
                        <p className="text-xs text-slate-400 font-black uppercase tracking-[0.2em] mb-2">Available Balance</p>
                        <div className="flex items-baseline gap-2">
                            <p className="text-5xl font-black tracking-tight">{user.points.toLocaleString()}</p>
                            <p className="text-primary font-bold">PTS</p>
                        </div>
                    </div>
                    <motion.div
                        whileHover={{ rotate: 12, scale: 1.1 }}
                        className="relative z-10 p-5 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10"
                    >
                        <Gift className="w-8 h-8 text-primary shadow-glow" />
                    </motion.div>
                </div>

                <div className="md:w-72 bg-white border border-slate-100 p-8 rounded-[2.5rem] flex flex-col justify-center">
                    <p className="text-xs text-slate-400 font-black uppercase tracking-widest mb-1">Lifetime Earned</p>
                    <p className="text-2xl font-black text-slate-900">{Math.round(user.points * 1.5).toLocaleString()}</p>
                    <div className="mt-4 flex gap-1">
                        {[1, 2, 3, 4, 5].map(i => <div key={i} className={`h-1 flex-1 rounded-full ${i <= 4 ? 'bg-primary' : 'bg-slate-100'}`} />)}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {rewards.map((reward, index) => {
                    const progress = Math.min((user.points / reward.cost) * 100, 100)

                    return (
                        <motion.div
                            key={reward.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="h-full"
                        >
                            <Card className="border-none shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden bg-white group h-full flex flex-col rounded-[2rem]">
                                <CardContent className="p-8 flex flex-col h-full">
                                    <div className="flex justify-between items-start mb-6">
                                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg ${reward.color} group-hover:scale-110 transition-transform`}>
                                            <Gift className="w-6 h-6" />
                                        </div>
                                        <div className="text-right">
                                            <p className="text-2xl font-black text-slate-900 leading-none">{reward.cost.toLocaleString()}</p>
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Points</p>
                                        </div>
                                    </div>

                                    <div className="flex-1 space-y-2 mb-8">
                                        <h3 className="font-black text-xl text-slate-900 tracking-tight">{reward.title}</h3>
                                        <p className="text-sm text-slate-500 font-medium leading-relaxed">{reward.description}</p>
                                    </div>

                                    <div className="space-y-3">
                                        <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                                            <span className="text-slate-400">Redemption Goal</span>
                                            <span className="text-primary">{Math.round(progress)}%</span>
                                        </div>
                                        <Progress value={progress} className="h-2.5 bg-slate-50 border border-slate-100" />
                                    </div>

                                    <button
                                        onClick={() => {
                                            toast.success('Reward Claimed successfully!', {
                                                description: `${reward.title} will be sent to your inbox shortly.`
                                            })
                                        }}
                                        disabled={user.points < reward.cost}
                                        className={`mt-8 w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-black tracking-widest uppercase text-xs transition-all ${user.points >= reward.cost
                                            ? 'bg-primary text-white shadow-lg shadow-primary/30 hover:shadow-primary/40 hover:-translate-y-1 active:translate-y-0'
                                            : 'bg-slate-50 text-slate-300 cursor-not-allowed border border-slate-100'
                                            }`}
                                    >
                                        {user.points >= reward.cost ? 'Claim Reward' : 'Needs More Points'}
                                        <ArrowRight className={`w-4 h-4 ${user.points >= reward.cost ? 'animate-bounce-x' : ''}`} />
                                    </button>
                                </CardContent>
                            </Card>
                        </motion.div>
                    )
                })}
            </div>
        </div>
    )
}
