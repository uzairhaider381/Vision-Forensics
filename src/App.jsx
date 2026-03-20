import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ConfigProvider } from './context/ConfigContext';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import DetectionPage from './pages/DetectionPage';
import GenerationPage from './pages/GenerationPage';
import AdminPanel from './pages/AdminPanel';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user, loading } = useAuth();
  
  if (loading) return null;
  if (!user) return <Navigate to="/login" />;
  if (adminOnly && !user.isAdmin) return <Navigate to="/" />;
  
  return children;
};

function App() {
  return (
    <ConfigProvider>
      <AuthProvider>
        <Router>
          <div className="app-container">
            <Navbar />
            <main>
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                
                <Route 
                  path="/detect" 
                  element={
                    <ProtectedRoute>
                      <DetectionPage />
                    </ProtectedRoute>
                  } 
                />
                
                <Route 
                  path="/generate" 
                  element={
                    <ProtectedRoute>
                      <GenerationPage />
                    </ProtectedRoute>
                  } 
                />
                
                <Route 
                  path="/admin" 
                  element={
                    <ProtectedRoute adminOnly>
                      <AdminPanel />
                    </ProtectedRoute>
                  } 
                />
              </Routes>
            </main>
            
            <footer style={{ 
              textAlign: 'center', 
              padding: '4rem 2rem', 
              color: 'var(--text-secondary)',
              fontSize: '0.9rem',
              borderTop: '1px solid var(--glass-border)',
              marginTop: '4rem'
            }}>
              <p>&copy; 2026 Vision Forensics. All rights reserved.</p>
            </footer>
          </div>
        </Router>
      </AuthProvider>
    </ConfigProvider>
  );
}

export default App;
