import React from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';

export default function TechStack() {
  const { techStack } = useApp();
  return (
    <section className="py-24 bg-white" id="tech-stack">
      <div className="container mx-auto px-6">
        <div className="mb-16 text-center">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold mb-4 text-text">Powered By Modern Tech</motion.h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">Built on a robust, scalable, and cutting-edge technology stack.</p>
        </div>
        <div className="flex flex-wrap justify-center gap-4 max-w-3xl mx-auto">
          {techStack.map((tech, i) => (
            <motion.div key={tech.id} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
              className="bg-surface border border-border px-6 py-4 rounded-xl flex items-center gap-3 hover:shadow-md hover:border-primary/30 transition-all duration-200 cursor-default group">
              <div className="w-2 h-2 rounded-full bg-primary group-hover:scale-125 transition-transform"></div>
              <div>
                <h4 className="font-semibold text-text text-sm">{tech.name}</h4>
                <p className="text-xs text-muted">{tech.category}</p>
              </div>
            </motion.div>
          ))}
          {techStack.length === 0 && (
            <p className="text-muted text-sm py-8">No technologies added yet. Use the Admin Panel to add some.</p>
          )}
        </div>
      </div>
    </section>
  );
}
