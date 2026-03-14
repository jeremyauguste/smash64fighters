import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import Characters from './pages/Characters';
import Stages from './pages/Stages';
import About from './pages/About';
import Items from './pages/Items';
import Profile from './pages/Profile';
import { AuthProvider, useAuth } from './context/AuthContext';
import AuthModal from './components/AuthModal';
import ScrollToTop from './components/ScrollToTop';
import './App.css';

function AnimatedRoutes() {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const isChars = location.pathname === '/characters';
  const isStages = location.pathname === '/stages';
  const isAbout = location.pathname === '/about';
  const isItems = location.pathname === '/items';
  const isProfile = location.pathname.startsWith('/profile');
  const showMenuBg = isHome || isAbout;
  const showCharsBg = isChars || isStages || isProfile;
  const [bgReady, setBgReady] = useState(false);

  useEffect(() => {
    setBgReady(true);
  }, []);

  return (
    <>
      <div className={`home-bg${bgReady && showMenuBg ? ' bg-active' : ''}`} />
      <div className={`chars-bg${bgReady && showCharsBg ? ' bg-active' : ''}`} />
      <div className={`items-bg${bgReady && isItems ? ' bg-active' : ''}`}>
        <div className="items-bg-silhouette" />
      </div>
      <div key={location.pathname} className="page-transition">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/characters" element={<Characters />} />
        <Route path="/stages" element={<Stages />} />
        <Route path="/about" element={<About />} />
        <Route path="/items" element={<Items />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/:userId" element={<Profile />} />
      </Routes>
    </div>
    </>
  );
}

function AuthButton() {
  const { user, signOut } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const avatar = user?.user_metadata?.avatar ?? '/charIcons/smashball.png';

  const bar = user ? (
    <div className="auth-bar">
      <div className="auth-bar-identity">
        <img src={avatar} alt="avatar" className="auth-bar-avatar" style={avatar.endsWith('smashball.png') ? { backgroundColor: '#fff' } : {}} />
        <span className="auth-bar-username">{user.user_metadata?.username ?? user.email}</span>
      </div>
      <button className="auth-bar-btn" onClick={() => navigate('/profile')}>Profile</button>
      <button className="auth-bar-btn" onClick={signOut}>Sign Out</button>
    </div>
  ) : (
    <>
      <div className="auth-bar">
        <button className="auth-bar-btn" onClick={() => setShowModal(true)}>Sign In</button>
      </div>
      {showModal && <AuthModal onClose={() => setShowModal(false)} />}
    </>
  );

  return createPortal(bar, document.body);
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AuthButton />
        <ScrollToTop />
        <AnimatedRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
