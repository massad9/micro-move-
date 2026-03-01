import { useMemo, useState } from "react"
import confetti from "canvas-confetti"
import {
  Activity,
  Award,
  Check,
  ChevronRight,
  Flame,
  Gift,
  Sparkles,
  Trophy,
} from "lucide-react"

import Badge from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { useMicroMoveStore } from "@/store/microMoveStore"

type TabKey = "activities" | "rewards"

const categoryMeta: Record<
  string,
  { icon: React.ComponentType<{ className?: string }>; label: string }
> = {
  physical: { icon: Activity, label: "Physical" },
  social: { icon: ChevronRight, label: "Social" },
  hydration: { icon: Flame, label: "Hydration" },
  mindfulness: { icon: Sparkles, label: "Mindfulness" },
}

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
          strokeWidth="10"
        />
        <circle
          cx="60"
          cy="60"
          r={radius}
          fill="transparent"
          stroke="hsl(var(--primary))"
          strokeWidth="10"
          strokeLinecap="round"
          style={{
            strokeDasharray: circumference,
            strokeDashoffset: dashOffset,
            filter: "drop-shadow(0 8px 20px hsl(var(--primary) / 0.35))",
            transition: "stroke-dashoffset 500ms ease-out",
          }}
        />
      </svg>
      <div className="absolute grid place-items-center">
        <div className="text-2xl font-semibold tracking-tight">{pct}%</div>
        <div className="text-xs text-muted-foreground">
          {completed}/{total} today
        </div>
      </div>
    </div>
  )
}

