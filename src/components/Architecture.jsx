import React from 'react';
import { motion } from 'framer-motion';
import { User, Brain, LayoutTemplate, CheckSquare } from 'lucide-react';
import { useApp } from '../context/AppContext';

const steps = [
  { icon: <User size={30} className="text-primary" />, title: "User", description: "Provides prompt & requirements", bg: "bg-secondary/30" },
  { icon: <Brain size={30} className="text-primary" />, title: "Bob", description: "Analyzes & distributes tasks", bg: "bg-primary/10" },
  { icon: <LayoutTemplate size={30} className="text-primary" />, title: "AI Agents", description: "Collaborative generation", bg: "bg-secondary/40" },
  { icon: <CheckSquare size={30} className="text-primary" />, title: "Final Output", description: "Production-ready codebase", bg: "bg-primary/15" },
];

export default function Architecture() {
  const { workflowAnimated } = useApp();

  const Wrapper = ({ i, children }) => workflowAnimated
    ? <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.18 }} className="flex flex-col items-center relative z-10">{children}</motion.div>
    : <div className="flex flex-col items-center relative z-10">{children}</div>;

  return (
    <section className="py-24 bg-white" id="architecture">
      <div className="container mx-auto px-6">
        <div className="mb-16 text-center">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold mb-4 text-text">System Architecture</motion.h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">A clean, modern workflow from user input to final deployment.</p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Connector line */}
          <div className="hidden md:block absolute top-12 left-[14%] right-[14%] h-px overflow-hidden">
            {workflowAnimated ? (
              <motion.div className="h-full bg-gradient-to-r from-border via-primary to-border"
                animate={{ backgroundPosition: ['0% 0%', '200% 0%'] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                style={{ backgroundSize: '200% 100%' }} />
            ) : (
              <div className="h-full bg-gradient-to-r from-border via-primary/40 to-border" />
            )}
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {steps.map((s, i) => (
              <Wrapper key={i} i={i}>
                <div className={`w-24 h-24 rounded-full flex items-center justify-center border-2 border-border ${s.bg} mb-5 shadow-sm relative`}>
                  {s.icon}
                  {workflowAnimated && (
                    <motion.span className="absolute inset-0 rounded-full border-2 border-primary/30"
                      animate={{ scale: [1, 1.2, 1], opacity: [0.6, 0, 0.6] }}
                      transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }} />
                  )}
                </div>
                <h3 className="text-lg font-bold mb-1 text-text">{s.title}</h3>
                <p className="text-muted text-center text-sm">{s.description}</p>
              </Wrapper>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
