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

            {/* Header Section */}
            <div className="text-center space-y-4">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner border-4 border-white"
                >
                    <Trophy className="w-10 h-10 text-amber-500" />
                </motion.div>
                <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">أبطال الشركة</h2>
                <p className="text-lg text-slate-500 font-medium max-w-lg mx-auto leading-relaxed">
                    تنافسوا، تحركوا معاً، واحتفلوا بالإنجازات. هؤلاء هم الأكثر نشاطاً هذا الأسبوع.
                </p>
            </div>

            {/* Podium Section */}
            <div className="flex items-end justify-center h-[350px] gap-2 sm:gap-6 mt-16 px-4">
                {/* 2nd Place */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex flex-col items-center relative z-10 w-28 sm:w-40"
                >
                    <div className="mb-4 relative group">
                        <Avatar className="w-20 h-20 sm:w-24 sm:h-24 border-4 border-slate-300 shadow-xl group-hover:scale-105 transition-transform">
                            <AvatarImage src={`https://api.dicebear.com/9.x/initials/svg?seed=${top3[1]?.name}&backgroundColor=e2e8f0&textColor=475569&fontSize=36`} />
                            <AvatarFallback className="bg-slate-200 text-slate-600 font-bold text-xl">{top3[1]?.name?.[0]}</AvatarFallback>
                        </Avatar>
                        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-slate-400 text-white text-xs font-black px-3 py-1 rounded-full border-2 border-white shadow-sm flex items-center gap-1">
                            <span>٢</span>
                        </div>
                    </div>
                    <div className="w-full bg-slate-200/80 backdrop-blur-sm rounded-t-3xl border border-slate-300/50 shadow-inner flex flex-col items-center justify-start pt-6 h-[140px] relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-transparent pointer-events-none" />
                        <h4 className="font-bold text-slate-900 text-center text-sm sm:text-base px-2 truncate w-full">{top3[1]?.name?.split(' ')[0]}</h4>
                        <p className="text-lg sm:text-xl font-black text-slate-700 mt-2">{top3[1]?.points.toLocaleString()}</p>
                    </div>
                </motion.div>

                {/* 1st Place */}
                <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center relative z-20 w-32 sm:w-48"
                >
                    <div className="mb-6 relative group">
                        <div className="absolute -inset-4 bg-amber-400/20 rounded-full blur-xl group-hover:bg-amber-400/30 transition-colors pointer-events-none" />
                        <Avatar className="w-28 h-28 sm:w-32 sm:h-32 border-4 border-amber-400 shadow-[0_0_30px_rgba(251,191,36,0.4)] group-hover:scale-110 transition-transform relative z-10">
                            <AvatarImage src={`https://api.dicebear.com/9.x/initials/svg?seed=${top3[0]?.name}&backgroundColor=fef3c7&textColor=92400e&fontSize=36`} />
                            <AvatarFallback className="bg-amber-100 text-amber-700 font-bold text-2xl">{top3[0]?.name?.[0]}</AvatarFallback>
                        </Avatar>
                        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-amber-500 text-white text-sm font-black px-4 py-1.5 rounded-full border-2 border-white shadow-md flex items-center gap-1 z-20">
                            <Medal className="w-4 h-4" /> <span>١</span>
                        </div>
                    </div>
                    <div className="w-full bg-amber-100/90 backdrop-blur-sm rounded-t-3xl border border-amber-200/50 shadow-[inset_0_2px_15px_rgba(251,191,36,0.2)] flex flex-col items-center justify-start pt-8 h-[180px] relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-b from-white/60 to-transparent pointer-events-none" />
                        <h4 className="font-black text-amber-900 text-center text-base sm:text-lg px-2 truncate w-full">{top3[0]?.name?.split(' ')[0]}</h4>
                        <p className="text-2xl sm:text-3xl font-black text-amber-600 mt-2 tracking-tight">{top3[0]?.points.toLocaleString()}</p>
                        <div className="mt-4 bg-amber-200 px-3 py-1 rounded-full shadow-sm">
                            <Star className="w-4 h-4 text-amber-600 fill-current" />
                        </div>
                    </div>
                </motion.div>

                {/* 3rd Place */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="flex flex-col items-center relative z-10 w-28 sm:w-40"
                >
                    <div className="mb-4 relative group">
                        <Avatar className="w-20 h-20 sm:w-24 sm:h-24 border-4 border-orange-300 shadow-xl group-hover:scale-105 transition-transform">
                            <AvatarImage src={`https://api.dicebear.com/9.x/initials/svg?seed=${top3[2]?.name}&backgroundColor=ffedd5&textColor=9a3412&fontSize=36`} />
                            <AvatarFallback className="bg-orange-100 text-orange-700 font-bold text-xl">{top3[2]?.name?.[0]}</AvatarFallback>
                        </Avatar>
                        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-orange-500 text-white text-xs font-black px-3 py-1 rounded-full border-2 border-white shadow-sm flex items-center gap-1">
                            <span>٣</span>
                        </div>
                    </div>
                    <div className="w-full bg-orange-100/80 backdrop-blur-sm rounded-t-3xl border border-orange-200/50 shadow-inner flex flex-col items-center justify-start pt-6 h-[110px] relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-transparent pointer-events-none" />
                        <h4 className="font-bold text-orange-950 text-center text-sm sm:text-base px-2 truncate w-full">{top3[2]?.name?.split(' ')[0]}</h4>
                        <p className="text-lg sm:text-xl font-black text-orange-700 mt-2">{top3[2]?.points.toLocaleString()}</p>
                    </div>
                </motion.div>
            </div>

            {/* Rest of Leaderboard */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
            >
                <Card className="bg-white border text-right border-slate-200 shadow-md rounded-[2rem] overflow-hidden">
                    <CardContent className="p-0">
                        <div className="divide-y divide-slate-100">
                            <div className="p-6 flex items-center justify-between text-right bg-slate-50/80 border-b border-slate-100">
                                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest w-16 text-center">الترتيب</span>
                                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest flex-1 text-right">الموظف</span>
                                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest w-24 text-left">النقاط</span>
                            </div>

                            {[
                                { rank: 4, name: 'نورة العتيبي', dept: 'التسويق', points: 2010, initials: 'ن', seed: 'nora-corp' },
                                { rank: 5, name: 'عبدالله الحربي', dept: 'المبيعات', points: 1830, initials: 'ع', seed: 'abdullah-corp' },
                            ].map((member) => (
                                <div key={member.rank} className="p-4 sm:p-6 flex items-center justify-between hover:bg-slate-50 transition-colors group">
                                    <div className="w-16 text-center font-bold text-slate-400 text-lg">{member.rank}</div>
                                    <div className="flex-1 flex items-center gap-4">
                                        <Avatar className="w-12 h-12 border-2 border-slate-100">
                                            <AvatarImage src={`https://api.dicebear.com/9.x/initials/svg?seed=${member.seed}&backgroundColor=f1f5f9&textColor=475569`} />
                                            <AvatarFallback className="bg-slate-100 text-slate-500 font-bold text-lg">{member.initials}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <h4 className="font-bold text-slate-900 text-base sm:text-lg">{member.name}</h4>
                                            <p className="text-sm font-semibold text-slate-500">{member.dept}</p>
                                        </div>
                                    </div>
                                    <div className="w-24 text-left">
                                        <div className="bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100 inline-block text-left group-hover:bg-white group-hover:border-slate-200 transition-colors">
                                            <span className="font-black text-slate-700 text-base sm:text-lg">{member.points.toLocaleString()}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            <div className="p-4 sm:p-6 flex items-center justify-between hover:bg-slate-50/80 transition-colors group relative bg-orange-50/30">
                                <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-l-full" />
                                <div className="w-16 text-center font-bold text-slate-400 text-lg">١٢</div>
                                <div className="flex-1 flex items-center gap-4">
                                    <Avatar className="w-12 h-12 border-2 border-primary/30 shadow-sm">
                                        <AvatarImage src={`https://api.dicebear.com/9.x/initials/svg?seed=you-emp&backgroundColor=fff7ed&textColor=ea580c`} />
                                        <AvatarFallback className="bg-primary/10 text-primary font-bold">أ</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <h4 className="font-bold text-slate-900 text-base sm:text-lg">أنت</h4>
                                        <p className="text-sm font-semibold text-slate-500">التصميم</p>
                                    </div>
                                </div>
                                <div className="w-24 text-left">
                                    <div className="bg-white px-3 py-1.5 rounded-lg border border-primary/20 inline-block text-left shadow-sm">
                                        <span className="font-black text-slate-900 text-base sm:text-lg">840</span>
                                        <span className="text-[10px] text-slate-400 uppercase font-bold ml-1">نقطة</span>
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
