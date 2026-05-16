import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../firebase';
import {
  doc, getDoc, setDoc, onSnapshot, collection,
  addDoc, deleteDoc, updateDoc, getDocs
} from 'firebase/firestore';

const AppContext = createContext();

// ── Firestore document refs ──────────────────────────────────────
const settingsRef = doc(db, 'showcase', 'settings');
const teamRef     = collection(db, 'showcase', 'team', 'members');
const techRef     = collection(db, 'showcase', 'tech', 'items');
const leadsRef    = collection(db, 'showcase', 'community', 'leads');

// ── Default values (used if Firestore is empty) ──────────────────
const DEFAULT_SETTINGS = {
  projectName: 'Arora Lab',
  tagline: 'Managed by Bob. Built for smarter development.',
  logoUrl: null,
  qrCodeUrl: null,
  workflowAnimated: true,
};

const DEFAULT_TEAM = [
  { name: "Alex",  role: "Lead Architect",   description: "Designed the core orchestration engine and Bob's decision matrix.", contribution: "Backend & AI Infrastructure" },
  { name: "Sarah", role: "Frontend Engineer", description: "Built the interactive Web IDE and real-time collaboration UI.",       contribution: "React & Tailwind" },
  { name: "David", role: "AI Specialist",     description: "Fine-tuned the specialized agent prompts and response parsing logic.", contribution: "Prompt Engineering" },
];

const DEFAULT_TECH = [
  { name: 'React',       category: 'Frontend' },
  { name: 'Tailwind CSS', category: 'Styling' },
  { name: 'Firebase',    category: 'Backend & DB' },
  { name: 'FastAPI',     category: 'AI Orchestration' },
  { name: 'LangChain',   category: 'Agent Framework' },
  { name: 'Vercel',      category: 'Hosting' },
];

// ── Seed Firestore if empty ──────────────────────────────────────
async function seedIfEmpty() {
  const snap = await getDoc(settingsRef);
  if (!snap.exists()) {
    await setDoc(settingsRef, DEFAULT_SETTINGS);
    for (const m of DEFAULT_TEAM) await addDoc(teamRef, m);
    for (const t of DEFAULT_TECH)  await addDoc(techRef, t);
  }
}

// ── Provider ─────────────────────────────────────────────────────
export function AppProvider({ children }) {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [team, setTeam] = useState([]);
  const [techStack, setTechStack] = useState([]);
  const [leadsCount, setLeadsCount] = useState(0);
  const [adminOpen, setAdminOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Derived convenience setters that also write to Firestore
  const updateSettings = async (patch) => {
    const merged = { ...settings, ...patch };
    setSettings(merged);
    await setDoc(settingsRef, merged);
  };

  const setProjectName      = (v) => updateSettings({ projectName: v });
  const setTagline          = (v) => updateSettings({ tagline: v });
  const setLogoUrl          = (v) => updateSettings({ logoUrl: v });
  const setQrCodeUrl        = (v) => updateSettings({ qrCodeUrl: v });
  const setWorkflowAnimated = (v) => updateSettings({ workflowAnimated: v });

  // Team CRUD
  const addTeamMember    = async (data)       => { const ref = await addDoc(teamRef, data); return ref.id; };
  const updateTeamMember = async (id, data)   => { await updateDoc(doc(db, 'showcase', 'team', 'members', id), data); };
  const removeTeamMember = async (id)         => { await deleteDoc(doc(db, 'showcase', 'team', 'members', id)); };

  // Tech CRUD
  const addTech    = async (data) => { const ref = await addDoc(techRef, data); return ref.id; };
  const removeTech = async (id)   => { await deleteDoc(doc(db, 'showcase', 'tech', 'items', id)); };

  // Community CRUD
  const addLead = async (email, name) => {
    await addDoc(leadsRef, { email, name, timestamp: new Date() });
  };

  useEffect(() => {
    seedIfEmpty();

    // Real-time listeners
    const unsubSettings = onSnapshot(settingsRef, (snap) => {
      if (snap.exists()) setSettings(snap.data());
      setLoading(false);
    });

    const unsubTeam = onSnapshot(teamRef, (snap) => {
      setTeam(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });

    const unsubTech = onSnapshot(techRef, (snap) => {
      setTechStack(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });

    const unsubLeads = onSnapshot(leadsRef, (snap) => {
      setLeadsCount(snap.size);
    });

    return () => { unsubSettings(); unsubTeam(); unsubTech(); unsubLeads(); };
  }, []);

  const ctx = {
    ...settings,
    setProjectName, setTagline, setLogoUrl, setQrCodeUrl, setWorkflowAnimated,
    team,      addTeamMember, updateTeamMember, removeTeamMember,
    techStack, addTech, removeTech,
    leadsCount, addLead,
    adminOpen, setAdminOpen,
    loading,
  };

  return <AppContext.Provider value={ctx}>{children}</AppContext.Provider>;
}

export const useApp = () => useContext(AppContext);
