import { create } from 'zustand'

export interface Activity {
    id: string
    title: string
    category: string
    points: number
    duration: string
    description: string
    icon: string
    isDone?: boolean
    aiBadge?: string
}

export interface Reward {
    id: string
    title: string
    cost: number
    description: string
}

export interface Challenge {
    id: string
    title: string
    targetPoints: number
    currentPoints: number
    rewardTitle: string
    description: string
}

export interface User {
    id: string
    name: string
    email: string
    role: 'employee' | 'admin' | 'hr'
    points: number
    department: string
    completedToday: number
    dailyGoal: number
    avatar?: string
}

interface MicroMoveState {
    user: User | null
    activities: Activity[]
    rewards: Reward[]
    challenges: Challenge[]
    leaderboardTop3: { id: string, name: string, points: number, avatar: string, rank: number, trend: 'up' | 'down' | 'flat' }[]
    companyAdmin: {
        companyName: string,
        departments: string[],
        vibeScore: number,
        burnoutRisk: { department: string, riskLevel: 'High' | 'Medium' | 'Low' }[]
    } | null

    setUser: (user: User | null) => void
    updateUser: (updates: Partial<User>) => void
    markActivityDone: (id: string) => void
    addActivity: (activity: Activity) => void
    removeActivity: (id: string) => void
    updateActivity: (id: string, updates: Partial<Activity>) => void
    addReward: (reward: Reward) => void
    addChallenge: (challenge: Challenge) => void
    setCompanyAdmin: (data: any) => void
}

