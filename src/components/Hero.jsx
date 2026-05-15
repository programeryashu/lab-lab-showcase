import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, Activity, Zap } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Hero() {
  const { projectName, tagline, logoUrl } = useApp();
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 bg-background">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-grid"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-secondary/50 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/15 rounded-full blur-[100px]"></div>
      </div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-border shadow-sm mb-8">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-60"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
            </span>
            <span className="text-sm font-semibold text-primary">Powered by Bob</span>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.05 }}
            className="flex items-center justify-center gap-4 mb-4">
            {logoUrl && <img src={logoUrl} alt="logo" className="h-16 w-16 rounded-2xl object-cover shadow-md" />}
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight text-text">
            {projectName}
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              Intelligent agents collaborate.
            </span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-muted mb-10 max-w-2xl mx-auto leading-relaxed">
            An AI-powered web IDE where multiple intelligent agents work together like a real company.{' '}
            <span className="font-semibold text-text">{tagline}</span>
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="px-8 py-4 rounded-xl bg-primary text-white font-semibold hover:bg-accent transition-all shadow-lg hover:shadow-xl flex items-center gap-2">
              <Terminal size={20} /> Explore Project
            </button>
            <button className="px-8 py-4 rounded-xl bg-white border border-border text-text font-semibold hover:bg-surface transition-all shadow-sm flex items-center gap-2">
              <Activity size={20} /> View Architecture
            </button>
            <button className="px-8 py-4 rounded-xl bg-secondary/40 border border-border text-text font-semibold hover:bg-secondary/70 transition-all flex items-center gap-2">
              <Zap size={20} /> Scan Demo
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
