import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Menu, X, Lock, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

const ADMIN_ID = 'yash';
const ADMIN_PASS = '12345';

export default function Navbar() {
  const { projectName, logoUrl, setAdminOpen } = useApp();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loginModal, setLoginModal] = useState(false);
  const [adminId, setAdminId] = useState('');
  const [adminPass, setAdminPass] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const clickTimer = useRef(null);
  const clicks = useRef(0);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const closeLogin = () => { setLoginModal(false); setAdminId(''); setAdminPass(''); setError(''); setSuccess(false); };

  const handleLogin = (e) => {
    e.preventDefault();
    if (adminId === ADMIN_ID && adminPass === ADMIN_PASS) {
      setSuccess(true);
      setTimeout(() => { closeLogin(); setAdminOpen(true); }, 1000);
    } else {
      setError('Invalid credentials. Access denied.');
    }
  };

  const handleIconClick = () => {
    clicks.current += 1;
    if (clicks.current === 2) { clicks.current = 0; clearTimeout(clickTimer.current); setLoginModal(true); }
    else { clickTimer.current = setTimeout(() => { clicks.current = 0; }, 400); }
  };

  return (
    <>
      <motion.nav initial={{ y: -100 }} animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md border-b border-border shadow-sm' : 'bg-transparent'}`}
      >
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-3 cursor-pointer select-none" onDoubleClick={() => setLoginModal(true)} onClick={handleIconClick}>
              {logoUrl
                ? <img src={logoUrl} alt="logo" className="h-10 w-10 rounded-lg object-cover" />
                : <div className="bg-primary p-2 rounded-lg hover:bg-accent transition-colors"><Terminal size={24} className="text-white" /></div>
              }
              <span className="text-xl font-bold tracking-tight text-text">{projectName}</span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              {['About','Agents','Architecture','Team','Goals','Community'].map(item => (
                <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-medium text-muted hover:text-text transition-colors">{item}</a>
              ))}
            </div>
            <button className="md:hidden text-text" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        {mobileOpen && (
          <div className="md:hidden bg-white border-b border-border px-6 py-4 space-y-3 shadow-lg">
            {['About','Agents','Architecture','Team','Goals','Community'].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`} className="block text-muted hover:text-text py-2" onClick={() => setMobileOpen(false)}>{item}</a>
            ))}
          </div>
        )}
      </motion.nav>

      <AnimatePresence>
        {loginModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/25 backdrop-blur-sm px-4"
            onClick={(e) => { if (e.target === e.currentTarget) closeLogin(); }}
          >
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 16 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="bg-white border border-border rounded-2xl shadow-2xl w-full max-w-md p-8 relative"
            >
              <button onClick={closeLogin} className="absolute top-4 right-4 text-muted hover:text-text p-1 rounded-lg hover:bg-surface transition-colors"><X size={20} /></button>
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-secondary/40 rounded-xl border border-border"><Lock size={22} className="text-primary" /></div>
                <div><h2 className="text-xl font-bold text-text">Admin Access</h2><p className="text-sm text-muted">Arora Lab Control Panel</p></div>
              </div>
              {success ? (
                <div className="flex flex-col items-center gap-3 py-4">
                  <CheckCircle2 size={44} className="text-emerald-500" />
                  <p className="font-semibold text-text">Welcome, Yash! Opening dashboard…</p>
                </div>
              ) : (
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-text mb-1.5">Admin ID</label>
                    <input type="text" placeholder="Enter ID" value={adminId} onChange={e => { setAdminId(e.target.value); setError(''); }} autoFocus
                      className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-text text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text mb-1.5">Password</label>
                    <input type="password" placeholder="••••••••" value={adminPass} onChange={e => { setAdminPass(e.target.value); setError(''); }}
                      className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-text text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all" />
                  </div>
                  <AnimatePresence>
                    {error && (
                      <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                        className="flex items-center gap-2 text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                        <AlertCircle size={15} />{error}
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <button type="submit" className="w-full py-3 rounded-xl bg-primary text-white font-semibold hover:bg-accent transition-all shadow-md mt-1">Sign In</button>
                </form>
              )}
              <p className="text-xs text-muted text-center mt-5">Protected area — authorized personnel only</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
