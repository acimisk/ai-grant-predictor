import React, { useState } from 'react';

const Platform = () => {
  const [activeTab, setActiveTab] = useState('tarama');
  const [isFocused, setIsFocused] = useState(false);

  const tabs = [
    { id: 'tarama', label: 'Belge Taraması', icon: 'document_scanner' },
    { id: 'istatistik', label: 'Metrik Çıkarımı', icon: 'query_stats' },
    { id: 'puanlama', label: 'AI Puanlaması', icon: 'fact_check' },
    { id: 'rapor', label: 'Nihai Rapor', icon: 'summarize' }
  ];

  return (
    <div className="bg-surface-container-low min-h-screen p-8 pt-28">
      <div className="max-w-7xl mx-auto">
        
        {/* Header and Context */}
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-tertiary-fixed text-on-tertiary-fixed-variant rounded-full text-xs font-bold mb-4">
              <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>policy</span>
              TÜBİTAK 1501 DOĞRULAMASI
            </div>
            <h1 className="text-4xl font-extrabold text-on-background">Proje Değerlendirme Tuvali</h1>
            <p className="text-secondary mt-2 text-lg">Yüklenen hibe önerisini analiz edin ve yapay zeka ile puanlayın.</p>
          </div>
          
          {/* Action Button */}
          <button className="primary-gradient text-white px-6 py-3 rounded-xl font-bold shadow-xl shadow-primary/20 hover:scale-105 transition-transform flex items-center gap-2">
            <span className="material-symbols-outlined">upload_file</span>
            Yeni Belge Yükle
          </button>
        </div>

        {/* The Prompt Bar */}
        <div className={`transition-all duration-300 relative bg-surface-container-lowest rounded-[1.5rem] p-3 flex items-center shadow-sm mb-12 ${
            isFocused ? 'ring-4 ring-primary-fixed border border-primary/20' : 'border border-outline-variant/15'
        }`}>
          <span className="material-symbols-outlined text-tertiary ml-4">magic_button</span>
          <input 
            type="text" 
            placeholder="Analiz etmek istediğiniz bölümü sorun. (Örn: Projenin ticarileşme potansiyeli nedir?)"
            className="w-full bg-transparent border-none outline-none px-6 py-3 text-lg text-on-surface placeholder:text-outline"
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
          <button className="bg-surface-container-highest text-on-surface p-3 rounded-xl hover:bg-surface-variant transition-colors flex items-center justify-center">
            <span className="material-symbols-outlined">send</span>
          </button>
        </div>

        {/* Icon-based Tabs (Full width asymmetrical container) */}
        <div className="flex gap-4 mb-8 overflow-x-auto pb-4 scrollbar-hide">
          {tabs.map((tab) => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 px-6 py-4 rounded-xl font-bold whitespace-nowrap transition-all ${
                activeTab === tab.id 
                  ? 'bg-primary text-white shadow-xl shadow-primary/20'
                  : 'bg-surface-container-lowest text-secondary hover:bg-surface-container-highest'
              }`}
            >
              <span className="material-symbols-outlined" style={{ fontVariationSettings: activeTab === tab.id ? "'FILL' 1" : "'FILL' 0" }}>
                {tab.icon}
              </span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Asymmetrical Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Analysis Document */}
          <div className="lg:col-span-8 bg-surface-container-lowest rounded-[2rem] p-10 shadow-[0_12px_40px_rgba(24,28,30,0.06)]">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <span className="material-symbols-outlined text-primary">view_headline</span>
              Yapay Zeka Analiz Çıktısı
            </h2>
            <div className="prose prose-lg text-secondary max-w-none">
              <p className="mb-6 leading-relaxed">
                Bu projenin ticarileşme potansiyeli genel olarak <strong>yüksek</strong> görünüyor. Önerilen iş modeli, pazardaki mevcut boşlukları doldurabilecek yenilikçi bir teknolojiye dayanmaktadır. Ancak, risk yönetimi bölümünde belirtilen üretim tedarik zinciri planları yetersizdir.
              </p>
              
              <div className="bg-tertiary-fixed/20 p-6 rounded-2xl mb-6 flex items-start gap-4">
                <span className="material-symbols-outlined text-tertiary mt-1" style={{ fontVariationSettings: "'FILL' 1" }}>insights</span>
                <div>
                  <h4 className="font-bold text-on-tertiary-fixed-variant mb-1">RAG İçgörüsü</h4>
                  <p className="text-sm text-on-tertiary-fixed-variant">
                    Tasarım metodolojilerindeki teknik kısıtlamalar, geçmişte benzer donanım projelerinde (TÜBİTAK 1507, 2021) ortalama %24 oranında bütçe aşımına neden olmuştur.
                  </p>
                </div>
              </div>

              <p className="leading-relaxed">
                Bu veriler doğrultusunda, proje yürütücülerinden <strong>Tedarik Zinciri Yedekleme Planı</strong> talep edilmesi yapay zeka tarafından kuvvetle önerilmektedir.
              </p>
            </div>
          </div>

          {/* Contextual & RAG Cards Sidebar */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            
            {/* Contextual Score Card */}
            <div className="bg-surface-container-highest rounded-2xl p-8 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-on-surface flex items-center gap-2">
                  <span className="material-symbols-outlined">radar</span>
                  Benzerlik Endeksi
                </h3>
                <span className="text-3xl font-black text-tertiary">%14</span>
              </div>
              <div className="h-3 bg-surface-container rounded-full overflow-hidden mb-4">
                <div className="h-full bg-tertiary w-[14%]"></div>
              </div>
              <p className="text-sm text-secondary">
                14.2 Milyon doküman üzerinde yapılan taramada riskli bir intihal tespit edilmemiştir.
              </p>
            </div>

            {/* AI-Verified Snippets (LLM Insight Chips) */}
            <div className="bg-surface-container-highest rounded-2xl p-8 shadow-sm">
              <h3 className="font-bold text-on-surface flex items-center gap-2 mb-6">
                <span className="material-symbols-outlined">library_books</span>
                Referans Kaynaklar
              </h3>
              
              <div className="flex flex-col gap-4">
                <div className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/15 hover:shadow-md transition-shadow cursor-pointer">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-tertiary-fixed text-on-tertiary-fixed rounded-md text-[10px] font-bold uppercase tracking-wider">
                      Yapay Zeka Onaylı
                    </span>
                  </div>
                  <p className="text-sm font-medium text-on-surface">KOSGEB İleri Girişimci Destek Programı 2024 Uygulama Esasları, Madde 14.2</p>
                </div>

                <div className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/15 hover:shadow-md transition-shadow cursor-pointer">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-primary-fixed text-on-primary-fixed-variant rounded-md text-[10px] font-bold uppercase tracking-wider">
                      Sektör Raporu
                    </span>
                  </div>
                  <p className="text-sm font-medium text-on-surface">Global Pazar Dinamikleri - Donanım İnovasyonu 2023</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Platform;
