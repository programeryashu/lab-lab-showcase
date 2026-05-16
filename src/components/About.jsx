import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Users, Code, Sparkles, Activity } from 'lucide-react';

const features = [
  { icon: <Brain className="text-primary" size={28} />, title: "Intelligent Management", description: "Bob analyzes project requirements, breaks them down into actionable tasks, and assigns them to the most suitable specialized agents." },
  { icon: <Users className="text-primary" size={28} />, title: "Autonomous Workforce", description: "Multiple AI agents acting as designers, developers, and researchers collaborate seamlessly in real-time." },
  { icon: <Code className="text-primary" size={28} />, title: "Integrated Web IDE", description: "A powerful, browser-based development environment that provides full visibility and control over the AI-generated code." },
  { icon: <Sparkles className="text-primary" size={28} />, title: "Unprecedented Velocity", description: "Ship products 10x faster by delegating routine tasks, research, and boilerplate code generation to the agent workforce." },
];

export default function About() {
  return (
    <section className="py-24 bg-white" id="about">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-5xl font-bold mb-8 text-text">
              The Vision Behind <span className="text-primary">Arora Lab</span>
            </h2>
            <div className="space-y-6">
              <div className="p-6 rounded-2xl bg-surface border border-border">
                <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center text-red-600">
                    <Activity size={18} />
                  </div>
                  The Problem
                </h3>
                <p className="text-muted leading-relaxed">
                  Today's workflows are fragmented. AI agents often lack a unified environment to interact with local hardware, resulting in delayed synchronization and manual overhead in complex project management.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-surface border border-border border-l-4 border-l-primary">
                <h3 className="text-xl font-bold mb-2 flex items-center gap-2 text-primary">
                  <Sparkles size={18} />
                  The Solution
                </h3>
                <p className="text-muted leading-relaxed">
                  Arora Lab introduces a centralized intelligent workspace. Bob, our lead orchestrator, seamlessly manages specialized agents, local device connectivity, and complex workflows in real-time, delivering 10x faster execution.
                </p>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {features.map((f, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-surface border border-border p-8 rounded-2xl hover:shadow-md transition-all duration-300 group"
              >
                <div className="mb-5 w-14 h-14 bg-white rounded-xl flex items-center justify-center border border-border shadow-sm group-hover:shadow-md transition-all">
                  {f.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-text">{f.title}</h3>
                <p className="text-muted leading-relaxed">{f.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
