import { useMemo, useState } from "react"
import confetti from "canvas-confetti"
import { motion, AnimatePresence } from "framer-motion"
import {
  Award,
  Check,
  Gift,
  Sparkles,
  Trophy,
} from "lucide-react"


import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { useMicroMoveStore } from "@/store/microMoveStore"
import { PremiumActivityCard } from "./PremiumActivityCard"

type TabKey = "activities" | "rewards"

function ProgressRing({ completed, total }: { completed: number; total: number }) {
  const pct = total === 0 ? 0 : Math.round((completed / total) * 100)
  const radius = 45
  const circumference = 2 * Math.PI * radius
  const dashOffset = circumference - (pct / 100) * circumference

  return (
    <div className="relative grid place-items-center">
      <svg width="120" height="120" viewBox="0 0 120 120" className="-rotate-90">
        <circle
          cx="60"
          cy="60"
          r={radius}
          fill="transparent"
          stroke="hsl(var(--muted))"
          strokeWidth="8"
        />
        <circle
          cx="60"
          cy="60"
          r={radius}
          fill="transparent"
          stroke="hsl(var(--primary))"
          strokeWidth="8"
          strokeLinecap="round"
          style={{
            strokeDasharray: circumference,
            strokeDashoffset: dashOffset,
            filter: "drop-shadow(0 4px 10px hsl(var(--primary) / 0.5))",
            transition: "stroke-dashoffset 800ms cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        />
      </svg>
      <div className="absolute grid place-items-center">
        <div className="text-3xl font-bold tracking-tight text-slate-900">{pct}%</div>
        <div className="text-xs font-medium text-slate-500">
          {completed}/{total}
        </div>
      </div>
    </div>
  )
}

function CheckOverlay({ open }: { open: boolean }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="pointer-events-none fixed inset-0 z-50 grid place-items-center bg-white/20 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            transition={{ type: "spring", bounce: 0.5 }}
            className="flex items-center gap-4 rounded-3xl bg-white/90 p-6 shadow-2xl ring-1 ring-slate-900/5 backdrop-blur-xl"
          >
            <div className="grid h-16 w-16 place-items-center rounded-2xl bg-emerald-500/10 text-emerald-600">
              <Check className="h-8 w-8" strokeWidth={3} />
            </div>
            <div>
              <div className="text-2xl font-bold tracking-tight text-slate-900 leading-none">Perfect!</div>
              <div className="text-sm font-medium text-slate-500 mt-1">
                Move completed successfully.
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export function EmployeeDashboard() {
  const [tab, setTab] = useState<TabKey>("activities")
  const [successPulse, setSuccessPulse] = useState(false)

  const employeeName = useMicroMoveStore((s) => s.user?.name || "Employee")
  const points = useMicroMoveStore((s) => s.user?.points || 0)
  const activities = useMicroMoveStore((s) => s.activities)
  const leaderboardTop3 = useMicroMoveStore((s) => s.leaderboardTop3)
  const rewards = useMicroMoveStore((s) => s.rewards)
  const markActivityDone = useMicroMoveStore((s) => s.markActivityDone)

  const completedCount = useMemo(
    () => activities.filter((a) => a.isDone).length,
    [activities]
  )
  const dailyGoal = activities.length

  const onDone = (id: string) => {
    const res = markActivityDone(id)
    if (!res) return

    confetti({
      particleCount: 100,
      spread: 70,
      startVelocity: 30,
      origin: { y: 0.8 },
      colors: ["#10b981", "#3b82f6", "#8b5cf6", "#f43f5e"],
      disableForReducedMotion: true,
    })

    setSuccessPulse(true)
    window.setTimeout(() => setSuccessPulse(false), 1200)
  }

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  }

  return (
    <div dir="rtl" className="min-h-dvh pb-24 bg-slate-50 flex flex-col lg:flex-row">
      {/* Premium Header Gradient Background for the whole page */}
      <div className="absolute top-0 w-full h-64 bg-gradient-to-br from-indigo-50 via-white to-sky-50 -z-10" />

      {/* Main Content Area (Left side on Desktop, Top on Mobile) */}
      <div className="flex-1 w-full px-4 md:px-8 lg:px-12 pt-8 overflow-y-auto no-scrollbar pb-32">

        {/* Replace the old header with the new HeroBanner (We will import it or rebuild it here) */}
        {/* For now, we keep the Tabs but style them like the Pill buttons */}
        <section className="mt-2">
          <Tabs value={tab} onValueChange={(v) => setTab(v as TabKey)}>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">تابع نشاطك</h2>
              <TabsList className="bg-transparent h-auto p-0 gap-3">
                <TabsTrigger
                  value="activities"
                  className="rounded-full px-5 py-2.5 font-bold text-sm data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-600 data-[state=active]:shadow-none transition-all text-slate-500 bg-white border border-slate-200 shadow-sm hover:shadow-md hover:-translate-y-0.5"
                >
                  <Sparkles className="h-4 w-4 ml-2" /> الأنشطة
                </TabsTrigger>
                <TabsTrigger
                  value="rewards"
                  className="rounded-full px-5 py-2.5 font-bold text-sm data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-600 data-[state=active]:shadow-none transition-all text-slate-500 bg-white border border-slate-200 shadow-sm hover:shadow-md hover:-translate-y-0.5"
                >
                  <Gift className="h-4 w-4 ml-2" /> المكافآت
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="activities" className="mt-0">
              <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                <AnimatePresence>
                  {activities.map((a) => (
                    <PremiumActivityCard
                      key={a.id}
                      activity={a}
                      onDone={onDone}
                    />
                  ))}
                </AnimatePresence>
              </motion.div>
            </TabsContent>

            <TabsContent value="rewards" className="mt-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rewards.map((r) => (
                <motion.div
                  key={r.title}
                  whileHover={{ y: -4, scale: 1.02 }}
                  className="rounded-3xl border border-white bg-white/70 p-6 shadow-lg shadow-slate-200/40 backdrop-blur-xl flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-500 flex items-center justify-center mb-4">
                      <Gift className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{r.title}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed mb-6">{r.description}</p>
                  </div>
                  <div className="flex items-center justify-between rounded-2xl border border-amber-100 bg-amber-50/50 px-4 py-3">
                    <span className="text-sm font-semibold text-amber-900">التكلفة</span>
                    <span className="text-lg font-bold tabular-nums text-amber-600 flex items-center gap-1">
                      {r.cost} <Award className="h-5 w-5" />
                    </span>
                  </div>
                </motion.div>
              ))}
            </TabsContent>
          </Tabs>
        </section>
      </div>

      {/* Right Sidebar Area (Stats & Leaderboard) */}
      <aside className="w-full lg:w-[380px] shrink-0 border-r border-slate-200 bg-white/50 backdrop-blur-xl p-6 lg:p-8 flex flex-col gap-8 hidden md:flex h-dvh overflow-y-auto no-scrollbar shadow-[-10px_0_30px_rgb(0,0,0,0.02)] relative z-10">

        {/* User Greeting & Points */}
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900">إحصائياتك</h2>
          <div className="p-2 rounded-xl bg-slate-100/50 hover:bg-slate-100 transition-colors cursor-pointer">
            <Sparkles className="w-5 h-5 text-slate-400" />
          </div>
        </div>

        {/* Progress Ring Widget */}
        <div className="flex flex-col items-center p-8 bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
          <ProgressRing completed={completedCount} total={dailyGoal} />
          <h3 className="text-xl font-bold tracking-tight text-slate-900 mt-6 mb-1">
            صباح الخير، {employeeName} <span className="text-amber-500">🔥</span>
          </h3>
          <p className="text-sm text-slate-500 font-medium text-center">
            استمر في نشاطك لتحقيق هدفك اليومي!
          </p>
        </div>

        {/* Points Summary Widget */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-indigo-50 border border-indigo-100 rounded-3xl p-5 flex flex-col items-center justify-center text-center">
            <Award className="w-8 h-8 text-indigo-500 mb-2" />
            <span className="text-2xl font-bold text-indigo-900 tabular-nums leading-none">{points}</span>
            <span className="text-xs font-bold text-indigo-600/80 uppercase tracking-widest mt-2">نقطة</span>
          </div>
          <div className="bg-amber-50 border border-amber-100 rounded-3xl p-5 flex flex-col items-center justify-center text-center">
            <Trophy className="w-8 h-8 text-amber-500 mb-2" />
            <span className="text-2xl font-bold text-amber-900 tabular-nums leading-none">🔥 3</span>
            <span className="text-xs font-bold text-amber-600/80 uppercase tracking-widest mt-2">أيام سلسلة</span>
          </div>
        </div>

        {/* Top Performers (Leaderboard) Widget */}
        <div className="mt-4">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-slate-900">أفضل الموظفين</h3>
            <div className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:border-indigo-200 cursor-pointer transition-colors bg-white">
              <span className="text-lg leading-none mb-1">+</span>
            </div>
          </div>

          <div className="space-y-4">
            {leaderboardTop3.map((entry, idx) => (
              <div
                key={entry.name}
                className="group flexItems-center justify-between rounded-3xl border border-white bg-white/80 p-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all backdrop-blur-xl"
              >
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <img
                      src={`https://i.pravatar.cc/150?u=${entry.name}`}
                      alt="avatar"
                      className="w-12 h-12 rounded-full ring-2 ring-white shadow-sm"
                    />
                    <div className={cn(
                      "absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white border-2 border-white",
                      idx === 0 ? "bg-amber-500" :
                        idx === 1 ? "bg-slate-400" :
                          "bg-orange-400"
                    )}>
                      {idx + 1}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-900">{entry.name}</div>
                    <div className="text-xs font-medium text-slate-500">{entry.points} نقطة</div>
                  </div>
                </div>
                <button className="px-4 py-2 rounded-full border border-indigo-100 text-indigo-600 text-xs font-bold hover:bg-indigo-50 transition-colors flex items-center gap-1">
                  <span className="text-[10px]">⭐</span> متابعة
                </button>
              </div>
            ))}

            <button className="w-full py-4 mt-4 rounded-full bg-indigo-50/50 text-indigo-600 text-sm font-bold hover:bg-indigo-50 transition-colors">
              عرض الكل
            </button>
          </div>
        </div>
      </aside>

      <CheckOverlay open={successPulse} />
    </div>
  )
}

