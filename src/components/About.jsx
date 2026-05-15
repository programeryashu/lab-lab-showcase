import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Users, Code, Sparkles } from 'lucide-react';

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
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold mb-6 text-text"
          >
            A New Era of Collaboration
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            className="text-lg text-muted leading-relaxed"
          >
            Arora Lab is an innovative platform where humans and AI agents work together in a unified workspace. Bob, our central AI manager, coordinates specialized agents to execute complex software development tasks efficiently.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
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
    </section>
  );
}
