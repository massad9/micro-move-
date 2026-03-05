import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Key, Bell, CreditCard, Users, LogOut, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useMicroMoveStore } from '@/store/microMoveStore';

export const AdminSettings: React.FC = () => {
    const logout = useMicroMoveStore(state => state.logout);


    const [activeSection, setActiveSection] = useState('permissions');

    const sections = [
        { id: 'permissions', label: 'Role Permissions', icon: Shield },
        { id: 'integrations', label: 'Integrations Auth', icon: Key },
        { id: 'notifications', label: 'Global Notifications', icon: Bell },
        { id: 'billing', label: 'Subscription & Billing', icon: CreditCard },
    ];

    return (
        <div className="flex flex-col md:flex-row gap-8 font-sans">
            {/* Sidebar Navigation */}
            <div className="w-full md:w-64 shrink-0 space-y-1">
                {sections.map((sec) => (
                    <button
                        key={sec.id}
                        onClick={() => setActiveSection(sec.id)}
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all text-sm font-semibold ${activeSection === sec.id
                            ? 'bg-white text-primary shadow-sm border border-slate-200'
                            : 'text-slate-500 hover:bg-white/50 hover:text-slate-900 border border-transparent'
                            }`}
                    >
                        <div className="flex items-center gap-3">
                            <sec.icon className={`w-4 h-4 ${activeSection === sec.id ? 'text-primary' : 'text-slate-400'}`} />
                            {sec.label}
                        </div>
                    </button>
                ))}

                <div className="pt-6 mt-6 border-t border-slate-200">
                    <button
                        onClick={logout}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 font-semibold text-sm transition-colors"
                    >
                        <LogOut className="w-4 h-4 text-red-500" />
                        Sign Out Completely
                    </button>
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1">
                <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-200 min-h-[500px]">

                    {activeSection === 'permissions' && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                            <div className="border-b border-slate-100 pb-4">
                                <h2 className="text-xl font-bold text-slate-900">Workspace Admins</h2>
                                <p className="text-sm text-slate-500">Manage who has access to the telemetry portal.</p>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-4 border border-slate-100 rounded-xl">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">SF</div>
                                        <div>
                                            <p className="font-bold text-slate-900">Sara Al-Fahad <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded ml-2">You</span></p>
                                            <p className="text-sm text-slate-500">admin@micromove.sa</p>
                                        </div>
                                    </div>
                                    <span className="text-sm font-medium text-slate-400">Owner</span>
                                </div>
                                <Button variant="outline" className="w-full border-dashed"><Users className="w-4 h-4 mr-2" /> Invite New Admin</Button>
                            </div>
                        </motion.div>
                    )}

                    {activeSection === 'integrations' && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                            <div className="border-b border-slate-100 pb-4">
                                <h2 className="text-xl font-bold text-slate-900">Integration Status</h2>
                                <p className="text-sm text-slate-500">Manage API connections and permissions.</p>
                            </div>

                            <div className="space-y-4">
                                {['Google Workspace (Calendar)', 'Slack (Presence API)'].map(int => (
                                    <div key={int} className="flex items-center justify-between p-4 border border-emerald-100 bg-emerald-50/30 rounded-xl">
                                        <div>
                                            <p className="font-bold text-slate-900">{int}</p>
                                            <p className="text-sm text-slate-500">Connected on Aug 12, 2026</p>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div className="flex items-center gap-1.5 text-emerald-600 text-sm font-bold">
                                                <CheckCircle2 className="w-4 h-4" /> Active
                                            </div>
                                            <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-50">Revoke</Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {activeSection === 'billing' && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                            <div className="border-b border-slate-100 pb-4">
                                <h2 className="text-xl font-bold text-slate-900">Current Plan</h2>
                            </div>

                            <div className="bg-slate-900 text-white p-6 rounded-2xl relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-3xl rounded-full" />
                                <div className="relative z-10">
                                    <span className="bg-primary/20 text-primary-foreground border border-primary/50 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Enterprise Pro</span>
                                    <h3 className="text-4xl font-black mt-4 mb-1">$499<span className="text-lg text-slate-400 font-medium">/mo</span></h3>
                                    <p className="text-slate-400 text-sm mb-6">Billed annually ($5,988). Next charge Sep 1, 2026.</p>

                                    <div className="space-y-2 mb-6">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-slate-400">Active Employees (up to 500)</span>
                                            <span className="font-bold">142 / 500</span>
                                        </div>
                                        <div className="w-full bg-white/10 rounded-full h-2">
                                            <div className="bg-primary h-2 rounded-full" style={{ width: '28%' }}></div>
                                        </div>
                                    </div>
                                    <Button className="w-full bg-white text-slate-900 hover:bg-slate-100">Manage Billing via Stripe</Button>
                                </div>
                            </div>
                        </motion.div>
                    )}

                </div>
            </div>
        </div>
    );
};
