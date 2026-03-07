import React from 'react';
import { motion } from 'framer-motion';
import { 
  Cpu, 
  Rocket, 
  Zap, 
  Shield, 
  Globe, 
  ArrowRight, 
  Code2, 
  Sparkles 
} from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-vibrant-dark text-slate-200">
      {/* Dynamic Background */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-vibrant-purple/20 rounded-full blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-vibrant-cyan/20 rounded-full blur-[150px] animate-pulse-slow" style={{ animationDelay: '2s' }} />
      </div>

      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-vibrant-dark/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 vibrant-gradient rounded-xl flex items-center justify-center text-white shadow-lg shadow-vibrant-purple/20">
              <Sparkles className="w-6 h-6" />
            </div>
            <span className="font-bold text-2xl tracking-tighter text-white">GENESIS</span>
          </div>
          
          <div className="hidden lg:flex items-center gap-10 text-sm font-semibold tracking-wide text-slate-400">
            <a href="#" className="hover:text-vibrant-cyan transition-colors">Infrastructure</a>
            <a href="#" className="hover:text-vibrant-cyan transition-colors">A.I. Engine</a>
            <a href="#" className="hover:text-vibrant-cyan transition-colors">Global Network</a>
            <a href="#" className="hover:text-vibrant-cyan transition-colors">Pricing</a>
          </div>
          
          <div className="flex items-center gap-6">
            <button className="text-sm font-bold text-slate-300">Sign In</button>
            <button className="px-6 py-3 vibrant-gradient text-white text-sm font-bold rounded-xl hover:scale-105 transition-all shadow-lg shadow-vibrant-indigo/20">
              Get Started
            </button>
          </div>
        </div>
      </nav>

      <main className="relative pt-40 pb-32 z-10 px-6">
        <div className="max-w-7xl mx-auto">
          
          {/* Hero Section */}
          <div className="text-center mb-32">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-vibrant-cyan text-xs font-bold mb-8 uppercase tracking-[0.2em]"
            >
              <Zap className="w-3 h-3 fill-vibrant-cyan" />
              <span>Next-Gen Cloud Architecture</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-6xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter mb-10"
            >
              Supercharge <br/> 
              <span className="text-transparent bg-clip-text vibrant-gradient">
                Global Scale.
              </span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="max-w-2xl mx-auto text-xl text-slate-400 leading-relaxed mb-12 font-medium"
            >
              Genesis provides the vibrant foundation for the world's most ambitious tech enterprises. Move faster, scale further, and disrupt bigger.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-col sm:flex-row justify-center gap-6"
            >
              <button className="px-10 py-5 vibrant-gradient text-white font-black rounded-2xl hover:scale-105 transition-all flex items-center justify-center gap-3 shadow-2xl shadow-vibrant-purple/40 uppercase tracking-widest text-sm">
                Deploy Instant <ArrowRight className="w-5 h-5" />
              </button>
              <button className="px-10 py-5 bg-white/5 border border-white/10 text-white font-black rounded-2xl hover:bg-white/10 transition-all uppercase tracking-widest text-sm backdrop-blur-md">
                View Documentation
              </button>
            </motion.div>
          </div>

          {/* Grid Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                icon: Cpu, 
                title: "Neural Compute", 
                desc: "AI-optimized server clusters running at the speed of thought.",
                color: "from-purple-500 to-indigo-600"
              },
              { 
                icon: Globe, 
                title: "Edge Network", 
                desc: "300+ edge locations ensuring zero-latency for every single user.",
                color: "from-cyan-400 to-blue-500"
              },
              { 
                icon: Shield, 
                title: "Quantum Guard", 
                desc: "Next-generation security protocols that anticipate threats before they exist.",
                color: "from-pink-500 to-rose-600"
              }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="glass-card group"
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-white mb-8 shadow-xl group-hover:scale-110 transition-transform duration-500`}>
                  <feature.icon className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-black text-white mb-4 tracking-tight uppercase">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed font-medium">{feature.desc}</p>
              </motion.div>
            ))}
          </div>

        </div>
      </main>

      <footer className="border-t border-white/5 py-20 px-6 bg-black/20 mt-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 vibrant-gradient rounded-lg" />
            <span className="font-black text-2xl text-white tracking-widest uppercase">Genesis</span>
          </div>
          <p className="text-slate-500 text-sm font-bold tracking-widest uppercase">© 2026 GENESIS GLOBAL. ALL SYSTEMS NOMINAL.</p>
          <div className="flex gap-10 uppercase text-[10px] font-black tracking-[0.3em] text-vibrant-cyan">
            <a href="#" className="hover:text-white transition-colors">Status</a>
            <a href="#" className="hover:text-white transition-colors">Docs</a>
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
