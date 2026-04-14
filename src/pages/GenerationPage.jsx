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
    <div className="container" style={{ paddingTop: 'clamp(100px, 12vh, 140px)', paddingBottom: '4rem' }}>
      <div className="mesh-gradient" />
      <div className="grid-overlay" />

      <div className="responsive-grid mobile-stack" style={{ gridTemplateColumns: 'minmax(300px, 400px) 1fr', gap: '2rem' }}>
        {/* Left Column: Input */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.5rem)', fontWeight: 900, marginBottom: '0.5rem' }}>Neural <span className="gradient-text">Forge</span></h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--success)', fontSize: '0.75rem', fontWeight: 'bold' }}>
              <div style={{ width: 8, height: 8, background: 'var(--success)', borderRadius: '50%', boxShadow: '0 0 8px var(--success)' }} />
              MODEL ACTIVE: {settings.activeModel.name.toUpperCase()}
            </div>
          </motion.div>

          <div className="glass cyber-border" style={{ padding: 'clamp(1.5rem, 4vw, 2rem)' }}>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '1.5rem', background: 'rgba(0,0,0,0.3)', padding: '5px', borderRadius: '14px' }}>
              <button 
                onClick={() => setType('image')}
                style={{ 
                  flex: 1, padding: '12px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                  background: type === 'image' ? 'var(--glass-border)' : 'transparent',
                  color: type === 'image' ? 'var(--accent-cyan)' : 'var(--text-secondary)',
                  border: 'none', transition: '0.3s', cursor: 'pointer', fontSize: '0.8rem'
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
                  border: 'none', transition: '0.3s', cursor: 'pointer', fontSize: '0.8rem'
                }}
              >
                <Video size={18} /> VIDEO
              </button>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 'bold', display: 'block', marginBottom: '10px' }}>PROMPT SPECIFICATION</label>
              <textarea 
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder={`Detailed description...`}
                style={{
                  width: '100%', height: 'clamp(120px, 20vh, 180px)', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--glass-border)', borderRadius: '16px',
                  padding: '1rem', color: 'white', fontSize: '1rem', resize: 'none', outline: 'none', transition: '0.3s',
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
                <>SYNTHESIZING...</>
              ) : (
                <>
                  <Wand2 size={20} /> INITIALIZE {type.toUpperCase()}
                </>
              )}
            </button>
          </div>
          
          <div className="mobile-hide">
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
        </div>

        {/* Right Column: viewport & history stacked on mobile */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="glass cyber-border" style={{ 
            flex: 1, minHeight: 'clamp(300px, 60vh, 600px)', background: 'rgba(0,0,0,0.5)', overflow: 'hidden', position: 'relative',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            {generating && <div className="scanner-line" />}
            
            <AnimatePresence mode="wait">
              {!generatedMedia && !generating && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.3 }} exit={{ opacity: 0 }} style={{ textAlign: 'center' }}>
                  <Boxes size={64} style={{ marginBottom: '1rem' }} />
                  <p style={{ fontWeight: 700, letterSpacing: '2px', fontSize: '0.8rem' }}>AWAITING INPUT NEURAL-DATA</p>
                </motion.div>
              )}

              {generating && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ textAlign: 'center' }}>
                  <motion.div 
                    animate={{ scale: [1, 1.05, 1], opacity: [0.5, 1, 0.5] }} 
                    transition={{ repeat: Infinity, duration: 2 }}
                    style={{ fontSize: '1.2rem', fontWeight: 900, color: 'var(--accent-cyan)' }}
                  >
                    PROCESSING...
                  </motion.div>
                </motion.div>
              )}

              {generatedMedia && !generating && (
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  style={{ width: '100%', height: '100%', position: 'relative' }}
                >
                  {type === 'image' ? (
                    <img src={generatedMedia} alt="Generated" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                  ) : (
                    <video src={generatedMedia} autoPlay loop controls style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                  )}
                  
                  <div style={{ position: 'absolute', bottom: '1rem', right: '1rem', display: 'flex', gap: '0.5rem' }}>
                    <button className="btn-primary" style={{ padding: '10px 16px', fontSize: '0.8rem' }}>
                      <Download size={16} /> SAVE
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          <div className="responsive-grid grid-2 mobile-stack">
            <div className="glass" style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem' }}>
                <History size={18} color="var(--accent-pink)" />
                <h4 style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>RECENT</h4>
              </div>

              <div style={{ display: 'flex', gap: '1rem', overflowX: 'auto', paddingBottom: '1rem' }}>
                {history.length === 0 ? (
                  <p style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>Empty vault.</p>
                ) : (
                  history.map((item, i) => (
                    <motion.div key={i} className="glass" style={{ minWidth: '80px', height: '80px', overflow: 'hidden' }}>
                      <img src={item.url} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" />
                    </motion.div>
                  ))
                )}
              </div>
            </div>

            <div className="glass mobile-hide" style={{ padding: '1.5rem', background: 'rgba(255, 0, 200, 0.05)', borderColor: 'rgba(255, 0, 200, 0.2)' }}>
              <h4 style={{ fontSize: '1rem', marginBottom: '0.5rem', color: 'var(--accent-pink)' }}>Neural Network</h4>
              <p style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                Encrypted via Q-Safe. Generated assets are secured in private enclave.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenerationPage;
