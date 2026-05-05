import React from 'react';
import { Link } from 'react-router-dom';

const TermsOfUse = () => {
  return (
    <div className="bg-surface min-h-screen p-8 pt-28 border-l-[16px] border-primary">
      <div className="max-w-4xl mx-auto bg-surface-container-lowest p-10 rounded-[2rem] shadow-sm border border-outline-variant/15">
        
        <div className="mb-8 border-b border-outline-variant/20 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-secondary-fixed text-on-secondary-fixed-variant rounded-full text-xs font-bold mb-6">
            <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>gavel</span>
            HUKUKİ YÜKÜMLÜLÜKLER
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-on-surface mb-4">Kullanım Şartları</h1>
          <p className="text-secondary text-lg">Son güncellenme tarihi: {new Date().toLocaleDateString('tr-TR')}</p>
        </div>

        <div className="space-y-8 text-secondary leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-on-surface mb-3">1. Hizmetin Kapsamı ve Sınırları</h2>
            <p>
              GrantInsight AI, yapay zeka ve RAG (Retrieval-Augmented Generation) teknolojileri kullanarak KOSGEB, TÜBİTAK ve benzeri hibe programlarına başvuru yapacak girişimci ve akademisyenlere ön analiz ("Sandbox") hizmeti sunar. Bu platform sıfırdan metin üreten bir "Üretken Zeka" (Generative AI) aracı değil, veriyi anlamsal olarak inceleyen analitik bir araçtır.
            </p>
          </section>

          <section className="bg-error-container/20 p-6 rounded-2xl border-l-4 border-error">
            <h2 className="text-xl font-bold text-on-surface mb-3 flex items-center gap-2">
              <span className="material-symbols-outlined text-error">warning</span>
              2. Garanti Reddi (Sorumluluk Sınırı)
            </h2>
            <p>
              GrantInsight AI, platformda sağlanan yüksek "Başarı Puanları" veya "Desteklenebilir" ibareleri üzerinden, resmi kurumlardan (KOSGEB, TÜBİTAK vb.) hibe veya destek alınacağını <strong>hiçbir şekilde garanti etmez.</strong> Karar mercii tamamen ilgili kurumların hakem heyetleridir. Platformdan alınan raporlardan doğabilecek maddi/manevi zararlardan şirketimiz sorumlu tutulamaz.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-on-surface mb-3">3. Kullanıcının Yükümlülükleri</h2>
            <p>
              Sisteme yüklenen belgelerin telif hakları, doğruluğu ve özgünlüğü tamamen kullanıcının sorumluluğundadır. Başkasına ait ticari sırları veya izinsiz akademik makaleleri sisteme yüklemek yasaktır. Platformu, yasadışı amaçlar veya tersine mühendislik (reverse engineering) için kullanmak hesabınızın kalıcı olarak kapatılmasına neden olur.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-on-surface mb-3">4. Fikri Mülkiyet Hakları</h2>
            <p>
              GrantInsight AI algoritması, arayüz tasarımı (Cognitive Canvas metodolojisi) ve raporlama şablonlarının tüm telif hakları bize aittir. Kullanıcıların platforma analiz için yüklediği dokümanların fikri mülkiyet hakları ise tamamen kullanıcıya aittir ve platform bu veriler üzerinde hiçbir hak iddia etmez.
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

export default TermsOfUse;
