import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Building2, Users, Clock, Calendar, MessageSquare,
    Upload, CheckCircle2, ChevronLeft, Check, Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useMicroMoveStore } from '@/store/microMoveStore';
import { cn } from '@/lib/utils';

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
        <div className="max-w-4xl mx-auto py-20 px-6 font-sans">
            <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-16"
            >
                <div className="inline-flex items-center gap-2 px-3 py-1 text-[10px] font-bold tracking-[0.2em] uppercase text-primary bg-primary/10 rounded-full border border-primary/20 mb-6">
                    الإعداد الإداري
                </div>
                <h1 className="text-4xl font-bold text-foreground tracking-tight mb-4">إعداد بيئة العمل</h1>
                <p className="text-xl text-muted-foreground font-medium opacity-80">هيئ مايكرو موف ليناسب أسلوب مؤسستك الفريد.</p>

                {/* Progress Indicators */}
                <div className="flex items-center mt-12 gap-3">
                    {[1, 2, 3, 4].map(s => (
                        <div key={s} className="flex-1 h-1.5 rounded-full bg-secondary border border-border/20 overflow-hidden">
                            <motion.div
                                className="h-full bg-primary"
                                initial={{ width: "0%" }}
                                animate={{ width: step >= s ? "100%" : "0%" }}
                                transition={{ duration: 0.4 }}
                            />
                        </div>
                    ))}
                </div>
            </motion.div>

            <div className="linear-card p-10 md:p-16 relative overflow-hidden">
                <AnimatePresence mode="wait">
                    {step === 1 && (
                        <motion.div key="step1" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-10">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-secondary border border-border/40 flex items-center justify-center">
                                    <Building2 className="w-6 h-6 text-primary" />
                                </div>
                                <h2 className="text-2xl font-bold tracking-tight">بيانات الشركة الأساسية</h2>
                            </div>

                            <div className="space-y-8">
                                <div className="space-y-3">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground opacity-70">اسم الشركة</label>
                                    <input type="text" value={companyName} onChange={e => setCompanyName(e.target.value)} className="w-full h-14 px-6 bg-secondary border border-border/40 rounded-xl focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all font-medium" placeholder="مثال: شركة أكمي" />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground opacity-70">حجم الشركة</label>
                                    <select value={companySize} onChange={e => setCompanySize(e.target.value)} className="w-full h-14 px-6 bg-secondary border border-border/40 rounded-xl focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all font-medium appearance-none">
                                        <option value="1-50">١-٥٠ موظف</option>
                                        <option value="51-200">٥١-٢٠٠ موظف</option>
                                        <option value="201-500">٢٠١-٥٠٠ موظف</option>
                                        <option value="500+">+٥٠٠ موظف</option>
                                    </select>
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground opacity-70">شعار الشركة</label>
                                    <div className="border border-dashed border-border/40 rounded-xl p-12 flex flex-col items-center justify-center text-muted-foreground bg-secondary/20 cursor-pointer hover:bg-secondary/40 transition-all group">
                                        <Upload className="w-8 h-8 mb-4 group-hover:scale-110 transition-transform text-primary/60" />
                                        <span className="text-xs font-bold uppercase tracking-widest opacity-60">اضغط للرفع أو اسحب وأفلت</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {step === 2 && (
                        <motion.div key="step2" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-10">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-secondary border border-border/40 flex items-center justify-center">
                                    <Users className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold tracking-tight">التكاملات المؤسسية</h2>
                                    <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground opacity-60 mt-1">اربط أدواتك لتمكين الإعداد السلس</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className={cn(
                                    "p-6 rounded-xl border transition-all cursor-pointer flex items-center justify-between group",
                                    calendarSync ? "border-primary/40 bg-primary/[0.02]" : "border-border/40 bg-secondary hover:bg-secondary/80"
                                )} onClick={() => setCalendarSync(!calendarSync)}>
                                    <div className="flex items-center gap-6">
                                        <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 border border-blue-500/20 group-hover:scale-110 transition-transform"><Calendar className="w-6 h-6" /></div>
                                        <div>
                                            <h4 className="font-bold tracking-tight">مزامنة التقويم (Google/O365)</h4>
                                            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground opacity-60 mt-1">يكتشف أوقات الفراغ والاجتماعات الطويلة</p>
                                        </div>
                                    </div>
                                    {calendarSync && <CheckCircle2 className="text-primary w-6 h-6" />}
                                </div>

                                <div className={cn(
                                    "p-6 rounded-xl border transition-all cursor-pointer flex items-center justify-between group",
                                    slackSync ? "border-primary/40 bg-primary/[0.02]" : "border-border/40 bg-secondary hover:bg-secondary/80"
                                )} onClick={() => setSlackSync(!slackSync)}>
                                    <div className="flex items-center gap-6">
                                        <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 border border-purple-500/20 group-hover:scale-110 transition-transform"><MessageSquare className="w-6 h-6" /></div>
                                        <div>
                                            <h4 className="font-bold tracking-tight">تكامل سلاك</h4>
                                            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground opacity-60 mt-1">لرصد الحالة وإرسال التنبيهات</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        {slackSync && <span className="text-[9px] font-bold uppercase tracking-widest bg-green-500/10 text-green-400 border border-green-500/20 px-2 py-1 rounded">تم منح صلاحية المدير</span>}
                                        {slackSync && <CheckCircle2 className="text-primary w-6 h-6" />}
                                    </div>
                                </div>

                                <div className={cn(
                                    "p-6 rounded-xl border transition-all cursor-pointer flex items-center justify-between group",
                                    teamsSync ? "border-primary/40 bg-primary/[0.02]" : "border-border/40 bg-secondary hover:bg-secondary/80"
                                )} onClick={() => setTeamsSync(!teamsSync)}>
                                    <div className="flex items-center gap-6">
                                        <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 border border-indigo-500/20 group-hover:scale-110 transition-transform"><MessageSquare className="w-6 h-6" /></div>
                                        <div>
                                            <h4 className="font-bold tracking-tight">مايكروسوفت تيمز</h4>
                                            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground opacity-60 mt-1">لرصد الحالة وإرسال التنبيهات</p>
                                        </div>
                                    </div>
                                    {teamsSync && <CheckCircle2 className="text-primary w-6 h-6" />}
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {step === 3 && (
                        <motion.div key="step3" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-10">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-secondary border border-border/40 flex items-center justify-center">
                                    <Sparkles className="w-6 h-6 text-primary" />
                                </div>
                                <h2 className="text-2xl font-bold tracking-tight">إعداد الهيكل التنظيمي</h2>
                            </div>

                            <div className="space-y-10">
                                <div className="space-y-5">
                                    <div className="flex flex-col gap-2">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground opacity-70">ساعات العمل الافتراضية</label>
                                        <p className="text-xs font-medium text-muted-foreground opacity-60">يتوقف نشاط المنصة خارج هذه الساعات احتراماً لوقت الموظفين.</p>
                                    </div>
                                    <div className="flex items-center gap-6">
                                        <div className="flex-1 relative">
                                            <input type="time" value={workStart} onChange={e => setWorkStart(e.target.value)} className="w-full h-14 px-6 bg-secondary border border-border/40 rounded-xl focus:ring-1 focus:ring-primary outline-none transition-all font-bold appearance-none text-center" />
                                        </div>
                                        <span className="text-[10px] font-bold uppercase tracking-widest opacity-40">إلى</span>
                                        <div className="flex-1 relative">
                                            <input type="time" value={workEnd} onChange={e => setWorkEnd(e.target.value)} className="w-full h-14 px-6 bg-secondary border border-border/40 rounded-xl focus:ring-1 focus:ring-primary outline-none transition-all font-bold appearance-none text-center" />
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-10 border-t border-border/10">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground opacity-70 block mb-6">الأقسام / الفرق</label>
                                    <div className="flex flex-wrap gap-3 mb-8">
                                        {departments.map(dept => (
                                            <div key={dept} className="bg-secondary border border-border/40 px-4 py-2 rounded-xl text-[11px] font-bold uppercase tracking-widest flex items-center gap-3 group">
                                                {dept}
                                                <button onClick={() => removeDepartment(dept)} className="text-muted-foreground hover:text-red-500 transition-colors opacity-40 group-hover:opacity-100">&times;</button>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex gap-4">
                                        <input
                                            type="text"
                                            value={newDept}
                                            onChange={e => setNewDept(e.target.value)}
                                            onKeyDown={e => e.key === 'Enter' && addDepartment()}
                                            placeholder="أضف قسماً جديداً..."
                                            className="flex-1 h-12 px-6 bg-secondary border border-border/40 rounded-xl outline-none text-sm font-medium focus:border-primary transition-all"
                                        />
                                        <button onClick={addDepartment} className="h-12 px-6 bg-secondary text-foreground border border-border/40 rounded-xl font-bold text-[11px] uppercase tracking-widest hover:bg-secondary/80 transition-all">إضافة</button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {step === 4 && (
                        <motion.div key="step4" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-10 text-center">
                            <motion.div 
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ type: "spring", damping: 15 }}
                                className="w-24 h-24 bg-green-500/10 border border-green-500/20 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-green-500/10"
                            >
                                <Check className="w-10 h-10 text-green-400" />
                            </motion.div>
                            <h2 className="text-3xl font-bold tracking-tight">إعداد مساحة العمل جاهزة!</h2>
                            <p className="text-muted-foreground max-w-sm mx-auto font-medium opacity-80">
                                تم الاتصال بنجاح. وجدنا <b className="text-foreground">١٤٢ موظفاً</b> عبر تكامل سلاك.
                            </p>

                            <div className="bg-secondary/40 border border-border/40 rounded-2xl p-8 text-right max-w-sm mx-auto my-12 relative overflow-hidden">
                                <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground opacity-60 mb-6 border-b border-border/10 pb-4">الخطوات التلقائية التالية</h4>
                                <ul className="text-[11px] font-bold uppercase tracking-widest text-foreground/80 space-y-4">
                                    <li className="flex items-center gap-3"><CheckCircle2 className="w-4 h-4 text-green-400" /> توزيع الموظفين على الأقسام</li>
                                    <li className="flex items-center gap-3"><CheckCircle2 className="w-4 h-4 text-green-400" /> إنشاء روابط دخول سريعة</li>
                                    <li className="flex items-center gap-3 opacity-40"><Clock className="w-4 h-4" /> إرسال بريد الترحيب</li>
                                </ul>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="flex justify-between items-center mt-16 pt-10 border-t border-border/10">
                    <button onClick={handleBack} disabled={step === 1} className={cn(
                        "h-12 px-8 rounded-xl font-bold text-[11px] uppercase tracking-widest transition-all",
                        step === 1 ? 'opacity-0' : 'bg-secondary text-foreground hover:bg-secondary/80 border border-border/40'
                    )}>
                        السابق
                    </button>

                    {step < 4 ? (
                        <button className="h-12 px-10 bg-primary text-primary-foreground font-bold text-[11px] uppercase tracking-widest rounded-xl shadow-lg shadow-primary/10 hover:brightness-110 active:scale-[0.98] transition-all flex items-center gap-3" onClick={handleNext}>
                            التالي <ChevronLeft className="w-4 h-4" />
                        </button>
                    ) : (
                        <button className="h-12 px-10 bg-primary text-primary-foreground font-bold text-[11px] uppercase tracking-widest rounded-xl shadow-2xl shadow-primary/20 hover:brightness-110 active:scale-[0.98] transition-all" onClick={handleComplete}>
                            إطلاق بيئة العمل
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};
