import React, { useState } from 'react'
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
            <div className="w-full md:w-56 shrink-0">
                <h2 className="text-xl font-bold text-[#111827] tracking-tight mb-6">إعدادات النظام</h2>
                <nav className="space-y-1 pr-0 pl-4 border-l-[1.5px] border-[#E5E7EB]">
                    {sections.map(s => {
                        const Icon = s.icon
                        const isActive = activeSection === s.id
                        return (
                            <button
                                key={s.id}
                                onClick={() => setActiveSection(s.id)}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors duration-200 font-semibold text-sm ${isActive ? 'bg-[#FFF7ED] text-primary border-r-0 shadow-soft' : 'text-[#6B7280] hover:text-[#111827] hover:bg-[#F9FAFB] border border-transparent'
                                    }`}
                            >
                                <Icon className="w-4 h-4" strokeWidth={1.5} />
                                {s.label}
                            </button>
                        )
                    })}
                </nav>
            </div>

            <div className="flex-1 max-w-3xl">
                {activeSection === 'general' && (
                    <div className="space-y-6">
                        <div className="bg-white border border-[#E5E7EB] rounded-2xl shadow-soft overflow-hidden text-right">
                            <div className="bg-[#F9FAFB] px-6 py-4 border-b border-[#E5E7EB]">
                                <h3 className="font-semibold text-[#111827] flex items-center gap-2"><Globe className="w-4 h-4 text-[#9CA3AF]" strokeWidth={1.5} /> ملف الشركة</h3>
                            </div>
                            <div className="p-6 space-y-4 text-right">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label htmlFor="settings-company-name" className="text-xs font-semibold text-[#374151] uppercase tracking-wider">اسم الشركة</label>
                                        <input id="settings-company-name" type="text" defaultValue={companyAdmin?.companyName} className="w-full px-4 py-2.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl text-sm font-medium text-right text-[#111827] focus:border-primary/40 focus:ring-2 focus:ring-primary/10 focus:shadow-inner-soft focus-visible:outline-none transition-colors duration-200" />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="settings-email-domain" className="text-xs font-semibold text-[#374151] uppercase tracking-wider">نطاق البريد الإلكتروني</label>
                                        <input id="settings-email-domain" type="text" defaultValue="micromove.sa" disabled className="w-full px-4 py-2.5 bg-[#F3F4F6] border border-[#E5E7EB] rounded-xl text-sm text-[#9CA3AF] font-medium opacity-70 text-right cursor-not-allowed" />
                                    </div>
                                </div>
                                <div className="space-y-2 pt-2">
                                    <label htmlFor="settings-timezone" className="text-xs font-semibold text-[#374151] uppercase tracking-wider">المنطقة الزمنية</label>
                                    <select id="settings-timezone" className="w-full px-4 py-2.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl text-sm font-medium text-right text-[#111827] focus:border-primary/40 focus:ring-2 focus:ring-primary/10 focus-visible:outline-none transition-colors duration-200">
                                        <option>توقيت السعودية (AST)</option>
                                        <option>توقيت الخليج القياسي (GST)</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white border border-[#E5E7EB] rounded-2xl shadow-soft overflow-hidden text-right">
                            <div className="bg-[#F9FAFB] px-6 py-4 border-b border-[#E5E7EB]">
                                <h3 className="font-semibold text-[#111827] flex items-center gap-2"><Database className="w-4 h-4 text-[#9CA3AF]" strokeWidth={1.5} /> إدارة البيانات</h3>
                            </div>
                            <div className="p-6">
                                <div className="flex items-center justify-between p-4 border border-red-100 bg-red-50/50 rounded-xl">
                                    <div>
                                        <h4 className="font-semibold text-[#111827]">مسح بيانات القياس المؤقتة</h4>
                                        <p className="text-xs text-[#6B7280] mt-0.5 leading-relaxed">يؤدي هذا إلى مسح الخرائط الحرارية التاريخية أقدم من ٩٠ يوماً.</p>
                                    </div>
                                    <button className="px-4 py-2 bg-white border border-red-200 text-red-500 text-sm font-semibold rounded-xl hover:bg-red-50 transition-colors duration-200">مسح البيانات</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeSection === 'permissions' && (
                    <div className="space-y-6">
                        <div className="bg-white border border-[#E5E7EB] rounded-2xl shadow-soft overflow-hidden text-right">
                            <div className="bg-[#F9FAFB] px-6 py-4 border-b border-[#E5E7EB]">
                                <h3 className="font-semibold text-[#111827] flex items-center gap-2"><Users className="w-4 h-4 text-[#9CA3AF]" strokeWidth={1.5} /> أدوار المسؤولين</h3>
                            </div>
                            <div className="divide-y divide-[#F3F4F6]">
                                <div className="p-6 flex items-center justify-between">
                                    <div>
                                        <h4 className="font-semibold text-[#111827]">مالك مساحة العمل</h4>
                                        <p className="text-xs text-[#6B7280] mt-0.5 leading-relaxed">وصول كامل لجميع الإعدادات والفوترة.</p>
                                    </div>
                                    <span className="text-xs font-semibold px-2.5 py-1 bg-[#F3F4F6] text-[#6B7280] rounded-lg">١ مستخدم</span>
                                </div>
                                <div className="p-6 flex items-center justify-between">
                                    <div>
                                        <h4 className="font-semibold text-[#111827]">مسؤول الموارد البشرية</h4>
                                        <p className="text-xs text-[#6B7280] mt-0.5 leading-relaxed">إدارة الموظفين والمكافآت والاطلاع على التحليلات.</p>
                                    </div>
                                    <button className="text-sm font-semibold text-primary hover:text-primary/80 transition-colors duration-200">تعيين دور</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeSection === 'integrations' && (
                    <div className="space-y-6">
                        <div className="bg-white border border-[#E5E7EB] rounded-2xl shadow-soft overflow-hidden text-right">
                            <div className="bg-[#F9FAFB] px-6 py-4 border-b border-[#E5E7EB]">
                                <h3 className="font-semibold text-[#111827] flex items-center gap-2"><BellRing className="w-4 h-4 text-[#9CA3AF]" strokeWidth={1.5} /> التكاملات المعتمدة</h3>
                            </div>
                            <div className="divide-y divide-[#F3F4F6]">
                                <div className="p-6 flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-[#4A154B] flex items-center justify-center shadow-soft">
                                            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521h-6.313A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.523-2.522v-2.522h2.523zM15.165 17.688a2.527 2.527 0 0 1-2.523-2.523 2.526 2.526 0 0 1 2.523-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.52h-6.313z" /></svg>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-[#111827]">سلاك للمؤسسات</h4>
                                            <p className="text-xs text-[#6B7280] mt-0.5 leading-relaxed">مزامنة حالة الموظفين والتنبيهات في القناة.</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-100">متصل</span>
                                        <button className="text-sm font-semibold text-[#9CA3AF] hover:text-[#6B7280] transition-colors duration-200">إدارة</button>
                                    </div>
                                </div>

                                <div className="p-6 flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center border border-[#E5E7EB]">
                                            <svg className="w-5 h-5 text-blue-600" viewBox="0 0 24 24" fill="currentColor"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" /></svg>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-[#111827]">مساحة عمل جوجل</h4>
                                            <p className="text-xs text-[#6B7280] mt-0.5 leading-relaxed">مزامنة أحداث التقويم والدخول الموحد (SSO).</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="text-xs font-semibold text-[#9CA3AF] bg-[#F3F4F6] px-2.5 py-1 rounded-lg border border-[#E5E7EB]">غير متصل</span>
                                        <button className="text-sm font-semibold text-primary hover:text-primary/80 transition-colors duration-200">ربط</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeSection === 'billing' && (
                    <div className="space-y-6">
                        <div className="bg-white border-[1.5px] border-primary/20 rounded-2xl shadow-soft-md overflow-hidden text-right">
                            <div className="p-8">
                                <div className="flex justify-between items-start mb-6">
                                    <span className="px-3 py-1 bg-[#FFF7ED] text-primary text-xs font-semibold rounded-lg border border-primary/10">الخطة الحالية</span>
                                    <div>
                                        <h3 className="text-xl font-bold text-[#111827]">المؤسسات (مرن)</h3>
                                        <p className="text-sm text-[#6B7280] mt-1 leading-relaxed">يتم إصدار الفاتورة بناءً على المستخدمين النشطين</p>
                                    </div>
                                </div>
                                <div className="pt-6 border-t border-[#F3F4F6] flex items-end justify-between">
                                    <button className="text-sm font-semibold text-[#6B7280] hover:text-[#111827] transition-colors duration-200">إدارة البطاقات</button>
                                    <div className="text-right">
                                        <div className="text-3xl font-bold text-[#111827] tracking-tight flex items-baseline gap-1" style={{ direction: 'ltr' }}>
                                            <span className="text-lg font-semibold text-[#9CA3AF]">$</span>1,420
                                        </div>
                                        <p className="text-xs font-medium text-[#9CA3AF] uppercase tracking-widest mt-1">الفاتورة القادمة 1 أكتوبر</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
