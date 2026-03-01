import { create } from 'zustand'

export interface Activity {
    id: string
    title: string
    description: string
    duration: string
    points: number
    category: 'Stretch' | 'Social' | 'Hydration' | 'Mindfulness'
    isDone: boolean
    aiSuggestion?: string
}

export interface UserProfile {
    name: string
    points: number
    dailyGoal: number
    completedToday: number
}

export interface LeaderboardEntry {
    id: string
    name: string
    points: number
    avatar: string
    rank: number
}

interface AppState {
    user: UserProfile
    activities: Activity[]
    leaderboard: LeaderboardEntry[]
    markDone: (id: string) => void
    generateActivities: () => void
}

export const useStore = create<AppState>((set) => ({
    user: {
        name: "Ahmad",
        points: 1250,
        dailyGoal: 4,
        completedToday: 2,
    },
    activities: [
        {
            id: '1',
            title: 'Neck & Shoulder Stretch',
            description: 'Gently roll your shoulders and tilt your head side to side.',
            duration: '1 min',
            points: 50,
            category: 'Stretch',
            isDone: false,
            aiSuggestion: 'Afternoon Slump stretch'
        },
        {
            id: '2',
            title: 'Hydration Break',
            description: 'Drink a full glass of water to boost focus.',
            duration: '2 min',
            points: 25,
            category: 'Hydration',
            isDone: true,
        },
        {
            id: '3',
            title: 'Colleague High-Five',
            description: 'Walk to a desk and say "Good job" to a teammate.',
            duration: '3 min',
            points: 100,
            category: 'Social',
            isDone: false,
            aiSuggestion: 'Team morale booster'
        },
        {
            id: '4',
            title: 'Deep Breathing',
            description: 'Inhale for 4s, hold for 4s, exhale for 4s. Repeat 3 times.',
            duration: '2 min',
            points: 40,
            category: 'Mindfulness',
            isDone: true,
        },
        {
            id: '5',
            title: 'Desk Push-ups',
            description: 'Do 10 incline push-ups using your desk for support.',
            duration: '2 min',
            points: 75,
            category: 'Stretch',
            isDone: false,
        }
    ],
    leaderboard: [
        { id: '1', name: 'Sara Al-Otaibi', points: 3450, avatar: 'https://i.pravatar.cc/150?u=sara', rank: 1 },
        { id: '2', name: 'Khalid Mohammed', points: 3120, avatar: 'https://i.pravatar.cc/150?u=khalid', rank: 2 },
        { id: '3', name: 'Ahmad (You)', points: 1250, avatar: 'https://i.pravatar.cc/150?u=ahmad', rank: 3 },
    ],
    markDone: (id) => set((state) => {
        const activity = state.activities.find(a => a.id === id)
        if (!activity || activity.isDone) return state

        const newActivities = state.activities.map(a =>
            a.id === id ? { ...a, isDone: true } : a
        )

        return {
            activities: newActivities,
            user: {
                ...state.user,
                points: state.user.points + activity.points,
                completedToday: state.user.completedToday + 1
            }
        }
    }),
    generateActivities: () => set((state) => ({
        // Simulate AI generation by resetting and shuffling
        activities: state.activities.map(a => ({ ...a, isDone: false }))
    }))
}))
