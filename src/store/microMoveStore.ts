import { create } from "zustand"

export type MicroMoveActivity = {
  id: string
  title: string
  description: string
  durationLabel: string
  points: number
  category: "physical" | "social" | "hydration" | "mindfulness"
  aiBadge?: string
  done: boolean
}

type LeaderboardEntry = {
  name: string
  points: number
  trend?: "up" | "down" | "flat"
}

type Reward = {
  title: string
  cost: number
  description: string
}

type MicroMoveState = {
  employeeName: string
  points: number
  dailyGoal: number
  activities: MicroMoveActivity[]
  leaderboardTop3: LeaderboardEntry[]
  rewards: Reward[]
  markActivityDone: (activityId: string) => { awardedPoints: number } | null
}

const getTimeOfDayLabel = () => {
  const hours = new Date().getHours()
  if (hours < 11) return "Morning Boost"
  if (hours < 16) return "Afternoon Slump"
  return "Evening Reset"
}

const timeOfDay = getTimeOfDayLabel()

const initialActivities: MicroMoveActivity[] = [
  {
    id: "neck-stretch",
    title: "Neck stretch (1 min)",
    description: "Roll your shoulders, then gently stretch left/right.",
    durationLabel: "1 min",
    points: 35,
    category: "physical",
    aiBadge: `${timeOfDay} stretch`,
    done: false,
  },
  {
    id: "water",
    title: "Drink a glass of water",
    description: "Hydrate now. Your focus will thank you.",
    durationLabel: "30 sec",
    points: 20,
    category: "hydration",
    aiBadge: "Hydration nudge",
    done: false,
  },
  {
    id: "walk-colleague",
    title: "Walk to a colleague’s desk",
    description: "Say hi in person instead of sending a message.",
    durationLabel: "2 min",
    points: 45,
    category: "social",
    aiBadge: "Social energy",
    done: false,
  },
  {
    id: "breathing",
    title: "Box breathing",
    description: "Inhale 4s, hold 4s, exhale 4s, hold 4s.",
    durationLabel: "2 min",
    points: 40,
    category: "mindfulness",
    aiBadge: `${timeOfDay} focus`,
    done: false,
  },
]

export const useMicroMoveStore = create<MicroMoveState>((set, get) => ({
  employeeName: "Mashael",
  points: 260,
  dailyGoal: initialActivities.length,
  activities: initialActivities,
  leaderboardTop3: [
    { name: "Team Riyadh", points: 1240, trend: "up" },
    { name: "Salman", points: 980, trend: "flat" },
    { name: "Noura", points: 910, trend: "up" },
  ],
  rewards: [
    {
      title: "Extra 1 Hour Off",
      cost: 500,
      description: "Redeem for a 1-hour early leave (manager approval).",
    },
    {
      title: "Coffee Voucher",
      cost: 250,
      description: "Redeem for a coffee voucher at the office café.",
    },
    {
      title: "Wellness Kit",
      cost: 900,
      description: "A curated stretch band + posture support kit.",
    },
  ],
  markActivityDone: (activityId) => {
    const { activities } = get()
    const target = activities.find((a) => a.id === activityId)
    if (!target || target.done) return null

    const awardedPoints = target.points

    set((state) => ({
      points: state.points + awardedPoints,
      activities: state.activities.map((a) =>
        a.id === activityId ? { ...a, done: true } : a
      ),
    }))

    return { awardedPoints }
  },
}))
