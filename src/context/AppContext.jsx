import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

const defaultTech = [
  { id: 1, name: 'React', category: 'Frontend' },
  { id: 2, name: 'Tailwind CSS', category: 'Styling' },
  { id: 3, name: 'Firebase', category: 'Backend & DB' },
  { id: 4, name: 'FastAPI', category: 'AI Orchestration' },
  { id: 5, name: 'LangChain', category: 'Agent Framework' },
  { id: 6, name: 'Vercel', category: 'Hosting' },
];

const defaultTeam = [
  { id: 1, name: "Alex", role: "Lead Architect", description: "Designed the core orchestration engine and Bob's decision matrix.", contribution: "Backend & AI Infrastructure" },
  { id: 2, name: "Sarah", role: "Frontend Engineer", description: "Built the interactive Web IDE and real-time collaboration UI.", contribution: "React & Tailwind" },
  { id: 3, name: "David", role: "AI Specialist", description: "Fine-tuned the specialized agent prompts and response parsing logic.", contribution: "Prompt Engineering" },
];

export function AppProvider({ children }) {
  const [projectName, setProjectName] = useState('Arora Lab');
  const [tagline, setTagline] = useState('Managed by Bob. Built for smarter development.');
  const [logoUrl, setLogoUrl] = useState(null);
  const [qrCodeUrl, setQrCodeUrl] = useState(null);
  const [team, setTeam] = useState(defaultTeam);
  const [workflowAnimated, setWorkflowAnimated] = useState(true);
  const [techStack, setTechStack] = useState(defaultTech);
  const [adminOpen, setAdminOpen] = useState(false);

  return (
    <AppContext.Provider value={{
      projectName, setProjectName,
      tagline, setTagline,
      logoUrl, setLogoUrl,
      qrCodeUrl, setQrCodeUrl,
      team, setTeam,
      techStack, setTechStack,
      workflowAnimated, setWorkflowAnimated,
      adminOpen, setAdminOpen,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
