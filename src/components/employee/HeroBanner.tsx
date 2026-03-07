import React from 'react'
import { motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const HeroBanner: React.FC = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full bg-white border border-slate-200/50 rounded-[2.5rem] p-8 md:p-14 relative overflow-hidden flex flex-col md:flex-row items-center justify-between font-sans mt-0 shadow-diffusion"
        >
            {/* Ambient Refraction Background */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-[60%] h-[120%] bg-gradient-to-bl from-orange-400/10 to-transparent blur-[80px]" />
                <div className="absolute bottom-[-20%] left-[-10%] w-[50%] h-[50%] bg-emerald-500/10 blur-[100px] mix-blend-multiply" />
            </div>

            <div className="relative z-10 max-w-xl flex flex-col items-start text-right w-full">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="mb-8 p-1.5 rounded-full bg-white border border-slate-200/50 backdrop-blur-md inline-flex shadow-sm"
                >
                    <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center font-bold text-sm text-white shadow-[0_0_15px_rgba(249,115,22,0.3)] z-30">ع</div>
                        <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center font-bold text-sm text-white -mr-3 border-2 border-white z-20">خ</div>
                        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center font-bold text-sm text-white -mr-3 border-2 border-white z-10">س</div>
                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500 -mr-3 border-2 border-white border-dashed z-0">+٨</div>
                    </div>
                    <span className="text-sm font-bold text-slate-700 mr-4 ml-4 flex items-center">زملاؤك يتحركون الآن</span>
                </motion.div>

                <h1 className="text-5xl md:text-6xl lg:text-[5rem] font-black tracking-tighter mb-6 leading-[1.05] text-slate-900">
                    النشاطات طاقة
                    <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-l from-orange-500 to-amber-500">كبيرة جداً</span>
                </h1>

                <p className="text-lg md:text-xl text-slate-500 max-w-lg mb-10 font-medium leading-relaxed">
                    عزز إنتاجيتك، وحسن صحتك، وتواصل مع فريقك من خلال أنشطة سريعة ممتعة.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                    <Button className="h-14 px-8 bg-orange-500 hover:bg-orange-600 text-white font-bold text-base rounded-2xl shadow-[0_8px_20px_-6px_rgba(249,115,22,0.5)] active:scale-[0.98] transition-all w-full sm:w-auto">
                        ابدأ بتحدي "المشي اليومي"
                    </Button>
                    <Button variant="outline" className="h-14 px-8 border-slate-200 bg-white hover:bg-slate-50 text-slate-900 font-bold text-base rounded-2xl transition-all shadow-sm w-full sm:w-auto group">
                        <Plus className="w-5 h-5 ml-2 text-slate-400 group-hover:rotate-90 transition-transform" /> أضف نشاطاً مخصصاً
                    </Button>
                </div>
            </div>
            
            {/* Split Visual Element */}
            <div className="hidden md:flex relative z-10 w-full max-w-sm justify-end items-center">
                 <div className="w-full aspect-square rounded-[3rem] bg-gradient-to-tr from-orange-100 to-amber-50 border border-white shadow-diffusion relative overflow-hidden group">
                     {/* Perptual motion abstraction */}
                     <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                        className="absolute -inset-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-orange-400/20 via-transparent to-transparent opacity-50 blur-3xl"
                     />
                     <div className="absolute inset-0 flex items-center justify-center">
                         <div className="w-32 h-32 rounded-full bg-white shadow-xl flex items-center justify-center z-10 border border-slate-100">
                             <div className="w-24 h-24 rounded-full bg-orange-500 flex items-center justify-center text-white relative shadow-inner">
                                 <Plus className="w-10 h-10" />
                                 <motion.div 
                                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                    className="absolute inset-0 rounded-full border-4 border-white/30"
                                 />
                             </div>
                         </div>
                     </div>
                 </div>
            </div>
        </motion.div>
    )
}
