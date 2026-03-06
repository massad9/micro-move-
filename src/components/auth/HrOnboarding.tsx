import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Building2, Users, Clock, Calendar, MessageSquare,
    Upload, CheckCircle2, ChevronLeft, Check, Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useMicroMoveStore } from '@/store/microMoveStore';

interface HrOnboardingProps {
    onComplete: () => void;
}

export const HrOnboarding: React.FC<HrOnboardingProps> = ({ onComplete }) => {
    const [step, setStep] = useState(1);
    const setCompanyAdmin = useMicroMoveStore(state => state.setCompanyAdmin);

    const [companyName, setCompanyName] = useState('شركة أكمي');
    const [companySize, setCompanySize] = useState('100-500');

    const [calendarSync, setCalendarSync] = useState(true);
    const [slackSync, setSlackSync] = useState(true);
    const [teamsSync, setTeamsSync] = useState(false);

    const [departments, setDepartments] = useState(['الهندسة', 'التسويق', 'المبيعات']);
    const [newDept, setNewDept] = useState('');
    const [workStart, setWorkStart] = useState('09:00');
    const [workEnd, setWorkEnd] = useState('17:00');

    const handleNext = () => {
        if (step < 4) setStep(step + 1);
    };

    const handleBack = () => {
        if (step > 1) setStep(step - 1);
    };

    const handleComplete = () => {
        setCompanyAdmin({
            companyName,
            departments,
            vibeScore: 88,
            burnoutRisk: []
        });
        onComplete();
    };

    const addDepartment = () => {
        if (newDept && !departments.includes(newDept)) {
            setDepartments([...departments, newDept]);
            setNewDept('');
        }
    };

    const removeDepartment = (dept: string) => {
        setDepartments(departments.filter(d => d !== dept));
    };

    return (
        <div className="max-w-3xl mx-auto py-12 px-6 font-sans">
            <div className="mb-12">
                <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-2">إعداد بيئة العمل</h1>
                <p className="text-slate-500">هيئ مايكرو موف ليناسب أسلوب مؤسستك.</p>

                {/* Progress Indicators */}
                <div className="flex items-center mt-8 gap-2">
                    {[1, 2, 3, 4].map(s => (
                        <div key={s} className="flex-1 h-2 rounded-full bg-slate-100 overflow-hidden">
                            <motion.div
                                className="h-full bg-primary"
                                initial={{ width: "0%" }}
                                animate={{ width: step >= s ? "100%" : "0%" }}
                                transition={{ duration: 0.3 }}
                            />
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-white p-8 md:p-10 rounded-[2rem] shadow-sm border border-slate-200">
                <AnimatePresence mode="wait">
                    {step === 1 && (
                        <motion.div key="step1" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-6">
                            <h2 className="text-2xl font-bold flex items-center gap-3"><Building2 className="text-primary" /> بيانات الشركة الأساسية</h2>

                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-700">اسم الشركة</label>
                                    <input type="text" value={companyName} onChange={e => setCompanyName(e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-primary outline-none text-right" placeholder="مثال: شركة أكمي" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-700">حجم الشركة</label>
                                    <select value={companySize} onChange={e => setCompanySize(e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-primary outline-none">
                                        <option value="1-50">١-٥٠ موظف</option>
                                        <option value="51-200">٥١-٢٠٠ موظف</option>
                                        <option value="201-500">٢٠١-٥٠٠ موظف</option>
                                        <option value="500+">+٥٠٠ موظف</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-700">شعار الشركة</label>
                                    <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 flex flex-col items-center justify-center text-slate-400 bg-slate-50/50 cursor-pointer hover:bg-slate-50 transition-colors">
                                        <Upload className="w-8 h-8 mb-2" />
                                        <span className="text-sm font-medium">اضغط للرفع أو اسحب وأفلت</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {step === 2 && (
                        <motion.div key="step2" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-6">
                            <h2 className="text-2xl font-bold flex items-center gap-3"><Users className="text-primary" /> التكاملات المؤسسية</h2>
                            <p className="text-sm text-slate-500 mb-6">اربط أدواتك لتمكين الإعداد السلس والتنبيهات الذكية.</p>

                            <div className="space-y-4">
                                <div className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex items-center justify-between ${calendarSync ? 'border-primary bg-primary/5' : 'border-slate-200 bg-white'}`} onClick={() => setCalendarSync(!calendarSync)}>
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600"><Calendar /></div>
                                        <div>
                                            <h4 className="font-bold text-slate-900">مزامنة التقويم (Google/O365)</h4>
                                            <p className="text-sm text-slate-500">يكتشف أوقات الفراغ والاجتماعات الطويلة</p>
                                        </div>
                                    </div>
                                    {calendarSync && <CheckCircle2 className="text-primary" />}
                                </div>

                                <div className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex items-center justify-between ${slackSync ? 'border-primary bg-primary/5' : 'border-slate-200 bg-white'}`} onClick={() => setSlackSync(!slackSync)}>
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600"><MessageSquare /></div>
                                        <div>
                                            <h4 className="font-bold text-slate-900">تكامل سلاك</h4>
                                            <p className="text-sm text-slate-500">لرصد الحالة وإرسال التنبيهات</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {slackSync && <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded font-bold">تم منح صلاحية المدير</span>}
                                        {slackSync && <CheckCircle2 className="text-primary" />}
                                    </div>
                                </div>

                                <div className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex items-center justify-between ${teamsSync ? 'border-primary bg-primary/5' : 'border-slate-200 bg-white'}`} onClick={() => setTeamsSync(!teamsSync)}>
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600"><MessageSquare /></div>
                                        <div>
                                            <h4 className="font-bold text-slate-900">مايكروسوفت تيمز</h4>
                                            <p className="text-sm text-slate-500">لرصد الحالة وإرسال التنبيهات</p>
                                        </div>
                                    </div>
                                    {teamsSync && <CheckCircle2 className="text-primary" />}
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {step === 3 && (
                        <motion.div key="step3" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-6">
                            <h2 className="text-2xl font-bold flex items-center gap-3"><Sparkles className="text-primary" /> إعداد الهيكل التنظيمي</h2>

                            <div className="space-y-6">
                                <div className="space-y-3">
                                    <label className="text-sm font-bold text-slate-900">ساعات العمل الافتراضية</label>
                                    <p className="text-xs text-slate-500">يتوقف نشاط المنصة خارج هذه الساعات احتراماً لوقت الموظفين.</p>
                                    <div className="flex items-center gap-4">
                                        <input type="time" value={workStart} onChange={e => setWorkStart(e.target.value)} className="px-4 py-2 border rounded-lg bg-slate-50 outline-none" />
                                        <span className="text-slate-400">إلى</span>
                                        <input type="time" value={workEnd} onChange={e => setWorkEnd(e.target.value)} className="px-4 py-2 border rounded-lg bg-slate-50 outline-none" />
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-slate-100">
                                    <label className="text-sm font-bold text-slate-900 block mb-3">الأقسام / الفرق</label>
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {departments.map(dept => (
                                            <div key={dept} className="bg-slate-100 px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-2">
                                                {dept}
                                                <button onClick={() => removeDepartment(dept)} className="text-slate-400 hover:text-red-500">&times;</button>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            value={newDept}
                                            onChange={e => setNewDept(e.target.value)}
                                            onKeyDown={e => e.key === 'Enter' && addDepartment()}
                                            placeholder="أضف قسماً جديداً..."
                                            className="flex-1 px-4 py-2 border rounded-lg bg-slate-50 outline-none text-right"
                                        />
                                        <Button onClick={addDepartment} variant="secondary">إضافة</Button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {step === 4 && (
                        <motion.div key="step4" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-6 text-center">
                            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Check className="w-10 h-10 text-green-600" />
                            </div>
                            <h2 className="text-3xl font-bold mb-2">إعداد مساحة العمل جاهزة!</h2>
                            <p className="text-slate-500 max-w-sm mx-auto">
                                تم الاتصال بنجاح. وجدنا <b>١٤٢ موظفاً</b> عبر تكامل سلاك.
                            </p>

                            <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 text-right max-w-sm mx-auto my-8">
                                <h4 className="font-bold text-slate-900 mb-2">الخطوات التلقائية التالية:</h4>
                                <ul className="text-sm text-slate-600 space-y-2">
                                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> توزيع الموظفين على الأقسام تلقائياً</li>
                                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> إنشاء روابط دخول سريعة</li>
                                    <li className="flex items-center gap-2 text-slate-400"><Clock className="w-4 h-4" /> إرسال بريد الترحيب (بانتظار موافقتك)</li>
                                </ul>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="flex justify-between items-center mt-12 pt-6 border-t border-slate-100">
                    <Button variant="ghost" onClick={handleBack} disabled={step === 1} className={step === 1 ? 'opacity-0' : ''}>
                        السابق
                    </Button>

                    {step < 4 ? (
                        <Button className="font-bold px-8 shadow-md" onClick={handleNext}>
                            التالي <ChevronLeft className="mr-2 w-4 h-4" />
                        </Button>
                    ) : (
                        <Button className="font-bold px-8 shadow-md bg-green-600 hover:bg-green-700" onClick={handleComplete}>
                            إطلاق بيئة العمل
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
};
