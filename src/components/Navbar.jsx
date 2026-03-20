import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Shield, LogOut, Terminal, Fingerprint } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="glass cyber-border" style={{
      position: 'fixed', top: '1.5rem', left: '50%', transform: 'translateX(-50%)',
      width: '95%', maxWidth: '1400px', padding: '0.8rem 2.5rem',
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      zIndex: 1000, background: 'rgba(2, 2, 3, 0.7)', borderRadius: '16px'
    }}>
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        <div style={{
          background: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-purple))',
          padding: '10px', borderRadius: '12px', display: 'flex',
          boxShadow: '0 0 15px rgba(0, 242, 255, 0.3)'
        }}>
          <Shield color="white" size={24} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: '1.4rem', fontWeight: 900, letterSpacing: '2px', lineHeight: '1' }}>
            VISION<span className="gradient-text"> FORENSICS</span>
          </span>
          <span style={{ fontSize: '0.65rem', color: 'var(--accent-cyan)', letterSpacing: '1px', fontWeight: 'bold' }}>
            PROFESSIONAL GRADE DETECTION
          </span>
        </div>
      </Link>

      <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
        <Link to="/detect" className="glass-hover" style={{ fontWeight: 700, padding: '8px 16px', borderRadius: '8px', transition: '0.3s' }}>Forensics</Link>
        
        {user ? (
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', marginLeft: '1rem', borderLeft: '1px solid var(--glass-border)', paddingLeft: '2rem' }}>
            {user.isAdmin && (
              <Link to="/admin" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--warning)', fontWeight: 'bold', fontSize: '0.9rem', padding: '8px 16px', background: 'rgba(255,204,0,0.1)', borderRadius: '8px' }}>
                <Terminal size={16} /> ADMIN SYS
              </Link>
            )}
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.9rem', fontWeight: 800 }}>{user.name.toUpperCase()}</div>
                <div style={{ fontSize: '0.65rem', color: 'var(--success)', letterSpacing: '1px' }}>LINK SECURE</div>
              </div>
              <button 
                onClick={logout}
                style={{ 
                  color: 'var(--danger)', display: 'flex', alignItems: 'center',
                  background: 'rgba(255, 51, 102, 0.1)', padding: '10px', borderRadius: '10px',
                  border: '1px solid rgba(255, 51, 102, 0.2)', transition: '0.3s'
                }}
                className="glass-hover"
                title="Sever Connection"
              >
                <LogOut size={18} />
              </button>
            </div>
          </div>
        ) : (
          <div style={{ display: 'flex', gap: '1rem', marginLeft: '1rem' }}>
            <Link to="/login" style={{ fontWeight: 700, padding: '10px 20px' }}>Login</Link>
            <Link to="/register" className="btn-primary" style={{ padding: '10px 24px' }}>
              <Shield size={18} /> Connect
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
