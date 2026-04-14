import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, LogIn, ArrowRight, ShieldCheck, Fingerprint, Eye, EyeOff, ShieldAlert } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState(null);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setVerifying(true);
    setError(null);

    // Simulated high-security verification
    setTimeout(() => {
      if (login(email, password)) {
        navigate('/');
      } else {
        setError("Invalid credentials. System notification sent to admin.");
        setVerifying(false);
      }
    }, 1500);
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', alignItems: 'center', justifyContent: 'center', position: 'relative', padding: '1rem' }}>
      <div className="mesh-gradient" />
      <div className="grid-overlay" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass cyber-border" 
        style={{ width: '100%', maxWidth: '480px', padding: 'clamp(1.5rem, 5vw, 3rem)', position: 'relative', overflow: 'hidden' }}
      >
        {verifying && <div className="scanner-line" />}

        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <motion.div 
            animate={{ rotateY: [0, 360] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            style={{ 
              background: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-purple))',
              padding: '16px',
              borderRadius: '20px',
              display: 'inline-flex',
              marginBottom: '1rem',
              boxShadow: '0 10px 30px rgba(0, 242, 255, 0.3)'
            }}>
            <Fingerprint color="white" size={32} />
          </motion.div>
          <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.2rem)', fontWeight: 900 }}>Neural <span className="gradient-text">Auth</span></h2>
          <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem', fontSize: '0.9rem' }}>Establish secure link to Vision Core</p>
        </div>

        <AnimatePresence>
          {error && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} style={{ marginBottom: '1.5rem' }}>
              <div style={{ background: 'rgba(255,51,102,0.1)', border: '1px solid var(--danger)', padding: '0.8rem', borderRadius: '12px', display: 'flex', gap: '10px', alignItems: 'center', color: 'var(--danger)', fontSize: '0.8rem' }}>
                <ShieldAlert size={16} /> {error}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.75rem', fontWeight: 'bold', color: 'var(--text-secondary)' }}>IDENTITY (EMAIL)</label>
            <div style={{ position: 'relative' }}>
              <Mail style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', opacity: 0.4 }} size={16} />
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ 
                  width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--glass-border)', borderRadius: '10px',
                  padding: '12px 12px 12px 40px', color: 'white', outline: 'none', transition: '0.3s', fontSize: '0.9rem'
                }} 
                placeholder="operator@vision.pro"
              />
            </div>
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.75rem', fontWeight: 'bold', color: 'var(--text-secondary)' }}>ACCESS KEY (PASSWORD)</label>
            <div style={{ position: 'relative' }}>
              <Lock style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', opacity: 0.4 }} size={16} />
              <input 
                type={showPass ? "text" : "password"} 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ 
                  width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--glass-border)', borderRadius: '10px',
                  padding: '12px 40px 12px 40px', color: 'white', outline: 'none', transition: '0.3s', fontSize: '0.9rem'
                }} 
                placeholder="••••••••"
              />
              <button 
                type="button"
                onClick={() => setShowPass(!showPass)}
                style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', opacity: 0.5, border: 'none', background: 'none', padding: 0 }}
              >
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '14px' }} disabled={verifying}>
            {verifying ? 'VERIFYING...' : <><ShieldCheck size={18} /> AUTHORIZE ACCESS</>}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
            New Operative? <Link to="/register" style={{ color: 'var(--accent-cyan)', fontWeight: 'bold', textDecoration: 'none' }}>Initialize Profile</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
