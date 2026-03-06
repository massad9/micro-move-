import React, { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { useMicroMoveStore } from '@/store/microMoveStore'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Medal, TrendingUp, TrendingDown, Minus } from 'lucide-react'

export const EmployeeList: React.FC = () => {
    const leaderboard = useMicroMoveStore(state => state.leaderboardTop3)
    const [sort, setSort] = useState<'points' | 'name'>('points')

    // Dummy extended employee data based on leaderboard + extras
    const employees = [
        ...leaderboard.map(l => ({ ...l, department: l.name.includes('(You)') ? 'الهندسة' : 'المبيعات', status: l.rank === 1 ? 'High' : 'Medium' })),
        { id: '10', name: 'سارة أحمد', points: 120, avatar: '', rank: 4, trend: 'down', department: 'التسويق', status: 'Low' },
        { id: '11', name: 'خالد محمد', points: 95, avatar: '', rank: 5, trend: 'flat', department: 'الهندسة', status: 'Low' },
    ].sort((a, b) => sort === 'points' ? b.points - a.points : a.name.localeCompare(b.name))

    const getStatusColor = (status: string) => {
        if (status === 'High') return 'bg-emerald-100 text-emerald-700 border-emerald-200'
        if (status === 'Medium') return 'bg-amber-100 text-amber-700 border-amber-200'
        return 'bg-red-100 text-red-700 border-red-200'
    }

    const getStatusLabel = (status: string) => {
        if (status === 'High') return 'ممتاز'
        if (status === 'Medium') return 'متوسط'
        return 'بحاجة لتنبيه'
    }

    return (
        <Card className="bg-white border border-slate-200 shadow-sm font-sans h-full flex flex-col">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                <div>
                    <h2 className="text-xl font-bold text-slate-900 tracking-tight">أفضل المشاركين</h2>
                    <p className="text-sm text-slate-500 font-medium mt-1">الموظفون الأكثر نشاطاً هذا الأسبوع</p>
                </div>
                <div className="flex gap-2 bg-slate-200/50 p-1 rounded-lg">
                    <button onClick={() => setSort('points')} className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all ${sort === 'points' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500'}`}>النقاط</button>
                    <button onClick={() => setSort('name')} className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all ${sort === 'name' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500'}`}>الاسم</button>
                </div>
            </div>

            <CardContent className="p-0 flex-1 overflow-auto no-scrollbar">
                <div className="divide-y divide-slate-100">
                    {employees.map((emp, idx) => (
                        <div key={emp.id} className="p-4 sm:p-6 flex items-center justify-between hover:bg-slate-50 transition-colors group">
                            <div className="flex items-center gap-4">
                                <div className="relative">
                                    <Avatar className="w-12 h-12 border border-slate-200">
                                        <AvatarImage src={emp.avatar} />
                                        <AvatarFallback className="bg-primary/10 text-primary font-bold">{emp.name[0]}</AvatarFallback>
                                    </Avatar>
                                    <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-2 border-white flex items-center justify-center text-[10px] font-bold ${idx === 0 ? 'bg-amber-400 text-white' :
                                        idx === 1 ? 'bg-slate-300 text-slate-800' :
                                            idx === 2 ? 'bg-amber-600 text-white' : 'bg-slate-100 text-slate-500'
                                        }`}>
                                        {idx === 0 ? <Medal className="w-3 h-3" /> : idx + 1}
                                    </div>
                                </div>
                                <div className="text-right">
                                    <h4 className="font-bold text-slate-900">{emp.name}</h4>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className="text-xs font-semibold text-slate-500">{emp.department}</span>
                                        <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${getStatusColor(emp.status as string)}`}>
                                            {getStatusLabel(emp.status as string)}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-6">
                                <div className="hidden sm:flex flex-col items-center justify-center w-8">
                                    {emp.trend === 'up' && <TrendingUp className="w-4 h-4 text-emerald-500" />}
                                    {emp.trend === 'down' && <TrendingDown className="w-4 h-4 text-red-500" />}
                                    {emp.trend === 'flat' && <Minus className="w-4 h-4 text-slate-400" />}
                                </div>
                                <div className="text-left bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100 text-right">
                                    <p className="font-bold text-slate-900 tabular-nums">{emp.points}</p>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">نقاط</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}
