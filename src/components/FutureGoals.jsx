import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Cpu, 
  Code, 
  Users, 
  Layers, 
  GitBranch, 
  Terminal, 
  ArrowRight, 
  RotateCcw, 
  Sparkles, 
  CheckCircle,
  Zap,
  HelpCircle
} from 'lucide-react';

const GOALS_DATA = [
  {
    id: 1,
    number: '01',
    title: "Desktop & Mobile Apps",
    tagline: "Native Arora Environment",
    icon: <Cpu className="text-[#E8855A]" size={28} />,
    description: "Launch as a dedicated mobile and desktop application. Deploy fully compiled native apps for macOS, Windows, Linux, iOS, and Android to enable lightning-fast performance and offline-first local AI operations.",
    badge: "Milestone 1",
    glowColor: "rgba(212, 113, 74, 0.25)"
  },
  {
    id: 2,
    number: '02',
    title: "IDE & Editor Extensions",
    tagline: "Work Where You Code",
    icon: <Code className="text-[#E8855A]" size={28} />,
    description: "Build extensions for VS Code and other popular IDEs. Bring the power of Arora's collaborative agent workforce directly into VS Code, Cursor, JetBrains, and Neovim as lightweight background extensions.",
    badge: "Milestone 2",
    glowColor: "rgba(232, 133, 90, 0.25)"
  },
  {
    id: 3,
    number: '03',
    title: "Real-time AI Collab",
    tagline: "Simultaneous Team Synergy",
    icon: <Users className="text-[#E8855A]" size={28} />,
    description: "Add real-time AI collaboration between multiple agents and developers. Experience a Google Docs-like multiplayer space where humans and multiple AI agents edit, debug, and script together.",
    badge: "Milestone 3",
    glowColor: "rgba(212, 113, 74, 0.25)"
  },
  {
    id: 4,
    number: '04',
    title: "One-Click Deployments",
    tagline: "Zero Config Infrastructure",
    icon: <Layers className="text-[#E8855A]" size={28} />,
    description: "Support one-click deployment to AWS, Vercel, and Docker. Package your generated codebases in optimal microservices and push them to secure servers or serverless environments instantly.",
    badge: "Milestone 4",
    glowColor: "rgba(232, 133, 90, 0.25)"
  },
  {
    id: 5,
    number: '05',
    title: "Enterprise Workflows",
    tagline: "Integrated Workspace System",
    icon: <GitBranch className="text-[#E8855A]" size={28} />,
    description: "Integrate GitHub, GitLab, Jira, Slack, and Notion workflows. Arora automatically tracks software tickets, writes PR documentation, alerts teams of updates, and logs technical specs in real-time.",
    badge: "Milestone 5",
    glowColor: "rgba(212, 113, 74, 0.25)"
  },
  {
    id: 6,
    number: '06',
    title: "Complete AI Dev OS",
    tagline: "The Vision Unlocked",
    icon: <Terminal className="text-[#E8855A]" size={28} />,
    description: "Expand into a complete AI operating system for developers and creators. A full-fledged virtual sandboxed operating layer optimized for agents with native file system control and high-density telemetry dashboards.",
    badge: "Core Vision",
    glowColor: "rgba(232, 133, 90, 0.3)"
  }
];

