import React, { useState, useEffect, useRef } from 'react'
import { X, Trophy, Pause, Play, RotateCcw } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Activity } from '@/store/microMoveStore'
import { useMicroMoveStore } from '@/store/microMoveStore'
import { parseDurationToSeconds } from '@/lib/parseDuration'
import confetti from 'canvas-confetti'
import { toast } from 'sonner'

interface ActivityFullScreenProps {
    activity: Activity
    isOpen: boolean
    onClose: () => void
}

const categoryCharacters: Record<string, { emoji: string, bg: string, glow: string, accent: string }> = {
    physical: { emoji: '🏃‍♂️', bg: 'from-emerald-950 via-emerald-900 to-slate-950', glow: 'rgba(16,185,129,0.3)', accent: '#10b981' },
    mindfulness: { emoji: '🧘', bg: 'from-rose-950 via-purple-950 to-slate-950', glow: 'rgba(244,63,94,0.3)', accent: '#f43f5e' },
    social: { emoji: '☕', bg: 'from-violet-950 via-indigo-950 to-slate-950', glow: 'rgba(139,92,246,0.3)', accent: '#8b5cf6' },
    hydration: { emoji: '💧', bg: 'from-blue-950 via-cyan-950 to-slate-950', glow: 'rgba(59,130,246,0.3)', accent: '#3b82f6' },
}

const encouragements = [
    'أنت تبلي بلاءً حسنًا!',
    'استمر، جسمك يشكرك!',
    'كل ثانية تُحدث فرقًا',
    'تنفّس بعمق واستمتع',
    'أنت أقرب مما تظن!',
]

