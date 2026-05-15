import React from 'react';
import { motion } from 'framer-motion';
import { QrCode, Scan } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function QRCodeSection() {
  const { qrCodeUrl } = useApp();
  return (
    <section className="py-32 bg-white" id="explore">
      <div className="container mx-auto px-6">
        <motion.div initial={{ opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
          className="max-w-2xl mx-auto bg-surface border border-border p-12 rounded-3xl text-center shadow-lg">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-secondary/40 border border-border mb-8">
            <QrCode size={32} className="text-primary" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-text">Ready to see Bob in action?</h2>
          <p className="text-lg text-muted mb-10 max-w-md mx-auto">
            Scan the code or click below to explore the live Arora Lab showcase environment.
          </p>
          <div className="bg-white p-4 rounded-2xl inline-block mb-8 shadow-md border border-border">
            {qrCodeUrl ? (
              <img src={qrCodeUrl} alt="QR Code" className="w-44 h-44 object-contain rounded-xl" />
            ) : (
              <div className="w-44 h-44 bg-surface rounded-xl flex flex-col items-center justify-center gap-2 border-2 border-dashed border-border">
                <Scan size={40} className="text-muted" />
                <p className="text-xs text-muted text-center px-2">Upload QR code<br/>from Admin Panel</p>
              </div>
            )}
          </div>
          <div>
            <button className="px-8 py-4 rounded-xl bg-primary text-white font-semibold hover:bg-accent transition-all shadow-md hover:shadow-lg flex items-center gap-2 mx-auto">
              Open Live Showcase <Scan size={18} />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
