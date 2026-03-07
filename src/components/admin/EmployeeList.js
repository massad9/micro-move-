import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from 'react';
import { useMicroMoveStore } from '@/store/microMoveStore';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { TrendingUp, TrendingDown, Minus, Users, Crown } from 'lucide-react';
export const EmployeeList = () => {
    const leaderboard = useMicroMoveStore(state => state.leaderboardTop3);
    const [sort, setSort] = useState('points');
    const employees = [
        ...leaderboard.map(l => ({ ...l, department: l.name.includes('(You)') ? 'الهندسة' : 'المبيعات', status: l.rank === 1 ? 'High' : 'Medium' })),
        { id: '10', name: 'سارة أحمد', points: 120, avatar: '', rank: 4, trend: 'down', department: 'التسويق', status: 'Low' },
        { id: '11', name: 'خالد محمد', points: 95, avatar: '', rank: 5, trend: 'flat', department: 'الهندسة', status: 'Low' },
    ].sort((a, b) => sort === 'points' ? b.points - a.points : a.name.localeCompare(b.name));
    const getStatusColor = (status) => {
        if (status === 'High')
            return 'bg-emerald-50 text-emerald-700 border-emerald-200';
        if (status === 'Medium')
            return 'bg-amber-50 text-amber-700 border-amber-200';
        return 'bg-red-50 text-red-600 border-red-100';
    };
    const getStatusLabel = (status) => {
        if (status === 'High')
            return 'ممتاز';
        if (status === 'Medium')
            return 'متوسط';
        return 'بحاجة لتنبيه';
    };
    return (_jsxs("div", { className: "bg-white border border-[#E5E7EB] rounded-2xl shadow-soft font-sans h-full flex flex-col", children: [_jsxs("div", { className: "p-6 border-b border-[#E5E7EB] flex justify-between items-center", children: [_jsxs("div", { children: [_jsxs("h2", { className: "text-lg font-bold text-[#111827] tracking-tight flex items-center gap-2", children: [_jsx(Users, { className: "w-5 h-5 text-[#9CA3AF]", strokeWidth: 1.5 }), "\u0623\u0641\u0636\u0644 \u0627\u0644\u0645\u0634\u0627\u0631\u0643\u064A\u0646"] }), _jsx("p", { className: "text-sm text-[#6B7280] mt-1 leading-relaxed", children: "\u0627\u0644\u0645\u0648\u0638\u0641\u0648\u0646 \u0627\u0644\u0623\u0643\u062B\u0631 \u0646\u0634\u0627\u0637\u0627\u064B \u0647\u0630\u0627 \u0627\u0644\u0623\u0633\u0628\u0648\u0639" })] }), _jsxs("div", { className: "flex gap-1 bg-[#F3F4F6] p-1 rounded-xl", children: [_jsx("button", { onClick: () => setSort('points'), className: `px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors duration-200 cursor-pointer ${sort === 'points' ? 'bg-white shadow-soft text-[#111827]' : 'text-[#6B7280]'}`, children: "\u0627\u0644\u0646\u0642\u0627\u0637" }), _jsx("button", { onClick: () => setSort('name'), className: `px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors duration-200 cursor-pointer ${sort === 'name' ? 'bg-white shadow-soft text-[#111827]' : 'text-[#6B7280]'}`, children: "\u0627\u0644\u0627\u0633\u0645" })] })] }), _jsx("div", { className: "flex-1 overflow-auto no-scrollbar", children: _jsx("div", { className: "divide-y divide-[#F3F4F6]", children: employees.map((emp, idx) => (_jsxs("div", { className: "p-4 sm:px-6 sm:py-5 flex items-center justify-between hover:bg-[#F9FAFB] transition-colors duration-200 group", children: [_jsxs("div", { className: "flex items-center gap-4", children: [_jsxs("div", { className: "relative", children: [_jsxs(Avatar, { className: "w-11 h-11 border border-[#E5E7EB]", children: [_jsx(AvatarImage, { src: emp.avatar }), _jsx(AvatarFallback, { className: "bg-primary/10 text-primary font-semibold text-sm", children: emp.name[0] })] }), _jsx("div", { className: `absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white flex items-center justify-center text-[9px] font-bold ${idx === 0 ? 'bg-amber-400 text-white' :
                                                    idx === 1 ? 'bg-slate-300 text-slate-800' :
                                                        idx === 2 ? 'bg-amber-600 text-white' : 'bg-[#F3F4F6] text-[#6B7280]'}`, children: idx === 0 ? _jsx(Crown, { className: "w-2.5 h-2.5", strokeWidth: 1.5 }) : idx + 1 })] }), _jsxs("div", { className: "text-right", children: [_jsx("h4", { className: "font-semibold text-[#111827] text-sm", children: emp.name }), _jsxs("div", { className: "flex items-center gap-2 mt-1", children: [_jsx("span", { className: "text-xs text-[#6B7280]", children: emp.department }), _jsx("span", { className: "w-1 h-1 rounded-full bg-[#D1D5DB]" }), _jsx("span", { className: `text-xs font-semibold px-1.5 py-0.5 rounded-md border ${getStatusColor(emp.status)}`, children: getStatusLabel(emp.status) })] })] })] }), _jsxs("div", { className: "flex items-center gap-4", children: [_jsxs("div", { className: "hidden sm:flex flex-col items-center justify-center w-8", children: [emp.trend === 'up' && _jsx(TrendingUp, { className: "w-4 h-4 text-emerald-500", strokeWidth: 1.5 }), emp.trend === 'down' && _jsx(TrendingDown, { className: "w-4 h-4 text-red-400", strokeWidth: 1.5 }), emp.trend === 'flat' && _jsx(Minus, { className: "w-4 h-4 text-[#9CA3AF]", strokeWidth: 1.5 })] }), _jsxs("div", { className: "text-right bg-[#F9FAFB] px-3 py-2 rounded-xl border border-[#E5E7EB]", children: [_jsx("p", { className: "font-bold text-[#111827] tabular-nums text-sm", children: emp.points }), _jsx("p", { className: "text-xs font-medium text-[#9CA3AF] uppercase tracking-wider", children: "\u0646\u0642\u0627\u0637" })] })] })] }, emp.id))) }) })] }));
};
