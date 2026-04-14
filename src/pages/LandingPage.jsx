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
    <div style={{ paddingTop: 'clamp(100px, 15vh, 160px)', minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
      <div className="mesh-gradient" />
      <div className="grid-overlay" />

      <div className="container" style={{ paddingBottom: '5rem' }}>
        <div className="responsive-grid grid-2 mobile-stack" style={{ alignItems: 'center', gap: '2rem' }}>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="mobile-text-center"
          >
            <div style={{ 
              display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '10px 20px', 
              background: 'rgba(0, 242, 255, 0.05)', borderRadius: '100px', fontSize: '0.8rem', 
              color: 'var(--accent-cyan)', marginBottom: '2rem', border: '1px solid rgba(0, 242, 255, 0.2)',
              fontWeight: 'bold', letterSpacing: '1px'
            }}>
              <Shield size={14} fill="var(--accent-cyan)" />
              <span>VISION FORENSICS v3.0: ENTERPRISE EDITION</span>
            </div>

            <h1 style={{ 
              fontSize: 'clamp(2.5rem, 8vw, 5.5rem)', 
              fontWeight: 950, lineHeight: '1.1', marginBottom: '2rem', letterSpacing: '-2px' 
            }}>
              Verify Digital <br />
              <span className="gradient-text">Authenticity</span>
            </h1>

            <p style={{ 
              fontSize: 'clamp(1rem, 2vw, 1.25rem)', color: 'var(--text-secondary)', maxWidth: '650px', 
              marginBottom: '3rem', lineHeight: '1.6', fontWeight: 400, opacity: 0.9,
              margin: '0 auto 3.5rem'
            }}>
              The world&apos;s most sophisticated AI detection and forensic suite. 
              Analyze images, video, and audio using industry-leading neural 
              fingerprinting and Sightengine™ hardware acceleration.
            </p>

            <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'inherit' }} className="mobile-stack">
              <Link to="/detect" className="btn-primary" style={{ padding: '18px 36px', fontSize: '1.1rem', boxShadow: '0 0 40px rgba(0, 242, 255, 0.2)', justifyContent: 'center' }}>
                Initialize Deep Analysis <ArrowRight size={22} />
              </Link>
            </div>

            <div style={{ 
              display: 'flex', gap: 'clamp(1.5rem, 5vw, 4rem)', marginTop: '4rem',
              justifyContent: 'inherit'
            }} className="mobile-stack">
              {[
                { label: 'MODELS SCANNED', val: '250+' },
                { label: 'ANALYSIS TIME', val: '< 0.8s' },
                { label: 'PRECISION RATE', val: '99.98%' }
              ].map((stat, i) => (
                <div key={i}>
                  <div style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)', fontWeight: 900, color: 'white' }}>{stat.val}</div>
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
              width: '100%', height: 'clamp(350px, 50vh, 550px)', borderRadius: '32px', overflow: 'hidden',
              background: 'linear-gradient(135deg, rgba(2, 2, 3, 0.8), rgba(12, 12, 16, 0.9))',
              border: '1px solid rgba(255, 255, 255, 0.05)', position: 'relative'
            }}>
              <div style={{ position: 'absolute', top: '0', left: '0', right: '0', bottom: '0', opacity: 0.4, backgroundImage: 'url("https://www.transparenttextures.com/patterns/carbon-fibre.png")' }} />
              <div className="scanner-line" style={{ animationDuration: '4s' }} />
              
              {/* Radar UI */}
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 'clamp(200px, 30vw, 300px)', height: 'clamp(200px, 30vw, 300px)' }}>
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                    transition={{ duration: 3, repeat: Infinity, delay: i * 1, ease: 'linear' }}
                    style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, border: '1px solid var(--accent-cyan)', borderRadius: '50%' }}
                  />
                ))}
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                  <Cpu size={80} className="gradient-text" style={{ filter: 'drop-shadow(0 0 20px var(--accent-cyan))' }} />
                </div>
              </div>

              {/* Data Overlay */}
              <div className="mobile-hide" style={{ position: 'absolute', bottom: '2rem', left: '2rem', right: '2rem', display: 'flex', justifyContent: 'space-between' }}>
                <div className="glass" style={{ padding: '0.8rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Activity size={14} color="var(--success)" />
                  <span style={{ fontSize: '0.65rem', fontWeight: 'bold' }}>REAL-TIME LINK</span>
                </div>
                <div className="glass" style={{ padding: '0.8rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Lock size={14} color="var(--accent-purple)" />
                  <span style={{ fontSize: '0.65rem', fontWeight: 'bold' }}>SECURED</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Feature Grid */}
        <div style={{ marginTop: 'clamp(6rem, 15vw, 12rem)', textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 900, marginBottom: '1.5rem' }}>Forensic <span className="gradient-text">Specializations</span></h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '4rem', padding: '0 1rem' }}>Enterprise-grade features for institutional and professional verification.</p>
          
          <div className="responsive-grid grid-4" style={{ gap: '1.5rem', marginBottom: '5rem' }}>
            {[
              { icon: <GenIcon Icon={Search} />, title: "Deepfake Video Scans", desc: "Detection across 100+ deepfake architectures." },
              { icon: <GenIcon Icon={Fingerprint} />, title: "Diffusion Signature", desc: "Identifies Stable Diffusion noise." },
              { icon: <GenIcon Icon={Eye} />, title: "Semantic Drift", desc: "Detects logical inconsistencies in AI." },
              { icon: <GenIcon Icon={FileSearch} />, title: "EXIF Scrubbing", desc: "Reveals hidden AI metadata." },
              { icon: <GenIcon Icon={Layers} />, title: "Layer Decomposition", desc: "Separates GAN layers for analysis." },
              { icon: <GenIcon Icon={Server} />, title: "API Relay", desc: "Integrate via secure REST API." },
              { icon: <GenIcon Icon={ShieldAlert} />, title: "Tamper Detection", desc: "Identify post-process editing." },
              { icon: <GenIcon Icon={Database} />, title: "Neural Ledger", desc: "Immutable scan history for audit." },
            ].map((f, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5, background: 'rgba(255,255,255,0.03)' }}
                className="glass"
                style={{ padding: '2rem', textAlign: 'left', borderRadius: '20px' }}
              >
                <div style={{ marginBottom: '1rem' }}>{f.icon}</div>
                <h4 style={{ fontSize: '1rem', marginBottom: '0.5rem', fontWeight: 800 }}>{f.title}</h4>
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
