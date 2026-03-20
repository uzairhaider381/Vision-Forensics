import React from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, Zap, ShieldCheck, Sparkles, ArrowRight, 
  Cpu, Globe, Lock, Workflow, BarChart, 
  Search, Fingerprint, Activity, Layers, Server, ShieldAlert,
  Database, Eye, FileSearch, ShieldEllipsis
} from 'lucide-react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div style={{ paddingTop: '120px', minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
      <div className="mesh-gradient" />
      <div className="grid-overlay" />

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 4rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '4rem', alignItems: 'center' }}>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div style={{ 
              display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '10px 20px', 
              background: 'rgba(0, 242, 255, 0.05)', borderRadius: '100px', fontSize: '0.8rem', 
              color: 'var(--accent-cyan)', marginBottom: '2.5rem', border: '1px solid rgba(0, 242, 255, 0.2)',
              fontWeight: 'bold', letterSpacing: '1px'
            }}>
              <Shield size={14} fill="var(--accent-cyan)" />
              <span>VISION FORENSICS v3.0: ENTERPRISE EDITION</span>
            </div>

            <h1 style={{ fontSize: '5.5rem', fontWeight: 950, lineHeight: '1.1', marginBottom: '2rem', letterSpacing: '-3px' }}>
              Verify Digital <br />
              <span className="gradient-text">Authenticity</span>
            </h1>

            <p style={{ 
              fontSize: '1.25rem', color: 'var(--text-secondary)', maxWidth: '650px', 
              marginBottom: '3.5rem', lineHeight: '1.6', fontWeight: 400, opacity: 0.9
            }}>
              The world's most sophisticated AI detection and forensic suite. 
              Analyze images, video, and audio using industry-leading neural 
              fingerprinting and Sightengine™ hardware acceleration.
            </p>

            <div style={{ display: 'flex', gap: '1.5rem' }}>
              <Link to="/detect" className="btn-primary" style={{ padding: '20px 40px', fontSize: '1.1rem', boxShadow: '0 0 40px rgba(0, 242, 255, 0.2)' }}>
                Initialize Deep Analysis <ArrowRight size={22} />
              </Link>
            </div>

            <div style={{ display: 'flex', gap: '4rem', marginTop: '5rem' }}>
              {[
                { label: 'MODELS SCANNED', val: '250+' },
                { label: 'ANALYSIS TIME', val: '< 0.8s' },
                { label: 'PRECISION RATE', val: '99.98%' }
              ].map((stat, i) => (
                <div key={i}>
                  <div style={{ fontSize: '2rem', fontWeight: 900, color: 'white' }}>{stat.val}</div>
                  <div style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', fontWeight: 'bold', letterSpacing: '1.5px', marginTop: '5px' }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Hero Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            style={{ position: 'relative' }}
          >
            <div className="glass" style={{ 
              width: '100%', height: '550px', borderRadius: '40px', overflow: 'hidden',
              background: 'linear-gradient(135deg, rgba(2, 2, 3, 0.8), rgba(12, 12, 16, 0.9))',
              border: '1px solid rgba(255, 255, 255, 0.05)', position: 'relative'
            }}>
              <div style={{ position: 'absolute', top: '0', left: '0', right: '0', bottom: '0', opacity: 0.4, backgroundImage: 'url("https://www.transparenttextures.com/patterns/carbon-fibre.png")' }} />
              <div className="scanner-line" style={{ animationDuration: '4s' }} />
              
              {/* Radar UI */}
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '300px', height: '300px' }}>
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                    transition={{ duration: 3, repeat: Infinity, delay: i * 1, ease: 'linear' }}
                    style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, border: '1px solid var(--accent-cyan)', borderRadius: '50%' }}
                  />
                ))}
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                  <Cpu size={120} className="gradient-text" style={{ filter: 'drop-shadow(0 0 20px var(--accent-cyan))' }} />
                </div>
              </div>

              {/* Data Overlay */}
              <div style={{ position: 'absolute', bottom: '2rem', left: '2rem', right: '2rem', display: 'flex', justifyContent: 'space-between' }}>
                <div className="glass" style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Activity size={16} color="var(--success)" />
                  <span style={{ fontSize: '0.7rem', fontWeight: 'bold' }}>REAL-TIME LINK: ESTABLISHED</span>
                </div>
                <div className="glass" style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Lock size={16} color="var(--accent-purple)" />
                  <span style={{ fontSize: '0.7rem', fontWeight: 'bold' }}>AES-256 ENCRYPTED</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Feature Grid - 12 Major Capabilities */}
        <div style={{ marginTop: '12rem', textAlign: 'center' }}>
          <h2 style={{ fontSize: '3rem', fontWeight: 900, marginBottom: '1.5rem' }}>Forensic <span className="gradient-text">Specializations</span></h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '5rem' }}>Enterprise-grade features for institutional and professional verification.</p>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '8rem' }}>
            {[
              { icon: <GenIcon Icon={Search} />, title: "Deepfake Video Scans", desc: "Detection across 100+ deepfake architectures." },
              { icon: <GenIcon Icon={Fingerprint} />, title: "Diffusion Signature", desc: "Identifies Stable Diffusion & Midjourney noise." },
              { icon: <GenIcon Icon={Eye} />, title: "Semantic Drift", desc: "Detects logical inconsistencies in AI generation." },
              { icon: <GenIcon Icon={FileSearch} />, title: "EXIF Scrubbing", desc: "Reveals hidden AI metadata in original files." },
              { icon: <GenIcon Icon={Layers} />, title: "Layer Decomposition", desc: "Separates GAN layers for isolated analysis." },
              { icon: <GenIcon Icon={Server} />, title: "API Relay", desc: "Integrate Vision Forensics via secure REST API." },
              { icon: <GenIcon Icon={ShieldAlert} />, title: "Tamper Detection", desc: "Identify post-process editing in AI images." },
              { icon: <GenIcon Icon={Database} />, title: "Neural Ledger", desc: "Immutable scan history for audit compliance." },
              { icon: <GenIcon Icon={ShieldEllipsis} />, title: "Model Verification", desc: "Specific model identification (DALL-E, etc)." },
              { icon: <GenIcon Icon={Workflow} />, title: "Processing Chains", desc: "Multi-stage verification for critical assets." },
              { icon: <GenIcon Icon={Globe} />, title: "Global CDN", desc: "Ultra-low latency scanning from any location." },
              { icon: <GenIcon Icon={ShieldCheck} />, title: "Whitelabeling", desc: "Custom branding for corporate forensics." }
            ].map((f, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5, background: 'rgba(255,255,255,0.03)' }}
                className="glass"
                style={{ padding: '2rem', textAlign: 'left', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.03)' }}
              >
                <div style={{ marginBottom: '1rem' }}>{f.icon}</div>
                <h4 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', fontWeight: 800 }}>{f.title}</h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const GenIcon = ({ Icon }) => (
  <div style={{ padding: '8px', background: 'rgba(0, 242, 255, 0.05)', borderRadius: '10px', width: 'fit-content' }}>
    <Icon size={20} color="var(--accent-cyan)" />
  </div>
);

export default LandingPage;
