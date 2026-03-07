import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Medal, Star, Trophy } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useMicroMoveStore } from '@/store/microMoveStore'
import { motion } from 'framer-motion'

export const Leaderboard: React.FC = () => {
    const top3 = useMicroMoveStore(state => state.leaderboardTop3)

    return (
        <div className="max-w-4xl mx-auto space-y-12 pb-24 font-sans text-right">

            <div className="text-center space-y-4">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="w-20 h-20 bg-primary/15 rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-surface-1"
                >
                    <Trophy className="w-10 h-10 text-primary" />
                </motion.div>
                <h2 className="text-4xl md:text-5xl font-black text-text-primary tracking-tight">أبطال الشركة</h2>
                <p className="text-lg text-text-tertiary font-medium max-w-lg mx-auto leading-relaxed">
                    تنافسوا، تحركوا معاً، واحتفلوا بالإنجازات. هؤلاء هم الأكثر نشاطاً هذا الأسبوع.
                </p>
            </div>

            <div className="flex items-end justify-center h-[350px] gap-2 sm:gap-6 mt-16 px-4">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex flex-col items-center relative z-10 w-28 sm:w-40"
                >
                    <div className="mb-4 relative group">
                        <Avatar className="w-20 h-20 sm:w-24 sm:h-24 border-4 border-surface-3 shadow-xl group-hover:scale-105 transition-transform">
                            <AvatarImage src={`https://api.dicebear.com/9.x/initials/svg?seed=${top3[1]?.name}&backgroundColor=27272a&textColor=a1a1aa&fontSize=36`} />
                            <AvatarFallback className="bg-surface-3 text-text-secondary font-bold text-xl">{top3[1]?.name?.[0]}</AvatarFallback>
                        </Avatar>
                        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-surface-3 text-text-secondary text-xs font-black px-3 py-1 rounded-full border-2 border-surface-1 shadow-sm flex items-center gap-1">
                            <span>٢</span>
                        </div>
                    </div>
                    <div className="w-full bg-surface-2/80 backdrop-blur-sm rounded-t-2xl border border-border flex flex-col items-center justify-start pt-6 h-[140px] relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
                        <h4 className="font-bold text-text-primary text-center text-sm sm:text-base px-2 truncate w-full">{top3[1]?.name?.split(' ')[0]}</h4>
                        <p className="text-lg sm:text-xl font-black text-text-secondary mt-2">{top3[1]?.points.toLocaleString()}</p>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center relative z-20 w-32 sm:w-48"
                >
                    <div className="mb-6 relative group">
                        <div className="absolute -inset-4 bg-primary/20 rounded-full blur-xl group-hover:bg-primary/30 transition-colors pointer-events-none" />
                        <Avatar className="w-28 h-28 sm:w-32 sm:h-32 border-4 border-primary shadow-[0_0_30px_rgba(139,92,246,0.4)] group-hover:scale-110 transition-transform relative z-10">
                            <AvatarImage src={`https://api.dicebear.com/9.x/initials/svg?seed=${top3[0]?.name}&backgroundColor=1c1c22&textColor=8b5cf6&fontSize=36`} />
                            <AvatarFallback className="bg-primary/15 text-primary font-bold text-2xl">{top3[0]?.name?.[0]}</AvatarFallback>
                        </Avatar>
                        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-primary text-white text-sm font-black px-4 py-1.5 rounded-full border-2 border-surface-1 shadow-md flex items-center gap-1 z-20">
                            <Medal className="w-4 h-4" /> <span>١</span>
                        </div>
                    </div>
                    <div className="w-full bg-primary/10 backdrop-blur-sm rounded-t-2xl border border-primary/20 shadow-[inset_0_2px_15px_rgba(139,92,246,0.1)] flex flex-col items-center justify-start pt-8 h-[180px] relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
                        <h4 className="font-black text-text-primary text-center text-base sm:text-lg px-2 truncate w-full">{top3[0]?.name?.split(' ')[0]}</h4>
                        <p className="text-2xl sm:text-3xl font-black text-primary mt-2 tracking-tight">{top3[0]?.points.toLocaleString()}</p>
                        <div className="mt-4 bg-primary/20 px-3 py-1 rounded-full">
                            <Star className="w-4 h-4 text-primary fill-current" />
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="flex flex-col items-center relative z-10 w-28 sm:w-40"
                >
                    <div className="mb-4 relative group">
                        <Avatar className="w-20 h-20 sm:w-24 sm:h-24 border-4 border-accent/50 shadow-xl group-hover:scale-105 transition-transform">
                            <AvatarImage src={`https://api.dicebear.com/9.x/initials/svg?seed=${top3[2]?.name}&backgroundColor=1c1c22&textColor=f97316&fontSize=36`} />
                            <AvatarFallback className="bg-accent/15 text-accent font-bold text-xl">{top3[2]?.name?.[0]}</AvatarFallback>
                        </Avatar>
                        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-accent text-white text-xs font-black px-3 py-1 rounded-full border-2 border-surface-1 shadow-sm flex items-center gap-1">
                            <span>٣</span>
                        </div>
                    </div>
                    <div className="w-full bg-accent/10 backdrop-blur-sm rounded-t-2xl border border-accent/20 flex flex-col items-center justify-start pt-6 h-[110px] relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
                        <h4 className="font-bold text-text-primary text-center text-sm sm:text-base px-2 truncate w-full">{top3[2]?.name?.split(' ')[0]}</h4>
                        <p className="text-lg sm:text-xl font-black text-accent mt-2">{top3[2]?.points.toLocaleString()}</p>
                    </div>
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
            >
                <Card className="bg-surface-1 border text-right border-border rounded-xl overflow-hidden">
                    <CardContent className="p-0">
                        <div className="divide-y divide-border">
                            <div className="p-6 flex items-center justify-between text-right bg-surface-2/50 border-b border-border">
                                <span className="text-xs font-bold text-text-quaternary uppercase tracking-widest w-16 text-center">الترتيب</span>
                                <span className="text-xs font-bold text-text-quaternary uppercase tracking-widest flex-1 text-right">الموظف</span>
                                <span className="text-xs font-bold text-text-quaternary uppercase tracking-widest w-24 text-left">النقاط</span>
                            </div>

                            {[
                                { rank: 4, name: 'نورة العتيبي', dept: 'التسويق', points: 2010, initials: 'ن', seed: 'nora-corp' },
                                { rank: 5, name: 'عبدالله الحربي', dept: 'المبيعات', points: 1830, initials: 'ع', seed: 'abdullah-corp' },
                            ].map((member) => (
                                <div key={member.rank} className="p-4 sm:p-6 flex items-center justify-between hover:bg-surface-2/50 transition-colors group">
                                    <div className="w-16 text-center font-bold text-text-quaternary text-lg">{member.rank}</div>
                                    <div className="flex-1 flex items-center gap-4">
                                        <Avatar className="w-12 h-12 border-2 border-border">
                                            <AvatarImage src={`https://api.dicebear.com/9.x/initials/svg?seed=${member.seed}&backgroundColor=1c1c22&textColor=a1a1aa`} />
                                            <AvatarFallback className="bg-surface-2 text-text-tertiary font-bold text-lg">{member.initials}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <h4 className="font-bold text-text-primary text-base sm:text-lg">{member.name}</h4>
                                            <p className="text-sm font-semibold text-text-tertiary">{member.dept}</p>
                                        </div>
                                    </div>
                                    <div className="w-24 text-left">
                                        <div className="bg-surface-2 px-3 py-1.5 rounded-lg border border-border inline-block text-left group-hover:bg-surface-3 transition-colors">
                                            <span className="font-black text-text-primary text-base sm:text-lg">{member.points.toLocaleString()}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            <div className="p-4 sm:p-6 flex items-center justify-between hover:bg-surface-2/50 transition-colors group relative bg-primary/5">
                                <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-l-full" />
                                <div className="w-16 text-center font-bold text-text-quaternary text-lg">١٢</div>
                                <div className="flex-1 flex items-center gap-4">
                                    <Avatar className="w-12 h-12 border-2 border-primary/30 shadow-sm">
                                        <AvatarImage src={`https://api.dicebear.com/9.x/initials/svg?seed=you-emp&backgroundColor=1c1c22&textColor=8b5cf6`} />
                                        <AvatarFallback className="bg-primary/10 text-primary font-bold">أ</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <h4 className="font-bold text-text-primary text-base sm:text-lg">أنت</h4>
                                        <p className="text-sm font-semibold text-text-tertiary">التصميم</p>
                                    </div>
                                </div>
                                <div className="w-24 text-left">
                                    <div className="bg-surface-2 px-3 py-1.5 rounded-lg border border-primary/20 inline-block text-left shadow-sm">
                                        <span className="font-black text-text-primary text-base sm:text-lg">840</span>
                                        <span className="text-xs text-text-quaternary uppercase font-bold ml-1">نقطة</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    )
}
