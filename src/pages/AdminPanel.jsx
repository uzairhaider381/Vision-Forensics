import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, FileSearch, HardDrive, Settings, Activity, ShieldCheck, 
  AlertCircle, Save, Search, Cpu, Lock, Globe, Database, 
  Terminal, ShieldAlert, Zap
} from 'lucide-react';
import { useConfig } from '../context/ConfigContext';

const AdminPanel = () => {
  const { settings, updateSettings, models } = useConfig();
  const [localSettings, setLocalSettings] = useState(settings);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('models');

  const filteredModels = useMemo(() => {
    return models.filter(m => 
      m.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      m.provider.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, models]);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      updateSettings(localSettings);
      setIsSaving(false);
    }, 1200);
  };

  const stats = [
    { label: 'Network', value: '1.2 GB/s', icon: <Zap size={18} />, color: 'var(--accent-cyan)' },
    { label: 'Threats', value: '42', icon: <ShieldAlert size={18} />, color: 'var(--danger)' },
    { label: 'Status', value: 'Active', icon: <Database size={18} />, color: 'var(--success)' },
    { label: 'Uptime', value: '99.9%', icon: <Activity size={18} />, color: 'var(--accent-purple)' },
  ];

  return (
    <div className="container" style={{ paddingTop: 'clamp(100px, 12vh, 140px)', paddingBottom: '4rem' }}>
      <div className="mesh-gradient" />
      <div className="grid-overlay" />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1.5rem' }}>
        <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 900 }}>Neural <span className="gradient-text">Command</span></h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>System Administrator Level Access</p>
        </motion.div>
        
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <button className="btn-primary" onClick={handleSave} disabled={isSaving} style={{ padding: '12px 24px', fontSize: '0.9rem' }}>
            {isSaving ? 'Syncing...' : <><Save size={18} /> Update Core</>}
          </button>
        </div>
      </div>

      <div className="responsive-grid grid-4" style={{ marginBottom: '3rem' }}>
        {stats.map((stat, i) => (
          <motion.div 
            key={i} 
            className="glass" 
            style={{ padding: '1.5rem', position: 'relative' }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <div style={{ color: stat.color, marginBottom: '0.75rem' }}>{stat.icon}</div>
            <div style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', fontWeight: 'bold', textTransform: 'uppercase' }}>{stat.label}</div>
            <div style={{ fontSize: '1.5rem', fontWeight: '900', marginTop: '4px' }}>{stat.value}</div>
          </motion.div>
        ))}
      </div>

      <div className="responsive-grid mobile-stack" style={{ gridTemplateColumns: '1fr minmax(300px, 350px)', gap: '2rem', alignItems: 'start' }}>
        <div className="glass" style={{ minHeight: '500px', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <div style={{ display: 'flex', borderBottom: '1px solid var(--glass-border)', background: 'rgba(255,255,255,0.02)', overflowX: 'auto' }}>
            <button 
              onClick={() => setActiveTab('models')}
              style={{ 
                padding: '1.25rem 1.5rem', fontSize: '0.9rem', whiteSpace: 'nowrap',
                color: activeTab === 'models' ? 'var(--accent-cyan)' : 'var(--text-secondary)',
                borderBottom: `2px solid ${activeTab === 'models' ? 'var(--accent-cyan)' : 'transparent'}`,
                fontWeight: 'bold', background: 'none', border: 'none', cursor: 'pointer'
              }}
            >
              AI Registry
            </button>
            <button 
              onClick={() => setActiveTab('security')}
              style={{ 
                padding: '1.25rem 1.5rem', fontSize: '0.9rem', whiteSpace: 'nowrap',
                color: activeTab === 'security' ? 'var(--accent-cyan)' : 'var(--text-secondary)',
                borderBottom: `2px solid ${activeTab === 'security' ? 'var(--accent-cyan)' : 'transparent'}`,
                fontWeight: 'bold', background: 'none', border: 'none', cursor: 'pointer'
              }}
            >
              Security
            </button>
          </div>

          <div style={{ padding: '1.5rem', flex: 1 }}>
            {activeTab === 'models' ? (
              <>
                <div style={{ position: 'relative', marginBottom: '1.5rem' }}>
                  <Search style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', opacity: 0.5 }} size={18} />
                  <input 
                    placeholder="Search models..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ 
                      width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--glass-border)', borderRadius: '10px',
                      padding: '12px 12px 12px 40px', color: 'white', fontSize: '0.9rem', outline: 'none'
                    }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1rem', maxHeight: '450px', overflowY: 'auto', paddingRight: '5px' }}>
                  {filteredModels.map((model) => (
                    <div 
                      key={model.id}
                      onClick={() => setLocalSettings({...localSettings, activeModelId: model.id})}
                      className="glass glass-hover"
                      style={{ 
                        padding: '1.25rem', cursor: 'pointer',
                        borderColor: localSettings.activeModelId === model.id ? 'var(--accent-cyan)' : 'var(--glass-border)',
                        background: localSettings.activeModelId === model.id ? 'rgba(0, 242, 255, 0.05)' : 'rgba(255,255,255,0.01)',
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                        <span style={{ fontSize: '0.6rem', color: 'var(--accent-purple)', fontWeight: '900' }}>{model.provider}</span>
                        {localSettings.activeModelId === model.id && <ShieldCheck size={14} color="var(--accent-cyan)" />}
                      </div>
                      <h4 style={{ fontSize: '1rem', marginBottom: '0.2rem' }}>{model.name}</h4>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="responsive-grid grid-2 mobile-stack">
                <div>
                  <h4 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1rem' }}>
                    <Lock size={16} color="var(--accent-cyan)" /> Encryption
                  </h4>
                  <select 
                    value={localSettings.encryptionType}
                    onChange={(e) => setLocalSettings({...localSettings, encryptionType: e.target.value})}
                    style={{ width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--glass-border)', borderRadius: '8px', padding: '10px', color: 'white', marginBottom: '1.5rem' }}
                  >
                    <option>AES-256-GCM</option>
                    <option>ChaCha20-Poly1305</option>
                    <option>quantum-safe-lattice-v1</option>
                  </select>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '1rem', background: 'rgba(0,0,0,0.2)', borderRadius: '10px' }}>
                    <input type="checkbox" checked={localSettings.firewallEnabled} onChange={(e) => setLocalSettings({...localSettings, firewallEnabled: e.target.checked})} />
                    <div style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>Neural Firewall</div>
                  </div>
                </div>

                <div>
                  <h4 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1rem' }}>
                    <Terminal size={16} color="var(--accent-purple)" /> Logs
                  </h4>
                  <div style={{ background: '#000', padding: '1rem', borderRadius: '10px', fontFamily: 'monospace', fontSize: '0.7rem', color: 'var(--accent-cyan)', height: '200px', overflowY: 'auto' }}>
                    <div>[SYS] Admin Session Started</div>
                    <div style={{ color: 'var(--success)' }}>[OK] Backup completed</div>
                    <div style={{ color: 'var(--danger)' }}>[WARN] Intrusion blocked</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div className="glass" style={{ padding: '1.5rem' }}>
            <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.1rem' }}>
              <Cpu size={18} color="var(--accent-cyan)" /> Neural Load
            </h3>
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '5px' }}>
                <span>Temp</span>
                <span style={{ color: 'var(--danger)' }}>72°C</span>
              </div>
              <div style={{ height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '10px', overflow: 'hidden' }}>
                <motion.div animate={{ width: '72%' }} style={{ height: '100%', background: 'linear-gradient(90deg, var(--accent-cyan), var(--danger))' }} />
              </div>
            </div>
            <button className="btn-primary" style={{ width: '100%', background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', color: 'white', fontSize: '0.8rem', padding: '10px' }}>
              Flush Cache
            </button>
          </div>

          <div className="glass mobile-hide" style={{ padding: '1.5rem', background: 'rgba(112, 0, 255, 0.05)', borderColor: 'rgba(112, 0, 255, 0.2)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.5rem' }}>
              <Globe size={18} color="var(--accent-purple)" />
              <h3 style={{ fontSize: '1rem' }}>Edge Node</h3>
            </div>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
              Connected to Global-C11. Latency: 4ms.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
