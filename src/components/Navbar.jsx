import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Shield, LogOut, Terminal, Menu, X } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="glass cyber-border" style={{
      position: 'fixed', top: '1rem', left: '50%', transform: 'translateX(-50%)',
      width: '95%', maxWidth: '1400px', padding: '0.8rem 1.5rem',
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      zIndex: 1000, background: 'rgba(2, 2, 3, 0.85)', borderRadius: '16px'
    }}>
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none', color: 'inherit' }}>
        <div style={{
          background: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-purple))',
          padding: '8px', borderRadius: '10px', display: 'flex',
          boxShadow: '0 0 15px rgba(0, 242, 255, 0.3)'
        }}>
          <Shield color="white" size={20} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: '1.2rem', fontWeight: 900, letterSpacing: '1px', lineHeight: '1' }}>
            VISION<span className="gradient-text"> FORENSICS</span>
          </span>
          <span className="mobile-hide" style={{ fontSize: '0.6rem', color: 'var(--accent-cyan)', letterSpacing: '1px', fontWeight: 'bold' }}>
            PROFESSIONAL GRADE DETECTION
          </span>
        </div>
      </Link>

      {/* Desktop Menu */}
      <div className="mobile-hide" style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
        <Link to="/detect" className="glass-hover" style={{ fontWeight: 700, padding: '8px 16px', borderRadius: '8px', transition: '0.3s', textDecoration: 'none', color: 'inherit' }}>Forensics</Link>
        <Link to="/generate" className="glass-hover" style={{ fontWeight: 700, padding: '8px 16px', borderRadius: '8px', transition: '0.3s', textDecoration: 'none', color: 'inherit' }}>Generate</Link>
        
        {user ? (
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginLeft: '0.5rem', borderLeft: '1px solid var(--glass-border)', paddingLeft: '1.5rem' }}>
            {user.isAdmin && (
              <Link to="/admin" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--warning)', fontWeight: 'bold', fontSize: '0.8rem', padding: '6px 12px', background: 'rgba(255,204,0,0.1)', borderRadius: '8px', textDecoration: 'none' }}>
                <Terminal size={14} /> ADMIN
              </Link>
            )}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 800 }}>{user.name.toUpperCase()}</div>
                <div style={{ fontSize: '0.6rem', color: 'var(--success)', letterSpacing: '1px' }}>SECURE</div>
              </div>
              <button 
                onClick={logout}
                style={{ 
                  color: 'var(--danger)', display: 'flex', alignItems: 'center',
                  background: 'rgba(255, 51, 102, 0.1)', padding: '8px', borderRadius: '8px',
                  border: '1px solid rgba(255, 51, 102, 0.2)', cursor: 'pointer'
                }}
                className="glass-hover"
              >
                <LogOut size={16} />
              </button>
            </div>
          </div>
        ) : (
          <div style={{ display: 'flex', gap: '1rem', marginLeft: '1rem' }}>
            <Link to="/login" style={{ fontWeight: 700, padding: '8px 16px', textDecoration: 'none', color: 'inherit' }}>Login</Link>
            <Link to="/register" className="btn-primary" style={{ padding: '8px 20px', fontSize: '0.9rem', textDecoration: 'none' }}>
              Connect
            </Link>
          </div>
        )}
      </div>

      {/* Mobile Toggle */}
      <button 
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        style={{ 
          display: 'none', 
          background: 'none', border: 'none', color: 'white', cursor: 'pointer'
        }}
        className="mobile-show-flex"
      >
        {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="glass" style={{
          position: 'absolute', top: '100%', left: 0, right: 0, marginTop: '1rem',
          padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem',
          background: 'var(--bg-secondary)', border: '1px solid var(--glass-border)',
          borderRadius: '16px', boxShadow: '0 20px 40px rgba(0,0,0,0.5)'
        }}>
          <Link to="/detect" onClick={() => setIsMenuOpen(false)} style={{ textDecoration: 'none', color: 'inherit', fontWeight: 700, fontSize: '1.1rem' }}>Forensics</Link>
          <Link to="/generate" onClick={() => setIsMenuOpen(false)} style={{ textDecoration: 'none', color: 'inherit', fontWeight: 700, fontSize: '1.1rem' }}>Generate</Link>
          <hr style={{ border: 'none', borderTop: '1px solid var(--glass-border)' }} />
          {user ? (
            <>
              {user.isAdmin && <Link to="/admin" onClick={() => setIsMenuOpen(false)} style={{ color: 'var(--warning)', fontWeight: 700 }}>Admin Panel</Link>}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>{user.name}</span>
                <button onClick={logout} style={{ color: 'var(--danger)', background: 'none', border: 'none', fontWeight: 700 }}>Logout</button>
              </div>
            </>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <Link to="/login" onClick={() => setIsMenuOpen(false)} style={{ textDecoration: 'none', color: 'inherit', fontWeight: 700 }}>Login</Link>
              <Link to="/register" onClick={() => setIsMenuOpen(false)} className="btn-primary" style={{ textAlign: 'center', justifyContent: 'center' }}>Connect</Link>
            </div>
          )}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .mobile-hide { display: none !important; }
          .mobile-show-flex { display: flex !important; }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
