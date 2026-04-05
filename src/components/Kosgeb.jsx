import React from 'react';
import { Link } from 'react-router-dom';

const Kosgeb = () => {
  const projects = [
    { id: 'KOS-2024-001', name: 'Geri Dönüşüm Otomasyonu', category: 'İleri Girişimci', score: 85, status: 'Onaylandı' },
    { id: 'KOS-2024-002', name: 'Bulut Tabanlı ERP', category: 'KOBİGEL', score: 92, status: 'Yüksek Öncelik' },
    { id: 'KOS-2024-003', name: 'Dijital İkiz Üretim Ağı', category: 'İnovasyon', score: 76, status: 'Revizyon Bekliyor' },
    { id: 'KOS-2024-004', name: 'Akıllı Tarım Sensörleri', category: 'İleri Girişimci', score: 88, status: 'Onaylandı' },
  ];

  return (
    <div className="bg-surface-container-low min-h-screen p-8 pt-28">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <Link to="/" className="inline-flex items-center gap-2 mb-8 text-secondary hover:text-primary transition-colors">
            <span className="material-symbols-outlined">arrow_back</span>
            Ana Sayfaya Dön
          </Link>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary-fixed text-on-primary-fixed-variant rounded-full text-xs font-bold mb-4">
            <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>monitoring</span>
            İSTATİSTİK MODÜLÜ
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-on-background mb-4">KOSGEB Analizleri</h1>
          <p className="text-xl text-secondary max-w-3xl">Kurul değerlendirme simülasyonları, KOBİ endeksi eşleşmeleri ve onay projeksiyonları hakkında yapay zeka analizlerini bu alandan takip edebilirsiniz.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="bg-surface-container-lowest p-8 rounded-[2rem] shadow-sm">
            <h3 className="font-bold text-on-surface mb-2">Başarı Tahmini Ortalaması</h3>
            <span className="text-5xl font-black text-primary block mt-4">%82.4</span>
            <p className="text-sm text-secondary mt-2">Son 30 gün içinde taranan 124 projeden elde edilen veri.</p>
          </div>
          <div className="bg-surface-container-lowest p-8 rounded-[2rem] shadow-sm">
            <h3 className="font-bold text-on-surface mb-2">Popüler Kategori</h3>
            <span className="text-3xl font-black text-tertiary block mt-6">İleri Girişimci Programı</span>
            <p className="text-sm text-secondary mt-2">Dönemsel teknolojik yatırımların %60'ını oluşturuyor.</p>
          </div>
          <div className="bg-primary-fixed-dim/30 p-8 rounded-[2rem] border border-primary/10">
            <h3 className="font-bold text-on-surface mb-2">Yapay Zeka Tespiti</h3>
            <p className="text-on-primary-fixed-variant leading-relaxed font-medium mt-4">KOSGEB projelerindeki red sebeplerinin <strong>%42'si</strong> bütçe mantıksal hatalarından kaynaklanıyor. Sistemimiz otomatik bütçe doğrulama protokollerini aktif etmiştir.</p>
          </div>
        </div>

        <div className="bg-surface-container-lowest rounded-[2.5rem] p-4 md:p-8 shadow-[0_12px_40px_rgba(24,28,30,0.06)] overflow-hidden">
          <h2 className="text-2xl font-bold mb-8 px-4 flex items-center gap-3">
            <span className="material-symbols-outlined text-primary">view_list</span>
            Son İncelenen Teklifler
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-sm tracking-wider text-secondary border-b border-surface-variant">
                  <th className="pb-4 px-6 font-bold uppercase">Proje Kodu</th>
                  <th className="pb-4 px-6 font-bold uppercase">Proje Adı</th>
                  <th className="pb-4 px-6 font-bold uppercase">Program</th>
                  <th className="pb-4 px-6 font-bold uppercase">Yapay Zeka Skoru</th>
                  <th className="pb-4 px-6 font-bold uppercase text-right">Durum</th>
                </tr>
              </thead>
              <tbody className="text-on-surface">
                {projects.map((proj, idx) => (
                  <tr key={idx} className="hover:bg-surface-container transition-colors group">
                    <td className="py-6 px-6 font-medium font-mono text-sm">{proj.id}</td>
                    <td className="py-6 px-6 font-bold">{proj.name}</td>
                    <td className="py-6 px-6 text-secondary">{proj.category}</td>
                    <td className="py-6 px-6">
                      <div className="flex items-center gap-3">
                        <span className="font-black text-lg">{proj.score}</span>
                        <div className="w-24 h-1.5 bg-surface-variant rounded-full overflow-hidden">
                          <div className="h-full bg-primary" style={{ width: `${proj.score}%` }}></div>
                        </div>
                      </div>
                    </td>
                    <td className="py-6 px-6 text-right">
                      <span className={`px-4 py-1.5 rounded-full text-xs font-bold ${
                        proj.status === 'Onaylandı' || proj.status === 'Yüksek Öncelik' 
                          ? 'bg-tertiary-fixed text-on-tertiary-fixed-variant'
                          : 'bg-error-container text-on-error-container'
                      }`}>
                        {proj.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Kosgeb;
