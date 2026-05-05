import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Auth = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const defaultTab = location.pathname.includes('register') ? 'register' : 'login';
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [focusedInput, setFocusedInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Giriş / Kayıt simülasyonu sonrasında platforma yönlendirme
    navigate('/platform');
  };

  return (
    <div className="flex min-h-screen bg-surface-container-low">
      
      {/* Left Form Column */}
      <div className="flex-1 flex flex-col justify-center px-8 sm:px-16 lg:px-24">
        <div className="max-w-md w-full mx-auto">
          
          <Link to="/" className="inline-flex items-center gap-2 mb-12 text-secondary hover:text-primary transition-colors">
            <span className="material-symbols-outlined">arrow_back</span>
            Ana Sayfaya Dön
          </Link>

          <h1 className="text-4xl font-extrabold text-on-background mb-2">GrantInsight AI</h1>
          <p className="text-lg text-secondary mb-8">
            Akademik değerlendirme platformuna hoş geldiniz.
          </p>

          {/* Tab Switcher & Headers */}
          {activeTab !== 'forgot' ? (
            <div className="flex gap-2 mb-8 bg-surface-container-high p-1 rounded-2xl w-max">
              <button 
                type="button"
                onClick={() => setActiveTab('login')}
                className={`px-6 py-2.5 rounded-xl font-bold transition-all cursor-pointer ${
                  activeTab === 'login' 
                    ? 'bg-surface-container-lowest shadow-sm text-primary' 
                    : 'text-secondary hover:text-on-surface'
                }`}
              >
                Giriş Yap
              </button>
              <button 
                type="button"
                onClick={() => setActiveTab('register')}
                className={`px-6 py-2.5 rounded-xl font-bold transition-all cursor-pointer ${
                  activeTab === 'register' 
                    ? 'bg-surface-container-lowest shadow-sm text-primary' 
                    : 'text-secondary hover:text-on-surface'
                }`}
              >
                Hesap Oluştur
              </button>
            </div>
          ) : (
            <div className="mb-8">
              <h2 className="text-2xl font-extrabold text-on-surface mb-2">Parolanızı mı unuttunuz?</h2>
              <p className="text-secondary text-base">Endişelenmeyin. Kayıtlı e-posta adresinizi girin, size bir sıfırlama bağlantısı gönderelim.</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="bg-surface-container-lowest p-8 rounded-[2rem] shadow-[0_12px_40px_rgba(24,28,30,0.06)]">
            {activeTab === 'register' && (
              <div className="mb-6">
                <label className="block text-sm font-bold text-on-surface mb-2">Ad Soyad</label>
                <div className={`transition-all duration-300 relative bg-surface-container rounded-xl flex items-center ${
                  focusedInput === 'name' ? 'ring-2 ring-primary border-primary/20' : 'border border-outline-variant/15'
                }`}>
                  <span className="material-symbols-outlined text-secondary ml-4">person</span>
                  <input 
                    type="text" 
                    placeholder="Adınız Soyadınız"
                    className="w-full bg-transparent border-none outline-none px-4 py-3 text-on-surface placeholder:text-outline"
                    onFocus={() => setFocusedInput('name')}
                    onBlur={() => setFocusedInput('')}
                  />
                </div>
              </div>
            )}

            <div className="mb-6">
              <label className="block text-sm font-bold text-on-surface mb-2">E-Posta Adresi</label>
              <div className={`transition-all duration-300 relative bg-surface-container rounded-xl flex items-center ${
                focusedInput === 'email' ? 'ring-2 ring-primary border-primary/20' : 'border border-outline-variant/15'
              }`}>
                <span className="material-symbols-outlined text-secondary ml-4">mail</span>
                <input 
                  type="email" 
                  placeholder="ornek@universite.edu.tr"
                  className="w-full bg-transparent border-none outline-none px-4 py-3 text-on-surface placeholder:text-outline"
                  onFocus={() => setFocusedInput('email')}
                  onBlur={() => setFocusedInput('')}
                />
              </div>
            </div>

            {activeTab !== 'forgot' && (
              <div className="mb-8">
                <label className="block text-sm font-bold text-on-surface mb-2">Parola</label>
                <div className={`transition-all duration-300 relative bg-surface-container rounded-xl flex items-center pr-4 ${
                  focusedInput === 'password' ? 'ring-2 ring-primary border-primary/20' : 'border border-outline-variant/15'
                }`}>
                  <span className="material-symbols-outlined text-secondary ml-4">lock</span>
                  <input 
                    type={showPassword ? "text" : "password"} 
                    placeholder="••••••••"
                    className="w-full bg-transparent border-none outline-none px-4 py-3 text-on-surface placeholder:text-outline"
                    onFocus={() => setFocusedInput('password')}
                    onBlur={() => setFocusedInput('')}
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-secondary hover:text-primary transition-colors flex items-center justify-center cursor-pointer"
                  >
                    <span className="material-symbols-outlined">
                      {showPassword ? "visibility_off" : "visibility"}
                    </span>
                  </button>
                </div>
                {activeTab === 'login' && (
                  <div className="text-right mt-2">
                    <button type="button" onClick={() => setActiveTab('forgot')} className="text-sm font-semibold text-primary hover:text-primary-container transition-colors cursor-pointer">
                      Parolamı unuttum
                    </button>
                  </div>
                )}
              </div>
            )}

            <button type="submit" className="w-full primary-gradient text-white px-6 py-4 rounded-xl text-lg font-bold shadow-xl shadow-primary/20 hover:scale-[1.02] transition-transform cursor-pointer mb-4">
              {activeTab === 'login' ? 'Sisteme Giriş Yap' : activeTab === 'register' ? 'Kayıt İşlemini Tamamla' : 'Sıfırlama Bağlantısı Gönder'}
            </button>

            {activeTab === 'forgot' && (
              <div className="text-center mt-2">
                <button type="button" onClick={() => setActiveTab('login')} className="text-sm font-bold text-secondary hover:text-primary transition-colors cursor-pointer inline-flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">arrow_back</span>
                  Giriş ekranına dön
                </button>
              </div>
            )}
          </form>

        </div>
      </div>

      {/* Right Decorative Column */}
      <div className="hidden lg:flex flex-1 relative bg-primary-fixed-dim/20 overflow-hidden items-center justify-center p-12">
        {/* Glow Effects */}
        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-tertiary-fixed/30 to-primary-fixed/20 z-0"></div>
        <div className="absolute top-1/4 -right-24 w-96 h-96 bg-tertiary-fixed/40 rounded-full blur-[100px] mix-blend-multiply flex-none"></div>
        <div className="absolute bottom-1/4 -left-24 w-96 h-96 bg-primary-fixed/40 rounded-full blur-[100px] mix-blend-multiply flex-none"></div>
        
        {/* Glassmorphism Abstract UI Demo */}
        <div className="relative z-10 max-w-lg w-full">
          <div className="bg-white/40 dark:bg-slate-900/40 backdrop-blur-3xl rounded-[2.5rem] p-10 shadow-[0_24px_80px_rgba(24,28,30,0.1)] border border-white/20">
            <h2 className="text-3xl font-extrabold text-on-surface mb-6">Analizleri Kurumsallaştırın</h2>
            <p className="text-lg text-secondary mb-10 leading-relaxed">
              TÜBİTAK ve KOSGEB değerlendirmelerinde saatler süren belge incelemelerini saniyeler içerisinde tamamlayın.
            </p>
            
            <div className="space-y-4">
              <div className="bg-white/60 p-4 rounded-2xl flex items-center gap-4">
                <div className="bg-tertiary-fixed p-3 rounded-xl">
                  <span className="material-symbols-outlined text-on-tertiary-fixed">smart_toy</span>
                </div>
                <div>
                  <h4 className="font-bold text-on-surface">LLM Özellikli RAG</h4>
                  <p className="text-sm text-secondary">Bağlam duyarlı atıf yönetimi</p>
                </div>
              </div>
              <div className="bg-white/60 p-4 rounded-2xl flex items-center gap-4">
                <div className="bg-primary p-3 rounded-xl">
                  <span className="material-symbols-outlined text-on-primary">speed</span>
                </div>
                <div>
                  <h4 className="font-bold text-on-surface">Zaman Tasarrufu</h4>
                  <p className="text-sm text-secondary">%60 oranında hızlandırılmış süreçler</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    
    </div>
  );
};

export default Auth;
