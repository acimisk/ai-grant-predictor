import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Landing from './components/Landing';
import Platform from './components/Platform';
import Auth from './components/Auth';
import Kosgeb from './components/Kosgeb';
import Tubitak from './components/Tubitak';
import Methodology from './components/Methodology';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfUse from './components/TermsOfUse';
import Contact from './components/Contact';

const TopNavBar = () => {
  const location = useLocation();
  const isPlatform = location.pathname === '/platform';
  const isAuth = ['/login', '/register', '/auth'].includes(location.pathname);
  
  if (isAuth) return null;
  
  return (
    <nav className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl docked full-width top-0 sticky z-50 shadow-sm dark:shadow-none">
      <div className="flex justify-between items-center px-8 py-4 max-w-full mx-auto">
        <Link to="/" className="flex items-center gap-2 group cursor-pointer">
          <div className="bg-emerald-500/10 p-2 rounded-xl group-hover:bg-emerald-500/20 transition-colors shadow-sm">
            <span className="material-symbols-outlined text-emerald-600 text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>insights</span>
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-black tracking-tighter bg-gradient-to-r from-emerald-600 to-teal-400 bg-clip-text text-transparent drop-shadow-sm">GrantInsight AI</span>
            <span className="text-[9px] font-bold text-slate-500 uppercase tracking-[0.2em] -mt-0.5">Akademik Titizlik</span>
          </div>
        </Link>
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
    <footer className="bg-[#020617] w-full py-12">
      <div className="flex flex-col md:flex-row justify-between items-center px-12 gap-6 max-w-7xl mx-auto">
        <div className="flex flex-col items-center md:items-start">
          <div className="flex items-center gap-2 mb-2">
            <span className="material-symbols-outlined text-emerald-500" style={{ fontVariationSettings: "'FILL' 1" }}>insights</span>
            <span className="text-xl font-black text-white tracking-tighter">GrantInsight AI</span>
          </div>
          <p className="text-slate-400 text-sm font-medium">© {new Date().getFullYear()} GrantInsight AI. Yapay Zeka Destekli Akademik Titizlik.</p>
        </div>
        <div className="flex flex-wrap justify-center gap-8">
          <Link className="text-slate-400 text-sm font-medium hover:text-white transition-colors" to="/privacy">Gizlilik Politikası</Link>
          <Link className="text-slate-400 text-sm font-medium hover:text-white transition-colors" to="/terms">Kullanım Şartları</Link>
          <Link className="text-slate-400 text-sm font-medium hover:text-white transition-colors" to="/methodology">RAG Dokümantasyonu</Link>
          <Link className="text-slate-400 text-sm font-medium hover:text-white transition-colors" to="/contact">Destek Ekibi İletişim</Link>
        </div>
        <div className="flex gap-4">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" title="GitHub Deposu" className="material-symbols-outlined text-slate-400 cursor-pointer hover:text-emerald-500 transition-colors">hub</a>
          <Link to="/methodology" title="Geliştirici API ve Dokümantasyon" className="material-symbols-outlined text-slate-400 cursor-pointer hover:text-emerald-500 transition-colors">terminal</Link>
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
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfUse />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