export const ActivityFullScreen: React.FC<ActivityFullScreenProps> = ({ activity, isOpen, onClose }) => {
    const markActivityDone = useMicroMoveStore(state => state.markActivityDone)
    const [totalSeconds, setTotalSeconds] = useState(30)
    const [timeLeft, setTimeLeft] = useState(30)
    const [isPaused, setIsPaused] = useState(false)
    const [isComplete, setIsComplete] = useState(false)
    const [showVibeCheck, setShowVibeCheck] = useState(false)
    const [encouragement, setEncouragement] = useState('')
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
    const containerRef = useRef<HTMLDivElement>(null)

    const charMeta = categoryCharacters[activity.category] || categoryCharacters.physical

    useEffect(() => {
        if (!isOpen) return
        const seconds = parseDurationToSeconds(activity.duration)

        setTotalSeconds(seconds)
        setTimeLeft(seconds)
        setIsComplete(false)
        setShowVibeCheck(false)
        setIsPaused(false)
        setEncouragement(encouragements[Math.floor(Math.random() * encouragements.length)])
    }, [isOpen, activity.duration])

    useEffect(() => {
        if (!isOpen || isPaused || isComplete) return
        if (timeLeft <= 0) {
            setIsComplete(true)
            setTimeout(() => setShowVibeCheck(true), 800)
            return
        }
        const timer = setInterval(() => {
            setTimeLeft(prev => prev - 1)
        }, 1000)
        return () => clearInterval(timer)
    }, [isOpen, isPaused, isComplete, timeLeft])

    useEffect(() => {
        if (!isOpen) return
        const interval = setInterval(() => {
            setEncouragement(encouragements[Math.floor(Math.random() * encouragements.length)])
        }, 8000)
        return () => clearInterval(interval)
    }, [isOpen])

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!containerRef.current) return
        const rect = containerRef.current.getBoundingClientRect()
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2
        setMousePos({ x, y })
    }

    const handleVibeCheck = (emoji: string) => {
        setShowVibeCheck(false)

        confetti({
            particleCount: 200,
            spread: 100,
            origin: { y: 0.5 },
            colors: ['#F97316', '#14B8A6', '#3B82F6', '#8B5CF6', '#FBBF24']
        })

        setTimeout(() => {
            confetti({
                particleCount: 80,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: ['#F97316', '#FBBF24']
            })
            confetti({
                particleCount: 80,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: ['#14B8A6', '#3B82F6']
            })
        }, 300)

        markActivityDone(activity.id)

        toast.custom(() => (
            <div className="bg-slate-900 text-white rounded-2xl p-5 shadow-2xl border border-white/10 backdrop-blur-xl max-w-sm w-full font-sans" dir="rtl">
                <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg shadow-orange-500/30 shrink-0">
                        <Trophy className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                        <h4 className="font-black text-base tracking-tight">أحسنت! اكتملت الحركة {emoji}</h4>
                        <p className="text-slate-400 text-sm mt-1 font-medium">كسبت <span className="text-amber-400 font-black">+{activity.points}</span> نقطة</p>
                        <div className="flex items-center gap-2 mt-3">
                            <div className="h-1.5 flex-1 bg-white/10 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: '100%' }}
                                    transition={{ duration: 0.8, ease: 'easeOut' }}
                                    className="h-full bg-gradient-to-l from-amber-400 to-orange-500 rounded-full"
                                />
                            </div>
                            <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">مكتمل</span>
                        </div>
                    </div>
                </div>
            </div>
        ), { duration: 4000 })

        setTimeout(() => onClose(), 600)
    }

    const handleReset = () => {
        setTimeLeft(totalSeconds)
        setIsPaused(false)
        setIsComplete(false)
        setShowVibeCheck(false)
    }

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60)
        const s = seconds % 60
        return `${m}:${s < 10 ? '0' : ''}${s}`
    }

    const progress = totalSeconds > 0 ? ((totalSeconds - timeLeft) / totalSeconds) * 100 : 0

    if (!isOpen) return null

    return (
        <AnimatePresence>
            <motion.div
                ref={containerRef}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onMouseMove={handleMouseMove}
                className={`fixed inset-0 z-[100] bg-gradient-to-b ${charMeta.bg} flex flex-col font-sans overflow-hidden`}
                style={{ direction: 'rtl' }}
            >
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <motion.div
                        animate={{
                            x: [0, 30, -20, 0],
                            y: [0, -20, 30, 0],
                        }}
                        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                        className="absolute top-[10%] right-[10%] w-[40vw] h-[40vw] rounded-full blur-[120px] opacity-30"
                        style={{ background: `radial-gradient(circle, ${charMeta.glow}, transparent)` }}
                    />
                    <motion.div
                        animate={{
                            x: [0, -40, 20, 0],
                            y: [0, 30, -20, 0],
                        }}
                        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                        className="absolute bottom-[10%] left-[10%] w-[35vw] h-[35vw] rounded-full blur-[100px] opacity-20"
                        style={{ background: `radial-gradient(circle, ${charMeta.glow}, transparent)` }}
                    />
                    {[...Array(6)].map((_, i) => (
                        <motion.div
                            key={i}
                            animate={{
                                y: [0, -30 - i * 10, 0],
                                x: [0, (i % 2 === 0 ? 15 : -15), 0],
                                opacity: [0.05, 0.12, 0.05],
                            }}
                            transition={{ duration: 6 + i * 2, repeat: Infinity, ease: 'easeInOut', delay: i * 0.8 }}
                            className="absolute w-2 h-2 rounded-full"
                            style={{
                                background: charMeta.accent,
                                top: `${20 + i * 12}%`,
                                left: `${10 + i * 15}%`,
                            }}
                        />
                    ))}
                </div>

                <div className="relative z-10 flex items-center justify-between p-6 md:p-8">
                    <button
                        onClick={onClose}
                        className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all"
                    >
                        <X className="w-5 h-5" />
                    </button>

                    <div className="flex items-center gap-3">
                        <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md">
                            <span className="text-white/60 text-sm font-bold">+{activity.points}</span>
                            <span className="text-white/40 text-xs mr-1">نقطة</span>
                        </div>
                    </div>
                </div>

                <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 -mt-10">
                    <AnimatePresence mode="wait">
                        {!showVibeCheck ? (
                            <motion.div
                                key="timer"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -30 }}
                                className="flex flex-col items-center w-full max-w-lg"
                            >
                                <div
                                    className="relative mb-10"
                                    style={{
                                        perspective: '800px',
                                    }}
                                >
                                    <motion.div
                                        animate={{
                                            rotateY: mousePos.x * 15,
                                            rotateX: -mousePos.y * 15,
                                            y: [0, -12, 0],
                                        }}
                                        transition={{
                                            rotateX: { type: 'spring', stiffness: 100, damping: 20 },
                                            rotateY: { type: 'spring', stiffness: 100, damping: 20 },
                                            y: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
                                        }}
                                        className="relative"
                                        style={{ transformStyle: 'preserve-3d' }}
                                    >
                                        <div
                                            className="w-40 h-40 md:w-48 md:h-48 rounded-[2.5rem] flex items-center justify-center relative"
                                            style={{
                                                background: `linear-gradient(135deg, ${charMeta.accent}33, ${charMeta.accent}11)`,
                                                border: `1px solid ${charMeta.accent}33`,
                                                boxShadow: `0 20px 60px ${charMeta.glow}, 0 0 120px ${charMeta.glow}, inset 0 1px 0 rgba(255,255,255,0.1)`,
                                            }}
                                        >
                                            <motion.span
                                                animate={{
                                                    scale: [1, 1.08, 1],
                                                    rotate: isComplete ? [0, 10, -10, 0] : [0, 3, -3, 0],
                                                }}
                                                transition={{
                                                    duration: isComplete ? 0.5 : 4,
                                                    repeat: Infinity,
                                                    ease: 'easeInOut',
                                                }}
                                                className="text-7xl md:text-8xl select-none"
                                                style={{
                                                    filter: `drop-shadow(0 8px 20px ${charMeta.glow})`,
                                                    transform: 'translateZ(30px)',
                                                }}
                                            >
                                                {charMeta.emoji}
                                            </motion.span>

                                            <motion.div
                                                animate={{
                                                    scale: [1, 1.2, 1],
                                                    opacity: [0.3, 0.6, 0.3],
                                                }}
                                                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                                                className="absolute -inset-4 rounded-[3rem]"
                                                style={{
                                                    background: `radial-gradient(circle, ${charMeta.accent}22, transparent 70%)`,
                                                }}
                                            />
                                        </div>

                                        <motion.div
                                            animate={{ opacity: [0.2, 0.5, 0.2] }}
                                            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                                            className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-32 h-4 rounded-full blur-xl"
                                            style={{ background: charMeta.glow }}
                                        />
                                    </motion.div>
                                </div>

                                <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight text-center mb-2">
                                    {activity.title}
                                </h2>
                                <p className="text-white/40 text-sm md:text-base text-center max-w-sm mb-3 font-medium leading-relaxed">
                                    {activity.description}
                                </p>

                                <AnimatePresence mode="wait">
                                    <motion.p
                                        key={encouragement}
                                        initial={{ opacity: 0, y: 8 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -8 }}
                                        className="text-sm font-bold mb-10 h-6"
                                        style={{ color: charMeta.accent }}
                                    >
                                        {!isComplete && encouragement}
                                    </motion.p>
                                </AnimatePresence>

                                <div className="w-full max-w-md space-y-4">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-white/40 font-medium">{activity.duration}</span>
                                        <motion.span
                                            key={timeLeft}
                                            initial={{ scale: 1.2, opacity: 0.5 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            className="font-black text-2xl text-white tabular-nums tracking-tight"
                                            style={{ direction: 'ltr' }}
                                        >
                                            {formatTime(timeLeft)}
                                        </motion.span>
                                    </div>

                                    <div className="relative w-full h-3 bg-white/5 rounded-full overflow-hidden border border-white/10">
                                        <motion.div
                                            className="absolute inset-y-0 right-0 rounded-full"
                                            style={{
                                                background: `linear-gradient(90deg, ${charMeta.accent}, ${charMeta.accent}cc)`,
                                                boxShadow: `0 0 20px ${charMeta.glow}, 0 0 40px ${charMeta.glow}`,
                                            }}
                                            initial={{ width: '0%' }}
                                            animate={{ width: `${progress}%` }}
                                            transition={{ duration: 0.5, ease: 'easeOut' }}
                                        />
                                        <motion.div
                                            className="absolute top-1/2 -translate-y-1/2 w-5 h-5 rounded-full border-2 border-white shadow-lg"
                                            style={{
                                                background: charMeta.accent,
                                                boxShadow: `0 0 12px ${charMeta.glow}`,
                                                right: `calc(${progress}% - 10px)`,
                                            }}
                                            animate={{ scale: isPaused ? [1, 1.2, 1] : 1 }}
                                            transition={{ duration: 1.5, repeat: isPaused ? Infinity : 0, ease: 'easeInOut' }}
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 mt-10">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={handleReset}
                                        className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all"
                                    >
                                        <RotateCcw className="w-5 h-5" />
                                    </motion.button>

                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => setIsPaused(!isPaused)}
                                        className="h-14 px-10 rounded-2xl font-bold text-base flex items-center gap-3 transition-all"
                                        style={{
                                            background: isPaused ? charMeta.accent : 'rgba(255,255,255,0.08)',
                                            color: isPaused ? 'white' : 'rgba(255,255,255,0.7)',
                                            border: `1px solid ${isPaused ? charMeta.accent : 'rgba(255,255,255,0.1)'}`,
                                            boxShadow: isPaused ? `0 8px 30px ${charMeta.glow}` : 'none',
                                        }}
                                    >
                                        {isPaused ? (
                                            <>استكمال <Play className="w-5 h-5 fill-current" /></>
                                        ) : (
                                            <>إيقاف مؤقت <Pause className="w-5 h-5" /></>
                                        )}
                                    </motion.button>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="vibe"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 1.1 }}
                                className="flex flex-col items-center"
                            >
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
                                    className="w-24 h-24 rounded-full flex items-center justify-center mb-8"
                                    style={{
                                        background: `linear-gradient(135deg, ${charMeta.accent}44, ${charMeta.accent}11)`,
                                        border: `2px solid ${charMeta.accent}44`,
                                        boxShadow: `0 0 60px ${charMeta.glow}`,
                                    }}
                                >
                                    <motion.span
                                        animate={{ rotate: [0, 10, -10, 0] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                        className="text-5xl"
                                    >
                                        🎉
                                    </motion.span>
                                </motion.div>

                                <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight text-center mb-3">
                                    أحسنت!
                                </h2>
                                <p className="text-white/50 text-base text-center max-w-xs mb-10 font-medium">
                                    كيف تشعر بعد هذه الحركة؟
                                </p>

                                <div className="flex items-center gap-5">
                                    {[
                                        { e: '😫', label: 'متعب' },
                                        { e: '😐', label: 'عادي' },
                                        { e: '😊', label: 'رائع!' },
                                    ].map((mood, i) => (
                                        <motion.button
                                            key={mood.e}
                                            initial={{ opacity: 0, y: 30 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.4 + i * 0.1 }}
                                            whileHover={{ scale: 1.1, y: -4 }}
                                            whileTap={{ scale: 0.9 }}
                                            onClick={() => handleVibeCheck(mood.e)}
                                            className="flex flex-col items-center gap-3 group"
                                        >
                                            <div
                                                className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl transition-all"
                                                style={{
                                                    background: 'rgba(255,255,255,0.05)',
                                                    border: '1px solid rgba(255,255,255,0.1)',
                                                }}
                                            >
                                                {mood.e}
                                            </div>
                                            <span className="text-xs font-bold text-white/40 group-hover:text-white transition-colors tracking-wider">
                                                {mood.label}
                                            </span>
                                        </motion.button>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <div className="relative z-10 p-6 md:p-8 flex justify-center">
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
                        <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: charMeta.accent }} />
                        <span className="text-white/40 text-xs font-bold">
                            {isComplete ? 'اكتمل النشاط' : isPaused ? 'متوقف مؤقتاً' : 'جارٍ التنفيذ'}
                        </span>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    )
}