export const useMicroMoveStore = create<MicroMoveState>((set) => ({
    user: null,

    companyAdmin: {
        companyName: "شركة التقنية المتقدمة",
        departments: ["الهندسة", "المبيعات", "التسويق", "الموارد البشرية"],
        vibeScore: 88,
        burnoutRisk: [
            { department: "المبيعات", riskLevel: "High" },
            { department: "الهندسة", riskLevel: "Medium" }
        ]
    },

    activities: [
        {
            id: '1',
            title: 'تمدد الرقبة والكتفين',
            category: 'physical',
            points: 15,
            duration: '٣ دقائق',
            description: 'تخلص من التوتر المتراكم من الجلوس عن طريق حركات تمدد بسيطة للمكتب.',
            icon: 'Activity',
            aiBadge: 'وضعية الجلوس'
        },
        {
            id: '2',
            title: 'تمرين التنفس العميق ٤-٧-٨',
            category: 'mindfulness',
            points: 20,
            duration: 'دقيقتان',
            description: 'أعد ضبط جهازك العصبي بأربع ثوانٍ شهيق، وسبع ثوانٍ حبس، وثمان ثوانٍ زفير.',
            icon: 'Sparkles',
        },
        {
            id: '3',
            title: 'مشية القهوة / الماء مع زميل',
            category: 'social',
            points: 25,
            duration: '١٠ دقائق',
            description: 'اذهب مع زميل لشرب القهوة. استراحة من الشاشات وتواصل حقيقي.',
            icon: 'Coffee',
        },
        {
            id: '4',
            title: 'تمرين بلانك سريع',
            category: 'physical',
            points: 30,
            duration: '١ دقيقة',
            description: 'شغل عضلات بطنك بتمرين بلانك لمدة ٦٠ ثانية.',
            icon: 'Activity',
            isDone: true
        },
        {
            id: '5',
            title: 'قاعدة ٢٠-٢٠-٢٠ للعينين',
            category: 'mindfulness',
            points: 10,
            duration: '٢٠ ثانية',
            description: 'انظر إلى شيء يبعد ٢٠ قدمًا لمدة ٢٠ ثانية لإراحة عينيك من إجهاد الشاشة.',
            icon: 'Eye',
        },
        {
            id: '6',
            title: 'تأمل المشي بعد الغداء',
            category: 'physical',
            points: 40,
            duration: '١٥ دقيقة',
            description: 'امشِ ببطء وانتبه لخطواتك ومحيطك بعد الغداء للمساعدة في الهضم وتصفية الذهن.',
            icon: 'Activity',
            aiBadge: 'ركود ما بعد الظهر'
        },
        {
            id: '7',
            title: 'كوب ماء إضافي',
            category: 'hydration',
            points: 5,
            duration: '٣٠ ثانية',
            description: 'اشرب كوبًا كاملاً من الماء فوراً للترطيب وتعزيز التركيز.',
            icon: 'Droplet'
        }
    ],

    rewards: [
        {
            id: '1',
            title: 'قهوة أو مشروب مجاني',
            cost: 250,
            description: 'قسيمة لمقهى الشركة للحصول على مشروبك المفضل مجاناً.'
        },
        {
            id: '2',
            title: 'نصف ساعة راحة إضافية',
            cost: 800,
            description: 'استخدمها متى شئت لتمديد استراحة الغداء أو الخروج مبكراً.'
        },
        {
            id: '3',
            title: 'تيشيرت الموظف النشيط',
            cost: 1200,
            description: 'تيشيرت حصري عالي الجودة بشعار مايكرو موف.'
        },
        {
            id: '4',
            title: 'اشتراك سبوتيفاي المميز',
            cost: 3000,
            description: 'اشتراك مجاني لمدة شهر لسماع الموسيقى أثناء العمل.'
        },
        {
            id: '5',
            title: 'تبرع خيري باسمك',
            cost: 1500,
            description: 'سنتبرع بمبلغ ٥٠ ريالاً لجمعية خيرية من اختيارك.'
        },
        {
            id: '6',
            title: 'تذكرة دخول سينما مقعد VIP',
            cost: 2000,
            description: 'تذكرة لشخص واحد لحضور فيلم في أي وقت.'
        }
    ],

    challenges: [
        {
            id: '1',
            title: 'تحدي المليون خطوة للفريق',
            targetPoints: 1000000,
            currentPoints: 785400,
            rewardTitle: 'غداء مفتوح لجميع الأقسام',
            description: 'نتعاون معاً للوصول إلى مليون نقطة من خطوات المشي. العبرة بالمشاركة الجماعية!'
        },
        {
            id: '2',
            title: 'أسبوع بدون مصاعد',
            targetPoints: 5000,
            currentPoints: 3200,
            rewardTitle: 'يوم عمل من المنزل إضافي',
            description: 'صعود السلالم بدل المصعد. سجل النشاط في قسم "أخرى" كلما صعدت.'
        }
    ],

    leaderboardTop3: [
        { id: '1', rank: 1, name: 'سالم الدوسري', points: 3450, avatar: 'salem', trend: 'up' },
        { id: '2', rank: 2, name: 'ياسر الشهراني', points: 3120, avatar: 'yasser', trend: 'up' },
        { id: '3', rank: 3, name: 'فهد المولد', points: 2890, avatar: 'fahad', trend: 'flat' }
    ],

    setUser: (user) => set({ user }),

    updateUser: (updates) => set((state) => ({
        user: state.user ? { ...state.user, ...updates } : null
    })),

    markActivityDone: (id) => set((state) => ({
        activities: state.activities.map(a => a.id === id ? { ...a, isDone: true } : a),
        user: state.user ? {
            ...state.user,
            points: state.user.points + (state.activities.find(a => a.id === id)?.points || 0),
            completedToday: state.user.completedToday + 1
        } : null
    })),

    addActivity: (activity) => set((state) => ({
        activities: [activity, ...state.activities]
    })),

    removeActivity: (id) => set((state) => ({
        activities: state.activities.filter(a => a.id !== id)
    })),

    updateActivity: (id, updates) => set((state) => ({
        activities: state.activities.map(a => a.id === id ? { ...a, ...updates } : a)
    })),

    addReward: (reward) => set((state) => ({
        rewards: [reward, ...state.rewards]
    })),

    addChallenge: (challenge) => set((state) => ({
        challenges: [challenge, ...state.challenges]
    })),

    setCompanyAdmin: (data) => set({ companyAdmin: data })
}))
