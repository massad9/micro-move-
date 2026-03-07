import React from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Leaf, 
  ShieldCheck, 
  ArrowRight, 
  PieChart, 
  Globe, 
  CreditCard,
  Target
} from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-white text-forest font-sans">
      
      {/* Decorative blobs */}
      <div className="fixed top-0 right-0 w-[40vw] h-[40vw] bg-emerald-50 rounded-full blur-[100px] pointer-events-none opacity-50" />
      <div className="fixed bottom-0 left-0 w-[50vw] h-[50vw] bg-lime-50 rounded-full blur-[120px] pointer-events-none opacity-50" />

      {/* Navbar */}
      <nav className="fixed top-8 left-12 right-12 z-50 px-8 py-5 bg-white/70 backdrop-blur-2xl border border-emerald-50 rounded-3xl shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 growth-gradient rounded-xl flex items-center justify-center text-white shadow-lg shadow-emerald-200">
              <Leaf className="w-6 h-6" />
            </div>
            <span className="font-black text-2xl tracking-tighter text-emerald-900">VERDANT.</span>
          </div>
          
          <div className="hidden lg:flex items-center gap-12 font-bold text-sm text-emerald-900/60 tracking-tight">
            <a href="#" className="text-emerald-900">Investments</a>
            <a href="#" className="hover:text-emerald-900 transition-colors">Sustainability</a>
            <a href="#" className="hover:text-emerald-900 transition-colors">Marketplace</a>
            <a href="#" className="hover:text-emerald-900 transition-colors">About</a>
          </div>
          
          <button className="px-8 py-4 bg-emerald-900 text-white font-bold rounded-2xl hover:bg-emerald-800 transition-all shadow-xl shadow-emerald-900/10 text-sm">
            Open Account
          </button>
        </div>
      </nav>

      <main className="relative pt-48 pb-32 z-10 px-12">
        <div className="max-w-7xl mx-auto">
          
          {/* Hero Section */}
          <div className="grid lg:grid-cols-2 gap-20 items-center mb-40">
            <div className="space-y-10">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-lime-100 text-emerald-900 text-xs font-black uppercase tracking-widest"
              >
                <div className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                <span>Global ESG Leader 2026</span>
              </motion.div>
              
              <h1 className="text-7xl md:text-8xl font-black text-emerald-950 leading-[0.95] tracking-tighter">
                Grow your <br/>
                <span className="text-emerald-500 italic">Financial</span> <br/>
                Future.
              </h1>
              
              <p className="text-2xl text-emerald-900/60 leading-relaxed font-medium max-w-xl">
                The world's first vibrant fintech platform dedicated to high-growth sustainable investments.
              </p>

              <div className="flex flex-col sm:flex-row gap-6">
                <button className="px-10 py-5 growth-gradient text-white font-black rounded-3xl hover:scale-105 transition-all flex items-center justify-center gap-3 shadow-2xl shadow-emerald-200">
                  Join the Movement <ArrowRight className="w-5 h-5" />
                </button>
                <div className="flex items-center gap-4 py-4 px-6">
                  <div className="flex -space-x-3">
                    {[1,2,3].map(i => (
                      <div key={i} className="w-10 h-10 border-4 border-white rounded-full bg-emerald-100 flex items-center justify-center font-bold text-xs text-emerald-900">
                        {String.fromCharCode(64 + i)}
                      </div>
                    ))}
                  </div>
                  <span className="text-sm font-bold text-emerald-900/50 uppercase tracking-widest">
                    4M+ Active users
                  </span>
                </div>
              </div>
            </div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="relative p-8 bg-white border border-emerald-50 rounded-[4rem] shadow-2xl shadow-emerald-900/5"
            >
              <div className="bg-emerald-50/50 rounded-[3rem] p-10 space-y-8">
                <div className="flex justify-between items-center">
                  <h3 className="font-black text-xl">Portfolio Yield</h3>
                  <TrendingUp className="text-emerald-500 w-8 h-8" />
                </div>
                <div className="text-6xl font-black">+24.8%</div>
                <div className="h-40 flex items-end gap-3 px-2">
                  {[40, 60, 45, 80, 55, 95, 75].map((h, i) => (
                    <motion.div 
                      key={i}
                      initial={{ height: 0 }}
                      animate={{ height: `${h}%` }}
                      transition={{ duration: 1, delay: i * 0.1 }}
                      className="flex-1 bg-emerald-500 rounded-t-xl" 
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Feature Grid */}
          <div className="grid md:grid-cols-3 gap-10">
            {[
              { icon: ShieldCheck, title: "Secured Assets", desc: "Enterprise-grade vaulting for all your digital and carbon holdings." },
              { icon: PieChart, title: "Smart Diversification", desc: "Automated rebalancing into high-performing green sectors." },
              { icon: Target, title: "Impact Tracking", desc: "Real-time visibility into the positive change your capital creates." }
            ].map((benefit, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="benefit-card group cursor-pointer"
              >
                <div className="w-20 h-20 rounded-3xl bg-lime-100 flex items-center justify-center text-emerald-600 mb-10 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-500">
                  <benefit.icon className="w-10 h-10" />
                </div>
                <h3 className="text-3xl font-black mb-6 tracking-tight">{benefit.title}</h3>
                <p className="text-emerald-900/60 text-lg leading-relaxed font-medium">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>

        </div>
      </main>

      <footer className="mt-40 bg-emerald-950 text-white/40 py-20 px-12 border-t border-emerald-900">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="flex items-center gap-3 text-white">
            <div className="w-8 h-8 growth-gradient rounded-lg" />
            <span className="font-black text-2xl tracking-tighter">VERDANT.</span>
          </div>
          <div className="flex flex-wrap justify-center gap-12 text-sm font-black uppercase tracking-[0.2em] text-white">
            <a href="#" className="hover:text-lime-400 transition-colors">Privacy</a>
            <a href="#" className="hover:text-lime-400 transition-colors">Terms</a>
            <a href="#" className="hover:text-lime-400 transition-colors">Sitemap</a>
            <a href="#" className="hover:text-lime-400 transition-colors">Cookies</a>
          </div>
          <div className="font-bold text-xs uppercase tracking-widest text-emerald-500">
            © 2026 VERDANT CAP. GLOBAL.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
