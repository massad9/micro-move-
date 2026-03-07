import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Maximize2, Palette, Globe, Mail, Instagram, Twitter } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-white text-midnight font-sans selection:bg-crimson selection:text-white">
      
      {/* Heavy Grid Pattern BG */}
      <div className="fixed inset-0 bg-checkered opacity-5 z-0 pointer-events-none" />

      {/* Navbar - Contrast focus */}
      <nav className="fixed w-full z-50 py-8 px-12 top-0 backdrop-blur-md">
        <div className="max-w-[1600px] mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-royal rotate-45" />
            <span className="font-heading font-black text-3xl tracking-tighter uppercase ml-2">BOLD_</span>
          </div>
          
          <div className="hidden lg:flex gap-16 uppercase text-sm font-black tracking-[0.2em] italic">
            <a href="#" className="hover:text-royal transition-colors relative group">
              Works.
              <span className="absolute -bottom-1 left-0 w-0 h-1 bg-royal transition-all group-hover:w-full" />
            </a>
            <a href="#" className="hover:text-crimson transition-colors relative group">
                Studio.
              <span className="absolute -bottom-1 left-0 w-0 h-1 bg-crimson transition-all group-hover:w-full" />
            </a>
            <a href="#" className="hover:text-royal transition-colors relative group">
              Identity.
              <span className="absolute -bottom-1 left-0 w-0 h-1 bg-royal transition-all group-hover:w-full" />
            </a>
          </div>
          
          <button className="px-8 py-4 bg-royal text-white font-black uppercase italic tracking-widest text-xs hover:bg-crimson transition-colors shadow-[8px_8px_0px_#0A0A0B]">
            Start Project.
          </button>
        </div>
      </nav>

      <main className="relative z-10 px-12 pt-48 pb-40">
        <div className="max-w-[1600px] mx-auto">
          
          {/* Split Hero */}
          <section className="grid lg:grid-cols-12 gap-20 mb-60">
            <div className="lg:col-span-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="font-heading font-black text-[12vw] md:text-[14vw] lg:text-[18vw] leading-[0.78] tracking-tighterest uppercase italic">
                  Radical <br/> 
                  <span className="text-royal">Energy.</span>
                </h1>
              </motion.div>
            </div>
            
            <div className="lg:col-span-4 flex flex-col justify-end space-y-12 pb-8">
              <motion.p
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-4xl font-bold leading-[1.1] tracking-tighter"
              >
                The global standard for <span className="text-crimson">vibrant</span> digital impact.
              </motion.p>
              
              <div className="flex gap-4">
                 <button className="h-40 w-full bg-crimson text-white flex flex-col items-center justify-center font-black uppercase italic text-lg shadow-[8px_8px_0px_#2D3FE7] group relative overflow-hidden">
                    <span className="relative z-10">Our Reel.</span>
                    <Maximize2 className="relative z-10 w-6 h-6 mt-2 group-hover:rotate-90 transition-transform duration-500" />
                    <div className="absolute inset-x-0 bottom-0 h-0 bg-midnight transition-all group-hover:h-full z-0" />
                 </button>
              </div>
            </div>
          </section>

          {/* Color Block Showcase */}
          <section className="grid md:grid-cols-2 gap-4 mb-60">
            <motion.div 
              whileHover={{ scale: 0.98 }}
              className="aspect-square bg-royal p-12 flex flex-col justify-between group cursor-pointer overflow-hidden border-8 border-midnight"
            >
              <ArrowUpRight className="text-white w-20 h-20 group-hover:translate-x-4 group-hover:-translate-y-4 transition-transform duration-700" strokeWidth={3} />
              <div>
                <h4 className="text-white font-heading font-black text-7xl uppercase italic leading-none mb-4">Identity.</h4>
                <p className="text-white/60 font-bold text-xl uppercase tracking-widest">Building Icons.</p>
              </div>
            </motion.div>
            
            <motion.div 
              whileHover={{ scale: 0.98 }}
              className="aspect-square bg-crimson p-12 flex flex-col justify-between group cursor-pointer overflow-hidden border-8 border-midnight"
            >
              <Palette className="text-white w-20 h-20 group-hover:scale-125 transition-transform duration-700 font-black" strokeWidth={3} />
              <div>
                <h4 className="text-white font-heading font-black text-7xl uppercase italic leading-none mb-4">Visuals.</h4>
                <p className="text-white/60 font-bold text-xl uppercase tracking-widest">Crafting Motion.</p>
              </div>
            </motion.div>
          </section>

          {/* Marquee Footer CTA */}
          <section className="bg-midnight -mx-12 py-20 px-12 overflow-hidden flex whitespace-nowrap mb-60 border-y-8 border-royal">
             <div className="flex animate-marquee-fast gap-20 items-center">
                <span className="text-white font-black text-8xl uppercase italic">REDEFINE_DESIGN</span>
                <span className="text-royal font-black text-8xl uppercase italic">REDEFINE_DESIGN</span>
                <span className="text-white font-black text-8xl uppercase italic">REDEFINE_DESIGN</span>
                <span className="text-crimson font-black text-8xl uppercase italic">REDEFINE_DESIGN</span>
             </div>
             <style>{`
                @keyframes marquee-fast { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
                .animate-marquee-fast { animation: marquee-fast 8s linear infinite; }
             `}</style>
          </section>

        </div>
      </main>

      <footer className="bg-white px-12 pb-32">
        <div className="max-w-[1600px] mx-auto grid md:grid-cols-12 gap-20 border-t-8 border-midnight pt-20">
          <div className="md:col-span-6">
            <h2 className="font-heading font-black text-8xl mb-12 italic uppercase leading-[0.85]">Let's Make <br/> It Heavy.</h2>
            <div className="flex gap-8">
               <div className="bg-royal p-4 rounded-full text-white hover:bg-crimson transition-colors cursor-pointer"><Instagram /></div>
               <div className="bg-midnight p-4 rounded-full text-white hover:bg-royal transition-colors cursor-pointer"><Twitter /></div>
            </div>
          </div>
          <div className="md:col-span-6 flex flex-col justify-end items-end space-y-12">
            <div className="text-right">
              <span className="block text-sm font-black uppercase tracking-[0.4em] opacity-40 mb-4">Contact Detail_</span>
              <a href="mailto:hello@bold.studio" className="text-6xl font-black italic hover:text-royal transition-colors">hello@bold.studio</a>
            </div>
            <p className="max-w-md text-right font-bold text-xl leading-snug">© 2026 BOLD DESIGN GLOBAL. RADICAL CREATIVITY FOR INDUSTRY LEADERS.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
