import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Landing from './components/Landing';
import Platform from './components/Platform';
import Auth from './components/Auth';
import Kosgeb from './components/Kosgeb';
import Tubitak from './components/Tubitak';
import Methodology from './components/Methodology';

const TopNavBar = () => {
  const location = useLocation();
  const isPlatform = location.pathname === '/platform';
  const isAuth = ['/login', '/register', '/auth'].includes(location.pathname);
  
  if (isAuth) return null;
  
  return (
    <nav className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl docked full-width top-0 sticky z-50 shadow-sm dark:shadow-none">
      <div className="flex justify-between items-center px-8 py-4 max-w-full mx-auto">
        <Link to="/" className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">Cognitive Canvas</Link>
        <div className="hidden md:flex items-center space-x-8">
          <Link className={`font-semibold transition-all ${isPlatform ? 'text-blue-700 dark:text-blue-400 border-b-2 border-blue-700' : 'text-slate-600 dark:text-slate-400 hover:text-blue-600'}`} to="/platform">Platform</Link>
          <Link className="text-slate-600 dark:text-slate-400 hover:text-blue-600 transition-all" to="/kosgeb">KOSGEB Analizleri</Link>
          <Link className="text-slate-600 dark:text-slate-400 hover:text-blue-600 transition-all" to="/tubitak">TÜBİTAK Metrikleri</Link>
          <Link className="text-slate-600 dark:text-slate-400 hover:text-blue-600 transition-all" to="/methodology">Metodoloji</Link>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/login">
            <button className="text-slate-600 dark:text-slate-400 hover:bg-slate-100/50 px-4 py-2 rounded-xl transition-all scale-95 duration-200 ease-in-out cursor-pointer">Giriş Yap</button>
          </Link>
          <Link to="/register">
            <button className="primary-gradient text-white px-6 py-2.5 rounded-xl font-semibold scale-95 duration-200 ease-in-out cursor-pointer">Hesap Oluştur</button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

const Footer = () => {
  const location = useLocation();
  const isAuth = ['/login', '/register', '/auth'].includes(location.pathname);
  
  // Hide footer on Platform and Auth pages
  if (location.pathname === '/platform' || isAuth) return null;

  return (
    <footer className="bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 w-full py-12">
      <div className="flex flex-col md:flex-row justify-between items-center px-12 gap-6 max-w-7xl mx-auto">
        <div className="flex flex-col items-center md:items-start">
          <div className="text-md font-bold text-slate-800 dark:text-slate-200 mb-2">Cognitive Canvas</div>
          <p className="text-slate-500 text-sm font-medium">© 2024 Cognitive Canvas. Yapay Zeka Destekli Akademik Titizlik.</p>
        </div>
        <div className="flex flex-wrap justify-center gap-8">
          <a className="text-slate-500 text-sm font-medium hover:underline decoration-blue-500 transition-opacity opacity-80 hover:opacity-100" href="#">Gizlilik Politikası</a>
          <a className="text-slate-500 text-sm font-medium hover:underline decoration-blue-500 transition-opacity opacity-80 hover:opacity-100" href="#">Kullanım Şartları</a>
          <Link className="text-slate-500 text-sm font-medium hover:underline decoration-blue-500 transition-opacity opacity-80 hover:opacity-100" to="/methodology">RAG Dokümantasyonu</Link>
          <a className="text-slate-500 text-sm font-medium hover:underline decoration-blue-500 transition-opacity opacity-80 hover:opacity-100" href="#">Destek Ekibi İletişim</a>
        </div>
        <div className="flex gap-4">
          <span className="material-symbols-outlined text-slate-400 cursor-pointer hover:text-primary transition-colors">hub</span>
          <span className="material-symbols-outlined text-slate-400 cursor-pointer hover:text-primary transition-colors">terminal</span>
        </div>
      </div>
    </footer>
  );
};

function App() {
  return (
    <Router>
      <div className="bg-surface text-on-surface">
        <TopNavBar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/platform" element={<Platform />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/register" element={<Auth />} />
          <Route path="/kosgeb" element={<Kosgeb />} />
          <Route path="/tubitak" element={<Tubitak />} />
          <Route path="/methodology" element={<Methodology />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
