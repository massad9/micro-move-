import type { Activity } from '@/store/microMoveStore'

// OpenRouter API endpoint
const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions'

// Free models verified available on OpenRouter (March 2026)
const FREE_MODELS = [
    'nvidia/nemotron-3-nano-30b-a3b:free',
    'openrouter/free',
    'google/gemma-3-27b-it:free',
    'meta-llama/llama-3.3-70b-instruct:free',
    'qwen/qwen3-4b:free',
]

const SYSTEM_PROMPT = `You are a Corporate Wellness AI expert specializing in "Micro Moves" — quick, office-friendly physical and mental wellness activities for employees.

Generate exactly 3 NEW and UNIQUE micro move activities. Each activity MUST follow these rules:
1. Duration: Must not exceed 3 minutes.
2. Environment: Must be doable at or near an office desk (no equipment needed).
3. Category: Must be one of: "physical", "social", "hydration", "mindfulness".
4. Impact: Should boost energy, reduce stress, or enhance team morale.
5. Points: Between 25 and 150 based on effort level.

Respond ONLY with a valid JSON array. No markdown, no code blocks, no extra text.
Each object must have exactly these fields:
- "title": A short, catchy, motivating name (in English)
- "description": One clear sentence explaining HOW to do it
- "duration": e.g. "1 min", "2 min", "3 min"
- "points": A number between 25-150
- "category": One of "physical", "social", "hydration", "mindfulness"
- "aiBadge": A short tagline like "Energy Booster" or "Focus Reset"`

// Fallback activities when API is unavailable
const FALLBACK_POOLS: Activity[][] = [
    [
        { id: '', title: 'Standing Calf Raises', description: 'Stand behind your chair and do 15 calf raises, holding the chair for balance.', duration: '1 min', points: 45, category: 'physical', isDone: false, aiBadge: 'Leg Activator' },
        { id: '', title: 'Gratitude Share', description: 'Send a quick message to a colleague thanking them for something specific they did this week.', duration: '2 min', points: 80, category: 'social', isDone: false, aiBadge: 'Positivity Boost' },
        { id: '', title: '4-7-8 Breathing', description: 'Breathe in for 4 seconds, hold for 7 seconds, exhale slowly for 8 seconds. Repeat 3 times.', duration: '2 min', points: 55, category: 'mindfulness', isDone: false, aiBadge: 'Calm Reset' },
    ],
    [
        { id: '', title: 'Seated Spinal Twist', description: 'Sit up straight and gently twist your torso to each side, holding for 10 seconds.', duration: '1 min', points: 40, category: 'physical', isDone: false, aiBadge: 'Back Relief' },
        { id: '', title: 'Water Refill Walk', description: 'Walk to the farthest water station in the office and fill up your bottle.', duration: '3 min', points: 60, category: 'hydration', isDone: false, aiBadge: 'Hydration + Steps' },
        { id: '', title: 'Desk Declutter', description: 'Spend 2 minutes organizing your desk: stack papers, clear wrappers, align your monitor.', duration: '2 min', points: 35, category: 'mindfulness', isDone: false, aiBadge: 'Clear Mind' },
    ],
    [
        { id: '', title: 'Finger Stretch Fan', description: 'Spread your fingers wide, hold for 5 seconds, then make a fist. Repeat 10 times.', duration: '1 min', points: 30, category: 'physical', isDone: false, aiBadge: 'Typing Recovery' },
        { id: '', title: 'Coffee Chat Invite', description: 'Invite a coworker you have not spoken to this week for a quick 3-minute coffee break.', duration: '3 min', points: 100, category: 'social', isDone: false, aiBadge: 'Connection Builder' },
        { id: '', title: 'Lemon Water Mix', description: 'Add a slice of lemon to your water bottle for a refreshing vitamin C boost.', duration: '1 min', points: 25, category: 'hydration', isDone: false, aiBadge: 'Vitamin Boost' },
    ],
]

let fallbackIndex = 0

function getFallbackActivities(): Activity[] {
    const pool = FALLBACK_POOLS[fallbackIndex % FALLBACK_POOLS.length]
    fallbackIndex++
    return pool.map((a, i) => ({
        ...a,
        id: `fallback-${Date.now()}-${i}`,
    }))
}

async function callOpenRouter(model: string, apiKey: string): Promise<Response> {
    return fetch(OPENROUTER_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
            'HTTP-Referer': window.location.origin,
            'X-Title': 'Micro Move',
        },
        body: JSON.stringify({
            model,
            messages: [
                {
                    role: 'user',
                    content: SYSTEM_PROMPT,
                },
            ],
            temperature: 0.9,
            max_tokens: 1024,
        }),
    })
}

export async function generateActivitiesFromAI(): Promise<{ activities: Activity[]; source: 'ai' | 'fallback' }> {
    const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY

    if (!apiKey) {
        console.warn('No OpenRouter API key found — using fallback activities.')
        return { activities: getFallbackActivities(), source: 'fallback' }
    }

    // Try each free model until one works
    for (const model of FREE_MODELS) {
        try {
            console.log(`🤖 Trying model: ${model}...`)
            const response = await callOpenRouter(model, apiKey)

            if (response.status === 429) {
                console.warn(`Model ${model} rate limited, trying next...`)
                continue
            }

            if (!response.ok) {
                const errBody = await response.text().catch(() => '')
                console.warn(`Model ${model} returned ${response.status}: ${errBody.substring(0, 200)}`)
                continue
            }

            const data = await response.json()
            const rawText = data?.choices?.[0]?.message?.content

            if (!rawText) {
                console.warn(`Model ${model} returned empty content, trying next...`)
                continue
            }

            // Clean markdown fences if present
            const cleanedText = rawText
                .replace(/```json\s*/gi, '')
                .replace(/```\s*/g, '')
                .trim()

            const parsed = JSON.parse(cleanedText)

            if (!Array.isArray(parsed) || parsed.length === 0) {
                console.warn(`Model ${model} returned invalid array, trying next...`)
                continue
            }

            // Transform to Activity[]
            const validCategories = ['physical', 'social', 'hydration', 'mindfulness'] as const

            const activities: Activity[] = parsed
                .filter((item): item is Record<string, unknown> => typeof item === 'object' && item !== null)
                .map((item, index) => {
                    let catStr = String(item.category || '').toLowerCase()
                    if (catStr === 'stretch') catStr = 'physical' // Map legacy prompt

                    const category = validCategories.includes(catStr as typeof validCategories[number])
                        ? (catStr as Activity['category'])
                        : 'physical'

                    return {
                        id: `ai-${Date.now()}-${index}`,
                        title: String(item.title || 'Untitled Move'),
                        description: String(item.description || 'No description provided.'),
                        duration: String(item.duration || '2 min'),
                        points: Math.min(150, Math.max(25, Number(item.points) || 50)),
                        category,
                        isDone: false,
                        aiBadge: String(item.aiBadge || item.aiSuggestion || 'AI Generated'),
                    }
                })

            console.log(`✅ Generated ${activities.length} activities using ${model}`)
            return { activities, source: 'ai' }

        } catch (error) {
            console.warn(`Model ${model} failed:`, error)
            continue
        }
    }

    // All models failed — use fallback
    console.warn('All OpenRouter models failed. Using offline fallback activities.')
    return { activities: getFallbackActivities(), source: 'fallback' }
}
