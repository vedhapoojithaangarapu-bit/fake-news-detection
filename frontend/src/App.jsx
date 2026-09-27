import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useState, useEffect, createContext, useContext } from 'react';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Landing from './pages/Landing.jsx';
import SignIn from './pages/SignIn.jsx';
import SignUp from './pages/SignUp.jsx';
import Dashboard from './pages/Dashboard.jsx';
import DetectNews from './pages/DetectNews.jsx';
import Result from './pages/Result.jsx';
import About from './pages/About.jsx';

// Simple auth + analysis state (dummy frontend only, no backend)
const AppContext = createContext(null);
export function useApp() {
  return useContext(AppContext);
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function ProtectedRoute({ children }) {
  const { isLoggedIn } = useApp();
  if (!isLoggedIn) return <Navigate to="/signin" replace />;
  return children;
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    try {
      return localStorage.getItem('fd_logged_in') === '1';
    } catch {
      return false;
    }
  });
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('fd_user') || 'null');
    } catch {
      return null;
    }
  });
  const [analysis, setAnalysis] = useState(() => {
    try {
      return JSON.parse(sessionStorage.getItem('fd_analysis') || 'null');
    } catch {
      return null;
    }
  });

  const login = (userData) => {
    setIsLoggedIn(true);
    if (userData) setUser(userData);
    try {
      localStorage.setItem('fd_logged_in', '1');
      if (userData) localStorage.setItem('fd_user', JSON.stringify(userData));
    } catch {
      /* ignore */
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    try {
      localStorage.removeItem('fd_logged_in');
      localStorage.removeItem('fd_user');
    } catch {
      /* ignore */
    }
  };

  const saveAnalysis = (data) => {
    setAnalysis(data);
    try {
      sessionStorage.setItem('fd_analysis', JSON.stringify(data));
    } catch {
      /* ignore */
    }
  };

  return (
    <AppContext.Provider value={{ isLoggedIn, user, login, logout, analysis, saveAnalysis }}>
      <BrowserRouter>
        <ScrollToTop />
        <div className="app-shell">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/about" element={<About />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/detect"
                element={
                  <ProtectedRoute>
                    <DetectNews />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/result"
                element={
                  <ProtectedRoute>
                    <Result />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </AppContext.Provider>
  );
}
