import React from 'react';
import { motion } from 'framer-motion';
import { Shield, PenTool, TerminalSquare, Search, CheckCircle, Edit3 } from 'lucide-react';

const agents = [
  { name: "Bob", role: "Central AI Manager", description: "Orchestrates the entire workflow, manages state, and delegates tasks to specialized agents.", icon: <Shield size={22} />, status: "Active" },
  { name: "Designer Agent", role: "UI/UX Architect", description: "Creates stunning user interfaces and maintains design system consistency.", icon: <PenTool size={22} />, status: "Active" },
  { name: "Code Agent", role: "Senior Developer", description: "Writes efficient, scalable code and implements core product logic.", icon: <TerminalSquare size={22} />, status: "Active" },
  { name: "Research Agent", role: "Data Analyst", description: "Gathers information, documentation, and technical requirements.", icon: <Search size={22} />, status: "Idle" },
  { name: "Testing Agent", role: "QA Specialist", description: "Ensures code quality through automated testing and validation pipelines.", icon: <CheckCircle size={22} />, status: "Idle" },
  { name: "Content Agent", role: "Technical Writer", description: "Generates documentation, marketing copy, and inline code comments.", icon: <Edit3 size={22} />, status: "Active" },
];

export default function Agents() {
  return (
    <section className="py-24 bg-surface border-y border-border" id="agents">
      <div className="container mx-auto px-6">
        <div className="mb-16 text-center">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold mb-4 text-text"
          >Meet the Workforce</motion.h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">Our specialized AI agents, working in perfect harmony.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {agents.map((agent, i) => (
            <motion.div key={i} initial={{ opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              className="bg-white border border-border p-6 rounded-2xl group hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`p-2.5 rounded-lg border border-border transition-colors group-hover:border-primary/40 ${agent.status === 'Active' ? 'bg-secondary/30 text-primary' : 'bg-surface text-muted'}`}>
                    {agent.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-text">{agent.name}</h3>
                    <p className="text-xs text-muted">{agent.role}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className={`w-2 h-2 rounded-full ${agent.status === 'Active' ? 'bg-emerald-500 animate-pulse' : 'bg-gray-300'}`}></span>
                  <span className="text-xs text-muted">{agent.status}</span>
                </div>
              </div>
              <p className="text-muted text-sm leading-relaxed border-t border-border pt-4">{agent.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
