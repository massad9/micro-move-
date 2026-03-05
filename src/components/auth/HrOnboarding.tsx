import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Building2, Users, Clock, Calendar, MessageSquare,
    Upload, CheckCircle2, ChevronRight, Check
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useMicroMoveStore } from '@/store/microMoveStore';

interface HrOnboardingProps {
    onComplete: () => void;
}

export const HrOnboarding: React.FC<HrOnboardingProps> = ({ onComplete }) => {
    const [step, setStep] = useState(1);
    const updateCompanySettings = useMicroMoveStore(state => state.updateCompanySettings);

    // Step 1: Company Details
    const [companyName, setCompanyName] = useState('Acme Corp');
    const [companySize, setCompanySize] = useState('100-500');

    // Step 2: Integrations
    const [calendarSync, setCalendarSync] = useState(true);
    const [slackSync, setSlackSync] = useState(true);
    const [teamsSync, setTeamsSync] = useState(false);

    // Step 3: Org Setup
    const [departments, setDepartments] = useState(['Engineering', 'Marketing', 'Sales']);
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
        updateCompanySettings({
            companyName,
            companySize,
            departments,
            workingHours: { start: workStart, end: workEnd },
            integrations: { calendar: calendarSync, slack: slackSync, teams: teamsSync }
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
                <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-2">Workspace Setup</h1>
                <p className="text-slate-500">Let's configure Micro Move to fit your organization's vibe.</p>

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
                        <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                            <h2 className="text-2xl font-bold flex items-center gap-3"><Building2 className="text-primary" /> Company Basics</h2>

                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-700">Company Name</label>
                                    <input type="text" value={companyName} onChange={e => setCompanyName(e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-primary outline-none" placeholder="e.g. Acme Corp" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-700">Company Size</label>
                                    <select value={companySize} onChange={e => setCompanySize(e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-primary outline-none">
                                        <option value="1-50">1-50 employees</option>
                                        <option value="51-200">51-200 employees</option>
                                        <option value="201-500">201-500 employees</option>
                                        <option value="500+">500+ employees</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-700">Company Logo</label>
                                    <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 flex flex-col items-center justify-center text-slate-400 bg-slate-50/50 cursor-pointer hover:bg-slate-50 transition-colors">
                                        <Upload className="w-8 h-8 mb-2" />
                                        <span className="text-sm font-medium">Click to upload or drag and drop</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {step === 2 && (
                        <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                            <h2 className="text-2xl font-bold flex items-center gap-3"><Users className="text-primary" /> Enterprise Integrations</h2>
                            <p className="text-sm text-slate-500 mb-6">Connect tools to enable "Zero-Friction" setup and context-aware nudges based on presence.</p>

                            <div className="space-y-4">
                                <div className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex items-center justify-between ${calendarSync ? 'border-primary bg-primary/5' : 'border-slate-200 bg-white'}`} onClick={() => setCalendarSync(!calendarSync)}>
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600"><Calendar /></div>
                                        <div>
                                            <h4 className="font-bold text-slate-900">Calendar Sync (Google/O365)</h4>
                                            <p className="text-sm text-slate-500">Detects free time and long meetings</p>
                                        </div>
                                    </div>
                                    {calendarSync && <CheckCircle2 className="text-primary" />}
                                </div>

                                <div className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex items-center justify-between ${slackSync ? 'border-primary bg-primary/5' : 'border-slate-200 bg-white'}`} onClick={() => setSlackSync(!slackSync)}>
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600"><MessageSquare /></div>
                                        <div>
                                            <h4 className="font-bold text-slate-900">Slack Integration</h4>
                                            <p className="text-sm text-slate-500">For status detection and nudges</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {slackSync && <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded font-bold">Admin Consent Granted</span>}
                                        {slackSync && <CheckCircle2 className="text-primary" />}
                                    </div>
                                </div>

                                <div className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex items-center justify-between ${teamsSync ? 'border-primary bg-primary/5' : 'border-slate-200 bg-white'}`} onClick={() => setTeamsSync(!teamsSync)}>
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600"><MessageSquare /></div>
                                        <div>
                                            <h4 className="font-bold text-slate-900">Microsoft Teams</h4>
                                            <p className="text-sm text-slate-500">For status detection and nudges</p>
                                        </div>
                                    </div>
                                    {teamsSync && <CheckCircle2 className="text-primary" />}
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {step === 3 && (
                        <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                            <h2 className="text-2xl font-bold flex items-center gap-3"><Clock className="text-primary" /> Organizational Setup</h2>

                            <div className="space-y-6">
                                <div className="space-y-3">
                                    <label className="text-sm font-bold text-slate-900">Default Working Hours</label>
                                    <p className="text-xs text-slate-500">Platform activity freezes outside these hours to respect employee time.</p>
                                    <div className="flex items-center gap-4">
                                        <input type="time" value={workStart} onChange={e => setWorkStart(e.target.value)} className="px-4 py-2 border rounded-lg bg-slate-50 outline-none" />
                                        <span className="text-slate-400">to</span>
                                        <input type="time" value={workEnd} onChange={e => setWorkEnd(e.target.value)} className="px-4 py-2 border rounded-lg bg-slate-50 outline-none" />
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-slate-100">
                                    <label className="text-sm font-bold text-slate-900 block mb-3">Departments / Teams</label>
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
                                            placeholder="Add new department..."
                                            className="flex-1 px-4 py-2 border rounded-lg bg-slate-50 outline-none"
                                        />
                                        <Button onClick={addDepartment} variant="secondary">Add</Button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {step === 4 && (
                        <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6 text-center">
                            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Check className="w-10 h-10 text-green-600" />
                            </div>
                            <h2 className="text-3xl font-black text-slate-900">Workspace Ready!</h2>
                            <p className="text-slate-500 max-w-sm mx-auto">
                                The system is connected. We found <b>142 employees</b> via your Slack integration.
                            </p>

                            <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 text-left max-w-sm mx-auto my-8">
                                <h4 className="font-bold text-slate-900 mb-2">Next automated steps:</h4>
                                <ul className="text-sm text-slate-600 space-y-2">
                                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> Auto-assign employees to departments</li>
                                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> Generate 1-click Magic Links</li>
                                    <li className="flex items-center gap-2 text-slate-400"><Clock className="w-4 h-4" /> Send welcome email (Pending your approval)</li>
                                </ul>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="flex justify-between items-center mt-12 pt-6 border-t border-slate-100">
                    <Button variant="ghost" onClick={handleBack} disabled={step === 1} className={step === 1 ? 'opacity-0' : ''}>
                        Back
                    </Button>

                    {step < 4 ? (
                        <Button className="font-bold px-8 shadow-md" onClick={handleNext}>
                            Continue <ChevronRight className="ml-2 w-4 h-4" />
                        </Button>
                    ) : (
                        <Button className="font-bold px-8 shadow-md bg-green-600 hover:bg-green-700" onClick={handleComplete}>
                            Launch Workspace
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
};
