import React, { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Settings, Shield, Zap, CreditCard, Users, Database, Globe, BellRing } from 'lucide-react'
import { useMicroMoveStore } from '@/store/microMoveStore'

export const AdminSettings: React.FC = () => {
    const companyAdmin = useMicroMoveStore(state => state.companyAdmin)
    const [activeSection, setActiveSection] = useState('general')

    const sections = [
        { id: 'general', icon: Settings, label: 'عام' },
        { id: 'permissions', icon: Shield, label: 'الصلاحيات' },
        { id: 'integrations', icon: Zap, label: 'التكاملات' },
        { id: 'billing', icon: CreditCard, label: 'الفوترة' },
    ]

    return (
        <div className="flex flex-col md:flex-row gap-8 font-sans h-full">
            {/* Settings Sidebar */}
            <div className="w-full md:w-64 shrink-0">
                <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-6">إعدادات النظام</h2>
                <nav className="space-y-1 pr-0 pl-4 border-l border-slate-200">
                    {sections.map(s => {
                        const Icon = s.icon
                        const isActive = activeSection === s.id
                        return (
                            <button
                                key={s.id}
                                onClick={() => setActiveSection(s.id)}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-bold text-sm ${isActive ? 'bg-white shadow-sm border border-slate-200 text-primary' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100 border border-transparent'
                                    }`}
                            >
                                <Icon className="w-4 h-4" />
                                {s.label}
                            </button>
                        )
                    })}
                </nav>
            </div>

            {/* Settings Content */}
            <div className="flex-1 max-w-3xl">
                {activeSection === 'general' && (
                    <div className="space-y-6">
                        <Card className="border-slate-200 shadow-sm overflow-hidden text-right">
                            <div className="bg-slate-50 px-6 py-4 border-b border-slate-100">
                                <h3 className="font-bold text-slate-900 flex items-center gap-2"><Globe className="w-4 h-4 text-slate-400" /> ملف الشركة</h3>
                            </div>
                            <CardContent className="p-6 space-y-4 text-right">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">اسم الشركة</label>
                                        <input type="text" defaultValue={companyAdmin?.companyName} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium text-right" />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">نطاق البريد الإلكتروني</label>
                                        <input type="text" defaultValue="micromove.sa" disabled className="w-full px-4 py-2 bg-slate-100 border border-slate-200 rounded-lg text-sm text-slate-500 font-medium opacity-70 text-right cursor-not-allowed" />
                                    </div>
                                </div>
                                <div className="space-y-1.5 pt-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">المنطقة الزمنية</label>
                                    <select className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium text-right">
                                        <option>توقيت السعودية (AST)</option>
                                        <option>توقيت الخليج القياسي (GST)</option>
                                    </select>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-slate-200 shadow-sm overflow-hidden text-right">
                            <div className="bg-slate-50 px-6 py-4 border-b border-slate-100">
                                <h3 className="font-bold text-slate-900 flex items-center gap-2"><Database className="w-4 h-4 text-slate-400" /> إدارة البيانات</h3>
                            </div>
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between p-4 border border-rose-100 bg-rose-50/50 rounded-xl">
                                    <div>
                                        <h4 className="font-bold text-slate-900">مسح بيانات القياس المؤقتة</h4>
                                        <p className="text-xs text-slate-500 mt-0.5">يؤدي هذا إلى مسح الخرائط الحرارية التاريخية أقدم من ٩٠ يوماً.</p>
                                    </div>
                                    <button className="px-4 py-2 bg-white border border-rose-200 text-rose-600 text-sm font-bold rounded-lg hover:bg-rose-50 transition-colors">مسح البيانات</button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )}

                {activeSection === 'permissions' && (
                    <div className="space-y-6">
                        <Card className="border-slate-200 shadow-sm overflow-hidden text-right">
                            <div className="bg-slate-50 px-6 py-4 border-b border-slate-100">
                                <h3 className="font-bold text-slate-900 flex items-center gap-2"><Users className="w-4 h-4 text-slate-400" /> أدوار المسؤولين</h3>
                            </div>
                            <CardContent className="p-0">
                                <div className="divide-y divide-slate-100">
                                    <div className="p-6 flex items-center justify-between">
                                        <div>
                                            <h4 className="font-bold text-slate-900">مالك مساحة العمل</h4>
                                            <p className="text-xs text-slate-500 mt-0.5">وصول كامل لجميع الإعدادات والفوترة.</p>
                                        </div>
                                        <span className="text-xs font-bold px-2.5 py-1 bg-slate-100 text-slate-600 rounded-full">١ مستخدم</span>
                                    </div>
                                    <div className="p-6 flex items-center justify-between">
                                        <div>
                                            <h4 className="font-bold text-slate-900">مسؤول الموارد البشرية</h4>
                                            <p className="text-xs text-slate-500 mt-0.5">إدارة الموظفين والمكافآت والاطلاع على التحليلات.</p>
                                        </div>
                                        <button className="text-sm font-bold text-primary hover:text-primary/80">تعيين دور</button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )}

                {activeSection === 'integrations' && (
                    <div className="space-y-6">
                        <Card className="border-slate-200 shadow-sm overflow-hidden text-right">
                            <div className="bg-slate-50 px-6 py-4 border-b border-slate-100">
                                <h3 className="font-bold text-slate-900 flex items-center gap-2"><BellRing className="w-4 h-4 text-slate-400" /> التكاملات المعتمدة</h3>
                            </div>
                            <CardContent className="p-0">
                                <div className="divide-y divide-slate-100">
                                    <div className="p-6 flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-xl bg-[#4A154B] flex items-center justify-center border border-slate-200 shadow-sm">
                                                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521h-6.313A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.523-2.522v-2.522h2.523zM15.165 17.688a2.527 2.527 0 0 1-2.523-2.523 2.526 2.526 0 0 1 2.523-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.52h-6.313z" /></svg>
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-slate-900">سلاك للمؤسسات</h4>
                                                <p className="text-xs text-slate-500 mt-0.5">مزامنة حالة המوظفين والتنبيهات في القناة.</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded">متصل</span>
                                            <button className="text-sm font-bold text-slate-400 hover:text-slate-600">إدارة</button>
                                        </div>
                                    </div>

                                    <div className="p-6 flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center border border-slate-200">
                                                <svg className="w-5 h-5 text-blue-600" viewBox="0 0 24 24" fill="currentColor"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" /></svg>
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-slate-900">مساحة عمل جوجل</h4>
                                                <p className="text-xs text-slate-500 mt-0.5">مزامنة أحداث التقويم والدخول الموحد (SSO).</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className="text-xs font-bold text-slate-400 bg-slate-100 px-2 py-1 rounded">غير متصل</span>
                                            <button className="text-sm font-bold text-primary hover:text-primary/80">ربط</button>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )}

                {activeSection === 'billing' && (
                    <div className="space-y-6">
                        <Card className="border-primary/20 shadow-md bg-white border-2 overflow-hidden text-right">
                            <CardContent className="p-8">
                                <div className="flex justify-between items-start mb-6">
                                    <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full border border-primary/20">الخطة الحالية</span>
                                    <div>
                                        <h3 className="text-2xl font-black text-slate-900">المؤسسات (مرن)</h3>
                                        <p className="text-sm text-slate-500 mt-1">يتم إصدار الفاتورة بناءً على المستخدمين النشطين</p>
                                    </div>
                                </div>
                                <div className="pt-6 border-t border-slate-100 flex items-end justify-between">
                                    <button className="text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors">إدارة البطاقات</button>
                                    <div className="text-right">
                                        <div className="text-4xl font-black text-slate-900 tracking-tight flex items-baseline gap-1" style={{ direction: 'ltr' }}>
                                            <span className="text-lg font-bold text-slate-400">$</span>1,420
                                        </div>
                                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mt-1">الفاتورة القادمة 1 أكتوبر</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )}
            </div>
        </div>
    )
}
