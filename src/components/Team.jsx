import React from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';

export default function Team() {
  const { team } = useApp();
  return (
    <section className="py-24 bg-surface border-y border-border" id="team">
      <div className="container mx-auto px-6">
        <div className="mb-16 text-center">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold mb-4 text-text">The Architects</motion.h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">The human minds behind the AI workforce.</p>
        </div>
        <div className={`grid gap-8 max-w-5xl mx-auto ${team.length === 1 ? 'md:grid-cols-1 max-w-sm' : team.length === 2 ? 'md:grid-cols-2 max-w-2xl' : 'md:grid-cols-3'}`}>
          {team.map((m, i) => (
            <motion.div key={m.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="bg-white border border-border p-8 rounded-2xl text-center hover:shadow-md transition-all duration-300">
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-secondary to-primary rounded-full mb-6 flex items-center justify-center text-2xl font-bold text-white shadow-md">
                {m.name.charAt(0)}
              </div>
              <h3 className="text-xl font-bold mb-1 text-text">{m.name}</h3>
              <p className="text-primary text-sm font-semibold mb-4">{m.role}</p>
              <p className="text-muted text-sm mb-5 leading-relaxed">{m.description}</p>
              <span className="inline-block px-3 py-1 rounded-full bg-secondary/30 border border-border text-xs text-text font-medium">{m.contribution}</span>
            </motion.div>
          ))}
        </div>
        {team.length === 0 && (
          <p className="text-center text-muted py-12">No team members yet. Add some from the Admin Panel.</p>
        )}
      </div>
    </section>
  );
}
