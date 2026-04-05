import React from 'react';
import { Link } from 'react-router-dom';

const Tubitak = () => {
  return (
    <div className="bg-surface min-h-screen p-8 pt-28 border-l-[16px] border-primary">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <Link to="/" className="inline-flex items-center gap-2 mb-8 text-secondary hover:text-primary transition-colors">
            <span className="material-symbols-outlined">arrow_back</span>
            Ana Sayfaya Dön
          </Link>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-secondary-fixed text-on-secondary-fixed-variant rounded-full text-xs font-bold mb-4">
            <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>science</span>
            AR-GE & İNOVASYON
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-on-background mb-4">TÜBİTAK Metrikleri</h1>
          <p className="text-xl text-secondary max-w-2xl">
            1501, 1507 ve 1001 projelerinin onay trendleri, inovasyon skorları ve akademik kaynak yoğunluğunu yansıtan canlı istatistik grafikleri.
          </p>
        </div>

        {/* Asymmetrical Masonry-like Layout for Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Main Large Insight */}
          <div className="md:col-span-8 bg-surface-container-highest rounded-[2.5rem] p-10 relative overflow-hidden group">
            <div className="relative z-10">
              <span className="material-symbols-outlined text-5xl text-primary mb-6 block">trending_up</span>
              <h2 className="text-3xl font-bold text-on-surface mb-4">Onay Oranlarında %18 Artış</h2>
              <p className="text-secondary text-lg leading-relaxed max-w-xl">
                RAG destekli ön eleme sürecinden geçen TÜBİTAK projeleri, önceki mali yıla göre ilk hakem komitesinden %18 oranında daha başarılı geçmektedir. 
                Belge bazlı anlamsal doğrulama sayesinde format hataları tamamen ortadan kalkmıştır.
              </p>
              <div className="mt-8 flex gap-4">
                <span className="px-4 py-2 bg-primary-fixed text-on-primary-fixed-variant rounded-lg font-bold">1501 Sanayi Ar-Ge</span>
                <span className="px-4 py-2 bg-secondary-fixed text-on-secondary-fixed-variant rounded-lg font-bold">1507 KOBİ Ar-Ge</span>
              </div>
            </div>
            
            {/* Background Graphic */}
            <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-primary-fixed/40 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-700"></div>
          </div>

          {/* Small Key Metric */}
          <div className="md:col-span-4 bg-primary text-white rounded-[2.5rem] p-10 flex flex-col justify-center relative overflow-hidden">
             <div className="relative z-10">
              <h3 className="text-lg font-bold text-primary-fixed-dim uppercase tracking-widest mb-2">Yapay Zeka Tarafından Red</h3>
              <span className="text-7xl font-black mb-4 block">%4.2</span>
              <p className="text-primary-fixed leading-relaxed">
                Platforma yüklenen belgelerin sadece %4.2'si intihal veya yeterli yenilik sunmama gibi kritik metrikler sebebiyle sistemden onay alamamıştır.
              </p>
             </div>
             <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-white/10 to-transparent"></div>
          </div>

          <div className="md:col-span-12 grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
            {/* Card 1 */}
            <div className="bg-surface-container-lowest p-8 rounded-[2rem] border border-outline-variant/15 flex items-start gap-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="bg-tertiary-fixed p-4 rounded-2xl shrink-0">
                <span className="material-symbols-outlined text-on-tertiary-fixed text-3xl">psychology</span>
              </div>
              <div>
                <h4 className="text-2xl font-bold text-on-surface mb-2">Derin Akademik Atıf Taraması</h4>
                <p className="text-secondary leading-relaxed">
                  İncelenen TÜBİTAK belgelerinin %92'si, RAG mimarisinin veri tabanında bulunan en az 5 güncel akademik makaleye doğrudan veya dolaylı atıf yapmaktadır. Bu oran projelerin yenilikçiliğini kanıtlar.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-surface-container-lowest p-8 rounded-[2rem] border border-outline-variant/15 flex items-start gap-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="bg-error-container p-4 rounded-2xl shrink-0">
                <span className="material-symbols-outlined text-on-error-container text-3xl">schedule_b</span>
              </div>
              <div>
                <h4 className="text-2xl font-bold text-on-surface mb-2">İnceleme Süresi Daralması</h4>
                <p className="text-secondary leading-relaxed">
                  1001 projelerinin akademik kurul inceleme süreci, ön RAG doğrulamasından sonra ortalama 45 günden 18 güne inerek ciddi bir zaman tasarrufu sağlamıştır.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Tubitak;
