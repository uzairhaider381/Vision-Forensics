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
    { label: 'Network Load', value: '1.2 GB/s', icon: <Zap size={18} />, color: 'var(--accent-cyan)' },
    { label: 'Threats Blocked', value: '42', icon: <ShieldAlert size={18} />, color: 'var(--danger)' },
    { label: 'Node Status', value: 'Active', icon: <Database size={18} />, color: 'var(--success)' },
    { label: 'Uptime', value: '99.98%', icon: <Activity size={18} />, color: 'var(--accent-purple)' },
  ];

  return (
    <div style={{ paddingTop: '120px', minHeight: '100vh', maxWidth: '1400px', margin: '0 auto', padding: '0 2rem' }}>
      <div className="mesh-gradient" />
      <div className="grid-overlay" />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
        <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
          <h2 style={{ fontSize: '3rem', fontWeight: 900 }}>Neural <span className="gradient-text">Command</span></h2>
          <p style={{ color: 'var(--text-secondary)' }}>System Administrator Level Access [SECURE-PROTOCOL-X]</p>
        </motion.div>
        
        <div style={{ display: 'flex', gap: '1rem' }}>
          <div className="glass" style={{ padding: '8px 20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: 8, height: 8, background: 'var(--success)', borderRadius: '50%', boxShadow: '0 0 10px var(--success)' }} />
            <span style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>ENCRYPTION: {settings.encryptionType}</span>
          </div>
          <button className="btn-primary" onClick={handleSave} disabled={isSaving}>
            {isSaving ? 'Synchronizing...' : <><Save size={18} /> Update Core</>}
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '3rem' }}>
        {stats.map((stat, i) => (
          <motion.div 
            key={i} 
            className="glass glass-hover" 
            style={{ padding: '2rem', position: 'relative' }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
          >
            <div style={{ color: stat.color, marginBottom: '1rem' }}>{stat.icon}</div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>{stat.label}</div>
            <div style={{ fontSize: '2rem', fontWeight: '900', marginTop: '5px' }}>{stat.value}</div>
          </motion.div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '2rem', alignItems: 'start' }}>
        <div className="glass" style={{ minHeight: '600px', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <div style={{ display: 'flex', borderBottom: '1px solid var(--glass-border)', background: 'rgba(255,255,255,0.02)' }}>
            <button 
              onClick={() => setActiveTab('models')}
              style={{ 
                padding: '1.5rem 2rem', 
                color: activeTab === 'models' ? 'var(--accent-cyan)' : 'var(--text-secondary)',
                borderBottom: `2px solid ${activeTab === 'models' ? 'var(--accent-cyan)' : 'transparent'}`,
                fontWeight: 'bold'
              }}
            >
              AI Global Registry
            </button>
            <button 
              onClick={() => setActiveTab('security')}
              style={{ 
                padding: '1.5rem 2rem', 
                color: activeTab === 'security' ? 'var(--accent-cyan)' : 'var(--text-secondary)',
                borderBottom: `2px solid ${activeTab === 'security' ? 'var(--accent-cyan)' : 'transparent'}`,
                fontWeight: 'bold'
              }}
            >
              Security Protocols
            </button>
          </div>

          <div style={{ padding: '2rem', flex: 1 }}>
            {activeTab === 'models' ? (
              <>
                <div style={{ position: 'relative', marginBottom: '2rem' }}>
                  <Search style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', opacity: 0.5 }} size={20} />
                  <input 
                    placeholder="Deep search 100+ AI models (ChatGPT, Grok, Veo, Kling...)"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ 
                      width: '100%', 
                      background: 'rgba(0,0,0,0.3)', 
                      border: '1px solid var(--glass-border)', 
                      borderRadius: '12px',
                      padding: '15px 15px 15px 50px',
                      color: 'white',
                      fontSize: '1rem',
                      outline: 'none'
                    }}
                  />
                  <div style={{ position: 'absolute', right: '15px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)', fontSize: '0.8rem' }}>
                    {filteredModels.length} Models Found
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem', maxHeight: '500px', overflowY: 'auto', paddingRight: '10px' }}>
                  {filteredModels.map((model) => (
                    <div 
                      key={model.id}
                      onClick={() => setLocalSettings({...localSettings, activeModelId: model.id})}
                      className="glass glass-hover"
                      style={{ 
                        padding: '1.5rem', 
                        cursor: 'pointer',
                        borderColor: localSettings.activeModelId === model.id ? 'var(--accent-cyan)' : 'var(--glass-border)',
                        background: localSettings.activeModelId === model.id ? 'rgba(0, 242, 255, 0.05)' : 'rgba(255,255,255,0.01)',
                        transition: '0.2s'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                        <span style={{ fontSize: '0.6rem', color: 'var(--accent-purple)', fontWeight: '900', textTransform: 'uppercase' }}>{model.provider}</span>
                        {localSettings.activeModelId === model.id && <ShieldCheck size={14} color="var(--accent-cyan)" />}
                      </div>
                      <h4 style={{ fontSize: '1.1rem', marginBottom: '0.3rem' }}>{model.name}</h4>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>{model.type}</span>
                        <span style={{ fontSize: '0.7rem', color: 'var(--success)' }}>{model.quality}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                <div>
                  <h4 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Lock size={18} color="var(--accent-cyan)" /> Encryption Suite
                  </h4>
                  <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '8px' }}>Active Algorithm</label>
                    <select 
                      value={localSettings.encryptionType}
                      onChange={(e) => setLocalSettings({...localSettings, encryptionType: e.target.value})}
                      style={{ width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--glass-border)', borderRadius: '8px', padding: '12px', color: 'white' }}
                    >
                      <option>AES-256-GCM</option>
                      <option>ChaCha20-Poly1305</option>
                      <option>RSA-4096-OAEP</option>
                      <option>quantum-safe-lattice-v1</option>
                    </select>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '1.5rem', background: 'rgba(0,0,0,0.2)', borderRadius: '12px' }}>
                    <input 
                      type="checkbox" 
                      checked={localSettings.firewallEnabled} 
                      onChange={(e) => setLocalSettings({...localSettings, firewallEnabled: e.target.checked})}
                      style={{ width: '20px', height: '20px' }}
                    />
                    <div>
                      <div style={{ fontWeight: 'bold' }}>Neural Injection Firewall</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Protects against malicious AI model tampering</div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Terminal size={18} color="var(--accent-purple)" /> System Logs
                  </h4>
                  <div style={{ background: '#000', padding: '1.5rem', borderRadius: '12px', fontFamily: 'monospace', fontSize: '0.75rem', color: 'var(--accent-cyan)', height: '250px', overflowY: 'auto', border: '1px solid var(--glass-border)' }}>
                    <div>[SYS] AUTH_INIT: Admin Session Started</div>
                    <div>[SYS] DB_CONNECT: Cluster Primary-X1 Online</div>
                    <div style={{ color: 'var(--text-secondary)' }}>[LOG] API_REQ: {settings.activeModelId} successfully resolved</div>
                    <div>[SYS] SEC_VERIFY: Checksum Valid 0x8F2A...</div>
                    <div style={{ color: 'var(--danger)' }}>[WARN] FIREWALL: Blocked 2 intrusion attempts (IP 192.168.0.XX)</div>
                    <div style={{ color: 'var(--success)' }}>[OK] BACKUP: Cloud sync completed</div>
                    <motion.div animate={{ opacity: [0, 1] }} transition={{ repeat: Infinity, duration: 0.5 }}>_</motion.div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div className="glass" style={{ padding: '2rem' }}>
            <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Cpu size={20} color="var(--accent-cyan)" /> Neural Load
            </h3>
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '5px' }}>
                <span>Core Temperature</span>
                <span style={{ color: 'var(--danger)' }}>72°C</span>
              </div>
              <div style={{ height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '10px', overflow: 'hidden' }}>
                <motion.div animate={{ width: '72%' }} style={{ height: '100%', background: 'linear-gradient(90deg, var(--accent-cyan), var(--danger))' }} />
              </div>
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '5px' }}>
                <span>Memory Allocation</span>
                <span style={{ color: 'var(--success)' }}>42%</span>
              </div>
              <div style={{ height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '10px', overflow: 'hidden' }}>
                <motion.div animate={{ width: '42%' }} style={{ height: '100%', background: 'var(--success)' }} />
              </div>
            </div>
            <button className="btn-primary" style={{ width: '100%', background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', color: 'white', fontSize: '0.8rem' }}>
              Flush Neural Cache
            </button>
          </div>

          <div className="glass" style={{ padding: '2rem', background: 'rgba(112, 0, 255, 0.05)', borderColor: 'rgba(112, 0, 255, 0.2)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
              <Globe size={20} color="var(--accent-purple)" />
              <h3 style={{ fontSize: '1.2rem' }}>Active Node</h3>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
              Currently processing via Edge-Compute-Global-C11. Latency: 4ms.
            </p>
            <div style={{ fontSize: '0.7rem', background: 'rgba(0,0,0,0.3)', padding: '10px', borderRadius: '8px', border: '1px solid var(--glass-border)' }}>
              ENDPOINT: {settings.apiEndpoint}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
