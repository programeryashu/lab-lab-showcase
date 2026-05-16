import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QrCode, Upload, X, CheckCircle, Scan } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function QRUploadPanel() {
  const { qrCodeUrl, setQrCodeUrl } = useApp();
  const [isDragging, setIsDragging] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(qrCodeUrl);
  const [status, setStatus] = useState('idle'); // idle, uploading, success

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      processFile(file);
    }
  };

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file) => {
    setStatus('uploading');
    const reader = new FileReader();
    reader.onload = (e) => {
      const url = e.target.result;
      setPreviewUrl(url);
      setQrCodeUrl(url); // In a real app, you'd upload to storage first
      setTimeout(() => setStatus('success'), 800);
      setTimeout(() => setStatus('idle'), 3000);
    };
    reader.readAsDataURL(file);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="glass p-8 rounded-[2.5rem] relative overflow-hidden group"
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
            <p className="text-sm text-muted">Scan or upload to link device</p>
          </div>
        </div>

        <div 
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`
            relative aspect-square rounded-3xl border-2 border-dashed transition-all duration-300
            flex flex-col items-center justify-center gap-4 cursor-pointer overflow-hidden
            ${isDragging ? 'border-primary bg-primary/5' : 'border-border bg-white/50 hover:bg-white/80'}
          `}
          onClick={() => document.getElementById('qr-upload').click()}
        >
          <input 
            type="file" 
            id="qr-upload" 
            className="hidden" 
            accept="image/*" 
            onChange={handleFileInput}
          />

          <AnimatePresence mode="wait">
            {previewUrl ? (
              <motion.div 
                key="preview"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="relative w-full h-full p-6 flex flex-col items-center justify-center"
              >
                <img 
                  src={previewUrl} 
                  alt="QR Preview" 
                  className="w-full h-full object-contain rounded-xl shadow-inner"
                />
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setPreviewUrl(null);
                    setQrCodeUrl(null);
                  }}
                  className="absolute top-4 right-4 p-2 bg-white/90 hover:bg-white rounded-full shadow-md text-muted hover:text-primary transition-colors"
                >
                  <X size={16} />
                </button>
              </motion.div>
            ) : (
              <motion.div 
                key="upload"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center gap-3 text-center px-6"
              >
                <div className="w-16 h-16 rounded-full bg-secondary/20 flex items-center justify-center text-primary mb-2">
                  <Upload size={32} />
                </div>
                <p className="font-semibold text-text">Drop your QR code here</p>
                <p className="text-sm text-muted">Supports PNG, JPG, or SVG. Direct from your phone.</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Status Overlay */}
          <AnimatePresence>
            {status !== 'idle' && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-white/90 backdrop-blur-sm flex flex-col items-center justify-center gap-3 z-20"
              >
                {status === 'uploading' ? (
                  <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
                ) : (
                  <motion.div 
                    initial={{ scale: 0 }} 
                    animate={{ scale: 1 }} 
                    className="flex flex-col items-center gap-2"
                  >
                    <CheckCircle size={48} className="text-primary" />
                    <p className="font-bold text-text text-lg">QR Linked Successfully!</p>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="mt-6 space-y-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted">Live Status</span>
            <span className="flex items-center gap-1.5 font-medium text-primary">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Active Monitoring
            </span>
          </div>
          <button className="w-full py-3 rounded-2xl bg-secondary/30 text-text font-bold hover:bg-secondary/50 transition-all flex items-center justify-center gap-2 border border-border">
            Generate New Link
          </button>
        </div>
      </div>

      {/* Decorative peach blobs */}
      <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
    </motion.div>
  );
}
