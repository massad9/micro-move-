import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Badge from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { motion } from 'framer-motion'

export const EmployeeList: React.FC = () => {
    const employees = [
        { id: '1', name: 'Sara Al-Otaibi', dept: 'Design', status: 'High', points: 3450, avatar: 'https://i.pravatar.cc/150?u=sara' },
        { id: '2', name: 'Khalid Mohammed', dept: 'Engineering', status: 'Medium', points: 3120, avatar: 'https://i.pravatar.cc/150?u=khalid' },
        { id: '3', name: 'Ahmad bin Zaid', dept: 'Sales', status: 'Medium', points: 1250, avatar: 'https://i.pravatar.cc/150?u=ahmad' },
        { id: '4', name: 'Laila Hassan', dept: 'Marketing', status: 'High', points: 2890, avatar: 'https://i.pravatar.cc/150?u=laila' },
        { id: '5', name: 'Omar Ibrahim', dept: 'Engineering', status: 'Low', points: 450, avatar: 'https://i.pravatar.cc/150?u=omar' },
    ]

    return (
        <Card className="bg-white border border-slate-200 shadow-sm h-full font-sans overflow-hidden">
            <CardHeader className="border-b border-slate-100 bg-slate-50/50 pb-4">
                <CardTitle className="text-lg font-semibold text-slate-900 tracking-tight flex items-center gap-2">
                    <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                    Top Participants
                </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider bg-slate-50/50">
                                <th className="px-6 py-4 font-medium">Employee</th>
                                <th className="px-6 py-4 font-medium">Department</th>
                                <th className="px-6 py-4 font-medium">Engagement</th>
                                <th className="px-6 py-4 text-right font-medium">Points</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {employees.map((emp, index) => (
                                <motion.tr
                                    key={emp.id}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="hover:bg-slate-50/50 transition-colors group"
                                >
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <Avatar className="w-10 h-10 rounded-xl border border-slate-200 shadow-sm group-hover:border-primary/50 transition-colors">
                                                <AvatarImage src={emp.avatar} />
                                                <AvatarFallback className="bg-primary/10 text-primary font-medium">{emp.name[0]}</AvatarFallback>
                                            </Avatar>
                                            <span className="font-semibold text-slate-900 text-sm whitespace-nowrap group-hover:text-primary transition-colors">{emp.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-xs font-medium text-slate-500">{emp.dept}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <Badge className={`font-medium text-xs rounded-md px-2.5 py-0.5 shadow-none border ${emp.status === 'High' ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100' :
                                            emp.status === 'Medium' ? 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100' :
                                                'bg-red-50 text-red-700 border-red-200 hover:bg-red-100'
                                            }`}>
                                            {emp.status}
                                        </Badge>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <span className="font-bold text-base text-slate-900 tracking-tight flex items-baseline justify-end gap-1.5">
                                            {emp.points.toLocaleString()}
                                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">PTS</span>
                                        </span>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </CardContent>
        </Card>
    )
}
