import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Wand2, Image as ImageIcon, Video, Sparkles, Send, 
  Download, Cpu, Play, Boxes, Layers, History, 
  ChevronRight, Maximize2, Zap, Settings
} from 'lucide-react';
import { useConfig } from '../context/ConfigContext';
import { grok } from '../services/grokAi';

const GenerationPage = () => {
  const { settings } = useConfig();
  const [prompt, setPrompt] = useState('');
  const [type, setType] = useState('image');
  const [generating, setGenerating] = useState(false);
  const [generatedMedia, setGeneratedMedia] = useState(null);
  const [history, setHistory] = useState([]);

  const handleGenerate = async () => {
    if (!prompt) return;
    setGenerating(true);
    setGeneratedMedia(null);
    
    try {
      let result;
      if (type === 'image') {
        result = await grok.generateImage(prompt, settings);
      } else {
        result = await grok.generateVideo(prompt, settings);
      }
      setGeneratedMedia(result);
      setHistory(prev => [{ prompt, url: result, type, engine: settings.activeModel.name }, ...prev].slice(0, 5));
    } catch (error) {
      console.error("Generation failed", error);
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div style={{ paddingTop: '120px', minHeight: '100vh', maxWidth: '1400px', margin: '0 auto', padding: '0 2rem' }}>
      <div className="mesh-gradient" />
      <div className="grid-overlay" />

      <div style={{ display: 'grid', gridTemplateColumns: '400px 1fr 300px', gap: '2rem' }}>
        {/* Left Column: Input */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '0.5rem' }}>Neural <span className="gradient-text">Forge</span></h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--success)', fontSize: '0.75rem', fontWeight: 'bold' }}>
              <div style={{ width: 8, height: 8, background: 'var(--success)', borderRadius: '50%', boxShadow: '0 0 8px var(--success)' }} />
              MODEL ACTIVE: {settings.activeModel.name.toUpperCase()}
            </div>
          </motion.div>

          <div className="glass cyber-border" style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '1.5rem', background: 'rgba(0,0,0,0.3)', padding: '5px', borderRadius: '14px' }}>
              <button 
                onClick={() => setType('image')}
                style={{ 
                  flex: 1, padding: '12px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                  background: type === 'image' ? 'var(--glass-border)' : 'transparent',
                  color: type === 'image' ? 'var(--accent-cyan)' : 'var(--text-secondary)',
                  border: 'none', transition: '0.3s'
                }}
              >
                <ImageIcon size={18} /> IMAGE
              </button>
              <button 
                onClick={() => setType('video')}
                style={{ 
                  flex: 1, padding: '12px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                  background: type === 'video' ? 'var(--glass-border)' : 'transparent',
                  color: type === 'video' ? 'var(--accent-cyan)' : 'var(--text-secondary)',
                  border: 'none', transition: '0.3s'
                }}
              >
                <Video size={18} /> VIDEO
              </button>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 'bold', display: 'block', marginBottom: '10px' }}>PROMPT SPECIFICATION</label>
              <textarea 
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder={`Detailed description for ${settings.activeModel.provider} synthesis...`}
                style={{
                  width: '100%', height: '180px', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--glass-border)', borderRadius: '16px',
                  padding: '1.5rem', color: 'white', fontSize: '1rem', resize: 'none', outline: 'none', transition: '0.3s',
                  lineHeight: '1.6', fontFamily: 'inherit'
                }}
              />
            </div>

            <button 
              className="btn-primary" 
              style={{ width: '100%', justifyContent: 'center', padding: '18px' }}
              onClick={handleGenerate}
              disabled={generating || !prompt}
            >
              {generating ? (
                <>
                  <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }}>
                    <Zap size={20} />
                  </motion.div>
                  SYNTHESIZING...
                </>
              ) : (
                <>
                  <Wand2 size={20} /> INITIALIZE {type.toUpperCase()}
                </>
              )}
            </button>
          </div>

          <div className="glass" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h4 style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>ENGINE SETTINGS</h4>
              <Settings size={16} color="var(--text-secondary)" />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '0.7rem' }}>
              <div style={{ padding: '10px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', border: '1px solid var(--glass-border)' }}>
                PROVIDER: {settings.activeModel.provider}
              </div>
              <div style={{ padding: '10px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', border: '1px solid var(--glass-border)' }}>
                TIER: Premium
              </div>
            </div>
          </div>
        </div>

        {/* Center Column: viewport */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="glass cyber-border" style={{ 
            flex: 1, minHeight: '600px', background: 'rgba(0,0,0,0.5)', overflow: 'hidden', position: 'relative',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            {generating && <div className="scanner-line" />}
            
            <AnimatePresence mode="wait">
              {!generatedMedia && !generating && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.3 }} exit={{ opacity: 0 }} style={{ textAlign: 'center' }}>
                  <Boxes size={100} style={{ marginBottom: '1rem' }} />
                  <p style={{ fontWeight: 700, letterSpacing: '2px' }}>AWAITING INPUT NEURAL-DATA</p>
                </motion.div>
              )}

              {generating && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ textAlign: 'center' }}>
                  <motion.div 
                    animate={{ 
                      scale: [1, 1.1, 1],
                      opacity: [0.5, 1, 0.5]
                    }} 
                    transition={{ repeat: Infinity, duration: 2 }}
                    style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--accent-cyan)' }}
                  >
                    {settings.activeModel.name.toUpperCase()} PROCESSING...
                  </motion.div>
                  <div style={{ marginTop: '1rem', fontSize: '0.8rem', color: 'var(--text-secondary)', fontFamily: 'monospace' }}>
                    0x84A... Mapped to Latent Space
                  </div>
                </motion.div>
              )}

              {generatedMedia && !generating && (
                <motion.div 
                  initial={{ opacity: 0, scale: 1.1 }} 
                  animate={{ opacity: 1, scale: 1 }} 
                  style={{ width: '100%', height: '100%', position: 'relative' }}
                >
                  {type === 'image' ? (
                    <img src={generatedMedia} alt="Generated" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                  ) : (
                    <video src={generatedMedia} autoPlay loop controls style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                  )}
                  
                  <div style={{ position: 'absolute', bottom: '2rem', right: '2rem', display: 'flex', gap: '1rem' }}>
                    <button className="btn-secondary glass" style={{ padding: '12px 20px', display: 'flex', gap: '8px', alignItems: 'center', fontWeight: 'bold' }}>
                      <Maximize2 size={18} /> FULLSCREEN
                    </button>
                    <button className="btn-primary" style={{ padding: '12px 20px' }}>
                      <Download size={18} /> SAVE ASSET
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          <div className="glass" style={{ padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: '2rem' }}>
              <div style={{ fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Layers size={14} color="var(--accent-purple)" /> 
                <span style={{ color: 'var(--text-secondary)' }}>LATENCY:</span> 1.2s
              </div>
              <div style={{ fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Cpu size={14} color="var(--accent-cyan)" /> 
                <span style={{ color: 'var(--text-secondary)' }}>POWER:</span> Ultra
              </div>
            </div>
            <div style={{ fontSize: '0.75rem', fontWeight: 'bold', color: 'var(--success)' }}>SYSTEM NOMINAL</div>
          </div>
        </div>

        {/* Right Column: History & Queue */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div className="glass" style={{ padding: '1.5rem', flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem' }}>
              <History size={18} color="var(--accent-pink)" />
              <h4 style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>RECENT FORMS</h4>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {history.length === 0 ? (
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textAlign: 'center', marginTop: '2rem' }}>No history yet.</p>
              ) : (
                history.map((item, i) => (
                  <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} key={i} className="glass glass-hover" style={{ padding: '10px', cursor: 'pointer', overflow: 'hidden' }}>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <img src={item.url} style={{ width: '50px', height: '50px', borderRadius: '8px', objectFit: 'cover' }} alt="" />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '0.7rem', color: 'var(--accent-cyan)', fontWeight: 'bold', marginBottom: '4px' }}>{item.engine}</div>
                        <p style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '150px' }}>{item.prompt}</p>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </div>

          <div className="glass" style={{ padding: '2rem', background: 'rgba(255, 0, 200, 0.05)', borderColor: 'rgba(255, 0, 200, 0.2)' }}>
            <h4 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: 'var(--accent-pink)' }}>Neural Network</h4>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
              Connected to global relay {settings.encryptionType === 'quantum-safe-lattice-v1' ? 'Q-Safe-N1' : 'Secure-X1'}. All generations are encrypted end-to-end.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenerationPage;
