import React from 'react';
import { motion } from 'framer-motion';
import { Database, Settings, LayoutDashboard, DatabaseZap } from 'lucide-react';

export default function AdminPanel() {
  return (
    <section className="py-24 bg-surface border-y border-border" id="admin">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/40 border border-border text-sm font-semibold text-primary mb-6"
            >
              <DatabaseZap size={15} /> Real-time Sync
            </motion.div>

            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold mb-5 text-text leading-tight"
            >Powerful Admin Dashboard</motion.h2>

            <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
              className="text-muted leading-relaxed mb-8"
            >
              Control every aspect of the Arora Lab showcase. Manage AI agents, edit content in real-time, and monitor system architecture data — all powered seamlessly by Firebase.
            </motion.p>

            <div className="space-y-3">
              {[
                { icon: <Settings size={18} className="text-primary" />, text: "Manage AI Agents & Roles" },
                { icon: <LayoutDashboard size={18} className="text-primary" />, text: "Update Showcase Sections dynamically" },
                { icon: <Database size={18} className="text-primary" />, text: "Direct Firebase Database Integration" },
              ].map((item, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 + i * 0.1 }}
                  className="flex items-center gap-3 text-text"
                >
                  <div className="p-2 bg-white border border-border rounded-lg shadow-sm">{item.icon}</div>
                  <span className="text-sm font-medium">{item.text}</span>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div initial={{ opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
            className="relative"
          >
            <div className="bg-white border border-border rounded-2xl overflow-hidden shadow-xl">
              <div className="bg-surface border-b border-border px-4 py-3 flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                <div className="ml-4 text-xs text-muted font-mono">admin.aroralab.ai</div>
              </div>
              <div className="p-6">
                <div className="animate-pulse space-y-4">
                  <div className="h-7 bg-surface rounded w-1/3 mb-6 border border-border"></div>
                  <div className="grid grid-cols-3 gap-3">
                    {[1,2,3].map(n => <div key={n} className="h-20 bg-surface rounded-xl border border-border"></div>)}
                  </div>
                  <div className="h-32 bg-surface rounded-xl border border-border mt-4"></div>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-5 -left-5 bg-white border border-border px-5 py-3 rounded-xl flex items-center gap-3 shadow-lg">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
              <span className="text-sm font-semibold text-text">Database Connected</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
