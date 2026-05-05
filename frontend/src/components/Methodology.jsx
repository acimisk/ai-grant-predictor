import React from 'react';
import { Link } from 'react-router-dom';

const Methodology = () => {
  return (
    <div className="bg-surface min-h-screen">
      
      {/* Editorial Header */}
      <div className="bg-surface-container-lowest pt-32 pb-24 px-8 border-b border-outline-variant/20">
        <div className="max-w-4xl mx-auto text-center">
          <Link to="/" className="inline-flex items-center gap-2 mb-12 text-secondary hover:text-primary transition-colors">
            <span className="material-symbols-outlined">arrow_back</span>
            Ana Sayfaya Dön
          </Link>
          <div className="text-primary font-bold tracking-widest uppercase text-sm mb-6">MİMARİ DOKÜMANTASYON</div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-on-surface mb-8 leading-tight">
            Akademik Değerlendirmede <br/> RAG ve LLM Kullanımı
          </h1>
          <p className="text-xl text-secondary leading-relaxed mx-auto max-w-2xl">
            Sistemimiz, basit anahtar kelime aramalarından ziyade, derin bağlamsal bilgi getirimine dayanan (Retrieval-Augmented Generation) özel bir altyapı üzerine kuruludur.
          </p>
        </div>
      </div>

      {/* Editorial Content */}
      <div className="py-24 px-8">
        <div className="max-w-3xl mx-auto prose prose-lg prose-slate dark:prose-invert text-on-surface">
          
          <h2 className="text-3xl font-bold mb-6 font-headline">1. Gelişmiş Bilgi Getirimi (RAG) Nedir?</h2>
          <p className="text-lg text-secondary leading-relaxed mb-8 font-body">
            Geleneksel Büyük Dil Modelleri (LLM), eğitildikleri veri setleriyle sınırlıdır ve güncel kurumsal regülasyonlara her zaman vakıf olamazlar. 
            <strong> GrantInsight AI </strong> sisteminde kullanılan RAG teknolojisi, yapay zekanın önce güncel TÜBİTAK ve KOSGEB belgelerinden ilgili kısımları arayıp (Retrieval) bulmasını, 
            ardından bu spesifik ve doğrulanmış bağlamı kullanarak cevap veya puan (Generation) üretmesini sağlar.
          </p>

          <div className="bg-surface-container-low p-8 rounded-3xl mb-12 border border-outline-variant/20">
            <h3 className="font-bold text-on-surface mb-4">Adım Adım Süreç:</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-4">
                <span className="material-symbols-outlined text-primary mt-1">database</span>
                <div>
                  <strong className="block text-on-surface">Vektör Veritabanı Eşleştirilmesi</strong>
                  <span className="text-secondary">Kurumların yayınladığı başvuru rehberleri yüksek boyutlu vektörlere dönüştürülür.</span>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="material-symbols-outlined text-primary mt-1">center_focus_strong</span>
                <div>
                  <strong className="block text-on-surface">Bağlamsal Yakalama</strong>
                  <span className="text-secondary">Yüklenen projelerin metni, veri tabanındaki kurallarla anlamsal (semantik) olarak kıyaslanır.</span>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="material-symbols-outlined text-tertiary mt-1">neurology</span>
                <div>
                  <strong className="block text-on-surface">LLM Sentezlemesi</strong>
                  <span className="text-secondary">Son model yapay zeka, bulunan kanıtlara dayanarak projeye bir "İnovasyon Puanı" ve "Geliştirilebilir Alan" raporu yazar.</span>
                </div>
              </li>
            </ul>
          </div>

          <h2 className="text-3xl font-bold mb-6 font-headline">2. Neden Vector Tabanlı Benzerlik Tespiti?</h2>
          <p className="text-lg text-secondary leading-relaxed mb-8 font-body">
            Kelime kelimesine kopyalama (intihal) günümüzde kolayca maskelenebilir (örneğin kelimelerin eş anlamlılarıyla değiştirilmesi). 
            Vektör tabanlı matematiksel modelleme, kelimelerin cümle içindeki <em>anlamını</em> ölçer. Böylece cümlelerin kelimeleri tamamen değiştirilse dahi arkasındaki fikir çalıntıysa GrantInsight AI bunu tespit edebilir.
          </p>

          <h2 className="text-3xl font-bold mb-6 font-headline">3. Tarafsızlık ve İnsan Hatalarının Giderilmesi</h2>
          <p className="text-lg text-secondary leading-relaxed mb-12 font-body">
            İnsan faktöründen kaynaklanabilen okuma yorgunluğu ve kişisel önyargılar, standart bir LLM puanlama cetveliyle sıfıra indirgenir. Sistem, projenin sahibinin ismine, üniversitesine veya şirketine değil, tamamıyla projenin kurallara uygunluğuna ve yenilikçiliğine (inovasyon düzeyine) odaklanır.
          </p>

        </div>
      </div>

    </div>
  );
};

export default Methodology;
