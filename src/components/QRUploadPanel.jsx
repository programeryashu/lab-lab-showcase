import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QrCode, Scan, ShieldAlert } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function QRUploadPanel() {
  const { qrCodeUrl, setAdminOpen, setAdminTab } = useApp();

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="glass p-8 rounded-[2.5rem] relative overflow-hidden group border border-border/40"
    >
      <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
        <QrCode size={120} />
      </div>

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-primary/10 rounded-2xl text-primary">
            <Scan size={24} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-text">Connectivity Hub</h3>
            <p className="text-sm text-muted">Scan to link mobile device</p>
          </div>
        </div>

        <div className="relative aspect-square rounded-3xl border border-border/80 bg-white/40 overflow-hidden flex flex-col items-center justify-center gap-4 shadow-sm backdrop-blur-md">
          <AnimatePresence mode="wait">
            {qrCodeUrl ? (
              <motion.div 
                key="preview"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="relative w-full h-full p-6 flex flex-col items-center justify-center"
              >
                <img 
                  src={qrCodeUrl} 
                  alt="QR Code" 
                  className="w-full h-full object-contain rounded-xl shadow-inner bg-white p-2"
                />
              </motion.div>
            ) : (
              <motion.div 
                key="empty"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex flex-col items-center gap-3 text-center px-6"
              >
                <div className="w-16 h-16 rounded-full bg-secondary/30 flex items-center justify-center text-primary/60 mb-2 border border-border">
                  <ShieldAlert size={32} />
                </div>
                <p className="font-semibold text-text">Portal Offline</p>
                <p className="text-sm text-muted leading-relaxed">
                  No QR code uploaded yet. Please access the Admin dashboard to set up.
                </p>
                <button
                  onClick={() => {
                    setAdminTab('qrcode');
                    setAdminOpen(true);
                  }}
                  className="mt-2 px-4 py-2 bg-primary hover:bg-accent text-white font-semibold text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5"
                >
                  <QrCode size={14} /> Configure Portal
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="mt-6 space-y-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted">Portal Status</span>
            <button 
              onClick={() => {
                setAdminTab('qrcode');
                setAdminOpen(true);
              }}
              className="flex items-center gap-1.5 font-semibold text-primary hover:text-accent transition-colors"
            >
              <span className={`w-2.5 h-2.5 rounded-full animate-pulse ${qrCodeUrl ? 'bg-emerald-500' : 'bg-amber-500'}`} />
              {qrCodeUrl ? 'Ready to Sync' : 'Setup Pending'}
            </button>
          </div>
          <div className="text-[11px] text-muted text-center pt-2 border-t border-border/40">
            Secure End-to-End Local Workspace Encryption
          </div>
        </div>
      </div>

      {/* Decorative peach blobs */}
      <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
    </motion.div>
  );
}
