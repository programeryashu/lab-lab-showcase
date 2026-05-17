import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { X, Settings, Users, QrCode, Upload, Plus, Trash2, Edit2, Check, Terminal, GitBranch, Cpu } from 'lucide-react';

// ── Image Uploader ───────────────────────────────────────────────
function ImageUploader({ value, onChange, label, hint }) {
  const ref = useRef();
  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => onChange(ev.target.result);
    reader.readAsDataURL(file);
  };
  return (
    <div>
      <label className="block text-sm font-medium text-text mb-2">{label}</label>
      <div onClick={() => ref.current.click()}
        className="border-2 border-dashed border-border rounded-xl p-6 flex flex-col items-center gap-3 cursor-pointer hover:border-primary/50 hover:bg-secondary/10 transition-all">
        {value
          ? <img src={value} alt={label} className="max-h-32 rounded-lg object-contain" />
          : <><Upload size={30} className="text-muted" /><p className="text-sm text-muted text-center">{hint}</p></>}
        <input ref={ref} type="file" accept="image/*" className="hidden" onChange={handleFile} />
      </div>
      {value && <button onClick={() => onChange(null)} className="mt-2 text-xs text-red-500 hover:text-red-700">Remove</button>}
    </div>
  );
}

// ── General Tab ──────────────────────────────────────────────────
function GeneralTab() {
  const { 
    projectName, tagline, logoUrl, web3formsKey, visitButtonText, visitButtonUrl,
    setLogoUrl, updateSettings
  } = useApp();
  const [name, setName] = useState(projectName);
  const [tag, setTag] = useState(tagline);
  const [web3Key, setWeb3Key] = useState(web3formsKey || '');
  const [btnText, setBtnText] = useState(visitButtonText || '');
  const [btnUrl, setBtnUrl] = useState(visitButtonUrl || '');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setName(projectName);
    setTag(tagline);
    setWeb3Key(web3formsKey || '');
    setBtnText(visitButtonText || '');
    setBtnUrl(visitButtonUrl || '');
  }, [projectName, tagline, web3formsKey, visitButtonText, visitButtonUrl]);

  const save = async () => {
    await updateSettings({
      projectName: name,
      tagline: tag,
      web3formsKey: web3Key,
      visitButtonText: btnText,
      visitButtonUrl: btnUrl,
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-text mb-1.5">Project Name</label>
        <input value={name} onChange={e => setName(e.target.value)}
          className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-text text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all" />
      </div>
      <div>
        <label className="block text-sm font-medium text-text mb-1.5">Tagline</label>
        <input value={tag} onChange={e => setTag(e.target.value)}
          className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-text text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all" />
      </div>
      <div>
        <label className="block text-sm font-medium text-text mb-1.5">Visit Button Label Text</label>
        <input value={btnText} onChange={e => setBtnText(e.target.value)} placeholder="e.g. Click here to visit"
          className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-text text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all" />
      </div>
      <div>
        <label className="block text-sm font-medium text-text mb-1.5">Visit Button URL Link</label>
        <input value={btnUrl} onChange={e => setBtnUrl(e.target.value)} placeholder="e.g. https://aroralab.com"
          className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-text text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all" />
      </div>
      <div>
        <label className="block text-sm font-medium text-text mb-1.5">Web3Forms Access Key</label>
        <input value={web3Key} onChange={e => setWeb3Key(e.target.value)} placeholder="e.g. 12345678-abcd-1234-abcd-1234567890ab"
          className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-text text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-mono" />
        <p className="text-xs text-muted mt-1.5 leading-relaxed">
          Used to receive contact/lead form submissions directly to your email. Get a free key at <a href="https://web3forms.com/" target="_blank" rel="noreferrer" className="text-primary hover:text-accent font-semibold underline transition-colors">web3forms.com</a>.
        </p>
      </div>
      <ImageUploader value={logoUrl} onChange={setLogoUrl} label="Logo Image" hint="Click to upload logo from your device" />
      <button onClick={save}
        className={`px-6 py-3 rounded-xl font-semibold transition-all shadow-md ${saved ? 'bg-emerald-500 text-white' : 'bg-primary text-white hover:bg-accent'}`}>
        {saved ? '✓ Saved to Firebase' : 'Save Changes'}
      </button>
    </div>
  );
}

// ── Edit Member Form ─────────────────────────────────────────────
function EditForm({ member, onSave, onCancel }) {
  const [d, setD] = useState({ ...member });
  return (
    <div className="space-y-2 mt-2">
      {['name', 'role', 'description', 'contribution'].map(f => (
        <input key={f} type="text" placeholder={f.charAt(0).toUpperCase() + f.slice(1)} value={d[f] || ''}
          onChange={e => setD({ ...d, [f]: e.target.value })}
          className="w-full bg-white border border-border rounded-lg px-3 py-2 text-sm text-text focus:outline-none focus:border-primary transition-all" />
      ))}
      <div className="flex gap-2 pt-1">
        <button onClick={() => onSave(d)} className="px-3 py-1.5 bg-primary text-white text-xs rounded-lg hover:bg-accent transition-all flex items-center gap-1"><Check size={13} />Save</button>
        <button onClick={onCancel} className="px-3 py-1.5 bg-surface border border-border text-text text-xs rounded-lg">Cancel</button>
      </div>
    </div>
  );
}

// ── Team Tab ─────────────────────────────────────────────────────
function TeamTab() {
  const { team, addTeamMember, updateTeamMember, removeTeamMember } = useApp();
  const [editId, setEditId] = useState(null);
  const [adding, setAdding] = useState(false);
  const [nw, setNw] = useState({ name: '', role: '', description: '', contribution: '' });

  const add = async () => {
    if (!nw.name.trim()) return;
    await addTeamMember(nw);
    setNw({ name: '', role: '', description: '', contribution: '' });
    setAdding(false);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-text">Architects ({team.length})</h3>
        <button onClick={() => setAdding(true)} className="flex items-center gap-1.5 px-3 py-1.5 bg-primary text-white text-sm rounded-lg hover:bg-accent transition-all">
          <Plus size={15} /> Add
        </button>
      </div>

      <AnimatePresence>
        {adding && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
            className="bg-secondary/20 border border-border rounded-xl p-4 space-y-2 overflow-hidden">
            <p className="text-xs font-semibold text-text">New Member</p>
            {['name', 'role', 'description', 'contribution'].map(f => (
              <input key={f} type="text" placeholder={f.charAt(0).toUpperCase() + f.slice(1)} value={nw[f]}
                onChange={e => setNw({ ...nw, [f]: e.target.value })}
                className="w-full bg-white border border-border rounded-lg px-3 py-2 text-sm text-text focus:outline-none focus:border-primary transition-all" />
            ))}
            <div className="flex gap-2">
              <button onClick={add} className="px-4 py-2 bg-primary text-white text-sm rounded-lg hover:bg-accent">Add</button>
              <button onClick={() => setAdding(false)} className="px-4 py-2 bg-surface border border-border text-text text-sm rounded-lg">Cancel</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {team.map((m) => (
        <div key={m.id} className="bg-surface border border-border rounded-xl p-4">
          {editId === m.id
            ? <EditForm member={m} onSave={async (d) => { await updateTeamMember(m.id, d); setEditId(null); }} onCancel={() => setEditId(null)} />
            : <div className="flex items-start justify-between">
                <div>
                  <p className="font-semibold text-text">{m.name}</p>
                  <p className="text-xs text-primary font-medium">{m.role}</p>
                  <p className="text-xs text-muted mt-1">{m.description}</p>
                  <span className="text-xs bg-secondary/30 border border-border px-2 py-0.5 rounded-full mt-1.5 inline-block">{m.contribution}</span>
                </div>
                <div className="flex gap-1.5">
                  <button onClick={() => setEditId(m.id)} className="p-1.5 text-muted hover:text-primary transition-colors"><Edit2 size={15} /></button>
                  <button onClick={() => removeTeamMember(m.id)} className="p-1.5 text-muted hover:text-red-500 transition-colors"><Trash2 size={15} /></button>
                </div>
              </div>
          }
        </div>
      ))}
    </div>
  );
}

// ── Tech Stack Tab ───────────────────────────────────────────────
function TechStackTab() {
  const { techStack, addTech, removeTech } = useApp();
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');

  const add = async () => {
    if (!name.trim()) return;
    await addTech({ name: name.trim(), category: category.trim() || 'Other' });
    setName(''); setCategory('');
  };

  return (
    <div className="space-y-5">
      <div className="bg-secondary/20 border border-border rounded-xl p-4 space-y-3">
        <p className="text-sm font-semibold text-text">Add Technology</p>
        <div className="flex gap-2">
          <input value={name} onChange={e => setName(e.target.value)} placeholder="Name (e.g. Next.js)"
            className="flex-1 bg-white border border-border rounded-lg px-3 py-2 text-sm text-text focus:outline-none focus:border-primary transition-all" />
          <input value={category} onChange={e => setCategory(e.target.value)} placeholder="Category (e.g. Frontend)"
            className="flex-1 bg-white border border-border rounded-lg px-3 py-2 text-sm text-text focus:outline-none focus:border-primary transition-all" />
          <button onClick={add} className="px-4 py-2 bg-primary text-white text-sm rounded-lg hover:bg-accent flex items-center gap-1">
            <Plus size={15} /> Add
          </button>
        </div>
      </div>
      <div className="space-y-2">
        <p className="text-sm font-medium text-text">Current Stack ({techStack.length})</p>
        {techStack.length === 0 && <p className="text-sm text-muted py-4 text-center">No technologies yet. Add one above.</p>}
        {techStack.map(tech => (
          <div key={tech.id} className="flex items-center justify-between bg-surface border border-border rounded-xl px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-primary"></div>
              <span className="text-sm font-semibold text-text">{tech.name}</span>
              <span className="text-xs text-muted">{tech.category}</span>
            </div>
            <button onClick={() => removeTech(tech.id)} className="p-1.5 text-muted hover:text-red-500 transition-colors"><Trash2 size={15} /></button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Workflow Tab ─────────────────────────────────────────────────
function WorkflowTab() {
  const { workflowAnimated, setWorkflowAnimated } = useApp();
  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold text-text mb-1">Workflow Animations</h3>
        <p className="text-sm text-muted mb-4">Enable animated entrance effects and live data-flow indicator on the Architecture section.</p>
        <div className="flex items-center gap-4">
          <button onClick={() => setWorkflowAnimated(!workflowAnimated)}
            className={`relative w-14 h-7 rounded-full transition-colors ${workflowAnimated ? 'bg-primary' : 'bg-border'}`}>
            <span className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full shadow transition-transform ${workflowAnimated ? 'translate-x-7' : 'translate-x-0'}`}></span>
          </button>
          <span className="text-sm font-medium text-text">{workflowAnimated ? 'Animations ON' : 'Animations OFF'}</span>
        </div>
        <p className="text-xs text-muted mt-3">This setting is saved to Firebase and persists across sessions.</p>
      </div>
    </div>
  );
}

// ── QR Code Tab ──────────────────────────────────────────────────
function QRCodeTab() {
  const { qrCodeUrl, setQrCodeUrl } = useApp();
  return (
    <div className="space-y-5">
      <ImageUploader value={qrCodeUrl} onChange={setQrCodeUrl} label="QR Code Image" hint="Upload a QR code image directly from your device" />
      {qrCodeUrl && (
        <div className="bg-secondary/20 border border-border rounded-xl p-4">
          <p className="text-sm font-semibold text-text mb-3">Live Preview</p>
          <div className="bg-white p-4 rounded-xl inline-block border border-border shadow-sm">
            <img src={qrCodeUrl} alt="QR Code" className="w-40 h-40 object-contain" />
          </div>
        </div>
      )}
    </div>
  );
}

// ── Leads Tab ────────────────────────────────────────────────────
function LeadsTab() {
  const { leads } = useApp();
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-text">Community Leads ({leads.length})</h3>
      </div>
      <div className="grid gap-3">
        {leads.length === 0 && <p className="text-sm text-muted py-8 text-center bg-surface border border-dashed border-border rounded-xl">No leads yet. Share your lab to get some!</p>}
        {leads.map((lead) => (
          <div key={lead.id} className="bg-surface border border-border rounded-xl p-4 flex items-center justify-between group hover:border-primary/30 transition-all">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                {lead.name?.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="font-semibold text-text">{lead.name}</p>
                <p className="text-xs text-muted">{lead.email}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-[10px] uppercase tracking-wider text-muted font-bold">Joined</p>
              <p className="text-xs text-text">{lead.timestamp?.toDate ? new Date(lead.timestamp.toDate()).toLocaleDateString() : 'Just now'}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Main Dashboard ───────────────────────────────────────────────
const TABS = [
  { id: 'general',   label: 'General',    icon: <Settings size={16} /> },
  { id: 'team',      label: 'Team',       icon: <Users size={16} /> },
  { id: 'techstack', label: 'Tech Stack', icon: <Cpu size={16} /> },
  { id: 'workflow',  label: 'Workflow',   icon: <GitBranch size={16} /> },
  { id: 'qrcode',    label: 'QR Code',    icon: <QrCode size={16} /> },
  { id: 'leads',     label: 'Leads',      icon: <Users size={16} /> },
];

export default function AdminDashboard() {
  const { setAdminOpen, adminTab, setAdminTab } = useApp();
  const activeTab = adminTab;
  const setActiveTab = setAdminTab;
  const content = {
    general: <GeneralTab />, team: <TeamTab />,
    techstack: <TechStackTab />, workflow: <WorkflowTab />, qrcode: <QRCodeTab />,
    leads: <LeadsTab />,
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] bg-black/30 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={(e) => { if (e.target === e.currentTarget) setAdminOpen(false); }}
    >
      <motion.div initial={{ opacity: 0, scale: 0.96, y: 16 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96 }}
        transition={{ type: 'spring', stiffness: 280, damping: 28 }}
        className="bg-white border border-border rounded-2xl shadow-2xl w-full max-w-4xl h-[85vh] flex overflow-hidden"
      >
        {/* Sidebar */}
        <div className="w-52 bg-surface border-r border-border flex flex-col shrink-0">
          <div className="p-5 border-b border-border flex items-center gap-2">
            <div className="bg-primary p-1.5 rounded-lg"><Terminal size={16} className="text-white" /></div>
            <span className="font-bold text-text text-sm">Admin Panel</span>
          </div>
          <nav className="flex-1 p-3 space-y-1">
            {TABS.map(t => (
              <button key={t.id} onClick={() => setActiveTab(t.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${activeTab === t.id ? 'bg-primary text-white' : 'text-muted hover:text-text hover:bg-border/40'}`}>
                {t.icon} {t.label}
              </button>
            ))}
          </nav>
          <div className="p-3 border-t border-border">
            <div className="flex items-center gap-2 px-3 py-2 text-xs text-emerald-600">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              Firebase Connected
            </div>
            <button onClick={() => setAdminOpen(false)} className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm text-muted hover:text-red-500 hover:bg-red-50 transition-all">
              <X size={15} /> Close Panel
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col min-w-0">
          <div className="p-6 border-b border-border flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-text">{TABS.find(t => t.id === activeTab)?.label}</h2>
              <p className="text-sm text-muted">Changes auto-save to Firebase Firestore</p>
            </div>
            <button onClick={() => setAdminOpen(false)} className="p-2 text-muted hover:text-text rounded-lg hover:bg-surface transition-colors"><X size={20} /></button>
          </div>
          <div className="flex-1 overflow-y-auto p-6">
            <AnimatePresence mode="wait">
              <motion.div key={activeTab} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.15 }}>
                {content[activeTab]}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
