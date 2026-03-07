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
        <div className="max-w-3xl mx-auto py-12 px-6 font-sans text-text-primary">
            <div className="mb-12">
                <h1 className="text-3xl font-bold text-text-primary tracking-tight mb-2">إعداد بيئة العمل</h1>
                <p className="text-text-tertiary">هيئ مايكرو موف ليناسب أسلوب مؤسستك.</p>

                <div className="flex items-center mt-8 gap-2">
                    {[1, 2, 3, 4].map(s => (
                        <div key={s} className="flex-1 h-1 rounded-full bg-surface-2 overflow-hidden">
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

            <div className="bg-surface-1 p-8 md:p-10 rounded-xl border border-border">
                <AnimatePresence mode="wait">
                    {step === 1 && (
                        <motion.div key="step1" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} className="space-y-6">
                            <h2 className="text-2xl font-bold flex items-center gap-3 text-text-primary"><Building2 className="text-primary" /> بيانات الشركة الأساسية</h2>

                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label htmlFor="hr-company-name" className="text-sm font-medium text-text-secondary">اسم الشركة</label>
                                    <input id="hr-company-name" type="text" value={companyName} onChange={e => setCompanyName(e.target.value)} className="w-full bg-surface-2 border border-border text-text-primary placeholder:text-text-quaternary rounded-lg h-10 px-3 focus:border-primary/50 focus:ring-1 focus:ring-primary/20 focus-visible:outline-none text-right text-sm" placeholder="مثال: شركة أكمي" />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="hr-company-size" className="text-sm font-medium text-text-secondary">حجم الشركة</label>
                                    <select id="hr-company-size" value={companySize} onChange={e => setCompanySize(e.target.value)} className="w-full bg-surface-2 border border-border text-text-primary rounded-lg h-10 px-3 focus:border-primary/50 focus:ring-1 focus:ring-primary/20 focus-visible:outline-none text-sm">
                                        <option value="1-50">١-٥٠ موظف</option>
                                        <option value="51-200">٥١-٢٠٠ موظف</option>
                                        <option value="201-500">٢٠١-٥٠٠ موظف</option>
                                        <option value="500+">+٥٠٠ موظف</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-text-secondary">شعار الشركة</label>
                                    <div className="border border-dashed border-border rounded-lg p-8 flex flex-col items-center justify-center text-text-quaternary bg-surface-2/50 cursor-pointer hover:bg-surface-2 transition-colors">
                                        <Upload className="w-8 h-8 mb-2" />
                                        <span className="text-sm font-medium">اضغط للرفع أو اسحب وأفلت</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {step === 2 && (
                        <motion.div key="step2" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} className="space-y-6">
                            <h2 className="text-2xl font-bold flex items-center gap-3 text-text-primary"><Users className="text-primary" /> التكاملات المؤسسية</h2>
                            <p className="text-sm text-text-tertiary mb-6">اربط أدواتك لتمكين الإعداد السلس والتنبيهات الذكية.</p>

                            <div className="space-y-3">
                                <div role="button" tabIndex={0} onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setCalendarSync(!calendarSync); } }} className={`p-4 rounded-lg border transition-colors cursor-pointer flex items-center justify-between ${calendarSync ? 'border-primary/30 bg-primary/5' : 'border-border bg-surface-2'}`} onClick={() => setCalendarSync(!calendarSync)}>
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-lg bg-blue-500/15 flex items-center justify-center text-blue-400"><Calendar /></div>
                                        <div>
                                            <h4 className="font-semibold text-text-primary">مزامنة التقويم (Google/O365)</h4>
                                            <p className="text-sm text-text-tertiary">يكتشف أوقات الفراغ والاجتماعات الطويلة</p>
                                        </div>
                                    </div>
                                    {calendarSync && <CheckCircle2 className="text-primary" />}
                                </div>

                                <div role="button" tabIndex={0} onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSlackSync(!slackSync); } }} className={`p-4 rounded-lg border transition-colors cursor-pointer flex items-center justify-between ${slackSync ? 'border-primary/30 bg-primary/5' : 'border-border bg-surface-2'}`} onClick={() => setSlackSync(!slackSync)}>
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-lg bg-purple-500/15 flex items-center justify-center text-purple-400"><MessageSquare /></div>
                                        <div>
                                            <h4 className="font-semibold text-text-primary">تكامل سلاك</h4>
                                            <p className="text-sm text-text-tertiary">لرصد الحالة وإرسال التنبيهات</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {slackSync && <span className="text-xs bg-emerald-500/15 text-emerald-400 px-2 py-1 rounded font-medium">تم منح صلاحية المدير</span>}
                                        {slackSync && <CheckCircle2 className="text-primary" />}
                                    </div>
                                </div>

                                <div role="button" tabIndex={0} onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setTeamsSync(!teamsSync); } }} className={`p-4 rounded-lg border transition-colors cursor-pointer flex items-center justify-between ${teamsSync ? 'border-primary/30 bg-primary/5' : 'border-border bg-surface-2'}`} onClick={() => setTeamsSync(!teamsSync)}>
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-lg bg-indigo-500/15 flex items-center justify-center text-indigo-400"><MessageSquare /></div>
                                        <div>
                                            <h4 className="font-semibold text-text-primary">مايكروسوفت تيمز</h4>
                                            <p className="text-sm text-text-tertiary">لرصد الحالة وإرسال التنبيهات</p>
                                        </div>
                                    </div>
                                    {teamsSync && <CheckCircle2 className="text-primary" />}
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {step === 3 && (
                        <motion.div key="step3" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} className="space-y-6">
                            <h2 className="text-2xl font-bold flex items-center gap-3 text-text-primary"><Sparkles className="text-primary" /> إعداد الهيكل التنظيمي</h2>

                            <div className="space-y-6">
                                <div className="space-y-3">
                                    <label className="text-sm font-semibold text-text-primary">ساعات العمل الافتراضية</label>
                                    <p className="text-xs text-text-tertiary">يتوقف نشاط المنصة خارج هذه الساعات احتراماً لوقت الموظفين.</p>
                                    <div className="flex items-center gap-4">
                                        <input type="time" value={workStart} onChange={e => setWorkStart(e.target.value)} aria-label="بداية ساعات العمل" className="bg-surface-2 border border-border text-text-primary rounded-lg h-10 px-3 focus:border-primary/50 focus:ring-1 focus:ring-primary/20 focus-visible:outline-none text-sm" />
                                        <span className="text-text-quaternary">إلى</span>
                                        <input type="time" value={workEnd} onChange={e => setWorkEnd(e.target.value)} aria-label="نهاية ساعات العمل" className="bg-surface-2 border border-border text-text-primary rounded-lg h-10 px-3 focus:border-primary/50 focus:ring-1 focus:ring-primary/20 focus-visible:outline-none text-sm" />
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-border">
                                    <label className="text-sm font-semibold text-text-primary block mb-3">الأقسام / الفرق</label>
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {departments.map(dept => (
                                            <div key={dept} className="bg-surface-2 border border-border px-3 py-1.5 rounded-lg text-sm font-medium text-text-secondary flex items-center gap-2">
                                                {dept}
                                                <button onClick={() => removeDepartment(dept)} aria-label={`حذف ${dept}`} className="text-text-quaternary hover:text-destructive">&times;</button>
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
                                            className="flex-1 bg-surface-2 border border-border text-text-primary placeholder:text-text-quaternary rounded-lg h-10 px-3 focus:border-primary/50 focus:ring-1 focus:ring-primary/20 focus-visible:outline-none text-right text-sm"
                                        />
                                        <Button onClick={addDepartment} variant="secondary">إضافة</Button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {step === 4 && (
                        <motion.div key="step4" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} className="space-y-6 text-center">
                            <div className="w-16 h-16 bg-emerald-500/15 rounded-xl flex items-center justify-center mx-auto mb-6 border border-emerald-500/20">
                                <Check className="w-8 h-8 text-emerald-400" />
                            </div>
                            <h2 className="text-2xl font-bold mb-2 text-text-primary">إعداد مساحة العمل جاهزة!</h2>
                            <p className="text-text-tertiary max-w-sm mx-auto">
                                تم الاتصال بنجاح. وجدنا <b className="text-text-primary">١٤٢ موظفاً</b> عبر تكامل سلاك.
                            </p>

                            <div className="bg-surface-2 border border-border rounded-lg p-6 text-right max-w-sm mx-auto my-8">
                                <h4 className="font-semibold text-text-primary mb-2">الخطوات التلقائية التالية:</h4>
                                <ul className="text-sm text-text-secondary space-y-2">
                                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> توزيع الموظفين على الأقسام تلقائياً</li>
                                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> إنشاء روابط دخول سريعة</li>
                                    <li className="flex items-center gap-2 text-text-quaternary"><Clock className="w-4 h-4" /> إرسال بريد الترحيب (بانتظار موافقتك)</li>
                                </ul>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="flex justify-between items-center mt-12 pt-6 border-t border-border">
                    <Button variant="ghost" onClick={handleBack} disabled={step === 1} className={step === 1 ? 'opacity-0' : ''}>
                        السابق
                    </Button>

                    {step < 4 ? (
                        <Button className="font-medium px-8" onClick={handleNext}>
                            التالي <ChevronLeft className="mr-2 w-4 h-4" />
                        </Button>
                    ) : (
                        <Button className="font-medium px-8 bg-emerald-600 hover:bg-emerald-700" onClick={handleComplete}>
                            إطلاق بيئة العمل
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
};
