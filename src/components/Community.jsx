import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Send, CheckCircle, Globe } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Community() {
  const { leadsCount, addLead } = useApp();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !name) return;
    setLoading(true);
    try {
      await addLead(email, name);
      setSubmitted(true);
      setEmail('');
      setName('');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="community" className="py-24 relative overflow-hidden bg-surface/30">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto bg-white border border-border rounded-[2rem] shadow-xl overflow-hidden flex flex-col md:flex-row">
          
          {/* Left: Info & Real-time Stats */}
          <div className="flex-1 p-12 bg-primary text-white flex flex-col justify-center relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <Globe size={200} />
            </div>
            
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative z-10"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm mb-6 text-sm font-medium">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                Live Community Status
              </div>
              
              <h2 className="text-4xl font-bold mb-6">Join the Arora Lab</h2>
              <p className="text-primary-foreground/80 text-lg mb-10 leading-relaxed">
                Connect with the future of autonomous development. Our multi-agent system is constantly evolving through community feedback.
              </p>

              <div className="grid grid-cols-2 gap-6">
                <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10">
                  <div className="flex items-center gap-3 mb-2">
                    <Users className="text-primary-foreground" size={24} />
                    <span className="text-sm font-medium opacity-80 uppercase tracking-wider">Members</span>
                  </div>
                  <motion.div 
                    key={leadsCount}
                    initial={{ scale: 1.2, color: '#4ade80' }}
                    animate={{ scale: 1, color: '#ffffff' }}
                    className="text-3xl font-bold"
                  >
                    {leadsCount}
                  </motion.div>
                </div>
                
                <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10">
                  <div className="flex items-center gap-3 mb-2">
                    <Send className="text-primary-foreground" size={24} />
                    <span className="text-sm font-medium opacity-80 uppercase tracking-wider">Active Agents</span>
                  </div>
                  <div className="text-3xl font-bold">12</div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right: Join Form */}
          <div className="flex-1 p-12 flex flex-col justify-center bg-white">
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, opacity: 0 }}
                  animate={{ opacity: 1, opacity: 1 }}
                  exit={{ opacity: 0, opacity: 0 }}
                >
                  <h3 className="text-2xl font-bold mb-2">Reserve your spot</h3>
                  <p className="text-muted mb-8">Get early access to Arora OS beta and contribute to the lab.</p>
                  
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2 text-text">Full Name</label>
                      <input 
                        type="text" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        placeholder="John Doe"
                        className="w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-surface/50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2 text-text">Email Address</label>
                      <input 
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="john@example.com"
                        className="w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-surface/50"
                      />
                    </div>
                    <button 
                      type="submit"
                      disabled={loading}
                      className="w-full py-4 rounded-xl bg-primary text-white font-bold hover:bg-accent transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
                    >
                      {loading ? 'Processing...' : 'Secure Access'}
                      <Send size={18} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </form>
                  <p className="mt-6 text-xs text-center text-muted">
                    No spam. Just technical updates from Bob. Powered by Firebase.
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-10"
                >
                  <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle size={40} />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Welcome to the Lab!</h3>
                  <p className="text-muted mb-8">
                    Your spot is secured. Bob will reach out to you once the environment is ready.
                  </p>
                  <button 
                    onClick={() => setSubmitted(false)}
                    className="text-primary font-semibold hover:underline"
                  >
                    Add another member
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
