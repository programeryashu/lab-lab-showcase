import React from 'react';
import { Terminal } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Footer() {
  const { projectName, logoUrl } = useApp();
  return (
    <footer className="border-t border-border bg-surface pt-14 pb-8">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10">
          <div className="flex items-center gap-2 mb-6 md:mb-0">
            {logoUrl
              ? <img src={logoUrl} alt="logo" className="h-9 w-9 rounded-lg object-cover" />
              : <div className="bg-primary p-2 rounded-lg"><Terminal size={22} className="text-white" /></div>
            }
            <span className="text-xl font-bold tracking-tight text-text">{projectName}</span>
          </div>
          <div className="flex flex-wrap justify-center gap-8 text-sm text-muted">
            {['About','Agents','Architecture','Team','Goals','Admin'].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-primary transition-colors">{item}</a>
            ))}
          </div>
        </div>
        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted">
          <p>© {new Date().getFullYear()} {projectName}. Built for the <span className="text-primary font-medium">Lab Lab AI Hackathon</span>.</p>
          <div className="flex items-center gap-6">
            {['Twitter','GitHub','Discord'].map(s => <a key={s} href="#" className="hover:text-primary transition-colors">{s}</a>)}
          </div>
        </div>
      </div>
    </footer>
  );
}
