import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from 'react';
import { ActivityCard } from './ActivityCard';
import { useMicroMoveStore } from '@/store/microMoveStore';
import { AnimatePresence } from 'framer-motion';
import { HeroBanner } from './HeroBanner';
export const ActivityFeed = () => {
    const activities = useMicroMoveStore(state => state.activities);
    const [filter, setFilter] = useState('all');
    const tabs = [
        { id: 'all', label: 'الكل' },
        { id: 'physical', label: 'بدني' },
        { id: 'mindfulness', label: 'تأمل' },
        { id: 'social', label: 'اجتماعي' },
        { id: 'hydration', label: 'ترطيب' }
    ];
    const filteredActivities = activities.filter(a => filter === 'all' || a.category === filter);
    const activeTasks = filteredActivities.filter(a => !a.isDone);
    const doneTasks = filteredActivities.filter(a => a.isDone);
    return (_jsxs("div", { className: "pb-20 font-sans", children: [_jsx(HeroBanner, {}), _jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8 mt-12", children: [_jsx("h2", { className: "text-2xl font-black tracking-tight text-slate-900 leading-none", children: "\u0648\u0627\u0635\u0644 \u0627\u0644\u062D\u0631\u0643\u0629" }), _jsx("div", { className: "flex p-1 bg-white border border-slate-200 rounded-2xl shadow-sm overflow-x-auto no-scrollbar", children: tabs.map((tab) => (_jsx("button", { onClick: () => setFilter(tab.id), className: `px-5 py-2.5 text-sm font-bold rounded-xl whitespace-nowrap transition-all ${filter === tab.id
                                ? 'bg-slate-900 text-white shadow-md'
                                : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'}`, children: tab.label }, tab.id))) })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6", children: [_jsxs(AnimatePresence, { mode: "popLayout", children: [activeTasks.map((activity) => (_jsx(ActivityCard, { activity: activity }, activity.id))), doneTasks.map((activity) => (_jsx(ActivityCard, { activity: activity }, activity.id)))] }), filteredActivities.length === 0 && (_jsx("div", { className: "col-span-full py-16 text-center bg-white border border-dashed border-slate-300 rounded-[2rem]", children: _jsx("p", { className: "text-slate-500 font-medium", children: "\u0644\u0627 \u062A\u0648\u062C\u062F \u0623\u0646\u0634\u0637\u0629 \u0641\u064A \u0647\u0630\u0627 \u0627\u0644\u062A\u0635\u0646\u064A\u0641 \u062D\u0627\u0644\u064A\u0627\u064B." }) }))] })] }));
};
