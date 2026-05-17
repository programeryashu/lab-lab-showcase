import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { AppProvider, useApp } from './context/AppContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Agents from './components/Agents';
import Architecture from './components/Architecture';
import Team from './components/Team';
import TechStack from './components/TechStack';
import FutureGoals from './components/FutureGoals';
import AdminPanel from './components/AdminPanel';
import QRCodeSection from './components/QRCodeSection';
import Community from './components/Community';
import Footer from './components/Footer';
import AdminDashboard from './components/AdminDashboard';

function AppContent() {
  const { adminOpen } = useApp();
  return (
    <div className="min-h-screen bg-background text-text overflow-x-hidden selection:bg-primary/20">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Agents />
        <Architecture />
        <Team />
        <TechStack />
        <FutureGoals />
        <AdminPanel />
        <QRCodeSection />
        <Community />
      </main>
      <Footer />
      <AnimatePresence>{adminOpen && <AdminDashboard />}</AnimatePresence>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
