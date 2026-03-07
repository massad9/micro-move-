import { create } from 'zustand';
export const useMicroMoveStore = create((set) => ({
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
    markActivityDone: (id) => set((state) => ({
        activities: state.activities.map(a => a.id === id ? { ...a, isDone: true } : a),
        user: state.user ? {
            ...state.user,
            points: state.user.points + (state.activities.find(a => a.id === id)?.points || 0),
            completedToday: state.user.completedToday + 1
        } : null
    })),
    addReward: (reward) => set((state) => ({
        rewards: [reward, ...state.rewards]
    })),
    addChallenge: (challenge) => set((state) => ({
        challenges: [challenge, ...state.challenges]
    })),
    setCompanyAdmin: (data) => set({ companyAdmin: data })
}));
