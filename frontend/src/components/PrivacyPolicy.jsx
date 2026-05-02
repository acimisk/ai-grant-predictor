import React from 'react';
import { Link } from 'react-router-dom';

const PrivacyPolicy = () => {
  return (
    <div className="bg-surface min-h-screen p-8 pt-28 border-l-[16px] border-primary">
      <div className="max-w-4xl mx-auto bg-surface-container-lowest p-10 rounded-[2rem] shadow-sm border border-outline-variant/15">
        
        <div className="mb-8 border-b border-outline-variant/20 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-tertiary-fixed text-on-tertiary-fixed-variant rounded-full text-xs font-bold mb-6">
            <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>shield_lock</span>
            VERİ GÜVENLİĞİ & GİZLİLİK
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-on-surface mb-4">Gizlilik Politikası</h1>
          <p className="text-secondary text-lg">Son güncellenme tarihi: {new Date().toLocaleDateString('tr-TR')}</p>
        </div>

        <div className="space-y-8 text-secondary leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-on-surface mb-3">1. Veri Toplama ve İşleme Prensipleri</h2>
            <p>
              GrantInsight AI olarak, yenilikçi girişimlerinizin ve akademik projelerinizin gizliliğini en yüksek standartlarda korumayı taahhüt ediyoruz. Sisteme yüklediğiniz hibe taslakları, KOSGEB/TÜBİTAK proje formları ve bütçe planlamaları yalnızca "Belge Taraması", "Metrik Çıkarımı" ve "AI Puanlaması" gibi analiz işlevlerini yerine getirmek amacıyla işlenmektedir.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-on-surface mb-3">2. Fikri Mülkiyetin Korunması (Sandbox Güvencesi)</h2>
            <p>
              Yüklediğiniz hiçbir belge, yapay zeka (LLM) eğitim setlerine dahil edilmez veya üçüncü taraf kuruluşlarla paylaşılmaz. Sistemimiz, belgelerinizi geçici bir analiz ortamında (Sandbox) okur ve nihai rapor üretildikten sonra bellekten siler.
            </p>
          </section>

          <section className="bg-primary-fixed/20 p-6 rounded-2xl border-l-4 border-primary">
            <h2 className="text-xl font-bold text-on-surface mb-3 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">gpp_good</span>
              RAG (Retrieval-Augmented Generation) Güvenliği
            </h2>
            <p>
              14.2 Milyon doküman üzerinde yapılan benzerlik endeksi ve intihal taramaları, kapalı devre RAG (Bilgi Getirimi) mimarimiz aracılığıyla yapılır. Dışarıya veri sızıntısı riski teknik olarak imkansız hale getirilmiştir.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-on-surface mb-3">3. Kullanıcı Hesap Bilgileri</h2>
            <p>
              Kayıt aşamasında alınan ad, e-posta adresi ve şifre bilgileriniz sadece hesap güvenliğinizi sağlamak ve size ait analiz raporlarına erişiminizi yönetmek için kullanılır. Şifreleriniz modern kriptografik standartlarla (Hash) şifrelenerek saklanır.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-on-surface mb-3">4. İletişim</h2>
            <p>
              Gizlilik politikamız veya kişisel verilerinizin işlenmesiyle ilgili herhangi bir sorunuz, düzeltme veya silme talebiniz olması durumunda destek ekibimizle iletişime geçebilirsiniz.
            </p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-outline-variant/20">
          <Link to="/" className="inline-flex items-center gap-2 px-6 py-3 bg-surface-container-highest hover:bg-surface-container-high text-on-surface rounded-xl font-bold transition-colors cursor-pointer">
            <span className="material-symbols-outlined">arrow_back</span>
            Ana Sayfaya Dön
          </Link>
        </div>

      </div>
    </div>
  );
};

export default PrivacyPolicy;
