import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Coffee, X, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ContextNudgeModalProps {
    isOpen: boolean
    onClose: () => void
    onAccept: () => void
}

export const ContextNudgeModal: React.FC<ContextNudgeModalProps> = ({ isOpen, onClose, onAccept }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        className="relative w-full max-w-sm bg-white/80 backdrop-blur-2xl border border-slate-200/50 rounded-3xl p-6 sm:p-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.7),_0_20px_40px_-15px_rgba(0,0,0,0.05)] overflow-hidden font-sans text-right"
                    >
                        <div className="absolute -top-24 -right-24 w-48 h-48 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

                        <button
                            onClick={onClose}
                            aria-label="إغلاق"
                            className="absolute top-4 left-4 p-2 text-slate-400 hover:text-slate-700 bg-slate-50/50 hover:bg-slate-100 rounded-full transition-colors z-10 border border-slate-200/50"
                        >
                            <X className="w-5 h-5" aria-hidden="true" />
                        </button>

                        <div className="relative z-10">
                            <div className="w-16 h-16 bg-gradient-to-br from-orange-50 to-orange-100/50 rounded-2xl flex items-center justify-center mb-6 border border-orange-200/50 shadow-inner">
                                <Coffee className="w-8 h-8 text-orange-500" />
                            </div>

                            <div className="mb-8">
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-600 text-xs font-bold rounded-full mb-4 border border-amber-200/50">
                                    <Zap className="w-3.5 h-3.5 fill-current" />
                                    اقتراح ذكي
                                </span>
                                <h2 className="text-2xl font-black text-slate-900 tracking-tight leading-tight mb-3">حان وقت استراحة سريعة لعينيك!</h2>
                                <p className="text-slate-500 font-medium leading-relaxed">
                                    لقد كنت تنظر إلى الشاشة لمدة ساعتين متواصلة. خذ دقيقتين للتركيز على شيء بعيد لتقليل إجهاد العين.
                                </p>
                            </div>

                            <div className="flex flex-col gap-3">
                                <Button
                                    onClick={onAccept}
                                    className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold h-12 rounded-xl shadow-[0_4px_14px_0_rgba(249,115,22,0.3)] hover:shadow-[0_6px_20px_rgba(249,115,22,0.4)] transition-all"
                                >
                                    حسناً، فلنفعل ذلك (١٠ نقاط)
                                </Button>
                                <Button
                                    variant="ghost"
                                    onClick={onClose}
                                    className="w-full h-12 text-slate-500 hover:text-slate-900 hover:bg-slate-100 font-bold rounded-xl transition-colors focus-visible:outline-none"
                                >
                                    تأجيل لمدة ساعة
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    )
}
