import React, { useState } from 'react'
import { useMicroMoveStore } from '@/store/microMoveStore'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { TrendingUp, TrendingDown, Minus, Users, Crown } from 'lucide-react'

export const EmployeeList: React.FC = () => {
    const leaderboard = useMicroMoveStore(state => state.leaderboardTop3)
    const [sort, setSort] = useState<'points' | 'name'>('points')

    const employees = [
        ...leaderboard.map(l => ({ ...l, department: l.name.includes('(You)') ? 'الهندسة' : 'المبيعات', status: l.rank === 1 ? 'High' : 'Medium' })),
        { id: '10', name: 'سارة أحمد', points: 120, avatar: '', rank: 4, trend: 'down', department: 'التسويق', status: 'Low' },
        { id: '11', name: 'خالد محمد', points: 95, avatar: '', rank: 5, trend: 'flat', department: 'الهندسة', status: 'Low' },
    ].sort((a, b) => sort === 'points' ? b.points - a.points : a.name.localeCompare(b.name))

    const getStatusColor = (status: string) => {
        if (status === 'High') return 'bg-emerald-50 text-emerald-700 border-emerald-200'
        if (status === 'Medium') return 'bg-amber-50 text-amber-700 border-amber-200'
        return 'bg-red-50 text-red-600 border-red-100'
    }

    const getStatusLabel = (status: string) => {
        if (status === 'High') return 'ممتاز'
        if (status === 'Medium') return 'متوسط'
        return 'بحاجة لتنبيه'
    }

    return (
        <div className="bg-white border border-[#E5E7EB] rounded-2xl shadow-soft font-sans h-full flex flex-col">
            <div className="p-6 border-b border-[#E5E7EB] flex justify-between items-center">
                <div>
                    <h2 className="text-lg font-bold text-[#111827] tracking-tight flex items-center gap-2">
                        <Users className="w-5 h-5 text-[#9CA3AF]" strokeWidth={1.5} />
                        أفضل المشاركين
                    </h2>
                    <p className="text-sm text-[#6B7280] mt-1 leading-relaxed">الموظفون الأكثر نشاطاً هذا الأسبوع</p>
                </div>
                <div className="flex gap-1 bg-[#F3F4F6] p-1 rounded-xl">
                    <button onClick={() => setSort('points')} className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors duration-200 ${sort === 'points' ? 'bg-white shadow-soft text-[#111827]' : 'text-[#6B7280]'}`}>النقاط</button>
                    <button onClick={() => setSort('name')} className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors duration-200 ${sort === 'name' ? 'bg-white shadow-soft text-[#111827]' : 'text-[#6B7280]'}`}>الاسم</button>
                </div>
            </div>

            <div className="flex-1 overflow-auto no-scrollbar">
                <div className="divide-y divide-[#F3F4F6]">
                    {employees.map((emp, idx) => (
                        <div key={emp.id} className="p-4 sm:px-6 sm:py-5 flex items-center justify-between hover:bg-[#F9FAFB] transition-colors duration-200 group">
                            <div className="flex items-center gap-4">
                                <div className="relative">
                                    <Avatar className="w-11 h-11 border border-[#E5E7EB]">
                                        <AvatarImage src={emp.avatar} />
                                        <AvatarFallback className="bg-primary/10 text-primary font-semibold text-sm">{emp.name[0]}</AvatarFallback>
                                    </Avatar>
                                    <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white flex items-center justify-center text-[9px] font-bold ${idx === 0 ? 'bg-amber-400 text-white' :
                                        idx === 1 ? 'bg-slate-300 text-slate-800' :
                                            idx === 2 ? 'bg-amber-600 text-white' : 'bg-[#F3F4F6] text-[#6B7280]'
                                        }`}>
                                        {idx === 0 ? <Crown className="w-2.5 h-2.5" strokeWidth={1.5} /> : idx + 1}
                                    </div>
                                </div>
                                <div className="text-right">
                                    <h4 className="font-semibold text-[#111827] text-sm">{emp.name}</h4>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className="text-xs text-[#6B7280]">{emp.department}</span>
                                        <span className="w-1 h-1 rounded-full bg-[#D1D5DB]"></span>
                                        <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-md border ${getStatusColor(emp.status as string)}`}>
                                            {getStatusLabel(emp.status as string)}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="hidden sm:flex flex-col items-center justify-center w-8">
                                    {emp.trend === 'up' && <TrendingUp className="w-4 h-4 text-emerald-500" strokeWidth={1.5} />}
                                    {emp.trend === 'down' && <TrendingDown className="w-4 h-4 text-red-400" strokeWidth={1.5} />}
                                    {emp.trend === 'flat' && <Minus className="w-4 h-4 text-[#9CA3AF]" strokeWidth={1.5} />}
                                </div>
                                <div className="text-right bg-[#F9FAFB] px-3 py-2 rounded-xl border border-[#E5E7EB]">
                                    <p className="font-bold text-[#111827] tabular-nums text-sm">{emp.points}</p>
                                    <p className="text-[10px] font-medium text-[#9CA3AF] uppercase tracking-wider">نقاط</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
