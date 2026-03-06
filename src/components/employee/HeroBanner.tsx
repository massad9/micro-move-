import React from 'react'
import { motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const HeroBanner: React.FC = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full bg-slate-900 rounded-[2rem] p-8 md:p-12 text-white relative overflow-hidden flex flex-col items-center text-center font-sans mt-0"
        >
            <div className="absolute inset-0 z-0">
                {/* Modern subtle background patterns/gradients replacing the heavy indigo */}
                <div className="absolute top-0 right-0 w-full h-[500px] bg-gradient-to-b from-orange-500/20 to-transparent blur-[100px] mix-blend-screen opacity-60" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/10 blur-[80px] rounded-full mix-blend-screen" />
            </div>

            <div className="relative z-10 max-w-2xl flex flex-col items-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="mb-8 p-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md inline-flex shadow-xl shadow-black/20"
                >
                    <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center font-bold text-sm shadow-[0_0_15px_rgba(249,115,22,0.5)] z-30">ع</div>
                        <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center font-bold text-sm -mr-3 border-2 border-slate-900 z-20">خ</div>
                        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center font-bold text-sm -mr-3 border-2 border-slate-900 z-10">س</div>
                        <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-400 -mr-3 border-2 border-slate-900 border-dashed z-0">+٨</div>
                    </div>
                    <span className="text-sm font-semibold text-slate-300 mr-4 ml-4">زملاؤك يتحركون الآن</span>
                </motion.div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-6 leading-[1.1] md:leading-[1.1] lg:leading-[1.1]">
                    النشاطات<br />طاقة <span className="text-transparent bg-clip-text bg-gradient-to-l from-orange-400 to-amber-300">كبيرة</span>
                </h1>

                <p className="text-lg md:text-xl text-slate-400 max-w-xl mx-auto mb-10 font-medium leading-relaxed">
                    عزز إنتاجيتك، وحسن صحتك، وتواصل مع فريقك من خلال أنشطة سريعة ممتعة.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                    <Button className="h-14 px-8 bg-white hover:bg-slate-100 text-slate-900 font-bold text-base rounded-2xl shadow-[0_4px_14px_0_rgba(255,255,255,0.2)] hover:shadow-[0_6px_20px_rgba(255,255,255,0.23)] hover:-translate-y-0.5 transition-all w-full sm:w-auto">
                        ابدأ بتحدي "المشي اليومي"
                    </Button>
                    <Button variant="outline" className="h-14 px-8 border-slate-700 bg-white/5 hover:bg-white/10 text-white font-bold text-base rounded-2xl backdrop-blur-sm transition-all w-full sm:w-auto group">
                        <Plus className="w-5 h-5 ml-2 group-hover:rotate-90 transition-transform" /> أضف نشاطاً مخصصاً
                    </Button>
                </div>
            </div>
        </motion.div>
    )
}
