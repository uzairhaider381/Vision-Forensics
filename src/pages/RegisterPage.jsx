import React from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Lock, Fingerprint, ArrowRight, ShieldCheck, ShieldAlert, Eye, EyeOff } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [registering, setRegistering] = useState(false);
  const [error, setError] = useState(null);
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setRegistering(true);
    setError(null);

    // Simulated secure initialization
    setTimeout(() => {
      if (register(email, password, name)) {
        navigate('/');
      } else {
        setError("Initialization failed. Neural link degraded.");
        setRegistering(false);
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
        {registering && <div className="scanner-line" />}

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
            <ShieldCheck color="white" size={40} />
          </motion.div>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 900 }}>Profile <span className="gradient-text">Init</span></h2>
          <p style={{ color: 'var(--text-secondary)', marginTop: '0.8rem' }}>Generate your sovereign identity matrix</p>
        </div>

        {error && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} style={{ marginBottom: '2rem' }}>
            <div style={{ background: 'rgba(255,51,102,0.1)', border: '1px solid var(--danger)', padding: '1rem', borderRadius: '12px', display: 'flex', gap: '10px', alignItems: 'center', color: 'var(--danger)', fontSize: '0.85rem' }}>
              <ShieldAlert size={18} /> {error}
            </div>
          </motion.div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '10px', fontSize: '0.8rem', fontWeight: 'bold', color: 'var(--text-secondary)' }}>OPERATIVE DESIGNATION</label>
            <div style={{ position: 'relative' }}>
              <User style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', opacity: 0.4 }} size={18} />
              <input 
                type="text" 
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{ width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--glass-border)', borderRadius: '12px', padding: '15px 15px 15px 50px', color: 'white', outline: 'none' }} 
                placeholder="Neo"
              />
            </div>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '10px', fontSize: '0.8rem', fontWeight: 'bold', color: 'var(--text-secondary)' }}>IDENTITY (EMAIL)</label>
            <div style={{ position: 'relative' }}>
              <Mail style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', opacity: 0.4 }} size={18} />
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--glass-border)', borderRadius: '12px', padding: '15px 15px 15px 50px', color: 'white', outline: 'none' }} 
                placeholder="neo@matrix.net"
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
                style={{ width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--glass-border)', borderRadius: '12px', padding: '15px 50px 15px 50px', color: 'white', outline: 'none' }} 
                placeholder="••••••••••••"
              />
              <button 
                type="button"
                onClick={() => setShowPass(!showPass)}
                style={{ position: 'absolute', right: '15px', top: '50%', transform: 'translateY(-50%)', opacity: 0.5, border: 'none', background: 'none' }}
              >
                {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '16px' }} disabled={registering}>
            {registering ? 'GENERATING MATRICES...' : <><Fingerprint size={20} /> INITIALIZE LINK</>}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            Existing Operative? <Link to="/login" style={{ color: 'var(--accent-purple)', fontWeight: 'bold', textDecoration: 'underline' }}>Login to Node</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default RegisterPage;