function CheckOverlay({ open }: { open: boolean }) {
  if (!open) return null

  return (
    <div className="pointer-events-none fixed inset-0 z-50 grid place-items-center">
      <div className="rounded-2xl bg-background/80 p-5 shadow-xl backdrop-blur animate-pop-in">
        <div className="flex items-center gap-3">
          <div className="grid h-12 w-12 place-items-center rounded-full bg-primary/10">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
              <path
                d="M20 6L9 17l-5-5"
                stroke="hsl(var(--primary))"
                strokeWidth="2.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="animate-checkmark"
              />
            </svg>
          </div>
          <div>
            <div className="font-semibold leading-tight">Nice!</div>
            <div className="text-sm text-muted-foreground leading-tight">
              Move completed
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function EmployeeDashboard() {
  const [tab, setTab] = useState<TabKey>("activities")
  const [successPulse, setSuccessPulse] = useState(false)

  const employeeName = useMicroMoveStore((s) => s.employeeName)
  const points = useMicroMoveStore((s) => s.points)
  const activities = useMicroMoveStore((s) => s.activities)
  const leaderboardTop3 = useMicroMoveStore((s) => s.leaderboardTop3)
  const rewards = useMicroMoveStore((s) => s.rewards)
  const markActivityDone = useMicroMoveStore((s) => s.markActivityDone)

  const completedCount = useMemo(
    () => activities.filter((a) => a.done).length,
    [activities]
  )

  const dailyGoal = activities.length

  const onDone = (id: string) => {
    const res = markActivityDone(id)
    if (!res) return

    confetti({
      particleCount: 70,
      spread: 60,
      startVelocity: 28,
      scalar: 0.9,
      origin: { y: 0.75 },
      colors: ["#2563EB", "#14B8A6", "#F97316", "#A855F7"],
    })

    setSuccessPulse(true)
    window.setTimeout(() => setSuccessPulse(false), 700)
  }

  return (
    <div dir="rtl" className="min-h-dvh pb-24">
      <div className="mx-auto w-full max-w-md px-4 pt-5">
        <header className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="text-sm text-muted-foreground">Micro Move</div>
            <h1 className="text-2xl font-semibold tracking-tight">
              Hello, {employeeName}! Ready to move?
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Small moves. Big momentum.
            </p>
          </div>
          <div
            className={cn(
              "shrink-0 rounded-xl border bg-white px-3 py-2 shadow-sm transition-transform",
              successPulse && "scale-[1.03]"
            )}
          >
            <div className="flex items-center gap-2">
              <Award className="h-4 w-4 text-primary" />
              <div className="text-sm font-semibold tabular-nums">{points} pts</div>
            </div>
          </div>
        </header>

        <section className="mt-5">
          <Card className="overflow-hidden bg-white shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Daily progress</CardTitle>
              <CardDescription>
                {completedCount}/{dailyGoal} activities completed today
              </CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-between gap-4">
              <ProgressRing completed={completedCount} total={dailyGoal} />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium">Streak</div>
                  <Badge variant="secondary" className="gap-1">
                    <Flame className="h-3.5 w-3.5" /> 3 days
                  </Badge>
                </div>
                <div className="mt-3 rounded-lg border bg-slate-50 p-3">
                  <div className="text-sm font-medium text-slate-700">Next reward</div>
                  <div className="mt-1 text-xs text-slate-500">
                    {Math.max(0, 500 - points)} pts to “Extra 1 Hour Off”
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="mt-5">
          <Tabs value={tab} onValueChange={(v) => setTab(v as TabKey)}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="activities" className="gap-2">
                <Sparkles className="h-4 w-4" /> Activities
              </TabsTrigger>
              <TabsTrigger value="rewards" className="gap-2">
                <Gift className="h-4 w-4" /> Rewards
              </TabsTrigger>
            </TabsList>

            <TabsContent value="activities" className="mt-4 space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold">Activity feed</h2>
                <Badge className="gap-1">
                  <Sparkles className="h-3.5 w-3.5" /> Smart AI Suggestions
                </Badge>
              </div>

              {activities.map((a) => {
                const meta = categoryMeta[a.category]
                const Icon = meta?.icon ?? Activity

                return (
                  <Card
                    key={a.id}
                    className={cn(
                      "bg-white shadow-sm transition-all hover:shadow-md",
                      a.done && "opacity-70"
                    )}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-3">
                            <div className="grid h-10 w-10 place-items-center rounded-lg bg-primary/10 text-primary">
                              <Icon className="h-5 w-5" />
                            </div>
                            <div className="min-w-0">
                              <CardTitle className="text-base truncate">
                                {a.title}
                              </CardTitle>
                              <CardDescription className="truncate">
                                {meta?.label} • {a.durationLabel} • {a.points} pts
                              </CardDescription>
                            </div>
                          </div>
                        </div>
                        {a.aiBadge ? (
                          <Badge variant="secondary" className="shrink-0 gap-1">
                            <Sparkles className="h-3.5 w-3.5" /> {a.aiBadge}
                          </Badge>
                        ) : null}
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-sm text-muted-foreground">{a.description}</p>
                    </CardContent>
                    <CardFooter className="pt-0">
                      <Button
                        className="w-full gap-2"
                        onClick={() => onDone(a.id)}
                        disabled={a.done}
                        variant={a.done ? "secondary" : "default"}
                      >
                        {a.done ? (
                          <>
                            <Check className="h-4 w-4" /> Done
                          </>
                        ) : (
                          <>
                            <Award className="h-4 w-4" /> Mark as Done
                          </>
                        )}
                      </Button>
                    </CardFooter>
                  </Card>
                )
              })}

              <Card className="bg-white shadow-sm mt-6">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Trophy className="h-4 w-4 text-primary" /> Company leaderboard
                  </CardTitle>
                  <CardDescription>Top performers today</CardDescription>
                </CardHeader>
                <CardContent className="pt-0 space-y-2">
                  {leaderboardTop3.map((entry, idx) => (
                    <div
                      key={entry.name}
                      className="flex items-center justify-between rounded-lg border bg-slate-50 px-3 py-2"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="grid h-7 w-7 place-items-center rounded-lg bg-muted text-xs font-semibold">
                          {idx + 1}
                        </div>
                        <div className="truncate text-sm font-medium">{entry.name}</div>
                      </div>
                      <div className="text-sm font-semibold tabular-nums">
                        {entry.points} pts
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="rewards" className="mt-4 space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold">Rewards</h2>
                <Badge variant="outline" className="gap-1">
                  <Gift className="h-3.5 w-3.5" /> Redeem
                </Badge>
              </div>

              {rewards.map((r) => (
                <Card key={r.title} className="bg-white shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">{r.title}</CardTitle>
                    <CardDescription>{r.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between rounded-lg border bg-slate-50 px-3 py-2">
                      <div className="text-sm text-slate-500">Cost</div>
                      <div className="text-sm font-semibold tabular-nums">{r.cost} pts</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </section>
      </div>

      <CheckOverlay open={successPulse} />
    </div>
  )
}
