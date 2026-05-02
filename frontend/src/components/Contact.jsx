import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // API entegrasyonu buraya gelecek
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 5000);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="bg-surface min-h-screen p-8 pt-28 border-l-[16px] border-primary">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Contact Info Sidebar */}
        <div className="lg:col-span-5 flex flex-col gap-8">
          <div>
            <Link to="/" className="inline-flex items-center gap-2 mb-8 text-secondary hover:text-primary transition-colors cursor-pointer">
              <span className="material-symbols-outlined">arrow_back</span>
              Ana Sayfaya Dön
            </Link>
            <h1 className="text-4xl md:text-5xl font-extrabold text-on-surface mb-4">Bizimle İletişime Geçin</h1>
            <p className="text-secondary text-lg leading-relaxed">
              GrantInsight AI platformu ile ilgili teknik sorunlar, kurumsal üyelik talepleri veya metodoloji hakkında bilgi almak için destek ekibimize 7/24 ulaşabilirsiniz.
            </p>
          </div>

          <div className="bg-primary-fixed/20 p-8 rounded-[2rem] border border-primary/10 flex-1">
            <h3 className="text-xl font-bold text-on-surface mb-6">İletişim Kanalları</h3>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-surface-container p-3 rounded-xl shrink-0">
                  <span className="material-symbols-outlined text-primary">mail</span>
                </div>
                <div>
                  <div className="text-sm font-bold text-secondary mb-1">E-Posta (7/24 Destek)</div>
                  <a href="mailto:support@grantinsight.ai" className="text-on-surface font-semibold hover:text-primary transition-colors">support@grantinsight.ai</a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-surface-container p-3 rounded-xl shrink-0">
                  <span className="material-symbols-outlined text-primary">business</span>
                </div>
                <div>
                  <div className="text-sm font-bold text-secondary mb-1">Kurumsal Ofis (Ar-Ge Merkezi)</div>
                  <p className="text-on-surface font-semibold">Teknopark İstanbul, Kuluçka Merkezi<br />Pendik, İstanbul</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-surface-container p-3 rounded-xl shrink-0">
                  <span className="material-symbols-outlined text-primary">forum</span>
                </div>
                <div>
                  <div className="text-sm font-bold text-secondary mb-1">Canlı Danışmanlık</div>
                  <p className="text-on-surface font-semibold text-sm">Proje analizleri (RAG) hakkında detaylı toplantı talepleri için sağdaki formu kullanın.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7 bg-surface-container-lowest p-10 rounded-[2.5rem] shadow-[0_12px_40px_rgba(24,28,30,0.06)] border border-outline-variant/15">
          <h2 className="text-2xl font-bold text-on-surface mb-8 flex items-center gap-3">
            <span className="material-symbols-outlined text-primary">send</span>
            Destek Talebi Oluşturun
          </h2>

          {isSubmitted && (
            <div className="mb-8 bg-tertiary-fixed/30 text-on-tertiary-fixed-variant p-4 rounded-xl flex items-center gap-3 border border-tertiary/20">
              <span className="material-symbols-outlined text-tertiary">check_circle</span>
              <p className="font-semibold">Talebiniz başarıyla alındı. Uzmanlarımız en kısa sürede dönüş yapacaktır.</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-on-surface mb-2">Ad Soyad</label>
                <div className="relative bg-surface-container rounded-xl flex items-center border border-outline-variant/15 focus-within:ring-2 focus-within:ring-primary focus-within:border-primary/20 transition-all">
                  <span className="material-symbols-outlined text-secondary ml-4">person</span>
                  <input 
                    type="text" 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Adınız Soyadınız"
                    className="w-full bg-transparent border-none outline-none px-4 py-3 text-on-surface placeholder:text-outline"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-bold text-on-surface mb-2">E-Posta Adresi</label>
                <div className="relative bg-surface-container rounded-xl flex items-center border border-outline-variant/15 focus-within:ring-2 focus-within:ring-primary focus-within:border-primary/20 transition-all">
                  <span className="material-symbols-outlined text-secondary ml-4">mail</span>
                  <input 
                    type="email" 
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="ornek@universite.edu.tr"
                    className="w-full bg-transparent border-none outline-none px-4 py-3 text-on-surface placeholder:text-outline"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-on-surface mb-2">Konu</label>
              <div className="relative bg-surface-container rounded-xl flex items-center border border-outline-variant/15 focus-within:ring-2 focus-within:ring-primary focus-within:border-primary/20 transition-all">
                <span className="material-symbols-outlined text-secondary ml-4">category</span>
                <select 
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  className="w-full bg-transparent border-none outline-none px-4 py-3 text-on-surface appearance-none"
                >
                  <option value="" disabled>Lütfen bir konu seçin</option>
                  <option value="teknik_destek">Teknik Destek (Sistem Hatası vb.)</option>
                  <option value="kurumsal_uyelik">Kurumsal / Üniversite Üyeliği</option>
                  <option value="metodoloji">AI Analizi ve Metodoloji Hakkında</option>
                  <option value="diger">Diğer</option>
                </select>
                <span className="material-symbols-outlined text-secondary absolute right-4 pointer-events-none">expand_more</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-on-surface mb-2">Mesajınız</label>
              <div className="relative bg-surface-container rounded-xl flex items-start border border-outline-variant/15 focus-within:ring-2 focus-within:ring-primary focus-within:border-primary/20 transition-all pt-3">
                <span className="material-symbols-outlined text-secondary ml-4 mt-0.5">chat</span>
                <textarea 
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  placeholder="Size nasıl yardımcı olabiliriz?"
                  rows="5"
                  className="w-full bg-transparent border-none outline-none px-4 py-1 text-on-surface placeholder:text-outline resize-none"
                ></textarea>
              </div>
            </div>

            <button type="submit" className="w-full primary-gradient text-white px-6 py-4 rounded-xl text-lg font-bold shadow-xl shadow-primary/20 hover:scale-[1.02] transition-transform cursor-pointer flex items-center justify-center gap-2">
              <span className="material-symbols-outlined">send</span>
              Talebi Gönder
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default Contact;