export default function FutureGoals() {
  const [revealedCount, setRevealedCount] = useState(0);
  const [activeCard, setActiveCard] = useState(null);
  const [isDrawing, setIsDrawing] = useState(false);

  // Trigger drawing the next card
  const handleDrawCard = () => {
    if (isDrawing || revealedCount >= 6) return;

    setIsDrawing(true);
    
    // Simulate physically drawing the card
    setTimeout(() => {
      const nextIndex = revealedCount;
      setRevealedCount(prev => prev + 1);
      setActiveCard(GOALS_DATA[nextIndex]);
      setIsDrawing(false);
    }, 450); // duration matching the slide out animation
  };

  const handleReset = () => {
    setRevealedCount(0);
    setActiveCard(null);
    setIsDrawing(false);
  };

  return (
    <section 
      className="py-24 md:py-32 bg-[#0F0C0B] text-white relative overflow-hidden border-y border-white/[0.05]" 
      id="goals"
    >
      {/* Premium background grid and highlights */}
      <div className="absolute inset-0 bg-grid opacity-[0.04] pointer-events-none"></div>
      
      {/* Peach blurred glowing spots */}
      <div className="absolute -top-40 -left-40 w-[450px] h-[450px] bg-[#D4714A]/10 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute -bottom-40 -right-40 w-[400px] h-[400px] bg-[#E8855A]/10 rounded-full blur-[130px] pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="mb-16 md:mb-24 text-center max-w-3xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 15 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] mb-4 text-[#F6BFA6] text-xs font-semibold uppercase tracking-wider"
          >
            <Sparkles size={13} className="text-[#E8855A]" /> Roadmap 2026
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6"
          >
            Future <span className="bg-gradient-to-r from-[#F6BFA6] via-[#E8855A] to-[#D4714A] bg-clip-text text-transparent">Goals</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/60 text-lg md:text-xl leading-relaxed"
          >
            Shaping the future of Arora Lab. Draw from our development deck to unlock each milestone of our progressive AI workforce ecosystem.
          </motion.p>
        </div>

        {/* Outer UI Panel */}
        <div className="max-w-6xl mx-auto">
          {revealedCount < 6 ? (
            <div className="grid lg:grid-cols-12 gap-12 items-center min-h-[460px]">
              
              {/* Left Column: Stacked Card Deck */}
              <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
                <div className="relative w-[240px] h-[340px] flex items-center justify-center">
                  
                  {/* Glowing background behind deck */}
                  <div className="absolute inset-0 bg-[#D4714A]/5 rounded-3xl blur-2xl"></div>

                  <AnimatePresence>
                    {/* Render cards in deck (excluding the one being drawn) */}
                    {Array.from({ length: 6 - revealedCount }).map((_, idx) => {
                      const cardIndex = revealedCount + idx;
                      const isTopCard = idx === 0;
                      // Back of the card design
                      return (
                        <motion.div
                          key={cardIndex}
                          style={{
                            zIndex: 20 - idx,
                          }}
                          initial={{ 
                            scale: 0.9 + idx * 0.02, 
                            y: idx * 6, 
                            x: idx * 4, 
                            rotate: idx * 1.5,
                            opacity: 1
                          }}
                          animate={isDrawing && isTopCard ? {
                            x: -280,
                            y: -60,
                            rotate: -45,
                            scale: 1.05,
                            opacity: 0,
                            transition: { duration: 0.45, ease: [0.25, 1, 0.5, 1] }
                          } : {
                            scale: 1 - idx * 0.025,
                            y: idx * -6,
                            x: idx * 4,
                            rotate: idx * -1.5,
                            opacity: 1,
                            transition: { type: 'spring', stiffness: 120, damping: 14 }
                          }}
                          whileHover={isTopCard && !isDrawing ? {
                            y: -14,
                            x: 0,
                            rotate: -3,
                            scale: 1.02,
                            boxShadow: "0 15px 35px rgba(212, 113, 74, 0.25)",
                            transition: { duration: 0.2 }
                          } : {}}
                          onClick={isTopCard && !isDrawing ? handleDrawCard : undefined}
                          className={`absolute w-full h-full rounded-2xl border ${
                            isTopCard && !isDrawing 
                              ? 'border-[#E8855A]/45 cursor-pointer shadow-[0_4px_24px_rgba(212,113,74,0.08)] bg-gradient-to-br from-[#1E1614] to-[#120E0D]' 
                              : 'border-white/10 bg-[#120E0D]'
                          } flex flex-col justify-between p-6 select-none group transition-shadow duration-300`}
                        >
                          {/* Top bar of card back */}
                          <div className="flex justify-between items-center w-full">
                            <span className="text-[10px] tracking-widest text-[#F6BFA6]/40 uppercase font-mono">Future Goal Deck</span>
                            <div className="w-1.5 h-1.5 rounded-full bg-[#E8855A]/50 animate-pulse"></div>
                          </div>

                          {/* Center design (Arora Lab visual signature) */}
                          <div className="flex flex-col items-center justify-center my-auto relative">
                            {/* Radial neon glow rings */}
                            <div className={`absolute w-24 h-24 rounded-full border border-[#D4714A]/10 flex items-center justify-center ${isTopCard && 'group-hover:border-[#D4714A]/25 transition-all duration-300'}`}>
                              <div className="w-16 h-16 rounded-full border border-dashed border-[#D4714A]/20"></div>
                            </div>

                            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#D4714A] to-[#E8855A] flex items-center justify-center shadow-lg relative z-10">
                              <Terminal size={22} className="text-white" />
                            </div>
                            <span className="text-sm font-bold tracking-tight text-white/95 mt-4">ARORA LAB</span>
                            <span className="text-[8px] font-mono text-white/30 tracking-widest uppercase mt-1">Operating Intelligence</span>
                          </div>

                          {/* Card bottom */}
                          <div className="flex justify-between items-center w-full text-white/40">
                            <div className="text-[10px] font-mono">CODE: OS_0{cardIndex + 1}</div>
                            {isTopCard && !isDrawing ? (
                              <motion.div 
                                className="flex items-center gap-1 text-[10px] font-mono text-[#F6BFA6] font-semibold"
                                animate={{ opacity: [0.6, 1, 0.6] }}
                                transition={{ repeat: Infinity, duration: 1.5 }}
                              >
                                DRAW <ArrowRight size={10} />
                              </motion.div>
                            ) : (
                              <div className="text-[10px] font-mono">LOCKED</div>
                            )}
                          </div>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>

                  {/* Ghost outline when deck is empty */}
                  {revealedCount === 6 && (
                    <div className="absolute inset-0 rounded-2xl border border-dashed border-white/10 bg-white/[0.01] flex items-center justify-center">
                      <span className="text-xs text-white/30 font-mono">Deck Empty</span>
                    </div>
                  )}
                </div>

                {/* Draw Label */}
                <div className="mt-8 text-center">
                  <button 
                    onClick={handleDrawCard}
                    disabled={isDrawing || revealedCount === 6}
                    className="px-6 py-2.5 rounded-full bg-white/[0.03] hover:bg-[#D4714A]/10 border border-white/10 hover:border-[#D4714A]/40 text-sm font-medium transition-all duration-200 flex items-center gap-2 group disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:border-white/10 disabled:cursor-not-allowed"
                  >
                    <span>Click to reveal next goal</span>
                    <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform text-[#E8855A]" />
                  </button>
                  <p className="text-xs text-white/40 mt-3 font-mono">
                    Remaining in deck: {6 - revealedCount} cards
                  </p>
                </div>
              </div>

              {/* Right Column: Revealed Card Display Area */}
              <div className="lg:col-span-7 flex flex-col justify-center min-h-[380px]">
                
                {/* Active Card Wrapper */}
                <div className="relative min-h-[320px] w-full flex items-center justify-center p-1">
                  
                  <AnimatePresence mode="wait">
                    {activeCard ? (
                      <motion.div
                        key={activeCard.id}
                        initial={{ x: 100, y: 15, rotate: 10, scale: 0.9, opacity: 0 }}
                        animate={{ x: 0, y: 0, rotate: 0, scale: 1, opacity: 1 }}
                        exit={{ x: -100, y: -15, rotate: -10, scale: 0.9, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 140, damping: 16 }}
                        className="w-full bg-white/[0.02] backdrop-blur-md border border-white/[0.08] p-8 md:p-10 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.4)] relative overflow-hidden group hover:border-[#E8855A]/30 transition-colors duration-300"
                        style={{
                          boxShadow: `0 25px 60px -15px rgba(0,0,0,0.7), 0 0 40px -10px ${activeCard.glowColor}`
                        }}
                      >
                        {/* Decorative linear overlay */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[#E8855A]/[0.02] to-[#E8855A]/[0.05] pointer-events-none"></div>

                        {/* Top Metadata */}
                        <div className="flex justify-between items-start mb-8 relative z-10">
                          <div className="flex items-center gap-3">
                            <span className="text-xs font-mono px-3 py-1 rounded-md bg-white/[0.04] border border-white/[0.08] text-white/50">
                              OS_0{activeCard.id}
                            </span>
                            <span className="text-[10px] font-mono tracking-widest text-[#E8855A] font-bold uppercase">
                              {activeCard.badge}
                            </span>
                          </div>
                          <span className="text-4xl md:text-5xl font-mono font-bold text-white/[0.04] absolute -top-4 right-0 select-none">
                            {activeCard.number}
                          </span>
                        </div>

                        {/* Card Content Grid */}
                        <div className="flex flex-col md:flex-row gap-6 items-start relative z-10">
                          {/* Glowing Icon Hub */}
                          <div className="w-16 h-16 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center flex-shrink-0 shadow-inner relative group-hover:border-[#E8855A]/40 transition-colors duration-300">
                            <div className="absolute inset-0 bg-gradient-to-tr from-[#D4714A]/10 to-[#E8855A]/20 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-300"></div>
                            <div className="relative z-10 transform group-hover:scale-110 transition-transform duration-300">
                              {activeCard.icon}
                            </div>
                          </div>

                          <div className="space-y-4">
                            <div>
                              <span className="text-xs text-[#F6BFA6] tracking-wider uppercase font-semibold font-mono">{activeCard.tagline}</span>
                              <h3 className="text-2xl md:text-3xl font-bold text-white mt-1 group-hover:text-[#F6BFA6] transition-colors duration-300">
                                {activeCard.title}
                              </h3>
                            </div>
                            <p className="text-white/70 text-sm md:text-base leading-relaxed">
                              {activeCard.description}
                            </p>
                          </div>
                        </div>

                        {/* Card bottom telemetry decoration */}
                        <div className="border-t border-white/[0.06] mt-8 pt-4 flex flex-wrap justify-between items-center gap-4 text-xs font-mono text-white/40 relative z-10">
                          <div className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                            <span>STATUS: COMMITTED ROADMAP</span>
                          </div>
                          <div>ARORA_OS_REVISION: v2.0.6</div>
                        </div>
                      </motion.div>
                    ) : (
                      /* Placeholder prior to first card drawn */
                      <motion.div 
                        key="placeholder"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="w-full h-80 rounded-2xl border border-dashed border-white/10 bg-white/[0.01] flex flex-col items-center justify-center p-6 text-center"
                      >
                        <div className="w-14 h-14 rounded-full bg-white/[0.02] border border-white/[0.06] flex items-center justify-center text-white/30 mb-4 animate-pulse">
                          <Zap size={22} />
                        </div>
                        <h3 className="text-lg font-semibold text-white/80 mb-2">Development Deck Ready</h3>
                        <p className="text-sm text-white/40 max-w-sm">
                          Draw a card from the deck on the left to reveal the first milestone of our technological roadmap.
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Progress bar tracker */}
                <div className="mt-8 px-2">
                  <div className="flex justify-between items-center text-xs font-mono text-white/40 mb-2">
                    <span className="text-[#F6BFA6] font-semibold">ROADMAP UNLOCK PROGRESS</span>
                    <span>GOAL {revealedCount} OF 6</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/[0.04] rounded-full overflow-hidden border border-white/[0.08]">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-[#D4714A] via-[#E8855A] to-[#F6BFA6]"
                      initial={{ width: "0%" }}
                      animate={{ width: `${(revealedCount / 6) * 100}%` }}
                      transition={{ type: "spring", stiffness: 80, damping: 15 }}
                    ></motion.div>
                  </div>

                  {/* Mini-dots indicators representing all 6 goals */}
                  <div className="flex justify-between mt-4">
                    {GOALS_DATA.map((goal, idx) => {
                      const isUnlocked = idx < revealedCount;
                      const isActive = idx === revealedCount - 1;
                      return (
                        <div 
                          key={goal.id} 
                          className="flex flex-col items-center gap-1.5 flex-1 group cursor-default"
                        >
                          <div 
                            className={`w-3.5 h-3.5 rounded-full border transition-all duration-300 flex items-center justify-center ${
                              isUnlocked 
                                ? isActive 
                                  ? 'border-[#E8855A] bg-[#E8855A] shadow-[0_0_8px_#E8855A]' 
                                  : 'border-[#D4714A]/60 bg-[#D4714A]/30' 
                                : 'border-white/10 bg-white/[0.02]'
                            }`}
                          >
                            {isUnlocked && <div className="w-1 h-1 rounded-full bg-white"></div>}
                          </div>
                          <span className={`text-[8px] font-mono tracking-tight transition-colors duration-200 ${isUnlocked ? 'text-[#F6BFA6]' : 'text-white/20'}`}>
                            {goal.number}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>

            </div>
          ) : (
            
            /* Final Completed Vision Dashboard */
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, type: "spring", stiffness: 90 }}
              className="bg-white/[0.02] backdrop-blur-md border border-[#E8855A]/35 rounded-3xl p-8 md:p-12 relative overflow-hidden"
              style={{
                boxShadow: "0 30px 70px rgba(0,0,0,0.6), 0 0 50px rgba(212, 113, 74, 0.12)"
              }}
            >
              {/* Celebrate animation spots */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#D4714A]/5 rounded-full blur-[160px] pointer-events-none"></div>

              {/* Complete State Header */}
              <div className="text-center max-w-2xl mx-auto mb-12 relative z-10">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8855A]/15 border border-[#E8855A]/35 text-[#F6BFA6] text-xs font-semibold font-mono mb-4 animate-bounce">
                  <CheckCircle size={13} /> STACK FULLY UNLOCKED
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  The Arora Lab Ecosystem
                </h3>
                <p className="text-white/60 text-sm md:text-base">
                  All milestones drawn. Arora OS bridges developer systems with seamless agentic intelligence to launch products with 10x developer velocity.
                </p>
              </div>

              {/* Show All 6 Cards in a gorgeous grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10 mb-10">
                {GOALS_DATA.map((goal, idx) => (
                  <motion.div 
                    key={goal.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.08 }}
                    className="bg-[#120E0D]/60 border border-white/[0.06] hover:border-[#E8855A]/25 p-6 rounded-2xl hover:shadow-lg transition-all duration-300 group"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="w-10 h-10 rounded-lg bg-white/[0.03] border border-white/[0.08] flex items-center justify-center group-hover:border-[#E8855A]/30 transition-colors">
                        {goal.icon}
                      </div>
                      <span className="text-xs font-mono text-white/30 font-bold">{goal.number}</span>
                    </div>
                    <span className="text-[10px] text-[#F6BFA6] tracking-wider uppercase font-semibold font-mono">{goal.badge}</span>
                    <h4 className="text-base font-bold text-white mt-0.5 group-hover:text-[#F6BFA6] transition-colors">{goal.title}</h4>
                    <p className="text-white/50 text-xs leading-relaxed mt-2.5">{goal.description}</p>
                  </motion.div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
                <button 
                  onClick={handleReset}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white/[0.03] hover:bg-[#D4714A]/10 border border-white/10 hover:border-[#D4714A]/30 text-white font-medium text-sm transition-all duration-200 flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <RotateCcw size={16} className="group-hover:rotate-[-45deg] transition-transform text-[#E8855A]" />
                  <span>Replay Drawing Deck</span>
                </button>
                <a 
                  href="#about"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#D4714A] to-[#E8855A] hover:shadow-lg hover:shadow-[#D4714A]/25 text-white font-bold text-sm transition-all duration-200 flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <span>Explore Showcase</span>
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </motion.div>
          )}
        </div>

      </div>
    </section>
  );
}
