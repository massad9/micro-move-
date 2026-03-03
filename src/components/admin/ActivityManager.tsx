import React, { useState } from 'react'
import { useMicroMoveStore } from '@/store/microMoveStore'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Badge from '@/components/ui/badge'
import { Sparkles, Plus, Edit2, Zap, Pause, Trash2, Loader2, Bot, AlertCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'sonner'
import { generateActivitiesFromAI } from '@/lib/gemini'

export const ActivityManager: React.FC = () => {
    const activities = useMicroMoveStore(state => state.activities)
    const addActivities = useMicroMoveStore(state => state.addActivities)
    const [isGenerating, setIsGenerating] = useState(false)

    const handleGenerate = async () => {
        setIsGenerating(true)
        try {
            const { activities: newActivities, source } = await generateActivitiesFromAI()
            addActivities(newActivities)

            if (source === 'ai') {
                toast.success('AI Moves Generated! ✨', {
                    description: `${newActivities.length} new activities created by Gemini AI.`,
                    icon: <Bot className="w-4 h-4" />,
                })
            } else {
                toast.info('Curated Moves Added 📋', {
                    description: `${newActivities.length} pre-designed activities added. (AI quota reached — will retry next time)`,
                })
            }
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Unknown error occurred.'
            toast.error('Generation Failed', {
                description: message,
                icon: <AlertCircle className="w-4 h-4" />,
            })
            console.error('Generation error:', error)
        } finally {
            setIsGenerating(false)
        }
    }

    return (
        <Card className="bg-white border border-slate-200 shadow-sm h-full font-sans overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between pb-6 border-b border-slate-100 bg-slate-50/50">
                <div>
                    <CardTitle className="text-lg font-semibold text-slate-900 tracking-tight">Micro Move Catalog</CardTitle>
                    <p className="text-sm text-slate-500 font-medium mt-1">{activities.length} Active Moves</p>
                </div>
                <div className="flex gap-3">
                    <Button
                        onClick={handleGenerate}
                        disabled={isGenerating}
                        variant="outline"
                        className="rounded-xl border-slate-200 hover:bg-slate-100 hover:text-slate-900 transition-all font-medium h-10 px-4"
                    >
                        {isGenerating ? (
                            <Loader2 className="w-4 h-4 animate-spin mr-2 cursor-wait" />
                        ) : (
                            <Sparkles className="w-4 h-4 mr-2 text-primary" />
                        )}
                        {isGenerating ? 'AI is Thinking...' : 'Generate with AI'}
                    </Button>
                    <Button
                        onClick={() => toast.info('New Move Draft', { description: 'Opening the activity creation wizard...' })}
                        className="rounded-xl font-medium gap-2 bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm h-10 px-4"
                    >
                        <Plus className="w-4 h-4" />
                        Add Move
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="p-0">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider bg-slate-50">
                                <th className="px-6 py-4 font-medium">Activity Name</th>
                                <th className="px-6 py-4 font-medium">Category</th>
                                <th className="px-6 py-4 font-medium">Points Reward</th>
                                <th className="px-6 py-4 font-medium">Status</th>
                                <th className="px-6 py-4 text-right font-medium">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            <AnimatePresence>
                                {activities.map((activity, index) => (
                                    <motion.tr
                                        key={activity.id}
                                        initial={{ opacity: 0, y: -4 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ delay: index * 0.05 }}
                                        className="group hover:bg-slate-50/80 transition-colors"
                                    >
                                        <td className="px-6 py-4">
                                            <div className="flex items-start gap-2">
                                                <div>
                                                    <div className="font-semibold text-slate-900 flex items-center gap-1.5">
                                                        {activity.title}
                                                        {activity.aiBadge && (
                                                            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold bg-violet-50 text-violet-600 border border-violet-100">
                                                                <Bot className="w-2.5 h-2.5" />
                                                                AI
                                                            </span>
                                                        )}
                                                    </div>
                                                    <div className="text-sm text-slate-500 truncate max-w-[250px] mt-0.5">{activity.description}</div>
                                                    {activity.aiBadge && (
                                                        <div className="text-xs text-violet-500 mt-0.5 italic">"{activity.aiBadge}"</div>
                                                    )}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <Badge variant="secondary" className="font-medium text-xs py-0.5 px-2.5 rounded-md bg-slate-100 text-slate-600 border-transparent shadow-none">
                                                {activity.category}
                                            </Badge>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-1.5 font-semibold text-base text-slate-900">
                                                <Zap className="w-4 h-4 text-primary" />
                                                {activity.points} <span className="text-xs text-slate-500 font-medium">PTS</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className={`flex items-center gap-2 text-xs font-medium px-2.5 py-1 rounded-full w-fit border ${activity.isDone
                                                ? 'text-slate-500 bg-slate-50 border-slate-200'
                                                : 'text-emerald-600 bg-emerald-50 border-emerald-100'
                                                }`}>
                                                <div className={`w-1.5 h-1.5 rounded-full ${activity.isDone ? 'bg-slate-400' : 'bg-emerald-500'}`} />
                                                {activity.isDone ? 'Completed' : 'Active'}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Button
                                                    variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors"
                                                    onClick={() => toast.info('Edit Activity', { description: `Opening editor for ${activity.title}` })}
                                                >
                                                    <Edit2 className="w-4 h-4" />
                                                </Button>
                                                <Button
                                                    variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-amber-500 hover:bg-amber-50 rounded-lg transition-colors"
                                                    onClick={() => toast.warning('Activity Paused', { description: `${activity.title} has been temporarily deactivated.` })}
                                                >
                                                    <Pause className="w-4 h-4" />
                                                </Button>
                                                <Button
                                                    variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                                    onClick={() => toast.error('Activity Deleted', { description: `${activity.title} removed from catalog.` })}
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))}
                            </AnimatePresence>
                        </tbody>
                    </table>
                </div>
            </CardContent>
        </Card>
    )
}
