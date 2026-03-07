import React, { useState } from 'react'
import { Bell, Info, Award, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

export const NotificationDropdown = () => {
    const [unreadCount, setUnreadCount] = useState(3)

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="relative text-slate-500 hover:bg-slate-100 rounded-full w-10 h-10 transition-colors border-0">
                    <Bell className="w-5 h-5" />
                    {unreadCount > 0 && (
                        <span className="absolute top-2.5 left-2.5 w-2 h-2 bg-orange-500 rounded-full ring-2 ring-white" />
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0 rounded-2xl shadow-xl border border-slate-100 font-sans z-50 overflow-hidden" align="end" sideOffset={8}>
                <div className="flex items-center justify-between p-4 border-b border-slate-100 bg-white" dir="rtl">
                    <h3 className="font-bold text-slate-800">الإشعارات</h3>
                    {unreadCount > 0 && (
                        <span className="text-[10px] bg-orange-100 text-orange-600 font-bold px-2 py-1 rounded-full">
                            {unreadCount} جديدة
                        </span>
                    )}
                </div>
                <div className="divide-y divide-slate-100 max-h-[300px] overflow-y-auto bg-white" dir="rtl">
                    <div className="p-4 hover:bg-slate-50 transition-colors flex items-start gap-4 cursor-pointer relative group">
                        {unreadCount > 0 && <div className="absolute top-1/2 -translate-y-1/2 right-2 w-1.5 h-1.5 bg-orange-500 rounded-full" />}
                        <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 shrink-0">
                            <Info className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-bold text-slate-800 mb-0.5">تذكير للنشاط</p>
                            <p className="text-xs text-slate-500 mb-2 leading-relaxed">لقد مرت ساعتين منذ آخر نشاط حركي لك. حان الوقت لأخذ استراحة مريحة للأعصاب وتمدد بسيط.</p>
                            <span className="text-[10px] text-slate-400 font-medium">منذ 5 دقائق</span>
                        </div>
                    </div>
                    
                    <div className="p-4 hover:bg-slate-50 transition-colors flex items-start gap-4 cursor-pointer">
                        <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                            <Award className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-bold text-slate-800 mb-0.5">مكافأة مميزة مضافة</p>
                            <p className="text-xs text-slate-500 mb-2 leading-relaxed">أضاف مديرك مكافأة "تيشيرت الموظف النشيط" إلى متجر المكافآت.</p>
                            <span className="text-[10px] text-slate-400 font-medium">منذ ساعتين</span>
                        </div>
                    </div>

                    <div className="p-4 hover:bg-slate-50 transition-colors flex items-start gap-4 cursor-pointer">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                            <Calendar className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-bold text-slate-800 mb-0.5">تقرير الأداء الأسبوعي</p>
                            <p className="text-xs text-slate-500 mb-2 leading-relaxed">وصل تقرير أدائك لهذا الأسبوع. لقد تقدمت بـ 3 مراكز في قائمة المتصدرين!</p>
                            <span className="text-[10px] text-slate-400 font-medium">يوم أمس</span>
                        </div>
                    </div>
                </div>
                <div className="p-3 border-t border-slate-100 bg-slate-50">
                    <Button 
                        variant="ghost" 
                        className="w-full text-xs font-bold text-slate-500 hover:text-slate-800 h-8" 
                        onClick={() => setUnreadCount(0)}
                    >
                        تحديد الكل كمقروء
                    </Button>
                </div>
            </PopoverContent>
        </Popover>
    )
}
