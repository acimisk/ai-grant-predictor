import React, { useState } from 'react';

const Platform = () => {
  const [activeTab, setActiveTab] = useState('tarama');
  const [isFocused, setIsFocused] = useState(false);
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  // AI Prompt States
  const [query, setQuery] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isLoadingAI, setIsLoadingAI] = useState(false);

  const handleAskAI = async () => {
    if (!query.trim()) return;
    setIsLoadingAI(true);
    setAiResponse('');
    try {
      const res = await fetch('http://localhost:8000/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query })
      });
      const data = await res.json();
      if (res.ok) setAiResponse(data.response);
      else setAiResponse("Hata oluştu: " + data.detail);
    } catch (error) {
      setAiResponse("Sunucuya bağlanılamadı. Lütfen 'backend' klasöründe 'uvicorn main:app --reload' komutunun çalıştığından emin olun.");
    } finally {
      setIsLoadingAI(false);
    }
  };

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
          <button 
            onClick={() => setIsUploadOpen(!isUploadOpen)}
            className="primary-gradient text-white px-6 py-3 rounded-xl font-bold shadow-xl shadow-primary/20 hover:scale-105 transition-transform flex items-center gap-2 cursor-pointer"
          >
            <span className="material-symbols-outlined">{isUploadOpen ? 'close' : 'upload_file'}</span>
            {isUploadOpen ? 'Kapat' : 'Yeni Belge Yükle'}
          </button>
        </div>

        {/* Upload Area */}
        {isUploadOpen && (
          <div className="bg-surface-container-lowest border-2 border-dashed border-primary/30 rounded-[2rem] p-12 mb-12 flex flex-col items-center justify-center text-center transition-all bg-gradient-to-b from-surface-container-lowest to-surface-container-low/50">
            <span className="material-symbols-outlined text-6xl text-primary mb-4" style={{ fontVariationSettings: "'FILL' 0" }}>cloud_upload</span>
            <h3 className="text-2xl font-bold text-on-surface mb-2">Belgenizi Buraya Sürükleyin</h3>
            <p className="text-secondary mb-6 max-w-md mx-auto">TÜBİTAK 1501 veya KOSGEB formatındaki proje dosyanızı (PDF, DOCX) incelememiz için sürükleyip bırakın veya bilgisayarınızdan seçin.</p>
            <div className="relative group">
              <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
              <button className="bg-primary text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-primary/20 group-hover:bg-primary-container group-hover:-translate-y-1 transition-all pointer-events-none flex items-center gap-2">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>folder_open</span>
                Bilgisayardan Gözat
              </button>
            </div>
          </div>
        )}

        {/* The Prompt Bar */}
        <div className="mb-12">
          <div className={`transition-all duration-300 relative bg-surface-container-lowest rounded-[1.5rem] p-3 flex items-center shadow-sm ${
              isFocused ? 'ring-4 ring-primary-fixed border border-primary/20' : 'border border-outline-variant/15'
          }`}>
            <span className="material-symbols-outlined text-tertiary ml-4">magic_button</span>
            <input 
              type="text" 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAskAI()}
              placeholder="Analiz etmek istediğiniz bölümü sorun. (Örn: Projenin ticarileşme potansiyeli nedir?)"
              className="w-full bg-transparent border-none outline-none px-6 py-3 text-lg text-on-surface placeholder:text-outline"
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />
            <button 
              onClick={handleAskAI}
              disabled={isLoadingAI}
              className={`${isLoadingAI ? 'bg-surface-container text-secondary' : 'bg-surface-container-highest text-on-surface hover:bg-surface-variant'} p-3 rounded-xl transition-colors flex items-center justify-center cursor-pointer`}
            >
              {isLoadingAI ? (
                <span className="material-symbols-outlined animate-spin">refresh</span>
              ) : (
                <span className="material-symbols-outlined">send</span>
              )}
            </button>
          </div>

          {/* AI Response Area */}
          {(isLoadingAI || aiResponse) && (
            <div className="mt-4 bg-tertiary-fixed/10 border border-tertiary/20 rounded-[1.5rem] p-6 animate-in fade-in slide-in-from-top-4 duration-500">
              <div className="flex items-center gap-3 mb-4">
                <span className="material-symbols-outlined text-tertiary" style={{ fontVariationSettings: "'FILL' 1" }}>robot_2</span>
                <span className="font-bold text-on-surface">GrantInsight AI</span>
              </div>
              {isLoadingAI ? (
                <div className="flex items-center gap-2 text-secondary">
                  <span className="material-symbols-outlined animate-spin text-sm">cycle</span>
                  Yapay zeka yanıtlıyor, lütfen bekleyin...
                </div>
              ) : (
                <div className="text-on-surface leading-relaxed whitespace-pre-wrap">
                  {aiResponse}
                </div>
              )}
            </div>
          )}
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
        {activeTab === 'tarama' && (
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
        )}

        {activeTab === 'istatistik' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-12 bg-surface-container-lowest rounded-[2rem] p-10 shadow-[0_12px_40px_rgba(24,28,30,0.06)]">
              <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                <span className="material-symbols-outlined text-primary">query_stats</span>
                Çıkarılan Proje Metrikleri
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-surface-container p-6 rounded-2xl border border-outline-variant/15 hover:-translate-y-1 transition-transform shadow-sm">
                  <div className="text-sm font-bold text-secondary mb-2 uppercase tracking-wider">İnovasyon Skoru</div>
                  <div className="text-4xl font-black text-primary">8.4<span className="text-lg text-secondary font-medium">/10</span></div>
                  <div className="mt-4 text-sm text-secondary">Sektör ortalamasının %15 üzerinde.</div>
                </div>
                
                <div className="bg-surface-container p-6 rounded-2xl border border-outline-variant/15 hover:-translate-y-1 transition-transform shadow-sm">
                  <div className="text-sm font-bold text-secondary mb-2 uppercase tracking-wider">Teknik Yoğunluk</div>
                  <div className="text-4xl font-black text-tertiary">%42</div>
                  <div className="mt-4 text-sm text-secondary">Akademik dil kullanımı güçlü.</div>
                </div>
                
                <div className="bg-surface-container p-6 rounded-2xl border border-outline-variant/15 hover:-translate-y-1 transition-transform shadow-sm">
                  <div className="text-sm font-bold text-secondary mb-2 uppercase tracking-wider">Risk Faktörü</div>
                  <div className="text-4xl font-black text-error">Düşük</div>
                  <div className="mt-4 text-sm text-secondary">Geçmiş projelere kıyasla min. sapma riski.</div>
                </div>
              </div>

              <div className="bg-primary-fixed/20 p-6 rounded-2xl flex items-start gap-4">
                <span className="material-symbols-outlined text-primary mt-1" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
                <div>
                  <h4 className="font-bold text-on-surface mb-1">Yapay Zeka Analiz Özeti</h4>
                  <p className="text-secondary leading-relaxed">
                    İncelenen belgede temel KOSGEB/TÜBİTAK yapısal kelimeleri tespit edilmiştir. Bütçe kalemleri ile projenin hedefleri arasındaki korelasyon uyumu <strong>%91</strong> seviyesindedir. Ticarileşme vizyonu teknik altyapı detaylarıyla güçlü bir şekilde desteklenmektedir.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'puanlama' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-12 bg-surface-container-lowest rounded-[2rem] p-10 shadow-[0_12px_40px_rgba(24,28,30,0.06)]">
              <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                <span className="material-symbols-outlined text-primary">fact_check</span>
                Yapay Zeka Destekli Puanlama
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                {/* Score breakdown */}
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-bold text-on-surface">Yenilikçilik ve Teknoloji</span>
                      <span className="text-primary font-black">18/20</span>
                    </div>
                    <div className="h-3 bg-surface-container rounded-full overflow-hidden">
                      <div className="h-full bg-primary w-[90%]"></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-bold text-on-surface">Yöntem ve Ar-Ge Yaklaşımı</span>
                      <span className="text-primary font-black">15/20</span>
                    </div>
                    <div className="h-3 bg-surface-container rounded-full overflow-hidden">
                      <div className="h-full bg-primary w-[75%]"></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-bold text-on-surface">Proje Yönetimi ve Riskler</span>
                      <span className="text-error font-black">12/20</span>
                    </div>
                    <div className="h-3 bg-surface-container rounded-full overflow-hidden">
                      <div className="h-full bg-error w-[60%]"></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-bold text-on-surface">Ticari Potansiyel (Yaygın Etki)</span>
                      <span className="text-primary font-black">19/20</span>
                    </div>
                    <div className="h-3 bg-surface-container rounded-full overflow-hidden">
                      <div className="h-full bg-primary w-[95%]"></div>
                    </div>
                  </div>
                </div>

                {/* Overall Score */}
                <div className="bg-surface-container-highest rounded-2xl p-8 flex flex-col items-center justify-center text-center shadow-sm border border-outline-variant/15">
                  <div className="text-sm font-bold text-secondary uppercase tracking-wider mb-4">Ağırlıklı Toplam Skor</div>
                  <div className="relative">
                    <svg className="w-40 h-40 transform -rotate-90">
                      <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-surface-container-low" />
                      <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="12" fill="transparent" strokeDasharray="440" strokeDashoffset="88" className="text-primary" />
                    </svg>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl font-black text-on-surface">
                      80<span className="text-xl text-secondary font-medium">/100</span>
                    </div>
                  </div>
                  <p className="mt-6 text-sm text-secondary">Projeniz asgari geçme notu olan 60 puanın üzerindedir.</p>
                </div>
              </div>

              <div className="bg-error-container/20 p-6 rounded-2xl flex items-start gap-4 border border-error/20">
                <span className="material-symbols-outlined text-error mt-1" style={{ fontVariationSettings: "'FILL' 1" }}>warning</span>
                <div>
                  <h4 className="font-bold text-error mb-1">Düşük Puan Uyarısı: Proje Yönetimi</h4>
                  <p className="text-sm text-on-surface leading-relaxed">
                    Proje yönetimi ve riskler kategorisi 12/20 ile eşik değerin sınırındadır. Tedarik zinciri risk planlarının olmaması ve personel maliyetlerindeki belirsizlikler nedeniyle bu bölümden puan kırılmıştır. Revize edilmesi şiddetle tavsiye edilir.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'rapor' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-12 bg-surface-container-lowest rounded-[2rem] p-10 shadow-[0_12px_40px_rgba(24,28,30,0.06)]">
              <div className="flex justify-between items-start mb-8">
                <h2 className="text-3xl font-extrabold flex items-center gap-3 text-on-surface">
                  <span className="material-symbols-outlined text-4xl text-primary">summarize</span>
                  Nihai Değerlendirme Raporu
                </h2>
                <div className="flex flex-col items-end gap-2">
                  <span className="px-4 py-2 bg-primary-fixed text-on-primary-fixed-variant rounded-xl font-bold text-sm uppercase tracking-wider">Durum: Desteklenebilir</span>
                  <span className="text-secondary text-sm font-medium">Oluşturulma: {new Date().toLocaleDateString('tr-TR')}</span>
                </div>
              </div>

              <div className="space-y-8 text-secondary leading-relaxed">
                <section>
                  <h3 className="text-xl font-bold text-on-surface mb-3 border-b border-outline-variant/30 pb-2">Yönetici Özeti</h3>
                  <p>Proje, TÜBİTAK 1501 çağrı hedeflerine yapısal ve teknik anlamda <strong>uygundur</strong>. Önerilen sistem mimarisi, yerli ve milli teknoloji hamlesi vizyonuyla uyumlu olup, pazarda rekabet avantajı sağlayacak yenilikçi niteliklere sahiptir. Projenin genel başarı potansiyeli yüksek bulunmuştur.</p>
                </section>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <section className="bg-surface-container-highest p-6 rounded-2xl">
                    <h3 className="text-xl font-bold text-primary mb-3 flex items-center gap-2">
                      <span className="material-symbols-outlined">star</span>
                      Kritik Başarı Faktörleri
                    </h3>
                    <ul className="list-disc list-inside space-y-2">
                      <li><strong>Ticarileşme Potansiyeli:</strong> Yüksek. Küresel donanım inovasyon pazarına doğrudan hitap etmektedir ve pazar büyüme öngörüleriyle desteklenmektedir.</li>
                      <li><strong>Yenilikçi Yön:</strong> Rakiplerine kıyasla %30 enerji verimliliği sağlayan özgün algoritma altyapısı.</li>
                      <li><strong>Ekip Yetkinliği:</strong> Proje yürütücülerinin akademik geçmişi ile endüstri deneyimi arasındaki güçlü uyum.</li>
                    </ul>
                  </section>

                  <section className="bg-error-container/20 p-6 rounded-2xl border border-error/20">
                    <h3 className="text-xl font-bold text-error mb-3 flex items-center gap-2">
                      <span className="material-symbols-outlined">warning</span>
                      İyileştirme Önerileri
                    </h3>
                    <p className="mb-2 text-sm">Aşağıdaki alanların projenin bir sonraki fazında detaylandırılması tavsiye edilir:</p>
                    <ul className="list-disc list-inside space-y-2 text-sm">
                      <li><strong>Tedarik Zinciri Risk Yönetimi:</strong> Mevcut üretim tedarik zinciri planları yetersizdir. Olası donanım krizlerine karşı alternatif tedarikçi B planları rapora eklenmelidir.</li>
                      <li>Bütçe kalemlerindeki donanım altyapı maliyetlerinin güncel piyasa araştırmasıyla desteklenmesi.</li>
                    </ul>
                  </section>
                </div>

                <section>
                  <h3 className="text-xl font-bold text-on-surface mb-3 border-b border-outline-variant/30 pb-2">Literatür ve Pazar Analizi</h3>
                  <div className="bg-tertiary-fixed/20 p-6 rounded-2xl flex items-start gap-4">
                    <span className="material-symbols-outlined text-tertiary mt-1" style={{ fontVariationSettings: "'FILL' 1" }}>history</span>
                    <div>
                      <h4 className="font-bold text-on-tertiary-fixed-variant mb-1">Geçmiş Veri Kıyaslaması (RAG İçgörüsü)</h4>
                      <p className="text-sm text-on-tertiary-fixed-variant">
                        Sistem veritabanındaki analizlere göre, geçmişte benzer donanım ağırlıklı projelerde (Örn: TÜBİTAK 1507, 2021) karşılaşılan bütçe aşımı ortalaması %24 seviyesindedir. Bu proje için ayrılan yedek ödenek (%10), geçmiş verilere göre revize edilmelidir.
                      </p>
                    </div>
                  </div>
                </section>

                <div className="bg-surface-container p-6 rounded-2xl border border-outline-variant/15 flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div className="flex items-center gap-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <span className="material-symbols-outlined text-primary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-on-surface mb-1">Özgünlük Sertifikası ve Etik Onay</h3>
                      <p className="text-sm text-secondary">Yapay Zeka Destekli 14.2 Milyon Doküman Taraması Sonucu</p>
                    </div>
                  </div>
                  <div className="text-center bg-surface-container-highest p-4 rounded-xl min-w-[120px]">
                    <div className="text-xs font-bold text-secondary uppercase tracking-wider mb-1">Benzerlik</div>
                    <div className="text-3xl font-black text-tertiary">%14</div>
                  </div>
                </div>

                <section className="bg-primary-fixed/20 p-8 rounded-2xl border-l-4 border-primary mt-8">
                  <h3 className="text-xl font-bold text-on-surface mb-2 flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">gavel</span>
                    Sonuç Kararı
                  </h3>
                  <p className="text-lg font-medium text-on-surface">Projenin içerdiği teknolojik yenilik ve tespit edilen yüksek ticarileşme potansiyeli göz önünde bulundurularak, "Tedarik Zinciri Risk Yönetimi" maddesinin revize edilmesi şartıyla <strong>desteklenmesi kuvvetle muhtemeldir</strong>.</p>
                </section>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Platform;
