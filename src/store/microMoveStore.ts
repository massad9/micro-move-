import { create } from "zustand"

export type Activity = {
  id: string
  title: string
  description: string
  duration: string
  points: number
  category: "physical" | "social" | "hydration" | "mindfulness"
  aiBadge?: string
  isDone: boolean
}

type LeaderboardEntry = {
  id: string
  name: string
  points: number
  avatar: string
  rank: number
  trend?: "up" | "down" | "flat"
}

type Reward = {
  title: string
  cost: number
  description: string
}

type UserProfile = {
  name: string
  email: string
  points: number
  dailyGoal: number
  completedToday: number
}

type MicroMoveState = {
  user: UserProfile | null
  activities: Activity[]
  leaderboardTop3: LeaderboardEntry[]
  rewards: Reward[]
  login: (email: string, role: string) => boolean
  logout: () => void
  markActivityDone: (activityId: string) => { awardedPoints: number } | null
  addActivities: (newActivities: Activity[]) => void
}

const getTimeOfDayLabel = () => {
  const hours = new Date().getHours()
  if (hours < 11) return "Morning Boost"
  if (hours < 16) return "Afternoon Slump"
  return "Evening Reset"
}

const timeOfDay = getTimeOfDayLabel()

const initialActivities: Activity[] = [
  {
    id: "neck-stretch",
    title: "Neck stretch (1 min)",
    description: "Roll your shoulders, then gently stretch left/right.",
    duration: "1 min",
    points: 35,
    category: "physical",
    aiBadge: `${timeOfDay} stretch`,
    isDone: false,
  },
  {
    id: "water",
    title: "Drink a glass of water",
    description: "Hydrate now. Your focus will thank you.",
    duration: "30 sec",
    points: 20,
    category: "hydration",
    aiBadge: "Hydration nudge",
    isDone: false,
  },
  {
    id: "walk-colleague",
    title: "Walk to a colleague’s desk",
    description: "Say hi in person instead of sending a message.",
    duration: "2 min",
    points: 45,
    category: "social",
    aiBadge: "Social energy",
    isDone: false,
  },
  {
    id: "breathing",
    title: "Box breathing",
    description: "Inhale 4s, hold 4s, exhale 4s, hold 4s.",
    duration: "2 min",
    points: 40,
    category: "mindfulness",
    aiBadge: `${timeOfDay} focus`,
    isDone: false,
  },
]

export const useMicroMoveStore = create<MicroMoveState>((set, get) => ({
  user: null,
  activities: initialActivities,
  leaderboardTop3: [
    { id: '1', name: "Team Riyadh", points: 3450, avatar: 'https://i.pravatar.cc/150?u=riyadh', rank: 1, trend: "up" },
    { id: '2', name: "Salman", points: 3120, avatar: 'https://i.pravatar.cc/150?u=salman', rank: 2, trend: "flat" },
    { id: '3', name: "Mashael (You)", points: 260, avatar: 'https://i.pravatar.cc/150?u=mashael', rank: 3, trend: "up" },
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
  login: (email, role) => {
    // Basic hardcoded logic for demo safety
    if (role === 'admin' && email === 'admin@micromove.sa') {
      set({ user: { name: "Admin", email, points: 0, dailyGoal: 0, completedToday: 0 } })
      return true
    }
    if (role === 'employee' && email.includes('@')) {
      set({ user: { name: "Mashael", email, points: 260, dailyGoal: initialActivities.length, completedToday: 0 } })
      return true
    }
    return false
  },
  logout: () => set({ user: null }),
  markActivityDone: (activityId) => {
    const { activities, user } = get()
    const target = activities.find((a) => a.id === activityId)
    if (!target || target.isDone || !user) return null

    const awardedPoints = target.points

    set((state) => ({
      user: state.user ? {
        ...state.user,
        points: state.user.points + awardedPoints,
        completedToday: state.user.completedToday + 1
      } : null,
      activities: state.activities.map((a) =>
        a.id === activityId ? { ...a, isDone: true } : a
      ),
    }))

    return { awardedPoints }
  },
  addActivities: (newActivities) => set((state) => ({
    activities: [...state.activities, ...newActivities]
  })),
}))

