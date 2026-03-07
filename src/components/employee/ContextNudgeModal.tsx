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
                        className="relative w-full max-w-sm bg-surface-1 border border-border rounded-2xl p-6 sm:p-8 shadow-2xl overflow-hidden font-sans text-right"
                    >
                        <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

                        <button
                            onClick={onClose}
                            aria-label="إغلاق"
                            className="absolute top-4 left-4 p-2 text-text-quaternary hover:text-text-secondary bg-surface-2 hover:bg-surface-3 rounded-full transition-colors z-10"
                        >
                            <X className="w-5 h-5" aria-hidden="true" />
                        </button>

                        <div className="relative z-10">
                            <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-violet-500/20 rounded-2xl flex items-center justify-center mb-6 border border-primary/20">
                                <Coffee className="w-8 h-8 text-primary" />
                            </div>

                            <div className="mb-8">
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-accent/10 text-accent text-xs font-bold rounded-full mb-4 border border-accent/20">
                                    <Zap className="w-3.5 h-3.5 fill-current" />
                                    اقتراح ذكي
                                </span>
                                <h2 className="text-2xl font-black text-text-primary tracking-tight leading-tight mb-3">حان وقت استراحة سريعة لعينيك!</h2>
                                <p className="text-text-tertiary font-medium leading-relaxed">
                                    لقد كنت تنظر إلى الشاشة لمدة ساعتين متواصلة. خذ دقيقتين للتركيز على شيء بعيد لتقليل إجهاد العين.
                                </p>
                            </div>

                            <div className="flex flex-col gap-3">
                                <Button
                                    onClick={onAccept}
                                    className="w-full h-14 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl shadow-[0_8px_20px_rgba(139,92,246,0.2)] hover:shadow-[0_12px_25px_rgba(139,92,246,0.3)] hover:-translate-y-0.5 transition-[color,background-color,box-shadow,transform] focus-visible:outline-none"
                                >
                                    حسناً، فلنفعل ذلك (١٠ نقاط)
                                </Button>
                                <Button
                                    variant="ghost"
                                    onClick={onClose}
                                    className="w-full h-12 text-text-tertiary hover:text-text-secondary hover:bg-surface-2 font-bold rounded-xl transition-colors focus-visible:outline-none"
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
