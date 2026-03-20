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
    <div style={{ display: 'flex', minHeight: '100vh', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
      <div className="mesh-gradient" />
      <div className="grid-overlay" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass cyber-border" 
        style={{ width: '100%', maxWidth: '500px', padding: '4rem', position: 'relative', overflow: 'hidden' }}
      >
        {verifying && <div className="scanner-line" />}

        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <motion.div 
            animate={{ rotateY: [0, 360] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            style={{ 
              background: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-purple))',
              padding: '20px',
              borderRadius: '24px',
              display: 'inline-flex',
              marginBottom: '1.5rem',
              boxShadow: '0 10px 30px rgba(0, 242, 255, 0.3)'
            }}>
            <Fingerprint color="white" size={40} />
          </motion.div>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 900 }}>Neural <span className="gradient-text">Auth</span></h2>
          <p style={{ color: 'var(--text-secondary)', marginTop: '0.8rem' }}>Establish secure link to Vision Pro Core</p>
        </div>

        <AnimatePresence>
          {error && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} style={{ marginBottom: '2rem' }}>
              <div style={{ background: 'rgba(255,51,102,0.1)', border: '1px solid var(--danger)', padding: '1rem', borderRadius: '12px', display: 'flex', gap: '10px', alignItems: 'center', color: 'var(--danger)', fontSize: '0.85rem' }}>
                <ShieldAlert size={18} /> {error}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '10px', fontSize: '0.8rem', fontWeight: 'bold', color: 'var(--text-secondary)' }}>IDENTITY (EMAIL)</label>
            <div style={{ position: 'relative' }}>
              <Mail style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', opacity: 0.4 }} size={18} />
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ 
                  width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--glass-border)', borderRadius: '12px',
                  padding: '15px 15px 15px 50px', color: 'white', outline: 'none', transition: '0.3s'
                }} 
                placeholder="operator@vision.pro"
              />
            </div>
          </div>

          <div style={{ marginBottom: '2.5rem' }}>
            <label style={{ display: 'block', marginBottom: '10px', fontSize: '0.8rem', fontWeight: 'bold', color: 'var(--text-secondary)' }}>ACCESS KEY (PASSWORD)</label>
            <div style={{ position: 'relative' }}>
              <Lock style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', opacity: 0.4 }} size={18} />
              <input 
                type={showPass ? "text" : "password"} 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ 
                  width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--glass-border)', borderRadius: '12px',
                  padding: '15px 50px 15px 50px', color: 'white', outline: 'none', transition: '0.3s'
                }} 
                placeholder="••••••••••••"
              />
              <button 
                type="button"
                onClick={() => setShowPass(!showPass)}
                style={{ position: 'absolute', right: '15px', top: '50%', transform: 'translateY(-50%)', opacity: 0.5, border: 'none', background: 'none', padding: 0 }}
              >
                {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '16px' }} disabled={verifying}>
            {verifying ? 'ENCRYPTING & VERIFYING...' : <><ShieldCheck size={20} /> AUTHORIZE ACCESS</>}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            New Operative? <Link to="/register" style={{ color: 'var(--accent-cyan)', fontWeight: 'bold', textDecoration: 'underline' }}>Initialize Profile</Link>
          </p>
        </div>

        <div style={{ marginTop: '2.5rem', padding: '1.2rem', background: 'rgba(0,242,255,0.03)', borderRadius: '12px', border: '1px solid rgba(0,242,255,0.1)', fontSize: '0.75rem' }}>
          <p style={{ color: 'var(--accent-cyan)', textAlign: 'center' }}>
            <strong>SECURED CONNECTION ENABLED</strong><br />
            IP Logged: 127.0.0.1 | Auth Method: Neural-Sync
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
